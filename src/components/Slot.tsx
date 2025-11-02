import { useDrop } from "react-dnd";
import { DragItem, ITEM_TYPE } from "./WinContainer";

export function Slot({
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