"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import Interceptor from "@/utils/Interceptor";
import { useSearchParams } from "next/navigation";
import { FiUser, FiMail, FiCreditCard, FiShoppingBag, FiPhone, FiMapPin } from "react-icons/fi";
import toast from "react-hot-toast";
import Loading from "@/components/Shared/Loading/Loading";

const api = Interceptor();

export default function OrderDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [order, setOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/api/orders/get-by-id/${id}`);
      console.log(data.data)
      setOrder(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);


  const handleStatusChange = async (newStatus) => {
    if (newStatus === order.orderStatus) return;

    try {
      setUpdating(true);
      const { data } = await api.patch(
        `/api/orders/update-status/${order._id}`,
        { status: newStatus }
      );

      setOrder(data.data);
      toast.success("Order status updated");
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };


  if (!order)
    return (
      <div className="p-10 text-center text-gray-300">Loading order details...</div>
    );

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Orders", href: "/admin/orders" },
        { label: "Order Details" },
      ]}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {
          updating &&
          <Loading />
        }
        {/* ===== Order Header ===== */}
        <div className="bg-gradient-to-r from-[#0d2b45] to-[#071d33] p-6 rounded-2xl shadow-lg border border-[#d4af37]/30">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">
                Order <span className="text-[#d4af37]">#{order._id.slice(-6)}</span>
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 capitalize rounded-full text-sm font-semibold ${order.orderStatus === "completed"
                  ? "bg-green-500/20 text-green-400"
                  : order.orderStatus === "cancelled"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
                  }`}
              >
                {order.orderStatus}
              </span>

              <select
                disabled={updating}
                value={order.orderStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-[#071d33] border border-[#d4af37]/40 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-[#d4af37]"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

          </div>
        </div>

        {/* ===== Info Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* User Info */}
          <div className="bg-[#0d2b45]/90 p-5 rounded-xl border border-[#d4af37]/30 shadow">
            <h3 className="flex items-center gap-2 font-semibold mb-4">
              <FiUser className="text-[#d4af37]" /> Customer
            </h3>
            <p className="text-sm mb-2">{order.user.name}</p>
            <p className="text-sm flex items-center gap-2 text-gray-300">
              <FiMail /> {order.user.email}
            </p>
            {
              order?.user?.phone &&
              <p className="text-sm flex items-center gap-2 text-gray-300">
                <FiPhone /> {order.user.phone}
              </p>
            }
            {
              order?.user?.address &&
              <p className="text-sm flex items-center gap-2 text-gray-300">
                <FiMapPin /> {order.user.address}
              </p>
            }
          </div>

          {/* Payment Info */}
          <div className="bg-[#0d2b45]/90 p-5 rounded-xl border border-[#d4af37]/30 shadow">
            <h3 className="flex items-center gap-2 font-semibold mb-4">
              <FiCreditCard className="text-[#d4af37]" /> Payment {order.paymentStatus === 'paid' ? '✔️' : '❌'}
            </h3>
            <p className="text-sm mb-2">
              Method: <span className="font-medium">{order.paymentMethod}</span>
            </p>
            <p className="text-sm">
              Total: <span className="text-[#d4af37] font-semibold">NPR {order.totalAmount}</span>
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-[#0d2b45]/90 p-5 rounded-xl border border-[#d4af37]/30 shadow">
            <h3 className="flex items-center gap-2 font-semibold mb-4">
              <FiShoppingBag className="text-[#d4af37]" /> Summary
            </h3>
            <p className="text-sm">Items: {order.products.length}</p>
          </div>
        </div>

        {/* ===== Products ===== */}
        <div className="bg-[#0d2b45]/90 p-6 rounded-2xl border border-[#d4af37]/30 shadow-lg">
          <h3 className="text-lg font-semibold mb-5">Ordered Products</h3>

          <div className="space-y-4">
            {order.products.map((p) => (
              <div
                key={p._id}
                className="flex justify-between items-center bg-[#071d33] p-4 rounded-xl hover:scale-[1.01] transition"
              >
                <div>
                  <p className="font-medium">{p.productId.name}</p>
                  <p className="text-sm text-gray-400">
                    Quantity: {p.quantity}
                  </p>
                </div>
                <p className="font-semibold text-[#d4af37]">
                  NPR {p.productId.price}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
