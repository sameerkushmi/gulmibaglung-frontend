"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import {  useRouter } from "next/navigation";

const api = Interceptor();

export default function EditUser({id}) {
  const router = useRouter();
  const { loading, setLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    status: "active",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/user/get-userById/${id}`); // fetch all or single user
        const user = data
        if (user) {
          setFormData({
            name: user.name,
            email: user.email,
            password: "",
            role: user.role,
            status: user.status,
          });
        }
      } catch (err) {
        console.log(err)
        toast.error("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/api/user/update-user/${id}`, formData);
      toast.success("User updated successfully");
      router.push("/admin/users");
    } catch (err) {
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Users", href: "/admin/users" },
        { label: "Edit User" },
      ]}
    >
      <div className="max-w-3xl mx-auto p-6 bg-[#0d2b45]/90 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Edit User</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block mb-1 text-sm">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-2.5 text-[#d4af37]" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-3 py-2 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37] outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-2.5 text-[#d4af37]" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="user@email.com"
                className="w-full pl-10 pr-3 py-2 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37] outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm">Password (leave blank to keep current)</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-2.5 text-[#d4af37]" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#d4af37]"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 text-sm">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full py-2 px-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37] outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 text-sm">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full py-2 px-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37] outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4af37] text-black font-semibold py-2 rounded-md hover:bg-[#c9a634] transition"
          >
            {loading ? "Updating..." : "Update User"}
          </button>

        </form>
      </div>
    </AdminLayout>
  );
}
