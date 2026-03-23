"use client";

import { useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SidebarFilter = ({
  drawerOpen,
  setDrawerOpen,
  searchQuery,
  setSearchQuery,
  categories,
  toggleCategory,
  selectedCategories,
  materials,
  toggleMaterial,
  selectedMaterials,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  fetchProducts,
}) => {
  const sidebarRef = useRef();

  const clearFilters = () => {
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
  };

  /* ================= CLICK OUTSIDE CLOSE ================= */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [drawerOpen]);

  /* ================= LOCK BODY SCROLL ================= */

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [drawerOpen]);

  return (
    <>
      {/* BACKDROP */}

      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-90 transition-opacity duration-300 lg:hidden
        ${drawerOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* SIDEBAR */}

      <aside
        ref={sidebarRef}
        className={`
        fixed inset-y-0 left-0 z-100 w-[85%] max-w-[320px] bg-[#0a1929] p-6 sm:p-8
        transform transition-transform duration-500 ease-in-out overflow-y-auto
        
        lg:sticky lg:top-28 lg:h-fit lg:max-h-[calc(100vh-120px)]
        lg:translate-x-0 lg:z-0 lg:bg-transparent lg:p-0 lg:w-1/4
        
        ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* MOBILE HEADER */}

        <div className="flex justify-between items-center mb-8 lg:hidden">
          <span className="text-[#d4af37] font-serif text-xl">Filters</span>

          <button onClick={() => setDrawerOpen(false)} className="text-white">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-10">

          {/* SEARCH */}

          <div className="relative group">
            <input
              type="text"
              placeholder="Search masterpieces..."
              className="w-full bg-white/5 border-b border-white/20 py-3 px-2 focus:outline-none focus:border-[#d4af37] transition-all placeholder:text-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <FaSearch className="absolute right-2 top-4 text-gray-600 group-focus-within:text-[#d4af37]" />
          </div>

          {/* CATEGORY */}

          <div>
            <h3 className="text-[11px] uppercase tracking-[3px] text-[#d4af37] mb-5 font-bold">
              Category
            </h3>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => toggleCategory(cat.name)}
                  className={`px-4 py-1.5 rounded-full text-xs transition-all border
                  ${selectedCategories.includes(cat.name)
                      ? "bg-[#d4af37] border-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                      : "border-white/10 text-gray-400 hover:border-white/40"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* MATERIAL */}

          <div>
            <h3 className="text-[11px] uppercase tracking-[3px] text-[#d4af37] mb-5 font-bold">
              Material
            </h3>

            <div className="flex flex-wrap gap-2">
              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => toggleMaterial(mat)}
                  className={`px-4 py-1.5 rounded-full text-xs transition-all border
                  ${selectedMaterials.includes(mat)
                      ? "bg-[#d4af37] border-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                      : "border-white/10 text-gray-400 hover:border-white/40"
                    }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* PRICE */}

          <div>
            <h3 className="text-[11px] uppercase tracking-[3px] text-[#d4af37] mb-5 font-bold">
              Price Range
            </h3>

            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Min"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm focus:border-[#d4af37] outline-none"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />

              <span className="text-gray-600">—</span>

              <input
                type="number"
                placeholder="Max"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm focus:border-[#d4af37] outline-none"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}

          <div className="flex flex-col gap-3">

            <button
              onClick={() => {
                fetchProducts();
                setDrawerOpen(false);
              }}
              className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase text-[11px] tracking-[2px] hover:bg-[#d4af37] transition-colors"
            >
              Search
            </button>

            <button
              onClick={clearFilters}
              className="w-full border border-white/10 text-gray-400 py-3 rounded-xl text-xs uppercase tracking-[2px] hover:border-white/30 transition"
            >
              Clear Filters
            </button>

          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarFilter;