import Image from "next/image";
import { AppItem } from "./WinSearchModal";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";

export default function WinModal({
  isOpen,
  onClose,
  onOpenSearch,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 "
      onClick={onClose}
    >
      <div
        className="w-[600px] max-w-[90vw] h-[90%] rounded-2xl p-4 border border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.5)] 
                   bg-[#312f2f] backdrop-blur-2xl text-white select-none flex flex-col justify-center items-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-7 absolute top-6 px-6">
          <div className="flex items-center bg-white/10 rounded-full win-search2">
            <MagnifyingGlassIcon className="h-4 w-4 text-white mr-2" />
            <input
              type="text"
              placeholder="Search for apps, settings, and documents"
              autoComplete="off"
              onClick={() => console.log()}
              onChange={() => onOpenSearch()}
              className="bg-transparent outline-none text-white placeholder-white text-sm"
            />
          </div>
        </div>
        <SearchModalListApps appItems={aplications}></SearchModalListApps>
        <UserAndOffSection></UserAndOffSection>
      </div>
    </div>
  );
}

const UserAndOffSection = () => {
  return (
    <section className="absolute bottom-0 w-full h-14 bg-black/35 flex flex-row justify-between px-14 items-center">
      <div className="h-8 w-8 rounded-full bg-white flex flex-col items-center justify-center">
        <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
        <div className="w-5 h-3 bg-gray-400 rounded-md"></div>
      </div>
      <div className="flex justify-center">
        <div className="h-5 w-5 rounded-full bg-black/35  items-center justify-center border-2 border-white"></div>
        <div className="h-3 w-2 z-50 bg-black flex justify-center text-white absolute top-3">
          l
        </div>
      </div>
    </section>
  );
};

const SearchModalListApps = ({ appItems }: { appItems: AppItem[] }) => {
  return (
    <section className="w-[90%] h-[60%] transform -translate-y-7">
      <div className="flex flex-row justify-between px-4">
        <h2 className="p-2">Pinned</h2>
        <button
          onClick={() => open}
          title="All apps"
          className="bg-black/20 p-2 rounded-md flex flex-row items-center"
        >
          All apps <ChevronRightIcon height={18} width={18}></ChevronRightIcon>
        </button>
      </div>
      <div className="w-full h-full gap-1 grid grid-cols-6 grid-rows-3">
        {appItems.map((item) => {
          return (
            <div
              className="flex flex-col justify-center items-center"
              key={item.id}
            >
              <Image alt="Win" src={item.src} width={35} height={35} />
              {item.name}
            </div>
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
