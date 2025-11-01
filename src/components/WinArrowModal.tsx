import { AppItem } from "./WinSearchModal";
import Image from "next/image";
import { useEffect } from "react";

export default function WinArrowModal({
  isOpen,
  onClose,
  onOpenSearch,
  appItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  appItems: AppItem[];
}) {
  if (!isOpen) return null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  
  return (
    <div
      className="absolute right-40 bottom-14 z-[100] flex flex-row transition-transform transition-opacity duration-200 ease-out origin-bottom-right opacity-100 translate-y-0 scale-100"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-[240px] max-w-[38vw] rounded-xl border border-white/15 shadow-[0_16px_60px_rgba(0,0,0,0.5)] 
                   bg-[#1f2022]/85 backdrop-blur-2xl text-white select-none grid grid-cols-1 p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {appItems.map((item) => {
          return (
            <button
              className="flex flex-row gap-3 h-10 items-center hover:bg-white/10 rounded-md w-full px-2 text-sm text-white/85"
              key={item.id}
              title={item.name}
            >
              <Image alt="Win" src={item.src} width={18} height={18} />
              <span className="truncate">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
