"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import Interceptor from "@/utils/Interceptor";
import {
    FiSearch,
    FiTrash2,
    FiToggleLeft,
    FiToggleRight
} from "react-icons/fi";
import toast from "react-hot-toast";
import DeleteConfirmModal from "@/components/Shared/Modals/DeleteConfirmModal/DeleteConfirmModal";

const api = Interceptor();

export default function Subscribers() {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedSubscriberId, setSelectedSubscriberId] = useState(null);


    const fetchSubscribers = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(
                `/api/newsletter/get-all?page=${page}&search=${search}`
            );
            setSubscribers(data.subscribers);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error("Failed to load subscribers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, [page, search]);

    // 🔁 Toggle Active / Unsubscribe
    const handleToggle = async (id) => {
        try {
            await api.patch(`/api/newsletter/${id}/toggle`);
            toast.success("Subscriber status updated");
            fetchSubscribers();
        } catch {
            toast.error("Failed to update status");
        }
    };

    // Open delete modal
    const openDeleteModal = (id) => {
        setSelectedSubscriberId(id);
        setDeleteModalOpen(true);
    };

    // Confirm delete
    const confirmDeleteSubscriber = async () => {
        try {
            await api.delete(`/api/newsletter/delete/${selectedSubscriberId}`);
            toast.success("Subscriber deleted successfully");
            setDeleteModalOpen(false);
            setSelectedSubscriberId(null);
            fetchSubscribers();
        } catch {
            toast.error("Failed to delete subscriber");
        }
    };


    return (
        <AdminLayout
            breadcrumbs={[{ label: "Dashboard", href: "/admin" }]}
        >
            <div className="bg-[#0A1F35] p-6 rounded-xl shadow-lg">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <h2 className="text-xl font-semibold text-[#e6c984]">
                        Newsletter Subscribers
                    </h2>

                    {/* Search */}
                    <div className="flex items-center bg-[#112B46] rounded-lg px-3 py-2">
                        <FiSearch className="text-[#e6c984] mr-2" />
                        <input
                            type="text"
                            placeholder="Search email..."
                            className="bg-transparent outline-none text-white placeholder-[#ffffff88]"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#d4af37]/30 text-[#e6c984]">
                                <th className="py-3 pl-5">Email</th>
                                <th className="py-3">Subscribed At</th>
                                <th className="py-3">Status</th>
                                <th className="py-3 text-right pr-5">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="py-6 text-center text-white">
                                        Loading...
                                    </td>
                                </tr>
                            ) : subscribers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-6 text-center text-white">
                                        No subscribers found
                                    </td>
                                </tr>
                            ) : (
                                subscribers.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="border-b border-[#ffffff10] hover:bg-[#112B46]/40 transition"
                                    >
                                        <td className="py-3 text-white pl-5">{item.email}</td>

                                        <td className="py-3 text-[#ffffffaa]">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>

                                        <td className="py-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${item.isActive
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-red-500/20 text-red-400"
                                                    }`}
                                            >
                                                {item.isActive ? "Active" : "Unsubscribed"}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="py-3 pr-5 text-right">
                                            <div className="flex justify-end gap-3">

                                                {/* Toggle */}
                                                <button
                                                    onClick={() => handleToggle(item._id)}
                                                    className="text-[#e6c984] hover:text-[#d4af37]"
                                                    title="Toggle Status"
                                                >
                                                    {item.isActive ? (
                                                        <FiToggleRight size={20} />
                                                    ) : (
                                                        <FiToggleLeft size={20} />
                                                    )}
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    onClick={() => openDeleteModal(item._id)}
                                                    className="text-red-400 hover:text-red-500"
                                                    title="Delete Subscriber"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>


                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="px-4 py-2 rounded bg-[#112B46] text-white disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="px-4 py-2 rounded bg-[#112B46] text-white disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* delete confirm model */}
            <DeleteConfirmModal
                open={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setSelectedSubscriberId(null);
                }}
                onConfirm={confirmDeleteSubscriber}
                title="Delete Subscriber"
                description="Are you sure you want to permanently delete this subscriber? This action cannot be undone."
            />

        </AdminLayout>
    );
}
