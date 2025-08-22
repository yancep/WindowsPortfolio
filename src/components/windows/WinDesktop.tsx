import { useState } from 'react';
import { WinTaskBar } from './WinTaskBar';
import WinSearchModal from './WinSearchModal';
import WinContainer from './WinContainer';
import WinModal from './WinModal';
import WinArrowModal from './WinArrowModal';

export default function WinDesktop() {
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [searchWinModalOpen, setSearchWinModalOpen] = useState(false)
  const [winArrowModalOpen, setWinArrowModalOpen] = useState(false)

  const closeModal = () => setSearchModalOpen(false)
  const closeWinModal = () => setSearchWinModalOpen(false);
  const closeWinArrowModal = () => setWinArrowModalOpen(false);

  return (
    <WinContainer items={[
          { id: "12", src: "/windowTaskBar.png", name: "Windows" },
          { id: "13", src: "/windowTaskBar.png", name: "Windows" },
          { id: "19", src: "/windowTaskBar.png", name: "Windows" },
          { id: "14", src: "/windowTaskBar.png", name: "Windows" },
          { id: "15", src: "/windowTaskBar.png", name: "Windows" },
          { id: "16", src: "/windowTaskBar.png", name: "Windows" },
        ]}>
      <WinSearchModal
        isOpen={searchModalOpen}
        onClose={closeModal}
      />
      <WinModal
        isOpen={searchWinModalOpen}
        onClose={closeWinModal}
        onOpenSearch={() => {setSearchModalOpen(true); setSearchWinModalOpen(false)}}
      />
      <WinArrowModal 
        isOpen={winArrowModalOpen}
        onClose={closeWinArrowModal}
        onOpenSearch={() => {setSearchModalOpen(true); setSearchWinModalOpen(false)}}
      />
      <WinTaskBar 
        openSearch={() => setSearchModalOpen(true)} 
        openWinSearch={() => setSearchWinModalOpen(true)} 
        openWinArrow={() => setWinArrowModalOpen(true)}
      />

    </WinContainer>
  )
}