"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import { FiTrash2, FiEdit, FiPlus, FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";

const api = Interceptor();

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState(""); // ✅ search state
  const { loading, setLoading } = useAuth();
  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/blogs/get-all");
      setBlogs(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      setLoading(true);
      await api.delete(`/api/blogs/delete/${id}`);
      toast.success("Blog deleted successfully");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filtered blogs based on search
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Blogs" },
      ]}
    >
      <div className="max-w-6xl mx-auto p-6 bg-[#0d2b45]/90 rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold">All Blogs</h2>

          <Link
            href="/admin/blogs/add"
            className="flex items-center gap-2 bg-[#d4af37] text-[#0d2b45] px-4 py-2 rounded-md font-semibold hover:bg-[#e6c984] transition w-fit"
          >
            <FiPlus /> Add Blog
          </Link>
        </div>

        {/* Search Input */}
        <div className="relative mb-6 max-w-sm">
          <FiSearch className="absolute left-3 top-3 text-[#e6c984]" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 p-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 text-[#e6c984] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
          />
        </div>

        {loading ? (
          <p className="text-center">Loading blogs...</p>
        ) : filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-400">
            No blogs found{search && ` for "${search}"`}
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-[#071d33] rounded-lg overflow-hidden border border-[#d4af37]/20 shadow-md hover:shadow-lg transition"
              >
                <img
                  src={blog.image?.url}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2 text-[#e6c984]">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-400 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-3">
                    <span className="text-xs text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>

                    <div className="flex gap-3">
                      {/* Edit */}
                      <button
                        onClick={() =>
                          router.push(`/admin/blogs/edit/${blog._id}`)
                        }
                        className="text-blue-400 hover:text-blue-500"
                        title="Edit Blog"
                      >
                        <FiEdit size={18} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-500 hover:text-red-600"
                        title="Delete Blog"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
