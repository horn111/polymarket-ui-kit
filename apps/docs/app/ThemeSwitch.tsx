"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.dataset.puiTheme = theme;
  }, [theme]);

  return (
    <div className="docs-theme" role="group" aria-label="Documentation theme">
      {(["light", "dark"] as Theme[]).map((item) => (
        <button
          data-active={item === theme ? "true" : undefined}
          key={item}
          onClick={() => setTheme(item)}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
