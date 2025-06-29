"use client"
import { ReactNode } from "react";

export default function Component() {
  return (
    <div className="flex min-h-screen w-full bg-[#0f0f0fff]">
      <YoutubeNavBar />
      <YoutubeSideBar />
    </div>
  );
};


export function YoutubeNavBar() {
  return <div className="flex flex-row h-[4rem] w-full bg-[#0f0f0fff] items-center text-white">
    <button className="w-7 h-7 border-r rounded-full items-center justify-center
     hover:bg-gray-500 border-black ml-6">
      <MenuIcon />
    </button>
    <YouTubeLogo>
      <span className="font-roboto text-[20px] tracking-tighter">YouTube</span>
    </YouTubeLogo>

    <div className="flex items-center ml-[80px] font-roboto">
      <input
        type="text"
        className="h-9 rounded-l-full bg-[#121212ff] border border-[#303030ff] pl-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
      />
      <button className="h-9 rounded-r-full bg-[#212121ff] border border-[#303030ff] w-[60px]">
         <YouTubeSearchIcon />
      </button>
    </div>


  </div>
}

export function YouTubeLogo({ children }: { children: ReactNode }) {
  return <div className="flex flex-row ml-4 items-center">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" width="33" height="33">
      <g>
        <path
          fill="#FF0000"
          d="M23.498,6.186c-0.276-1.039-1.089-1.858-2.122-2.136C19.505,3.546,12,3.546,12,3.546s-7.505,0-9.377,0.504   
      C1.591,4.328,0.778,5.146,0.502,6.186C0,8.07,0,12,0,12s0,3.93,0.502,5.814c0.276,1.039,1.089,1.858,2.122,2.136   
      C4.495,20.454,12,20.454,12,20.454s7.505,0,9.377-0.504c1.032-0.278,1.845-1.096,2.122-2.136C24,15.93,24,12,24,12   
      S24,8.07,23.498,6.186z"
        />
        <path
          fill="#FFFFFF"
          d="M9.546,15.569V8.431L15.818,12L9.546,15.569z"
        />
      </g>
    </svg>
    <div className="ml-1 items-center">
      {children}
    </div>
  </div>
}


export function YoutubeSideBar() {
  return <div className="h-full  bg-[#0f0f0fff]"></div>
}

export function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="22"
      viewBox="0 0 24 24"
      width="22"
      focusable="false"
      aria-hidden="true"
      style={{ pointerEvents: "none", display: "inherit", width: "100%", height: "100%" }}
    >
      <path
        fill="white"
        d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"
      />
    </svg>
  );
}

export function YouTubeSearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      focusable="false"
      aria-hidden="true"
      style={{ pointerEvents: "none", display: "inherit", width: "70%", height: "70%" }}
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z"
      />
    </svg>
  );
}
