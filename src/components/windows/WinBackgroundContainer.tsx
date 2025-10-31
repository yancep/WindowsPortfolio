
export function WinBackgroundContainer (){
    return (
        <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 back" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.25),transparent_60%)]" />
        </div>
    )
}