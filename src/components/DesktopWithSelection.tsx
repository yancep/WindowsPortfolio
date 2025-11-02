import { ReactNode, useEffect, useRef, useState } from "react";
import { SelectedItem, useSelectionStore } from "./SelectionStore";

export function DesktopWithSelection({
  children,
  rows,
  cols,
  slotsCount,
}: {
  children: ReactNode;
  rows: number;
  cols: number;
  slotsCount: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });
  const [box, setBox] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const setSelected = useSelectionStore((s) => s.setSelected);
  const clear = useSelectionStore((s) => s.clear);

  const toSelectedItems = (ids: string[]): SelectedItem[] => ids.map((id) => ({ id, metadata: "" }));

  function onMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.button !== 0) return;
    const container = containerRef.current;
    if (!container) return;

    const target = e.target as HTMLElement | null;
    if (target?.closest(".app-icon")) return;

    draggingRef.current = true;
    const rect = container.getBoundingClientRect();
    startRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setBox({ left: startRef.current.x, top: startRef.current.y, width: 0, height: 0 });
    e.preventDefault();
    if (!(e.ctrlKey || e.metaKey)) clear();
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!draggingRef.current) return;
    const container = containerRef.current!;
    const rect = container.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;
    const r = makeRect(startRef.current.x, startRef.current.y, curX, curY);
    setBox({ left: r.left, top: r.top, width: r.width, height: r.height });

    const items = container.querySelectorAll<HTMLElement>(".app-icon");
    const selRect = { left: r.left, top: r.top, right: r.left + r.width, bottom: r.top + r.height };
    const hitIds: string[] = [];
    items.forEach((it) => {
      const br = it.getBoundingClientRect();
      const itRect = {
        left: br.left - rect.left,
        top: br.top - rect.top,
        right: br.right - rect.left,
        bottom: br.bottom - rect.top,
      };
      if (rectsIntersect(selRect, itRect)) {
        const id = it.dataset.id;
        if (id) hitIds.push(id);
      }
    });
    setSelected(toSelectedItems(hitIds), true);
  }

  function onMouseUp(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const container = containerRef.current!;
    const rect = container.getBoundingClientRect();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;
    const r = makeRect(startRef.current.x, startRef.current.y, curX, curY);
    const selRect = { left: r.left, top: r.top, right: r.left + r.width, bottom: r.top + r.height };

    const items = container.querySelectorAll<HTMLElement>(".app-icon");
    const hitIds: string[] = [];
    items.forEach((it) => {
      const br = it.getBoundingClientRect();
      const itRect = {
        left: br.left - rect.left,
        top: br.top - rect.top,
        right: br.right - rect.left,
        bottom: br.bottom - rect.top,
      };
      if (rectsIntersect(selRect, itRect)) {
        const id = it.dataset.id;
        if (id) hitIds.push(id);
      }
    });

    const additive = e.ctrlKey || e.metaKey;
    setSelected(toSelectedItems(hitIds), additive);
    setBox(null);
  }

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        setBox(null);
        clear();
        draggingRef.current = false;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [clear]);

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      className="relative w-full min-h-screen"
      style={{ userSelect: "none" }}
    >
      {children}
      {box && (
        <div
          className="selection-box"
          style={{
            position: "absolute",
            left: box.left,
            top: box.top,
            width: box.width,
            height: box.height,
            border: "1px solid rgba(0,120,215,0.9)",
            background: "linear-gradient(rgba(0,120,215,0.12), rgba(0,120,215,0.08))",
            pointerEvents: "none",
            zIndex: 99999,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.02) inset",
          }}
        />
      )}
    </div>
  );
}

function makeRect(x1: number, y1: number, x2: number, y2: number) {
  const left = Math.min(x1, x2);
  const top = Math.min(y1, y2);
  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);
  return { left, top, width, height, right: left + width, bottom: top + height };
}

function rectsIntersect(
  a: { left: number; top: number; right: number; bottom: number },
  b: { left: number; top: number; right: number; bottom: number }
) {
  return !(a.left > b.right || a.right < b.left || a.top > b.bottom || a.bottom < b.top);
}
