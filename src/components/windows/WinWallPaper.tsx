import Image from 'next/image'

export default function WinWallPaper() {
    return <Image
        alt="Windows 11 Wallpaper"
        src="/whallpaper.jpg"
        fill
        style={{ objectFit: 'cover' }}
    />
}