"use client";
import React, { ReactNode, useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppItem } from "./WinSearchModal";
import { AppIcon } from "./AppIcon";
import { Slot } from "./Slot";
import { DesktopWithSelection } from "./DesktopWithSelection";

export const ITEM_TYPE = "APP";
export type IconItem = AppItem & { slot: number };
export type DragItem = { id: string; fromSlot: number };

// Componente del Menú Contextual
function ContextMenu({ x, y, onClose }: { x: number; y: number; onClose: () => void }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    if (menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let newX = x;
      let newY = y;
      
      // Ajustar horizontalmente si se sale del viewport
      if (x + menuRect.width > viewportWidth) {
        newX = viewportWidth - menuRect.width - 10;
      }
      
      // Ajustar verticalmente si se sale del viewport
      if (y + menuRect.height > viewportHeight) {
        newY = y - menuRect.height;
        // Si tampoco cabe arriba, posicionar en la parte superior del viewport
        if (newY < 0) {
          newY = 10;
        }
      }
      
      setPosition({ x: newX, y: newY });
    }
  }, [x, y]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const menuItems = [
    { icon: "⊞", label: "View", hasSubmenu: true },
    { icon: "⇅", label: "Sort by", hasSubmenu: true },
    { icon: "↻", label: "Refresh", shortcut: "" },
    { divider: true },
    { icon: "↶", label: "Undo Delete", shortcut: "Ctrl+Z", disabled: false },
    { divider: true },
    { icon: "⊕", label: "New", hasSubmenu: true },
    { divider: true },
    { icon: "🖥", label: "Display settings", shortcut: "" },
    { icon: "✏", label: "Personalize", shortcut: "" },
    { divider: true },
    { icon: "▶", label: "Open in Terminal", shortcut: "" },
    { divider: true },
    { icon: "⋯", label: "Show more options", shortcut: "" },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bg-zinc-800/95 backdrop-blur-md text-white rounded-md shadow-2xl border border-zinc-700/50 py-0.5 w-[280px]"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        zIndex: 99999
      }}
    >
      {menuItems.map((item, idx) => {
        if (item.divider) {
          return (
            <div key={idx} className="h-px bg-zinc-700/50 my-0.5" />
          );
        }
        return (
          <div
            key={idx}
            className={`flex items-center justify-between px-3 py-1.5 hover:bg-zinc-700/60 cursor-pointer transition-colors ${
              item.disabled ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base w-5 text-center">
                {item.icon}
              </span>
              <span className="text-[13px]">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.shortcut && (
                <span className="text-[11px] text-zinc-400">{item.shortcut}</span>
              )}
              {item.hasSubmenu && (
                <span className="text-zinc-400 text-sm">›</span>
              )}
            </div>
          </div>
        );
      })}
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
  const rows = 6;
  const cols = 13;
  const slotsCount = rows * cols;

  // Estado del menú contextual
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

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

  // Manejador del clic derecho
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // No mostrar el menú si el clic derecho fue sobre un ícono
    const target = e.target as HTMLElement;
    if (target.closest(".app-icon")) {
      return;
    }
    
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <DesktopWithSelection rows={rows} cols={cols} slotsCount={slotsCount}>
        <div 
          className="absolute inset-0 -z-10"
          onContextMenu={handleContextMenu}
        >
          <Image
            src="/whallpaper.jpg"
            alt="wallpaper"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div 
          className="absolute inset-0 grid grid-rows-8 grid-cols-10 grid-flow-col gap-0 text-xs"
          onContextMenu={handleContextMenu}
        >
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

        {/* Menú Contextual */}
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
          />
        )}
      </DesktopWithSelection>
    </DndProvider>
  );
}