"use client";

import React, { ReactNode, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppItem } from "./WinSearchModal";

const ITEM_TYPE = "APP";

type IconItem = AppItem & { slot: number };

function AppIcon({ item }: { item: IconItem }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { id: item.id, fromSlot: item.slot },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div
      ref={(node) => {
        if (drag) (drag as unknown as (el: Element | null) => void)(node);
      }}
      className={`flex flex-col justify-center items-center text-white rounded-md cursor-grab select-none ${
        isDragging ? "opacity-40" : "hover:bg-white/10"
      }`}
      style={{ width: 80, height: 80 }}
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
  const [, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (dragged: any) => onDropApp(dragged.id, slotIndex),
    collect: () => ({}),
  }));

  return (
    <div
      ref={(node) => {
        if (drop) (drop as unknown as (el: Element | null) => void)(node);
      }}
      className="relative w-full h-full flex items-start justify-center p-0"
    >
      {children}
    </div>
  );
}

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
      const candidate = (it as any).slot;
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

  useEffect(() => {
    setStateItems(seeded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

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

  function renderForSlot(i: number) {
    const app = stateItems.find((it) => it.slot === i);
    if (!app) return null;
    return <AppIcon key={app.id} item={app} />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative w-screen h-screen overflow-hidden">
        <div className="absolute inset-0 grid grid-rows-8 grid-cols-10 grid-flow-col gap-0 text-xs back">
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
      </div>
    </DndProvider>
  );
}
