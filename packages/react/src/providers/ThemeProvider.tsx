import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

export type PolymarketTheme = "light" | "dark" | "system";

export interface ThemeContextValue {
  theme: PolymarketTheme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: PolymarketTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveTheme(theme: PolymarketTheme): "light" | "dark" {
  if (theme !== "system") {
    return theme;
  }

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
}

export interface ThemeProviderProps extends PropsWithChildren {
  defaultTheme?: PolymarketTheme;
  storageKey?: string;
  attributeTarget?: HTMLElement | null;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "polymarket-ui-kit-theme",
  attributeTarget,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<PolymarketTheme>(defaultTheme);
  const resolvedTheme = resolveTheme(theme);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey) as PolymarketTheme | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setThemeState(stored);
    }
  }, [storageKey]);

  useEffect(() => {
    const target = attributeTarget ?? document.documentElement;
    target.setAttribute("data-pui-theme", resolvedTheme);
  }, [attributeTarget, resolvedTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (nextTheme) => {
        window.localStorage.setItem(storageKey, nextTheme);
        setThemeState(nextTheme);
      },
    }),
    [resolvedTheme, storageKey, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error("useTheme must be used inside ThemeProvider.");
  }

  return value;
}

