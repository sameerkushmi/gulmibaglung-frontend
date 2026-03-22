"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";

const api = Interceptor();

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const { loading, setLoading } = useAuth()

  // ================= Fetch Users =================
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/user/all"); // your backend endpoint
      setUsers(data.users || []);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= Handlers =================
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/api/user/delete/${id}`);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  // Filter users by search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // ================= UI =================
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Users" },
      ]}
    >
      <div className="max-w-5xl mx-auto p-6 bg-[#0d2b45]/90 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">All Users</h2>

          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-3 py-2 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37]"
            />
            <FiSearch className="absolute left-3 top-2.5 text-[#d4af37]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border border-[#d4af37]/30 rounded-md">
            <thead className="bg-[#071d33]">
              <tr>
                <th className="p-3 border-b border-[#d4af37]/30">Name</th>
                <th className="p-3 border-b border-[#d4af37]/30">Email</th>
                <th className="p-3 border-b border-[#d4af37]/30">Role</th>
                <th className="p-3 border-b border-[#d4af37]/30">Status</th>
                <th className="p-3 border-b border-[#d4af37]/30">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-3 text-center">
                    Loading...
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-[#071d33]/50">
                    <td className="p-3 border-b border-[#d4af37]/30 capitalize">{user.name}</td>
                    <td className="p-3 border-b border-[#d4af37]/30">{user.email}</td>
                    <td className="p-3 border-b border-[#d4af37]/30">{user.role || "User"}</td>
                    <td className="p-3 border-b border-[#d4af37]/30">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${user.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                          }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="p-3 border-b border-[#d4af37]/30 flex gap-2">
                      <Link href={`/admin/users/edit/${user._id}`}>
                        <button
                          className="bg-yellow-500 p-2 rounded-md hover:bg-yellow-600"
                        >
                          <FiEdit size={16} />
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 p-2 rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(user._id)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-3 text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
