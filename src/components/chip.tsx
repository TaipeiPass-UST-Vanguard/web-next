
export function LabelChip({label}: {label?: string}) {
    return (
        <div className="rounded-full border px-2 py-[2px] text-sm border-cyan-900"> # {
            label ?? ""
          }</div>
    )
}