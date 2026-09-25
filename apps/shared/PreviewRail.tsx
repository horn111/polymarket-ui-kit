"use client";

import { useEffect, useId, useRef, useState, type PointerEvent } from "react";

interface PreviewRailProps<T extends string> {
  items: Array<{ label: string; value: T }>;
  value: T;
  onChange: (value: T) => void;
  panelId: string;
}

/** Clickable tabs with a continuous, draggable scale. Keyboard behavior remains native to tabs. */
export function PreviewRail<T extends string>({
  items,
  value,
  onChange,
  panelId,
}: PreviewRailProps<T>) {
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.value === value),
  );
  const [position, setPosition] = useState(activeIndex);
  const [dragging, setDragging] = useState(false);
  const [horizontal, setHorizontal] = useState(false);
  const [trackWidth, setTrackWidth] = useState(480);
  const current = useRef(activeIndex);
  const track = useRef<HTMLDivElement>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const gradientId = useId().replace(/:/g, "");
  const total = Math.max(1, items.length - 1);
  const length = horizontal ? trackWidth : 480;
  const travel = length - 56;
  const point = 28 + (position / total) * travel;

  useEffect(() => {
    const query = matchMedia("(max-width: 760px)");
    const update = () => setHorizontal(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setTrackWidth(element.clientWidth));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (dragging) return;
    const from = current.current;
    const duration = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 280;
    const start = performance.now();
    let frame = 0;
    const animate = (time: number) => {
      const t = duration ? Math.min(1, (time - start) / duration) : 1;
      const next = from + (activeIndex - from) * (1 - Math.pow(1 - t, 4));
      current.current = next;
      setPosition(next);
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, dragging]);

  function selectAtPointer(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const coordinate = horizontal
      ? (event.clientX - bounds.left) / bounds.width
      : (event.clientY - bounds.top) / bounds.height;
    const next = Math.max(
      0,
      Math.min(total, ((coordinate * length - 28) / travel) * total),
    );
    current.current = next;
    setPosition(next);
    const item = items[Math.round(next)];
    if (item && item.value !== value) onChange(item.value);
  }

  const path = horizontal
    ? `M0 28 H${point - 28} C${point - 15} 28 ${point - 20} 10 ${point} 10 S${point + 15} 28 ${point + 28} 28 H${length}`
    : `M28 0 V${point - 28} C28 ${point - 15} 10 ${point - 20} 10 ${point} S28 ${point + 15} 28 ${point + 28} V480`;

  return (
    <aside className="civic-selector" data-dragging={dragging || undefined}>
      <div className="civic-selector__heading">
        <strong>{items[activeIndex]?.label}</strong>
        <small>Drag the dial or choose a section</small>
      </div>
      <div className="civic-selector__control">
        <div
          ref={track}
          className="civic-selector__track"
          data-testid="preview-rail-track"
          aria-hidden="true"
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            event.preventDefault();
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
            selectAtPointer(event);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId))
              selectAtPointer(event);
          }}
          onPointerUp={(event) => {
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
            selectAtPointer(event);
            event.currentTarget.releasePointerCapture(event.pointerId);
            setDragging(false);
          }}
          onPointerCancel={() => setDragging(false)}
        >
          <svg viewBox={horizontal ? `0 0 ${length} 72` : "0 0 72 480"}>
            <defs>
              <linearGradient
                id={gradientId}
                x1="0"
                y1="0"
                x2={horizontal ? "1" : "0"}
                y2={horizontal ? "0" : "1"}
              >
                <stop offset="0" stopColor="var(--pui-accent)" stopOpacity=".15" />
                <stop
                  offset={Math.max(0, (point - 62) / length)}
                  stopColor="var(--pui-accent)"
                  stopOpacity=".3"
                />
                <stop offset={point / length} stopColor="var(--pui-accent)" />
                <stop
                  offset={Math.min(1, (point + 62) / length)}
                  stopColor="var(--pui-accent)"
                  stopOpacity=".3"
                />
                <stop offset="1" stopColor="var(--pui-accent)" stopOpacity=".15" />
              </linearGradient>
            </defs>
            {Array.from({ length: total * 4 + 1 }, (_, index) => {
              const at = 28 + (index / (total * 4)) * travel;
              const tick = index % 4 === 0 ? 10 : 5;
              return (
                <line
                  key={index}
                  x1={horizontal ? at : 0}
                  x2={horizontal ? at : tick}
                  y1={horizontal ? 0 : at}
                  y2={horizontal ? tick : at}
                  stroke="var(--pui-border-strong)"
                  strokeWidth="1"
                />
              );
            })}
            <path
              className="civic-selector__glow"
              d={path}
              stroke={`url(#${gradientId})`}
              strokeWidth="4"
              fill="none"
            />
            <path
              d={path}
              stroke={`url(#${gradientId})`}
              strokeWidth="1.4"
              fill="none"
            />
            <g
              transform={
                horizontal ? `translate(${point} 48)` : `translate(48 ${point})`
              }
            >
              <circle className="civic-selector__dial-shadow" r="20" />
              <circle className="civic-selector__dial" r="18" />
              <circle r="13.5" fill="none" stroke="var(--pui-border)" />
              <path
                d={
                  horizontal
                    ? "M-4 -4 -8 0 -4 4 M4 -4 8 0 4 4"
                    : "M-4 -4 0 -8 4 -4 M-4 4 0 8 4 4"
                }
                stroke="var(--pui-accent)"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
        <div
          ref={tabs}
          className="civic-selector__tabs"
          role="tablist"
          aria-label="Component preview"
          aria-orientation={horizontal ? "horizontal" : "vertical"}
          onKeyDown={(event) => {
            const next =
              event.key === "ArrowDown" || event.key === "ArrowRight"
                ? (activeIndex + 1) % items.length
                : event.key === "ArrowUp" || event.key === "ArrowLeft"
                  ? (activeIndex + items.length - 1) % items.length
                  : event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? items.length - 1
                      : -1;
            if (next < 0) return;
            event.preventDefault();
            onChange(items[next]!.value);
            tabs.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
          }}
        >
          {items.map((item) => (
            <button
              key={item.value}
              id={`lab-tab-${item.value}`}
              role="tab"
              aria-selected={value === item.value}
              aria-controls={panelId}
              tabIndex={value === item.value ? 0 : -1}
              onClick={() => onChange(item.value)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
