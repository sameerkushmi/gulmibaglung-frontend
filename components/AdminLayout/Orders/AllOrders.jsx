"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { FiSearch, FiEye } from "react-icons/fi";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";

const api = Interceptor();

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { loading, setLoading } = useAuth();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/api/orders/get-all?page=${page}&limit=10`
      );
      setOrders(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const filteredOrders = orders.filter((order) =>
    order.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Orders" }]}>
      <div className="max-w-6xl mx-auto p-6 bg-[#0d2b45]/90 rounded-xl shadow-lg">

        {/* Header */}
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">All Orders</h2>
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="pl-10 py-2 bg-[#071d33] border border-[#d4af37]/30 rounded-md"
            />
            <FiSearch className="absolute left-3 top-3 text-[#d4af37]" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-[#d4af37]/30">
            <thead className="bg-[#071d33]">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">User</th>
                <th className="p-3">Total</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Deliver Status</th>
                <th className="p-3">Payment Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-4 text-center">Loading...</td></tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order._id} className="hover:bg-[#071d33]/50">
                    <td className="p-3 text-center">{order._id.slice(-6)}</td>
                    <td className="p-3 text-center">{order.user?.name}</td>
                    <td className="p-3 text-center">NPR {order.totalAmount}</td>
                    <td className="p-3 text-center">{order.paymentMethod}</td>
                    <td className="p-3 text-center">
                      <span className={`
                       ${order.orderStatus === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : order.orderStatus === "cancelled"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }
                        px-2 py-1 text-xs rounded bg-green-500/20 text-green-400 capitalize`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`
                       ${order.paymentStatus === "paid"
                          ? "bg-green-500/20 text-green-400"
                          : order.paymentStatus === "failed"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }
                        px-2 py-1 text-xs rounded bg-green-500/20 text-green-400 capitalize`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <Link href={`/admin/orders/details?id=${order._id}`}>
                        <button className="bg-yellow-500 p-2 rounded">
                          <FiEye />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${page === i + 1 ? "bg-[#d4af37] text-black" : "bg-[#071d33]"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
}
