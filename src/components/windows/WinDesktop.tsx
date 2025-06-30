import { WinTaskBar } from './WinTaskBar'
import WinWallPaper from './WinWallPaper'

export default function WinDesktop() {
  return (
    <div className="w-full h-screen bg-black relative">
      <WinWallPaper />
      <WinTaskBar />
    </div>
  )
}