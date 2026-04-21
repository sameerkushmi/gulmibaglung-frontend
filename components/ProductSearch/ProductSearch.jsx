"use client";

import { useEffect, useState, useCallback } from "react";
import Interceptor from "@/utils/Interceptor";
import { useAuth } from "@/Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import HeroHeader from "./HeroHeader";
import TopActionBar from "./TopActionBar";
import SidebarFilter from "./SidebarFilter";
import ProductCard from "./ProductCard";
import ProductGridSkeleton from "@/components/Shared/Loading/ProductGridSkeleton";
import { useSearchParams } from "next/navigation";

const api = Interceptor();

export default function ProductSearch() {
  const { wishlist, toggleWishlist } = useAuth();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [materials] = useState(["gold", "silver", "platinum", "diamond"]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const LIMIT = 20;

  /* ================= FETCH PRODUCTS ================= */

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams({
        page,
        limit: LIMIT,
        sort,

        ...(searchQuery && { query: searchQuery }),
        ...(selectedCategories.length && {
          categories: selectedCategories.join(","),
        }),
        ...(selectedMaterials.length && {
          materials: selectedMaterials.join(","),
        }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
      });

      const { data } = await api.get(`/api/products/search?${params}`);

      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.log(error)
      toast.error("Exquisite pieces are taking a moment to load...");
    } finally {
      setLoading(false);
    }
  }, [
    page,
    sort,
    searchQuery,
    selectedCategories,
    selectedMaterials,
    minPrice,
    maxPrice,
  ]);

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* ================= FETCH CATEGORIES ================= */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/api/products/category");
        setCategories(data.categories || []);
      } catch (error) { }
    };

    fetchCategories();
  }, []);

  /* ================= FILTER FUNCTIONS ================= */

  const toggleCategory = (name) => {
    setPage(1);

    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const toggleMaterial = (mat) => {
    setPage(1);

    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  /* ================= Sync URL filters with state ================= */

  useEffect(() => {
    const materialParam = searchParams.get("material");
    const categoryParam = searchParams.get("category");

    setSelectedMaterials(materialParam ? [materialParam] : []);
    setSelectedCategories(categoryParam ? [categoryParam] : []);
    setPage(1);
  }, [searchParams]);

  /* ================= UI ================= */

  return (
    <section className="bg-[#0d2b45] min-h-screen text-gray-100 font-sans selection:bg-[#d4af37]/30">

      <HeroHeader />

      <div className="max-w-[1400px] mx-auto px-6 pb-20">

        {/* TOP BAR */}

        <TopActionBar
          setDrawerOpen={setDrawerOpen}
          setSort={setSort}
          products={products}
          sort={sort}
        />

        <div className="flex flex-col lg:flex-row gap-12">

          {/* SIDEBAR */}

          <SidebarFilter
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categories={categories}
            toggleCategory={toggleCategory}
            selectedCategories={selectedCategories}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            fetchProducts={fetchProducts}
            materials={materials}
            toggleMaterial={toggleMaterial}
            selectedMaterials={selectedMaterials}
          />

          {/* PRODUCTS */}

          <div className="lg:w-3/4">

            {loading ? (
              <ProductGridSkeleton />
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-x-8 gap-y-6 md:gap-y-12"
              >
                <AnimatePresence>

                  {products.length ? (
                    products.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        isWishlisted={wishlist.includes(product._id)}
                        toggleWishlist={toggleWishlist}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center">
                      <p className="text-gray-500 font-serif italic text-lg">
                        No pieces found matching your criteria.
                      </p>
                    </div>
                  )}

                </AnimatePresence>
              </motion.div>
            )}

            {/* PAGINATION */}

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-20 gap-3">

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-full text-xs font-bold transition-all ${page === p
                        ? "bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20"
                        : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                        }`}
                    >
                      {p}
                    </button>
                  )
                )}

              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}