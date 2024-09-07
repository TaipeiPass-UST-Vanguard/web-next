
export function InfoBlocks(
    {label, value} : {
        label: string,
        value: React.ReactNode
    }
){
    return (
        <div className="w-full rounded-md bg-white flex flex-col justify-center px-2 py-2 gap-1">
            <span className="text-sky-700 text-left font-bold text-sm">{label}</span>
            <span className="text-black text-left font-bold text-sm">{value}</span>
        </div>
    )
}