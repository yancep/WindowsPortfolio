"use client";

import React, { useState } from "react";
import { WinTaskBar } from "./WinTaskBar";
import WinSearchModal from "./WinSearchModal";
import WinContainer from "./WinContainer";
import WinModal from "./WinModal";
import WinArrowModal from "./WinArrowModal";
import OptionsModal from "./OptionsModal";

export default function WinDesktop() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchWinModalOpen, setSearchWinModalOpen] = useState(false);
  const [winArrowModalOpen, setWinArrowModalOpen] = useState(false);
  const { isOpen: isOpenOptions, onClose: onCloseOptions, onOpen: onOpenOptions } = useModal();

  const closeModal = () => setSearchModalOpen(false);
  const closeWinModal = () => setSearchWinModalOpen(false);
  const closeWinArrowModal = () => setWinArrowModalOpen(false);

  return (
    <WinContainer
      items={[
        { id: "16", src: "/recycle.png", name: "Windows" },
      ]}
    >
      <div className="relative z-40 pointer-events-auto">
        <WinSearchModal isOpen={searchModalOpen} onClose={closeModal} />

        <WinModal
          isOpen={searchWinModalOpen}
          onClose={closeWinModal}
          onOpenSearch={() => {
            setSearchModalOpen(true);
            setSearchWinModalOpen(false);
            setWinArrowModalOpen(false);
          }}
        />

        <OptionsModal
          isOpen={isOpenOptions}
          onClose={onCloseOptions}
          onOpenSearch={() => {
            setSearchModalOpen(true);
            setSearchWinModalOpen(false);
            setWinArrowModalOpen(false);
          }}
        />

        <WinArrowModal
          appItems={[
            { id: "13", src: "/windowTaskBar.png", name: "Windows" },
            { id: "19", src: "/windowTaskBar.png", name: "Windows" },
            { id: "14", src: "/windowTaskBar.png", name: "Windows" },
            { id: "12", src: "/windowTaskBar.png", name: "Windows" },
            { id: "15", src: "/windowTaskBar.png", name: "Windows" },
            { id: "16", src: "/windowTaskBar.png", name: "Windows" },
          ]}
          isOpen={winArrowModalOpen}
          onClose={closeWinArrowModal}
          onOpenSearch={() => {
            setSearchModalOpen(true);
            setSearchWinModalOpen(false);
            setWinArrowModalOpen(false);
          }}
        />
      </div>

      <div className="relative z-50 pointer-events-auto">
        <WinTaskBar
          openSearch={() => setSearchModalOpen(true)}
          openWinSearch={() => setSearchWinModalOpen(true)}
          openWinArrow={() => setWinArrowModalOpen(true)}
          openWinOptions={() => onOpenOptions()}
        />
      </div>
    </WinContainer>
  );
}

/* hook simple usado arriba */
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return { isOpen, onClose, onOpen };
};
