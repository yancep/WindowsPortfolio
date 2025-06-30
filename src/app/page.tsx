'use client'

import Image from 'next/image'
import {
  Cog6ToothIcon,
  SpeakerWaveIcon,
  WifiIcon,
  Battery100Icon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="w-full h-screen bg-black relative">
      <Image
        alt="Windows 11 Wallpaper"
        src="/whallpaper.jpg"
        fill
        style={{ objectFit: 'cover' }}
      />
      <WinTaskBar />
    </div>
  )
}

export function WinTaskBar() {
  const apps = [
    {
      name: 'Edge',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 48 48">
          <path
            d="M24 4C12.95 4 4 12.95 4 24c0 11.05 8.95 20 20 20 11.05 0 20-8.95 20-20h-8c0 6.627-5.373 12-12 12-6.627 0-12-5.373-12-12s5.373-12 12-12v8l8-8-8-8v6z"
            fill="#0078D4"
          />
        </svg>
      ),
    },
    {
      name: 'Store',
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24">
          <path d="M4 4h16v2H4zM4 8h16v12H4z" fill="#FFFFFF" />
        </svg>
      ),
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto flex justify-between items-center
      bg-black/20 backdrop-blur-md shadow-lg h-[48px] px-4 border-t border-gray-800 max-w-full">

      {/* Pinned Apps */}
      <div className="flex space-x-4">
        {apps.map((app) => (
          <button key={app.name} title={app.name} className="p-2 hover:bg-white/10 rounded-lg">
            {app.icon}
          </button>
        ))}
      </div>
      {/* Search Bar */}
      <div className="flex items-center bg-white/10 px-3 py-1 rounded-full win-search">
        <MagnifyingGlassIcon className="h-4 w-4 text-white mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-white placeholder-white text-sm"
        />
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-3">
        <div className="p-2 hover:bg-white/10 rounded-full">
          <SpeakerWaveIcon className="h-5 w-5 text-white" />
        </div>
        <div className="p-2 hover:bg-white/10 rounded-full">
          <WifiIcon className="h-5 w-5 text-white" />
        </div>
        <div className="p-2 hover:bg-white/10 rounded-full">
          <Battery100Icon className="h-5 w-5 text-white" />
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full">
          <Cog6ToothIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  )
}
