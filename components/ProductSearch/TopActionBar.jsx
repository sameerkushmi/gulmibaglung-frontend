import { FaFilter } from "react-icons/fa"

const TopActionBar = ({ sort, setSort, setDrawerOpen, products }) => {
    return (
        <div
            className="
      sticky top-0 z-30
      lg:static
      bg-[#0d2b45]/95 backdrop-blur-md
      flex justify-between items-center
      border-b border-white/10
      py-4 mb-8
      lg:mb-6 lg:py-0
    "
        >

            {/* Desktop Sort */}
            <div className="hidden lg:flex items-center gap-4">
                <span className="text-xs text-gray-400 uppercase tracking-[2px]">
                    Sort By
                </span>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-transparent text-[#d4af37] text-sm focus:outline-none cursor-pointer"
                >
                    <option value="newest">New Arrivals</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                </select>
            </div>

            {/* Mobile Filter Button */}
            <button
                onClick={() => setDrawerOpen(true)}
                className="
        lg:hidden
        flex items-center gap-2
        bg-[#d4af37] text-[#0d2b45]
        px-5 py-2.5
        rounded-full
        font-bold
        uppercase
        text-[10px]
        tracking-[2px]
        hover:brightness-110
        transition
        "
            >
                <FaFilter />
                Filters
            </button>

            {/* Results Count */}
            <p className="text-xs md:text-sm text-gray-400 italic">
                Showing {products.length} exquisite pieces
            </p>

        </div>
    )
}

export default TopActionBar