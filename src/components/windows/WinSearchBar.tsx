import {
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

export default function WinSearchBar() {
    return <div className="flex items-center bg-white/10 px-3 py-1 rounded-full win-search">
        <MagnifyingGlassIcon className="h-4 w-4 text-white mr-2" />
        <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-white placeholder-white text-sm"
        />
    </div>
}