import {
    SpeakerWaveIcon,
    WifiIcon,
    ChevronUpIcon,
    BellIcon,
} from '@heroicons/react/24/outline'
import { Battery100Icon } from '@heroicons/react/24/solid'
export default function WinTaskBarSystemOptions() {
    return (
        <div className="absolute flex flex-row items-center space-x-3 right-8">
            <ChevronUpIcon className="h-4 w-4 text-white" />
            <WifiIcon className="h-4 w-4 text-white" />
            <SpeakerWaveIcon className="h-4 w-4 text-white" />
            <div className="flex items-center">
                <Battery100Icon className="h-4 w-5 text-white" />
            </div>

            <WinTaskBarTime />
            <div>
                <BellIcon width={25} height={25} color='white' />
            </div>
        </div>
    );
}

export function WinTaskBarTime() {
    const time = new Date();

    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    // Fecha
    const day = time.getDate().toString().padStart(2, '0');
    const month = (time.getMonth() + 1).toString().padStart(2, '0');
    const year = time.getFullYear();

    return (
        <div style={{
            display: "flex",
            flexDirection:
                "column",
            color: "white",
            justifyContent: "right",
            textAlign: "right",
            lineHeight: "1"
        }}>
            <span>{hours}:{minutes} {ampm}</span>
            <span>{day}/{month}/{year}</span>
        </div>
    );
}
