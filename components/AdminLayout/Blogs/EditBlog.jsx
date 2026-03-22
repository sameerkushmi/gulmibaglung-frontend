"use client";

import { useState, useRef, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import { FiImage, FiX, FiEdit3, FiLink } from "react-icons/fi";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import { useRouter } from "next/navigation";

const api = Interceptor();

export default function EditBlog({id}) {
    const { loading, setLoading } = useAuth();
    const fileInputRef = useRef(null);
    const router = useRouter()

    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        image: null, // new uploaded file
    });

    const [existingImage, setExistingImage] = useState(null); // { url, public_id }
    const [imagePreview, setImagePreview] = useState(null);

    // Fetch blog on mount
    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/api/blogs/get-by-id/${id}`);
                const blog = res.data;

                setFormData({
                    title: blog.title,
                    excerpt: blog.excerpt,
                    content: blog.content,
                    category: blog.category,
                    image: null, // no new file yet
                });

                if (blog.image) {
                    setExistingImage(blog.image);     // store full object
                    setImagePreview(blog.image.url);  // preview
                } else {
                    setExistingImage(null);
                    setImagePreview(null);
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to load blog");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleContentChange = (html) => {
        setFormData({ ...formData, content: html });
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFormData({ ...formData, image: file });
        setImagePreview(URL.createObjectURL(file)); // preview new image
    };

    // Remove image (existing or new)
    const handleRemoveImage = () => {
        setFormData({ ...formData, image: null }); // remove new file
        setImagePreview(null);
        setExistingImage(null); // mark old image for deletion

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Submit updated blog
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("excerpt", formData.excerpt);
            data.append("content", formData.content);
            data.append("category", formData.category);

            if (formData.image) {
                data.append("image", formData.image); // new uploaded file
                data.append(
                    "deleteOldImage",
                    existingImage ? existingImage.public_id : ""
                ); // send public_id for deletion
            }

            await api.put(`/api/blogs/update/${id}`, data);

            toast.success("Blog updated successfully");
            router.push("/admin/blogs");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout
            breadcrumbs={[
                { label: "Dashboard", href: "/admin" },
                { label: "Blogs", href: "/admin/blogs" },
                { label: "Edit Blog" },
            ]}
        >
            <div className="max-w-4xl mx-auto p-6 bg-[#0d2b45]/90 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Edit Blog</h2>

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
                                placeholder="Blog title"
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
                                <option value="gold">Gold</option>
                                <option value="silver">Silver</option>
                                <option value="platinum">Platinum</option>
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
                        {loading ? "Updating..." : "Update Blog"}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
