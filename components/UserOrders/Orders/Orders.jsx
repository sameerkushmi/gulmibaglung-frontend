"use client";

import React, { useEffect, useState } from "react";
import Interceptor from "@/utils/Interceptor";
import OrderCard from "@/components/UserOrders/OrderCard/OrderCard";
import toast from "react-hot-toast";

import {
  FaMagnifyingGlass,
  FaFilter,
  FaBoxOpen,
  FaChevronLeft,
  FaChevronRight,
  FaCircleNotch
} from "react-icons/fa6";
import { MdOutlineHistory } from "react-icons/md";

const api = Interceptor();

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      let url = `/api/orders/user/get-all?page=${page}&limit=6`;
      if (filter !== "all") url += `&orderStatus=${filter}`;
      if (debouncedSearch) url += `&search=${debouncedSearch}`;

      const { data } = await api.get(url);

      setOrders(data.orders);
      setTotalPages(data.totalPages);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, filter, debouncedSearch]);

  const filters = ["all", "pending", "completed", "cancelled"];

  return (
    <div className="min-h-screen bg-[#0d2b45] text-gray-100 px-4 md:px-10 pt-32 pb-24">

      {/* HEADER */}

      <header className="max-w-7xl mx-auto mb-14 text-center md:text-left">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <MdOutlineHistory className="text-[#d4af37] text-3xl" />
              <span className="uppercase tracking-[0.3em] text-xs font-semibold text-[#d4af37]">
                Customer Dashboard
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-white">
              My <span className="text-[#d4af37]">Orders</span>
            </h1>
          </div>

          <div className="hidden md:flex flex-col items-end">
            <span className="text-gray-500 text-sm">Luxury Service Active</span>
            <div className="h-[2px] w-24 bg-[#d4af37] mt-2"></div>
          </div>

        </div>

      </header>


      {/* SEARCH + FILTER */}

      <section className="max-w-7xl mx-auto mb-12">

        <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-lg flex flex-col lg:flex-row gap-4 p-3">

          {/* SEARCH */}

          <div className="relative flex-grow group">

            <div className="absolute inset-y-0 left-5 flex items-center">
              <FaMagnifyingGlass className="text-gray-400 group-focus-within:text-[#d4af37]" />
            </div>

            <input
              type="text"
              placeholder="Search by Order ID or Product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent pl-14 pr-6 py-4 rounded-2xl text-white outline-none placeholder:text-gray-500 focus:bg-white/5 transition"
            />

          </div>


          {/* FILTER BUTTONS */}

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">

            <FaFilter className="text-gray-400 ml-2 hidden sm:block" />

            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setPage(1);
                }}
                className={`px-6 py-2.5 capitalize rounded-full text-sm font-medium transition-all whitespace-nowrap ${filter === f
                    ? "bg-[#d4af37] text-black"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
              >
                {f}
              </button>
            ))}

          </div>

        </div>

      </section>


      {/* MAIN CONTENT */}

      <main className="max-w-7xl mx-auto">

        {loading ? (

          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <FaCircleNotch className="text-[#d4af37] text-5xl animate-spin" />
            <p className="text-gray-400 tracking-widest uppercase text-xs">
              Loading Your Orders
            </p>
          </div>

        ) : orders.length === 0 ? (

          <div className="text-center py-32 border border-white/10 rounded-3xl bg-white/5">

            <FaBoxOpen className="text-gray-700 text-8xl mx-auto mb-6" />

            <h3 className="text-2xl font-serif text-gray-300">
              No Orders Found
            </h3>

            <p className="text-gray-500 mt-2">
              You have not placed any orders yet.
            </p>

          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order._id}
                className="transform hover:-translate-y-2 transition-all duration-500"
              >
                <OrderCard order={order} />
              </div>
            ))}
          </div>

        )}


        {/* PAGINATION */}

        {totalPages > 1 && (

          <div className="flex justify-center items-center gap-4 mt-20">

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-[#d4af37] disabled:opacity-20"
            >
              <FaChevronLeft />
            </button>


            <div className="flex gap-2">

              {Array.from({ length: totalPages }, (_, i) => (

                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-full text-sm font-bold transition ${page === i + 1
                      ? "bg-[#d4af37] text-black"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                >
                  {i + 1}
                </button>

              ))}

            </div>


            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-[#d4af37] disabled:opacity-20"
            >
              <FaChevronRight />
            </button>

          </div>

        )}

      </main>


      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </div>
  );
}