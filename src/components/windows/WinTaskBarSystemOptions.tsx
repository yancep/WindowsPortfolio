import {
    SpeakerWaveIcon,
    WifiIcon,
    Battery100Icon,
    ChevronUpIcon,
    BellIcon
} from '@heroicons/react/24/outline'

export default function WinTaskBarSystemOptions() {
    return <div className="absolute flex flex-row items-center space-x-3 right-8">
        <ChevronUpIcon className="h-5 w-5 text-white"/>
        <WifiIcon className="h-5 w-5 text-white" />
        <SpeakerWaveIcon className="h-5 w-5 text-white" />
        <Battery100Icon className="h-5 w-5 text-white" />
        <WinTaskBarTime />
        <div>
            <BellIcon width={25} height={25} color='white'/>
        </div>
    </div>
}

export function WinTaskBarTime() {
    const time = new Date();

    return <div style={{ display: "flex", flexDirection: "column", color: "white", justifyContent: "center", lineHeight: "1" }}>
        <span>{time.getHours()}:{time.getMinutes()}</span>
        <span>{time.getDay()}/{time.getMonth()}/{time.getFullYear()}</span>
    </div>
}

