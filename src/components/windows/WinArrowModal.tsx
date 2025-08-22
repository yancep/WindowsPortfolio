
export default function WinArrowModal({
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
      className="absolute right-40 bottom-14 z-[100] flex flex-row "
      onClick={onClose}
    >
      <div
        className="w-[170px] max-w-[20vw] h-[20%] rounded-2xl p-4 border border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.5)] 
                   bg-[#312f2f] backdrop-blur-2xl text-white select-none flex flex-col justify-center items-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        
      </div>
    </div>
  );
}