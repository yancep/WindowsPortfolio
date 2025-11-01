import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { BoltIcon, MoonIcon, WifiIcon } from "@heroicons/react/24/outline";
import { SpeakerWaveIcon, SunIcon, PaperAirplaneIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function OptionsModal({
  isOpen,
  onClose,
  onOpenSearch,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [wifiOn, setWifiOn] = useState(true);
  const [airplaneOn, setAirplaneOn] = useState(false);
  const [nightOn, setNightOn] = useState(false);
  const [batterySaverOn, setBatterySaverOn] = useState(false);
  const [volume, setVolume] = useState(60);
  const [brightness, setBrightness] = useState(70);
  const [showWifiPanel, setShowWifiPanel] = useState(false);
  const [networks] = useState<WifiNetwork[]>([
    { ssid: 'Home-5G', strength: 4, secure: true, connected: true },
    { ssid: 'Office', strength: 3, secure: true, connected: false },
    { ssid: 'Cafe_WiFi', strength: 2, secure: false, connected: false },
    { ssid: 'MiFi-1234', strength: 1, secure: true, connected: false },
  ]);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!visible && !isOpen) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 w-[360px] h-[420px] z-[100] 
                  transition-all duration-200 ease-out origin-bottom-right
                  ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"}`}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full h-full rounded-2xl border border-white/15 
                   shadow-[0_16px_60px_rgba(0,0,0,0.45)] bg-[#1f2022]/85 
                   backdrop-blur-2xl text-white select-none flex flex-col
                   px-3 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior estilo Windows */}
        <div className="flex items-center justify-between h-8 border-b border-white/10 mb-3 px-1">
          <span className="text-sm font-semibold">Quick settings</span>
          <div className="flex items-center gap-1">
            <button
              className="h-8 w-8 grid place-items-center rounded-md text-white/80 hover:bg-white/10"
              aria-label="Edit quick settings"
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="h-8 w-8 grid place-items-center rounded-md text-white/80 hover:bg-white/10"
              aria-label="Close"
            >
              ✖
            </button>
          </div>
        </div>

        {/* Quick toggles */}
        <div className="grid grid-cols-3 gap-2 px-1">
          <ToggleTile active={wifiOn} onClick={() => { setWifiOn(!wifiOn); setShowWifiPanel(true); }} label="Wi‑Fi">
            <WifiIcon className="w-5 h-5" />
          </ToggleTile>
          <ToggleTile active={airplaneOn} onClick={() => setAirplaneOn(!airplaneOn)} label="Airplane mode">
            <PaperAirplaneIcon className="w-5 h-5" />
          </ToggleTile>
          <ToggleTile active={nightOn} onClick={() => setNightOn(!nightOn)} label="Night light">
            <MoonIcon className="w-5 h-5" />
          </ToggleTile>
          <ToggleTile active={batterySaverOn} onClick={() => setBatterySaverOn(!batterySaverOn)} label="Battery saver">
            <BoltIcon className="w-5 h-5" />
          </ToggleTile>
          <ToggleTile active={false} onClick={() => {}} label="Focus">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </ToggleTile>
          <ToggleTile active={false} onClick={() => {}} label="Cast">
            <SunIcon className="w-5 h-5" />
          </ToggleTile>
        </div>

        {/* Wi‑Fi panel */}
        {showWifiPanel && wifiOn && (
          <div className="mt-3 mx-1 rounded-xl border border-white/15 bg-white/5">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
              <span className="text-sm text-white/85">Available networks</span>
              <button className="text-xs text-white/70 hover:text-white" onClick={() => setShowWifiPanel(false)}>Hide</button>
            </div>
            <div className="max-h-40 overflow-auto py-1">
              {networks.map((n) => (
                <WifiRow key={n.ssid} network={n} />
              ))}
            </div>
          </div>
        )}

        {/* Sliders */}
        <div className="mt-4 space-y-3 px-1">
          <SliderRow icon={<SunIcon className="w-5 h-5" />} value={brightness} setValue={setBrightness} label="Brightness" />
          <SliderRow icon={<SpeakerWaveIcon className="w-5 h-5" />} value={volume} setValue={setVolume} label="Volume" />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between px-1">
          <button
            onClick={onOpenSearch}
            className="h-8 px-3 rounded-md bg-white/10 hover:bg-white/15 text-sm border border-white/10"
          >
            Open settings
          </button>
          <div className="text-xs text-white/70">Battery 87%</div>
        </div>
      </div>
    </div>
  );
}

function ToggleTile({ active, onClick, label, children }: { active: boolean; onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`h-16 rounded-xl border px-3 py-2 text-left flex flex-col justify-between transition-colors ${
        active ? "bg-white/15 border-white/20" : "bg-white/5 hover:bg-white/10 border-white/10"
      }`}
    >
      <div className="text-white/90">{children}</div>
      <span className="text-[11px] text-white/80">{label}</span>
    </button>
  );
}

function SliderRow({ icon, value, setValue, label }: { icon: React.ReactNode; value: number; setValue: (v: number) => void; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-md bg-white/10 grid place-items-center">{icon}</div>
      <input
        aria-label={label}
        className="flex-1 appearance-none h-1.5 rounded bg-white/10 accent-white"
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <span className="w-10 text-right text-xs text-white/70">{value}%</span>
    </div>
  );
}

type WifiNetwork = { ssid: string; strength: 0|1|2|3|4; secure: boolean; connected?: boolean };

function WifiRow({ network }: { network: WifiNetwork }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 hover:bg-white/10">
      <div className="flex items-center gap-3">
        <SignalBars level={network.strength} />
        <div className="flex flex-col leading-tight">
          <span className="text-sm">{network.ssid}</span>
          <span className="text-[11px] text-white/70">{network.connected ? 'Connected, secured' : network.secure ? 'Secured' : 'Open'}</span>
        </div>
      </div>
      <button className="h-8 px-3 rounded-md bg-white/10 hover:bg-white/15 text-sm border border-white/10">
        {network.connected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}

function SignalBars({ level }: { level: 0|1|2|3|4 }) {
  const bars = [0,1,2,3].map((i) => (
    <div key={i} className={`w-1.5 rounded-sm ${i===0?'h-1.5':i===1?'h-2.5':i===2?'h-3.5':'h-5'} ${i <= level-1 ? 'bg-white' : 'bg-white/30'}`} />
  ));
  return <div className="flex items-end gap-0.5">{bars}</div>;
}
