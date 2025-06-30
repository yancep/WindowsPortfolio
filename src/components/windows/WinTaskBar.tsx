import WinSearchBar from './WinSearchBar'
import WinTaskBarSystemOptions from './WinTaskBarSystemOptions'

export function WinTaskBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 mx-auto flex justify-center items-center
        bg-black/20 backdrop-blur-md shadow-lg h-[48px] px-4 border-t border-gray-800 max-w-full">

            <WinSearchBar />
            <WinTaskBarSystemOptions />
            
        </div>
    )
}

