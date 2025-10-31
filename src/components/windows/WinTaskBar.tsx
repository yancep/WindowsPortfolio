"use client";

import { useState } from "react";
import WinSearchBar from "./WinSearchBar";
import WinTaskBarSystemOptions from "./WinTaskBarSystemOptions";
import Image from "next/image";
import FileExplorer from "./FileExplorer";
import { useWindowStore } from "./WindowStore";

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
  const [fileExplorerOpen, setFileExplorerOpen] = useState(false);
  const windowStore = (() => { try { return useWindowStore(); } catch { return null; } })();

  return (
    <>
      {/* File Explorer Modal */}
      {fileExplorerOpen && (
        <FileExplorer onClose={() => setFileExplorerOpen(false)} />
      )}

      <div
        className="fixed bottom-0 left-0 right-0 mx-auto flex justify-center items-center
        h-[48px] px-4 border-t border-white/10 max-w-full
        bg-[#1e1e1e]/60 backdrop-blur-2xl shadow-[0_4px_40px_rgba(0,0,0,0.5)]"
      >
        <div
          onClick={openWinSearch}
          className="flex flex-row h-10 items-center hover:bg-white/10 hover:rounded-md w-13 px-1 mr-3 cursor-pointer"
        >
          <Image alt="Win" src="/windowTaskBar.png" width={32} height={32} />
        </div>
        <WinSearchBar openSearch={openSearch} />

        <div
          onClick={() => setFileExplorerOpen(true)}
          className="flex flex-row h-10 items-center hover:bg-white/10 hover:rounded-md w-13 px-1 ml-1 mr-1.5 cursor-pointer"
        >
          <Image alt="File Explorer" src="/FileExplorer.png" width={32} height={32} />
        </div>

        {(() => {
          const running = windowStore?.getFirstByType('browser');
          const minimized = running?.minimized;
          return (
            <div
              onClick={() => {
                const win = windowStore?.getFirstByType('browser');
                if (!win) {
                  windowStore?.openWindow('browser', { title: 'Microsoft Edge' });
                } else if (win.minimized) {
                  // restore
                  windowStore?.focusWindow(win.id);
                  // un-minimize by setting minimized false
                  // simulate by re-opening focus (we'll update store to support restore later)
                  (windowStore as any).minimizeWindow && windowStore?.minimizeWindow(win.id); // toggling is handled in BrowserWindow minimize button
                } else {
                  windowStore?.minimizeWindow(win.id);
                }
              }}
              className="relative flex flex-row h-10 items-center hover:bg-white/10 hover:rounded-md w-13 px-1 mr-3 cursor-pointer"
            >
              <Image alt="Edge" src="/edge.ico" width={30} height={30} />
              {running && (
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-5 rounded-full ${minimized ? 'bg-white/30' : 'bg-white'}`} />
              )}
            </div>
          );
        })()}

        <WinTaskBarSystemOptions
          openWinArrow={openWinArrow}
          openWinOptions={openWinOptions}
        />
      </div>
    </>
  );
}