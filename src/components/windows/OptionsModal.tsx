import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
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

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 w-[300px] h-[400px] z-[100] 
                  transition-all duration-200 ease-out
                  ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      onClick={onClose}
    >
      <div
        className="w-full h-full rounded-md border border-white/10 
                   shadow-[0_4px_20px_rgba(0,0,0,0.4)] bg-[#2d2d2d] 
                   backdrop-blur-md text-white select-none flex flex-col
                   px-4 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior estilo Windows */}
        <div className="flex items-center justify-between h-7 border-b border-white/10 mb-3">
          <span className="text-sm font-semibold">Opciones</span>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            ✖
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 flex flex-col justify-center items-center gap-4">
          <MagnifyingGlassIcon
            className="w-8 h-8 text-white cursor-pointer hover:text-blue-400 transition-colors"
            onClick={onOpenSearch}
          />
          <span className="text-sm text-white/70">Buscar</span>
        </div>
      </div>
    </div>
  );
}
