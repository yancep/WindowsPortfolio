import { useDrag } from "react-dnd";
import { useSelectionStore } from "./SelectionStore";
import { DragItem, IconItem, ITEM_TYPE } from "./WinContainer";
import Image from "next/image";

export function AppIcon({ item }: { item: IconItem }) {
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