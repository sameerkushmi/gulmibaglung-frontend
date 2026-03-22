"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { FiSearch, FiEye, FiXCircle } from "react-icons/fi";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";

const api = Interceptor();

export default function CanceledOrders() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { loading, setLoading } = useAuth();

    const fetchCanceledOrders = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(
                `/api/orders/canceled?page=${page}&limit=10`
            );

            setOrders(data.orders);
            setTotalPages(data.pagination.totalPages);
        } catch (error) {
            toast.error("Failed to fetch canceled orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCanceledOrders();
    }, [page]);

    const filteredOrders = orders.filter((order) =>
        order.user?.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout
            breadcrumbs={[
                { label: "Dashboard", href: "/admin" },
                { label: "Canceled Orders" },
            ]}
        >
            <div className="max-w-6xl mx-auto p-6 bg-[#0d2b45]/90 rounded-xl shadow-lg">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-semibold text-red-400 flex items-center gap-2">
                        <FiXCircle /> Canceled Orders
                    </h2>

                    <div className="relative w-full sm:w-64">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by customer..."
                            className="w-full pl-10 py-2 bg-[#071d33] border border-[#d4af37]/30 rounded-md text-sm"
                        />
                        <FiSearch className="absolute left-3 top-3 text-[#d4af37]" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border border-[#d4af37]/30 rounded-lg overflow-hidden">
                        <thead className="bg-[#071d33] text-[#d4af37]">
                            <tr>
                                <th className="p-3 text-center">Order ID</th>
                                <th className="p-3 text-center">Customer</th>
                                <th className="p-3 text-center">Total</th>
                                <th className="p-3 text-center">Payment</th>
                                <th className="p-3 text-center">Status</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center">
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center">
                                        No canceled orders found
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="hover:bg-[#071d33]/60 transition"
                                    >
                                        <td className="p-3 text-center">
                                            #{order._id.slice(-6)}
                                        </td>
                                        <td className="p-3 text-center">
                                            {order.user?.name || "Guest"}
                                        </td>
                                        <td className="p-3 text-center">
                                            ${order.totalAmount}
                                        </td>
                                        <td className="p-3 text-center">
                                            {order.paymentMethod}
                                        </td>
                                        <td className="p-3 text-center">
                                            <span className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400">
                                                Cancelled
                                            </span>
                                        </td>
                                        <td className="p-3 text-center">
                                            <Link href={`/admin/orders/${order._id}`}>
                                                <button className="bg-[#d4af37] text-black p-2 rounded hover:opacity-90">
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
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`px-3 py-1 rounded text-sm transition
                  ${page === i + 1
                                        ? "bg-[#d4af37] text-black"
                                        : "bg-[#071d33] hover:bg-[#071d33]/70"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
