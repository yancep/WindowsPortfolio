import WinSearchBar from "./WinSearchBar";
import WinTaskBarSystemOptions from "./WinTaskBarSystemOptions";
import Image from "next/image";

export function WinTaskBar({
  openSearch,
  openWinSearch,
  openWinArrow,
  openWinOptions,
}: {
  openSearch: () => void;
  openWinSearch: () => void;
  openWinArrow: () => void;
  openWinOptions: () => void;
}) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 mx-auto flex justify-center items-center
    h-[48px] px-4 border-t border-white/10 max-w-full
    bg-[#1e1e1e]/60 backdrop-blur-2xl shadow-[0_4px_40px_rgba(0,0,0,0.5)]"
    >
      <div
        onClick={() => openWinSearch()}
        className="flex flex-row h-10 items-center hover:bg-white/10 hover:rounded-md w-13 px-1 mr-3"
      >
        <Image alt="Win" src="/windowTaskBar.png" width={32} height={32} />
      </div>
      <WinSearchBar openSearch={openSearch} />
      <WinTaskBarSystemOptions openWinArrow={openWinArrow} openWinOptions={openWinOptions} />
    </div>
  );
}
