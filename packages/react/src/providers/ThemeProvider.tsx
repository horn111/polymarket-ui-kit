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
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored === "light" || stored === "dark" || stored === "system") {
        setThemeState(stored);
      }
    } catch {
      // The selected theme still works when browser storage is unavailable.
    }
  }, [storageKey]);

  useEffect(() => {
    if (theme !== "system" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemTheme(media.matches ? "dark" : "light");
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [theme]);

  useEffect(() => {
    const target = attributeTarget ?? document.documentElement;
    target.setAttribute("data-pui-theme", resolvedTheme);
  }, [attributeTarget, resolvedTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (nextTheme) => {
        try {
          window.localStorage.setItem(storageKey, nextTheme);
        } catch {
          // Persistence is optional; do not block the theme change.
        }
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
