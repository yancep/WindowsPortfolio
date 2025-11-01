// WinContainer.tsx
"use client";

import React, { ReactNode, useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppItem } from "./WinSearchModal";
import { useSelectionStore, SelectedItem } from "./SelectionStore";

const ITEM_TYPE = "APP";

type IconItem = AppItem & { slot: number };
type DragItem = { id: string; fromSlot: number };

export default function WinContainer({
  children,
  items = [],
}: {
  children: ReactNode;
  items: AppItem[];
}) {
  const rows = 8;
  const cols = 10;
  const slotsCount = rows * cols;

  const seeded = useMemo(() => {
    const occupied = new Set<number>();
    const result: IconItem[] = [];
    let nextFree = 0;

    for (const it of items) {
      const candidate = (it as AppItem & { slot?: number }).slot;
      if (
        typeof candidate === "number" &&
        candidate >= 0 &&
        candidate < slotsCount &&
        !occupied.has(candidate)
      ) {
        occupied.add(candidate);
        result.push({ ...(it as AppItem), slot: candidate });
        continue;
      }

      while (occupied.has(nextFree) && nextFree < slotsCount) nextFree++;
      const assigned = nextFree < slotsCount ? nextFree : 0;
      occupied.add(assigned);
      nextFree++;
      result.push({ ...(it as AppItem), slot: assigned });
    }

    return result;
  }, [items, slotsCount]);

  const [stateItems, setStateItems] = useState<IconItem[]>(seeded);
  useEffect(() => setStateItems(seeded), [seeded]);

  function moveApp(draggedId: string, toSlot: number) {
    setStateItems((prev) => {
      const dragged = prev.find((p) => p.id === draggedId);
      if (!dragged) return prev;
      const fromSlot = dragged.slot;
      if (fromSlot === toSlot) return prev;
      const occupant = prev.find((p) => p.slot === toSlot);
      return prev.map((p) => {
        if (p.id === draggedId) return { ...p, slot: toSlot };
        if (occupant && p.id === occupant.id) return { ...p, slot: fromSlot };
        return p;
      });
    });
  }

  const renderForSlot = (i: number) => {
    const app = stateItems.find((it) => it.slot === i);
    if (!app) return null;
    return <AppIcon key={app.id} item={app} />;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {/* ensure container fills viewport so background is visible */}
      <DesktopWithSelection rows={rows} cols={cols} slotsCount={slotsCount}>
        {/* Background using next/image fill (reliable and responsive) */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/whallpaper.jpg"
            alt="wallpaper"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div className="absolute inset-0 grid grid-rows-8 grid-cols-10 grid-flow-col gap-0 text-xs">
          {Array.from({ length: slotsCount }).map((_, i) => (
            <div key={i} className="flex items-center justify-center p-1">
              <Slot slotIndex={i} onDropApp={moveApp}>
                {renderForSlot(i)}
              </Slot>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {React.Children.map(children, (child, idx) => (
            <div key={idx} className="pointer-events-auto">
              {child}
            </div>
          ))}
        </div>
      </DesktopWithSelection>
    </DndProvider>
  );
}

function AppIcon({ item }: { item: IconItem }) {
  const selected = useSelectionStore((s) => s.selectedIds.some((si) => si.id === item.id));
  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>(() => ({
    type: ITEM_TYPE,
    item: { id: item.id, fromSlot: item.slot },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div
      ref={(node) => {
        drag(node as Element | null);
      }}
      data-id={item.id}
      className={`app-icon flex flex-col justify-center items-center text-white rounded-md cursor-grab select-none transition-colors outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent ${
        isDragging ? "opacity-40" : "hover:bg-white/10"
      } ${selected ? "ring-2 ring-blue-400" : ""}`}
      role="button"
      tabIndex={0}
      title={item.name}
      style={{ width: 80, height: 80 }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") e.preventDefault();
      }}
    >
      <Image alt={item.name} src={item.src} width={45} height={45} />
      <div className="text-xs mt-2 truncate w-20 text-center">{item.name}</div>
    </div>
  );
}

function Slot({
  slotIndex,
  children,
  onDropApp,
}: {
  slotIndex: number;
  children: React.ReactNode;
  onDropApp: (draggedId: string, toSlot: number) => void;
}) {
  const [, drop] = useDrop<DragItem, void, unknown>(() => ({
    accept: ITEM_TYPE,
    drop: (dragged) => onDropApp(dragged.id, slotIndex),
    collect: () => ({}),
  }));

  return (
    <div
      ref={(node) => {
        drop(node as Element | null);
      }}
      className="relative w-full h-full flex items-start justify-center p-0"
    >
      {children}
    </div>
  );
}

/* -------------------------
   DesktopWithSelection
   ------------------------*/
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

function DesktopWithSelection({
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
