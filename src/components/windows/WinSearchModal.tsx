import { ReactNode } from "react";
import Image from "next/image";
export default function WinSearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 "
      onClick={onClose}
    >
      <div
        className="w-[600px] max-w-[90vw] h-[90%] rounded-2xl p-4 border border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.5)] 
                   bg-[#312f2f] backdrop-blur-2xl text-white select-none flex flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <SearchModalListApps
          appItems={[
            { id: "13", src: "/windowTaskBar.png", name: "Windows" },
            { id: "19", src: "/windowTaskBar.png", name: "Windows" },
            { id: "14", src: "/windowTaskBar.png", name: "Windows" },
            { id: "12", src: "/windowTaskBar.png", name: "Windows" },
            { id: "15", src: "/windowTaskBar.png", name: "Windows" },
            { id: "16", src: "/windowTaskBar.png", name: "Windows" },
          ]}
        ></SearchModalListApps>
        <RightSearchModalContent></RightSearchModalContent>
      </div>
    </div>
  );
}

const RightSearchModalContent = () => {
  return (
    <section className="w-full h-full">
      <div className="absolute right-10 ">
        <div className="flex flex-row gap-3">
          <span className="h-5 w-5 rounded-full bg-[#434141f8] items-center justify-center">
            E
          </span>
          <div className="h2 w-2 justify-center items-center">...</div>
          <Image alt="Win" src={"/windowTaskBar.png"} width={25} height={25} />
        </div>
      </div>
      <div className="mb-3">
        <h2>Quick searches</h2>
      </div>
      <GrayCard>
        <Chip children="lol" />
        <Chip children="lol" />
        <Chip children="lol" />
        <Chip children="lol" />
        <Chip children="lol" />
        <Chip children="lol" />
        <Chip children="lol" />
        
       
      </GrayCard>
      <TopApps
        topApps={[
          { id: "12", src: "/windowTaskBar.png", name: "Windows" },
          { id: "13", src: "/windowTaskBar.png", name: "Windows" },
          { id: "19", src: "/windowTaskBar.png", name: "Windows" },
          { id: "14", src: "/windowTaskBar.png", name: "Windows" },
          { id: "15", src: "/windowTaskBar.png", name: "Windows" },
          { id: "16", src: "/windowTaskBar.png", name: "Windows" },
        ]}
      ></TopApps>
    </section>
  );
};

const SearchModalListApps = ({ appItems }: { appItems: AppItem[] }) => {
  return (
    <section className="w-[45%] h-full">
      <h2>Recent</h2>
      {appItems.map((item) => {
        return (
          <div className="flex flex-row gap-2 items-center py-2" key={item.id}>
            <Image alt="Win" src={item.src} width={25} height={25} />
            {item.name}
          </div>
        );
      })}
    </section>
  );
};

export interface AppItem {
  id: string;
  src: string;
  name: string;
}

const GrayCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#434141f8] w-full h-32 rounded-md overflow-clip">
      <div className="p-4 w-full h-full flex gap-3 flex-row">{children}</div>
    </div>
  );
};

const TopApps = ({ topApps }: { topApps: AppItem[] }) => {
  return (
    <div>
      <h2>Top apps</h2>

      <div className="grid grid-cols-3 grid-rows-2 w-full gap-2 justify-center mt-4">
        {topApps.map((item) => (
          <div
            className="flex flex-col justify-center items-center bg-[#434141f8] w-30 h-20 rounded-md"
            key={item.id}
          >
            <Image alt="Win" src={item.src} width={45} height={45} />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

const Chip = ({ children }: { children: string }) => {
  return (
    <div className="h-6 w-10 flex items-center justify-center rounded-lg bg-[#5d5a5af8] text-white">
      {children}
    </div>
  );
};
