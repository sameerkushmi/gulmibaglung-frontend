"use client";

export default function ProductCardSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="bg-white/10 rounded-xl overflow-hidden">
                {/* Image */}
                <div className="h-[320px] bg-white/10"></div>

                {/* Content */}
                <div className="p-4 space-y-3">
                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                    <div className="h-4 bg-white/10 rounded w-1/2"></div>
                    <div className="h-5 bg-white/10 rounded w-1/3"></div>
                </div>
            </div>
        </div>
    );
}