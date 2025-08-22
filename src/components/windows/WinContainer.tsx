import { ReactNode } from "react";
import { AppItem } from "./WinSearchModal";
import Image from "next/image";

export default function WinContainer({
  children,
  items = [],
}: {
  children: ReactNode;
  items: AppItem[];
}) {
  return (
    <div className="w-screen h-screen grid grid-rows-8 grid-cols-10 grid-flow-col text-xs back gap-y-20">
      {items.map((item) => {
        return (
          <div
            className="flex flex-col justify-center items-center text-white w-25 h-20 rounded-md hover:bg-white/10 hover:rounded-md "
            key={item.id}
          >
            <Image alt="Win" src={item.src} width={45} height={45} />
            {item.name}
          </div>
        );
      })}
      {children}
    </div>
  );
}
