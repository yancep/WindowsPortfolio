import WinSearchBar from './WinSearchBar'
import WinTaskBarSystemOptions from './WinTaskBarSystemOptions'
import Image from 'next/image'
export function WinTaskBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 mx-auto flex justify-center items-center
        bg-black/20 backdrop-blur-md shadow-lg h-[48px] px-4 border-t border-gray-800 max-w-full">
            <Image
                alt="Win"
                src="/windowTaskBar.png"
                width={32}
                height={32}
                className='mr-3'
            />
            <WinSearchBar />
            <WinTaskBarSystemOptions />

        </div>
    )
}

