"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Interceptor from "@/utils/Interceptor";
import AdminLayout from "../AdminLayout";

const api = Interceptor();

/* ================== CUSTOM UI COMPONENTS ================== */

const Card = ({ children }) => (
    <div className="bg-[#0A1F35] border border-white/10 rounded-2xl shadow-lg">
        {children}
    </div>
);

const CardHeader = ({ title, subtitle, status }) => (
    <div className="flex items-center justify-between mb-4">
        <div>
            <h2 className="font-semibold text-lg text-white">{title}</h2>
            <p className="text-sm text-white/60">{subtitle}</p>
        </div>
        <StatusBadge status={status} />
    </div>
);

const CardBody = ({ children }) => (
    <div className="text-sm text-white">{children}</div>
);

const StatusBadge = ({ status }) => (
    <span
        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
        ${status === "paid"
                ? "bg-green-600 text-white"
                : status === "failed"
                    ? "bg-red-600 text-white"
                    : "bg-yellow-500 text-black"
            }`}
    >
        {status || "pending"}
    </span>
);

/* ================== PAGE ================== */

export default function PaymentLogs() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const [totalPages, setTotalPages] = useState(1);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(
                `/api/payment/stripe-events?page=${page}&limit=${limit}`
            );

            console.log("Fetched Stripe events:", data.events);

            setEvents(data.events || []);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [page]);

    return (
        <AdminLayout
            breadcrumbs={[{ label: "Dashboard", href: '/admin' }, { label: "Payments" }, { label: "Payment Logs" }]}
        >
            <div className="min-h-screen bg-[#0D2B45] p-6">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white mb-6"
                >
                    💳 Stripe Payment Logs
                </motion.h1>

                {loading ? (
                    <div className="flex items-center justify-center h-60 text-white">
                        Loading Stripe events...
                    </div>
                ) : (
                    <>
                        <div className="grid gap-6">
                            {events.map((evt) => (
                                <motion.div
                                    key={evt._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <Card>
                                        <div className="p-5">
                                            <CardHeader
                                                title={evt.eventType}
                                                subtitle={new Date(evt.createdAt).toLocaleString()}
                                                status={evt.status}
                                            />

                                            <CardBody>
                                                <div className="grid md:grid-cols-3 gap-4">
                                                    <div>
                                                        <p className="text-white/60">Order ID</p>
                                                        <p className="break-all">
                                                            {evt.orderId?._id || "—"}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-white/60">Transaction ID</p>
                                                        <p className="break-all">
                                                            {evt.transactionId || "—"}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-white/60">Amount</p>
                                                        <p>
                                                            {evt.orderId?.totalAmount
                                                                ? `NPR ${evt.orderId.totalAmount}`
                                                                : "—"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <details className="mt-4">
                                                    <summary className="cursor-pointer text-sm text-[#d4af37]">
                                                        View Raw Event JSON
                                                    </summary>
                                                    <pre className="mt-3 p-3 text-xs bg-black/40 rounded-xl overflow-auto max-h-64">
                                                        {JSON.stringify(evt.data, null, 2)}
                                                    </pre>
                                                </details>
                                            </CardBody>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* ================== PAGINATION ================== */}
                        <div className="flex items-center justify-center gap-4 mt-10">
                            <button
                                onClick={() => setPage(p => Math.max(p - 1, 1))}
                                disabled={page === 1}
                                className="px-4 py-2 rounded-lg bg-[#0A1F35] border border-white/20 text-white disabled:opacity-40"
                            >
                                ⬅ Prev
                            </button>

                            <span className="text-white text-sm">
                                Page <b>{page}</b> of <b>{totalPages}</b>
                            </span>

                            <button
                                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                                disabled={page === totalPages}
                                className="px-4 py-2 rounded-lg bg-[#0A1F35] border border-white/20 text-white disabled:opacity-40"
                            >
                                Next ➡
                            </button>
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}
