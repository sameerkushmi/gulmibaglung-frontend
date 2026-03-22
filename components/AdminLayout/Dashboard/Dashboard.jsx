"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { FiShoppingCart, FiUsers, FiBox } from "react-icons/fi";
import Interceptor from "@/utils/Interceptor";
import { AiOutlineBoxPlot } from "react-icons/ai";

const api = Interceptor()

export default function Dashboard() {
  // Dummy stats, replace with real API data
  const [stats, setStats] = useState([
    { label: "Total Orders", value: 0, icon: <FiShoppingCart size={28} />, color: "bg-blue-500" },
    { label: "Total Users", value: 0, icon: <FiUsers size={28} />, color: "bg-green-500" },
    { label: "Products", value: 0, icon: <FiBox size={28} />, color: "bg-yellow-500" },
    { label: "Total Stock", value: 0, icon: <AiOutlineBoxPlot size={28} />, color: "bg-red-500" },
  ])

  const [orders, setOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([])

  // ================= Fetch Products =================
  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/api/products/get-all')
      setStats((prev) =>
        prev.map((stat) =>
          stat.label === "Products"
            ? { ...stat, value: data.total }
            : stat
        )
      );
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }

  // ================= Fetch Users =================
  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/api/user/all"); // your backend endpoint
      setStats((prev) =>
        prev.map((stat) =>
          stat.label === "Total Users"
            ? { ...stat, value: data.totalUsers }
            : stat
        )
      );
    } catch (err) {
      console.log(err)
    }
  };

  // ================= Fetch Stock =================
  const fetchTotalStock = async () => {
    try {
      const { data } = await api.get("/api/products/total-stock"); // your backend endpoint
      setStats((prev) =>
        prev.map((stat) =>
          stat.label === "Total Stock"
            ? { ...stat, value: data }
            : stat
        )
      );
    } catch (err) {
      console.log(err)
    }
  }
  // ================= Fetch Order =================
  const fetchTotalOrder = async () => {
    try {
      const { data } = await api.get("/api/orders/get-all"); // your backend endpoint
      setStats((prev) =>
        prev.map((stat) =>
          stat.label === "Total Orders"
            ? { ...stat, value: data.total }
            : stat
        )
      );
      setOrders(data.data.slice(0, 5));
    } catch (err) {
      console.log(err)
    }
  }

  const fetchTopProducts = async () => {
    try {
      const { data } = await api.get("/api/orders/top-products?limit=5"); // your backend endpoint
      setTopProducts(data.products);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchUsers()
    fetchTotalStock()
    fetchTotalOrder()
    fetchTopProducts()
  }, [])

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 p-6 rounded-xl shadow-lg ${stat.color} text-white`}
          >
            <div className="p-4 bg-white/20 rounded-full">{stat.icon}</div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional sections */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0d2b45]/90 p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Recent Orders
          </h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#d4af37]/30">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-gray-400">
                      No orders found 🚫
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-[#d4af37]/20 hover:bg-[#0d2b45]/70 transition"
                    >
                      <td className="p-3 truncate max-w-[150px]">
                        {order._id}
                      </td>
                      <td className="p-3">
                        {order.user?.name || "Guest"}
                      </td>
                      <td className="p-3 font-medium">
                        रु {order.totalAmount}
                      </td>
                      <td className="p-3 capitalize">
                        {order.orderStatus}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {orders.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                No orders found 🚫
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-[#0d2b45]/70 p-4 rounded-lg border border-[#d4af37]/20"
                >
                  <div className="text-xs text-gray-400 mb-1">
                    Order ID
                  </div>
                  <div className="text-sm font-medium break-all mb-2">
                    {order._id}
                  </div>

                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Customer</span>
                    <span>{order.user?.name || "Guest"}</span>
                  </div>

                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Amount</span>
                    <span className="font-medium">
                      रु {order.totalAmount}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Status</span>
                    <span className="capitalize">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-[#0d2b45]/90 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Top Products</h2>
          {
            topProducts.length == 0 && (
              <div className="flex items-center justify-center">
                <p>Product Not Added !</p>
              </div>
            )
          }
          <ul className="space-y-2">
            {topProducts?.map((product, i) => (
              <li key={i} className="flex justify-between p-2 hover:bg-[#d4af37]/10 rounded-md transition">
                <span>{product.name}</span>
                <span>{product.totalSold} sold</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
