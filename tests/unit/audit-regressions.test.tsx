import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  MobileTradeDrawer,
  ThemeProvider,
  useMarket,
  useTheme,
} from "@polymarket-ui-kit/react";
import { useAsyncData } from "../../packages/react/src/hooks/useAsyncData";
import { fixtureMarket } from "../fixtures/market";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  window.localStorage.clear();
});

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}

describe("async data lifecycle", () => {
  it.each([true, false])(
    "fetches once without a provider after success=%s and parent rerenders",
    async (success) => {
      const fetcher = vi
        .fn()
        .mockResolvedValue(
          new Response(
            JSON.stringify({
              id: "sample",
              slug: "sample",
              question: "Sample question",
            }),
            { status: success ? 200 : 503 },
          ),
        );
      vi.stubGlobal("fetch", fetcher);
      const { result, rerender } = renderHook(() => useMarket("sample"));
      await act(async () => {});
      expect(result.current.isLoading).toBe(false);
      expect(Boolean(result.current.error)).toBe(!success);
      if (success) expect(result.current.data?.question).toBe("Sample question");
      rerender();
      await act(async () => {});
      expect(fetcher).toHaveBeenCalledTimes(1);
    },
  );

  it("waits for pending requests before polling, retains stale data on failure and recovers", async () => {
    vi.useFakeTimers();
    const first = deferred<string>();
    const second = deferred<string>();
    const load = vi
      .fn()
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise)
      .mockResolvedValue("recovered");
    const { result, unmount } = renderHook(() =>
      useAsyncData(load, [], { refetchIntervalMs: 10 }),
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    expect(load).toHaveBeenCalledTimes(1);
    act(() => result.current.refresh());
    expect(load).toHaveBeenCalledTimes(1);
    await act(async () => first.resolve("first"));
    expect(result.current.data).toBe("first");
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    expect(load).toHaveBeenCalledTimes(2);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    expect(load).toHaveBeenCalledTimes(2);
    await act(async () => second.reject(new Error("Offline")));
    expect(result.current.isStale).toBe(true);
    expect(result.current.data).toBe("first");
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    expect(result.current.data).toBe("recovered");
    expect(result.current.isStale).toBe(false);
    unmount();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    expect(load).toHaveBeenCalledTimes(3);
  });

  it("ignores a previous market's late result without unlocking polling for the new request", async () => {
    vi.useFakeTimers();
    const old = deferred<string>();
    const next = deferred<string>();
    const load = vi.fn((slug: string) => (slug === "old" ? old.promise : next.promise));
    const { result, rerender } = renderHook(
      ({ slug }) => useAsyncData(() => load(slug), [slug], { refetchIntervalMs: 10 }),
      { initialProps: { slug: "old" } },
    );
    await act(async () => {});
    rerender({ slug: "next" });
    await act(async () => old.resolve("old"));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    expect(load).toHaveBeenCalledTimes(2);
    expect(result.current.data).toBe(null);
    await act(async () => next.resolve("next"));
    expect(result.current.data).toBe("next");
  });

  it("polls initial data when refetch on mount is off and stops when disabled", async () => {
    vi.useFakeTimers();
    const load = vi.fn().mockResolvedValue("fresh");
    const { result, rerender } = renderHook(
      ({ enabled }) =>
        useAsyncData(load, [], {
          enabled,
          initialData: "initial",
          refetchOnMount: false,
          refetchIntervalMs: 10,
        }),
      { initialProps: { enabled: true } },
    );
    expect(load).not.toHaveBeenCalled();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    expect(result.current.data).toBe("fresh");
    rerender({ enabled: false });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });
    expect(load).toHaveBeenCalledTimes(1);
  });
});

describe("trade preview", () => {
  it("explains read-only mode without presenting an inert continue action", () => {
    render(<MobileTradeDrawer market={fixtureMarket} />);
    expect(
      screen.getByText("Preview only. No order will be submitted."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Continue/ })).not.toBeInTheDocument();
  });

  it("only emits a trade intent for a valid notional", () => {
    const onTradeIntent = vi.fn();
    render(<MobileTradeDrawer market={fixtureMarket} onTradeIntent={onTradeIntent} />);
    const input = screen.getByRole("spinbutton", { name: "Notional" });
    for (const value of ["", "-10", "0.5"]) {
      fireEvent.change(input, { target: { value } });
      expect(screen.getByRole("button", { name: /Continue/ })).toBeDisabled();
      expect(input).toHaveAttribute("aria-invalid", "true");
    }
    fireEvent.change(input, { target: { value: "10.25" } });
    fireEvent.click(screen.getByRole("button", { name: /Continue/ }));
    expect(onTradeIntent).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ notional: 10.25 }),
    );
  });
});

function ThemeProbe() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <>
      <output>{resolvedTheme}</output>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("system")}>System</button>
    </>
  );
}

it("follows system changes, respects explicit themes and removes its media listener", () => {
  const media = new EventTarget();
  const query = Object.assign(media, { matches: false });
  const remove = vi.spyOn(query, "removeEventListener");
  vi.stubGlobal("matchMedia", () => query);
  const { unmount } = render(
    <ThemeProvider>
      <ThemeProbe />
    </ThemeProvider>,
  );
  act(() => {
    query.matches = true;
    query.dispatchEvent(new Event("change"));
  });
  expect(screen.getByRole("status")).toHaveTextContent("dark");
  expect(document.documentElement).toHaveAttribute("data-pui-theme", "dark");
  fireEvent.click(screen.getByRole("button", { name: "Light" }));
  act(() => query.dispatchEvent(new Event("change")));
  expect(screen.getByRole("status")).toHaveTextContent("light");
  fireEvent.click(screen.getByRole("button", { name: "System" }));
  expect(screen.getByRole("status")).toHaveTextContent("dark");
  act(() => {
    query.matches = false;
    query.dispatchEvent(new Event("change"));
  });
  expect(screen.getByRole("status")).toHaveTextContent("light");
  unmount();
  expect(remove).toHaveBeenCalledTimes(2);
});
