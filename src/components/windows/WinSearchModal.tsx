export default function WinSearchModal({ isOpen, onClose }: { 
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 "
      onClick={onClose} 
    >
      <div 
        className="w-[600px] max-w-[90vw] h-[90%] rounded-2xl p-4 border border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.5)] 
                   bg-[#312f2f] backdrop-blur-2xl text-white select-none"
        onClick={(e) => e.stopPropagation()} 
      >

      </div>
    </div>
  )
}