import { useState } from 'react'
import { WinTaskBar } from './WinTaskBar'
import WinWallPaper from './WinWallPaper'
import WinSearchModal from './WinSearchModal'
import WinContainer from './WinCOntainet'

export default function WinDesktop() {
  const [searchModalOpen, setSearchModalOpen] = useState(false)

  const closeModal = () => setSearchModalOpen(false)

  return (
    <WinContainer>
      <WinSearchModal
        isOpen={searchModalOpen}
        onClose={closeModal}
      />
      <WinWallPaper />
      <WinTaskBar openSearch={() => setSearchModalOpen(true)} />
    </WinContainer>
  )
}