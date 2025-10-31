import Image from "next/image";
import { AppItem } from "./WinSearchModal";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useRef } from "react";
import { useWindowStore } from "./WindowStore";

export default function WinModal({
  isOpen,
  onClose,
  onOpenSearch,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const store = (() => { try { return useWindowStore(); } catch { return null; } })();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // autofocus search
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div
      className={`fixed inset-0 z-[100] pointer-events-none flex items-start justify-center pt-16 transition duration-200 ease-out ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => { if (e.currentTarget === e.target) onClose(); }}
    >
      <div
        className="relative pointer-events-auto w-[680px] max-w-[92vw] h-[78%] rounded-2xl border border-white/15 shadow-[0_20px_80px_rgba(0,0,0,0.55)] 
                   bg-[#1f2022]/80 backdrop-blur-2xl text-white select-none flex flex-col items-center px-4 py-6"
      >
        <div className="w-full max-w-[560px] mb-6 px-2">
          <div className="flex items-center h-10 px-4 rounded-full border border-white/10 bg-white/10 hover:bg-white/15 transition-colors">
            <MagnifyingGlassIcon className="h-4 w-4 text-white/80 mr-2" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for apps, settings, and documents"
              autoComplete="off"
              onChange={() => onOpenSearch()}
              className="bg-transparent outline-none text-white placeholder-white/70 text-sm w-full"
            />
          </div>
        </div>
        <SearchModalListApps appItems={aplications} onLaunch={(app) => {
          // simple launcher: open browser for now
          store?.openWindow('browser', { title: app.name });
        }}></SearchModalListApps>
        <UserAndOffSection></UserAndOffSection>
      </div>
    </div>
  );
}

const UserAndOffSection = () => {
  return (
    <section className="absolute bottom-0 w-full h-16 bg-black/25 border-t border-white/10 flex flex-row justify-between px-6 items-center rounded-b-2xl">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-white/90 flex items-center justify-center text-black text-xs font-semibold">U</div>
        <span className="text-sm text-white/90">User</span>
      </div>
      <button
        className="h-9 px-4 rounded-md bg-white/10 hover:bg-white/15 border border-white/10 text-sm"
        title="Power"
      >
        ⏻
      </button>
    </section>
  );
};

const SearchModalListApps = ({ appItems, onLaunch }: { appItems: AppItem[]; onLaunch?: (app: AppItem) => void }) => {
  return (
    <section className="w-[92%] max-w-[600px] h-[60%] -translate-y-2">
      <div className="flex flex-row justify-between items-center px-1 mb-2">
        <h2 className="px-2 py-1 text-white/90">Pinned</h2>
        <button
          onClick={() => open}
          title="All apps"
          className="h-8 px-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-md flex flex-row items-center text-sm"
        >
          All apps <ChevronRightIcon height={18} width={18}></ChevronRightIcon>
        </button>
      </div>
      <div className="w-full h-full gap-2 grid grid-cols-6 grid-rows-3">
        {appItems.map((item) => {
          return (
            <button
              className="flex flex-col items-center justify-center gap-1 rounded-lg hover:bg-white/10 p-2 transition-colors"
              key={item.id}
              title={item.name}
              onClick={() => onLaunch && onLaunch(item)}
            >
              <Image alt="Win" src={item.src} width={34} height={34} />
              <span className="text-[11px] text-white/80 truncate max-w-[90%]">{item.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

const aplications: AppItem[] = [
  { id: "13", src: "/windowTaskBar.png", name: "Windows" },
  { id: "19", src: "/windowTaskBar.png", name: "Windows" },
  { id: "14", src: "/windowTaskBar.png", name: "Windows" },
  { id: "12", src: "/windowTaskBar.png", name: "Windows" },
  { id: "15", src: "/windowTaskBar.png", name: "Windows" },
  { id: "16", src: "/windowTaskBar.png", name: "Windows" },
  { id: "17", src: "/windowTaskBar.png", name: "Windows" },
  { id: "18", src: "/windowTaskBar.png", name: "Windows" },
  { id: "92", src: "/windowTaskBar.png", name: "Windows" },
  { id: "20", src: "/windowTaskBar.png", name: "Windows" },
  { id: "21", src: "/windowTaskBar.png", name: "Windows" },
  { id: "22", src: "/windowTaskBar.png", name: "Windows" },
  { id: "23", src: "/windowTaskBar.png", name: "Windows" },
  { id: "24", src: "/windowTaskBar.png", name: "Windows" },
];
