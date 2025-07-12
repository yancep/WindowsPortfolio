import { ReactNode } from "react";

export default function WinContainer({ children }: { children: ReactNode }) {
  return <div className="w-full h-screen bg-black relative">{children}</div>
}