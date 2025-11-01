"use client";

import { useEffect, useRef, useState } from "react";
import { XMarkIcon, MinusIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useWindowStore } from "./WindowStore";

export default function BrowserWindow({ id, isOpen, onClose }: { id?: string; isOpen: boolean; onClose?: () => void }) {
  const [url, setUrl] = useState<string>("https://example.com");
  const [history, setHistory] = useState<string[]>(["https://example.com"]);
  const [index, setIndex] = useState<number>(0);
  const [isMaximized, setIsMaximized] = useState(false);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const store = (() => { try { return useWindowStore(); } catch { return null; } })();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose && onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[90] pointer-events-none">
      <div
        className={`fixed pointer-events-auto left-10 top-10 ${isMaximized ? 'w-[calc(100%-20px)] h-[calc(100%-20px)] left-2 top-2' : 'w-[900px] h-[620px]'} rounded-xl border border-white/15 bg-[#1f2022]/85 backdrop-blur-2xl text-white shadow-[0_20px_80px_rgba(0,0,0,0.55)] overflow-hidden`}
        onMouseDown={() => { if (store && id) store.focusWindow(id); }}
      >
        <div className="h-10 flex items-center justify-between border-b border-white/10 px-2">
          <div className="flex items-center gap-2">
            <button
              disabled={index <= 0}
              onClick={() => {
                if (index > 0) {
                  const ni = index - 1;
                  setIndex(ni);
                  setUrl(history[ni]);
                }
              }}
              className="h-8 px-2 rounded-md hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent"
            >
              ←
            </button>
            <button
              disabled={index >= history.length - 1}
              onClick={() => {
                if (index < history.length - 1) {
                  const ni = index + 1;
                  setIndex(ni);
                  setUrl(history[ni]);
                }
              }}
              className="h-8 px-2 rounded-md hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent"
            >
              →
            </button>
            <button title="Minimize" onClick={() => store && id ? store.minimizeWindow(id) : null} className="h-8 w-8 grid place-items-center rounded-md hover:bg-white/10"><MinusIcon className="w-4 h-4" /></button>
            <button title="Maximize" onClick={() => setIsMaximized(!isMaximized)} className="h-8 w-8 grid place-items-center rounded-md hover:bg-white/10"><Squares2X2Icon className="w-4 h-4" /></button>
            <button title="Close" onClick={() => { if (store && id) store.closeWindow(id); else onClose && onClose(); }} className="h-8 w-8 grid place-items-center rounded-md hover:bg-white/10"><XMarkIcon className="w-4 h-4" /></button>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); const next = (e.target as any).url.value; setUrl(next); setHistory(prev => [...prev.slice(0, index+1), next]); setIndex(i => i + 1); }}
            className="flex-1 flex items-center gap-2 px-2"
          >
            <input title="URL" name="url" defaultValue={url} className="flex-1 h-8 px-3 rounded-full bg-white/10 border border-white/10 outline-none" />
            <button className="h-8 px-3 rounded-md bg-white/10 hover:bg-white/15 border border-white/10 text-sm">Go</button>
          </form>
        </div>
        <iframe ref={frameRef} src={url} className="w-full h-[calc(100%-40px)] bg-white" />
      </div>
    </div>
  );
}


