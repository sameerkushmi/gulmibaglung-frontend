function MapSection() {
    return (
        <div className="md:col-span-2">
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl">

                {/* Gold border effect */}
                <div className="absolute inset-0 border border-[#d4af37]/40 rounded-3xl pointer-events-none" />

                <iframe
                    src={process.env.NEXT_PUBLIC_MAP_URL}
                    width="100%"
                    height="450"
                    loading="lazy"
                    className="w-full h-[450px] border-0"
                />
            </div>
        </div>
    );
}

export default MapSection