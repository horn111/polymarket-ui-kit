"use client";

import { useEffect } from "react";

type DemoTheme = "light" | "dark";

interface RouteThemeSyncProps {
  theme: DemoTheme;
}

export function RouteThemeSync({ theme }: RouteThemeSyncProps) {
  useEffect(() => {
    document.documentElement.dataset.demoTheme = theme;
  }, [theme]);

  return null;
}
