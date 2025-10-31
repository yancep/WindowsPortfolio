import { ReactNode, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useWindowStore } from "./WindowStore";
export default function WinSearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const store = (() => { try { return useWindowStore(); } catch { return null; } })();
  const mockApps: AppItem[] = useMemo(() => ([
    { id: "1", src: "/FileExplorer.png", name: "File Explorer" },
    { id: "2", src: "/edge.ico", name: "Microsoft Edge" },
    { id: "3", src: "/windowTaskBar.png", name: "Settings" },
    { id: "4", src: "/windowTaskBar.png", name: "Photos" },
  ]), []);
  const mockDocs: AppItem[] = useMemo(() => ([
    { id: "d1", src: "/windowTaskBar.png", name: "Resume_2025.pdf" },
    { id: "d2", src: "/windowTaskBar.png", name: "Budget_Q4_2025.xlsx" },
    { id: "d3", src: "/windowTaskBar.png", name: "Meeting Notes.txt" },
  ]), []);

  const filteredApps = useMemo(() => mockApps.filter(a => a.name.toLowerCase().includes(query.toLowerCase())), [mockApps, query]);
  const filteredDocs = useMemo(() => mockDocs.filter(a => a.name.toLowerCase().includes(query.toLowerCase())), [mockDocs, query]);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
        className="relative pointer-events-auto w-[980px] max-w-[96vw] h-[72%] rounded-2xl border border-white/15 shadow-[0_20px_80px_rgba(0,0,0,0.55)] 
                   bg-[#1f2022]/80 backdrop-blur-2xl text-white select-none flex flex-col overflow-hidden"
      >
        <div className="p-3 border-b border-white/10">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search apps, documents and web"
            className="w-full h-10 px-4 rounded-full bg-white/10 border border-white/10 outline-none placeholder-white/70"
          />
        </div>
        <div className="flex-1 flex flex-row min-h-0 overflow-hidden">
        <SearchModalListApps
          appItems={[
            { id: "13", src: "/windowTaskBar.png", name: "Windows" },
            { id: "19", src: "/windowTaskBar.png", name: "Windows" },
            { id: "14", src: "/windowTaskBar.png", name: "Windows" },
            { id: "12", src: "/windowTaskBar.png", name: "Windows" },
            { id: "15", src: "/windowTaskBar.png", name: "Windows" },
            { id: "16", src: "/windowTaskBar.png", name: "Windows" },
          ]}
        ></SearchModalListApps>
        <RightSearchModalContent>
          <SearchResults title="Apps" items={filteredApps} onLaunch={(app) => store?.openWindow('browser', { title: app.name })} />
          <div className="h-2" />
          <SearchResults title="Documents" items={filteredDocs} onLaunch={(doc) => store?.openWindow('browser', { title: doc.name })} />
        </RightSearchModalContent>
        </div>
      </div>
    </div>
  );
}

const RightSearchModalContent = ({ children }: { children?: ReactNode }) => {
  return (
    <section className="w-full h-full relative p-4 overflow-auto">
      <div className="absolute top-4 right-4">
        <div className="flex flex-row gap-3 items-center">
          <span className="h-6 w-6 rounded-full bg-white/20 grid place-items-center text-[11px]">E</span>
          <div className="h-6 px-2 rounded bg-white/10 grid place-items-center">...</div>
          <Image alt="Win" src={"/windowTaskBar.png"} width={22} height={22} />
        </div>
      </div>
      <div className="mb-3">
        <h2 className="text-white/90">Quick searches</h2>
      </div>
      <GrayCard>
        <Chip>Documents</Chip>
        <Chip>Images</Chip>
        <Chip>Settings</Chip>
        <Chip>Apps</Chip>
        <Chip>Web</Chip>
        <Chip>Folders</Chip>
        <Chip>Videos</Chip>
      </GrayCard>
      <TopApps
        topApps={[
          { id: "12", src: "/windowTaskBar.png", name: "Windows" },
          { id: "13", src: "/windowTaskBar.png", name: "Windows" },
          { id: "19", src: "/windowTaskBar.png", name: "Windows" },
          { id: "14", src: "/windowTaskBar.png", name: "Windows" },
          { id: "15", src: "/windowTaskBar.png", name: "Windows" },
          { id: "16", src: "/windowTaskBar.png", name: "Windows" },
        ]}
      ></TopApps>
      {children}
    </section>
  );
};

const SearchModalListApps = ({ appItems }: { appItems: AppItem[] }) => {
  return (
    <section className="w-[42%] h-full border-r border-white/10 p-4 overflow-auto">
      <h2 className="text-white/90 mb-2">Recent</h2>
      <div className="space-y-1">
        {appItems.map((item) => {
          return (
            <button className="w-full flex flex-row gap-3 items-center py-2 px-2 rounded hover:bg-white/10 text-left" key={item.id}>
              <Image alt="Win" src={item.src} width={24} height={24} />
              <span className="text-sm text-white/90">{item.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

function SearchResults({ title, items, onLaunch }: { title: string; items: AppItem[]; onLaunch?: (item: AppItem) => void }) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="text-white/90 mb-1 text-sm">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {items.map((it) => (
          <button key={it.id} className="flex items-center gap-2 px-2 py-2 rounded hover:bg-white/10 text-left" onClick={() => onLaunch && onLaunch(it)}>
            <Image alt={it.name} src={it.src} width={22} height={22} />
            <span className="text-sm">{it.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export interface AppItem {
  id: string;
  src: string;
  name: string;
}

const GrayCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white/10 border border-white/10 w-full h-32 rounded-md overflow-clip">
      <div className="p-3 w-full h-full flex gap-3 flex-row flex-wrap">{children}</div>
    </div>
  );
};

const TopApps = ({ topApps }: { topApps: AppItem[] }) => {
  return (
    <div>
      <h2 className="mt-4 text-white/90">Top apps</h2>

      <div className="grid grid-cols-3 grid-rows-2 w-full gap-2 justify-center mt-3">
        {topApps.map((item) => (
          <button
            className="flex flex-col justify-center items-center bg-white/10 border border-white/10 hover:bg-white/15 w-30 h-20 rounded-md p-2"
            key={item.id}
            title={item.name}
          >
            <Image alt="Win" src={item.src} width={40} height={40} />
            <span className="text-xs text-white/85 mt-1">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const Chip = ({ children }: { children: string }) => {
  return (
    <div className="h-7 px-3 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs">
      {children}
    </div>
  );
};
