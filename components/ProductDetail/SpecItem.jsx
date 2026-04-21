function SpecItem({ icon, label, value }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gold-400 border border-white/10">
                {icon}
            </div>
            <div>
                <p className="text-[10px] uppercase text-white/40 tracking-tighter">
                    {label}
                </p>
                <p className="text-sm font-medium text-white/90">{value || "N/A"}</p>
            </div>
        </div>
    );
}

export default SpecItem;