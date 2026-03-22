"use client";

import { useState, useRef } from "react";
import AdminLayout from "../AdminLayout";
import { FiImage, FiX,  FiEdit3, FiLink } from "react-icons/fi";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";


const api = Interceptor();

export default function AddBlog() {
    const { loading, setLoading } = useAuth();
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);


    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        image: null,
        category: "", // ✅ new field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setFormData({ ...formData, image: file });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        setFormData({ ...formData, image: null });
        setImagePreview(null);

        // ✅ Clear file input value
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.image) {
            toast.error("Please upload a blog image");
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("excerpt", formData.excerpt);
            data.append("content", formData.content);
            data.append("image", formData.image);
            data.append("category", formData.category); // ✅ new field

            await api.post("/api/blogs/add", data);

            toast.success("Blog created successfully");
            setFormData({ title: "", excerpt: "", content: "", image: null, category: "" });
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            console.error(err);
            toast.error("Failed to create blog");
        } finally {
            setLoading(false);
        }
    };


    const handleContentChange = (html) => {
        setFormData({ ...formData, content: html });
    };

    return (
        <AdminLayout
            breadcrumbs={[
                { label: "Dashboard", href: "/admin" },
                { label: "Blogs", href: "/admin/blogs" },
                { label: "Add Blog" },
            ]}
        >
            <div className="max-w-4xl mx-auto p-6 bg-[#0d2b45]/90 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Add New Blog</h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block mb-1 text-sm">Title</label>
                        <div className="relative">
                            <FiEdit3 className="absolute left-3 top-2.5 text-[#d4af37]" />
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}

                                placeholder="The History of Gold jewellery in Nepal"
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37] outline-none"
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block mb-1 text-sm">Excerpt</label>
                        <textarea
                            name="excerpt"
                            required
                            rows={3}
                            value={formData.excerpt}
                            onChange={handleChange}
                            placeholder="Short summary of the blog..."
                            className="w-full p-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37] outline-none"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block mb-1 text-sm">Content</label>
                        <RichTextEditor
                            value={formData.content}
                            onChange={handleContentChange}
                        />
                    </div>
                    {/* Category */}
                    <div>
                        <label className="block mb-1 text-sm">Category</label>
                        <div className="relative">
                            <FiLink className="absolute left-3 top-2.5 text-[#d4af37]" />
                            <select
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37] outline-none"
                            >
                                <option value="" disabled>Select a category</option>
                                <option value="Gold">Gold</option>
                                <option value="Silver">Silver</option>
                                <option value="Platinum">Platinum</option>
                            </select>
                        </div>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block mb-1 text-sm">Blog Image</label>

                        <div className="relative">
                            <FiImage className="absolute left-3 top-2.5 text-[#d4af37]" />
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37] outline-none"
                            />
                        </div>

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="mt-4 relative w-48">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-32 object-cover rounded-md border border-[#d4af37]/30"
                                />

                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                                >
                                    <FiX size={16} />
                                </button>
                            </div>
                        )}
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#d4af37] text-black font-semibold py-2 rounded-md hover:bg-[#c9a634] transition"
                    >
                        {loading ? "Publishing..." : "Publish Blog"}
                    </button>

                </form>
            </div>
        </AdminLayout>
    );
}
