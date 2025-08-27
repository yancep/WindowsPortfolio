import { AppItem } from "./WinSearchModal";
import Image from "next/image";
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
  
  return (
    <div
      className="absolute right-40 bottom-14 z-[100] flex flex-row "
      onClick={onClose}
    >
      <div
        className="w-[200px] max-w-[20vw] h-[90%] rounded-md border border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.5)] 
                   bg-[#312f2f] backdrop-blur-2xl text-white select-none grid grid-cols-5 grid-rows-2 p-1"
        onClick={(e) => e.stopPropagation()}
      >
        {appItems.map((item) => {
          return (
            <div
              className="flex flex-row gap-2 h-10 items-center hover:bg-white/10 hover:rounded-md w-13 px-2"
              key={item.id}
            >
              <Image alt="Win" src={item.src} width={18} height={18} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
