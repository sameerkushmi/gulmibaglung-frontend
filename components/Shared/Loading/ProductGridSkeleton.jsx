"use client";

import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGridSkeleton({}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
            {Array.from({ length: 9 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}