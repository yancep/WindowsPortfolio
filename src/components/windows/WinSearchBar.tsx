import {
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

export default function WinSearchBar({openSearch} : {openSearch : () => void}) {
    return <div className="flex items-center bg-white/10 rounded-full win-search">
        <MagnifyingGlassIcon className="h-4 w-4 text-white mr-2" />
        <input
            type="text"
            placeholder="Search"
            autoComplete='off'
            onClick={() => openSearch()}
            onChange={() => openSearch()}
            className="bg-transparent outline-none text-white placeholder-white text-sm"
        />
    </div>
}