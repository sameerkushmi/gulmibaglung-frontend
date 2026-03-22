"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../AdminLayout";
import { FiX, FiUpload } from "react-icons/fi";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import { useAuth } from "@/Context/AuthContext";

const api = Interceptor();

export default function EditProduct({id}) {
  const router = useRouter();
  const fileRef = useRef(null);
  const { loading, setLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    stock: "",
    material: "",
    purity: "",
    weight: "",
    isFeatured: false,
    isActive: true,
    description: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/api/products/get-byId/${id}`);

        setFormData({
          name: data.name || "",
          category: data.category?.name || "",
          price: data.price || "",
          discountPrice: data.discountPrice || "",
          stock: data.stock || "",
          material: data.material || "",
          purity: data.purity || "",
          weight: data.weight || "",
          isFeatured: data.isFeatured || false,
          isActive: data.isActive ?? true,
          description: data.description || "",
        });

        setExistingImages(data.images || []);
        setPreviewImages(
          (data.images || []).map((img) => ({
            url: img.url,
            type: "existing",
            id: img._id,
          }))
        );
      } catch {
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setNewImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [
      ...prev,
      ...files.map((file) => ({
        url: URL.createObjectURL(file),
        type: "new",
        file,
      })),
    ]);

    e.target.value = "";
  };

  const removeImage = (index) => {
    const img = previewImages[index];

    if (img.type === "existing") {
      setExistingImages((prev) => prev.filter((i) => i._id !== img.id));
    } else {
      setNewImages((prev) => prev.filter((f) => f !== img.file));
      URL.revokeObjectURL(img.url);
    }

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (html) => {
    setFormData((prev) => ({ ...prev, description: html }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      newImages.forEach((file) => payload.append("images", file));
      existingImages.forEach((img) =>
        payload.append("existingImages", img._id)
      );

      await api.put(`/api/products/update/${id}`, payload);
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Products", href: "/admin/products" },
        { label: "Edit Product" },
      ]}
    >
      <div className="max-w-3xl mx-auto bg-[#0d2b45]/90 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Product Name" name="name" value={formData.name} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={[
                "Rings",
                "Earrings",
                "Necklaces",
                "Mangalsutra",
                "Bracelets",
                "Chain",
                "Pendant",
                "Bangels",
                "Brooch",
                "Nosepin",
                "Coins",
                "Murti"
              ]}
            />
            <Input label="Weight" type="number" name="weight" value={formData.weight} onChange={handleChange} />
          </div>

          {/* Material & Purity */}
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              options={["Gold", "Silver", "Diamond", "Platinum"]}
            />
            <Select
              label="Purity"
              name="purity"
              value={formData.purity}
              onChange={handleChange}
              options={["6K", "8K", "10K", "12K", "14K", "16K", "18K", "20K", "22K", "24K", "925"]}
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price" type="number" name="price" value={formData.price} onChange={handleChange} />
            <Input label="Discount Price" type="number" name="discountPrice" value={formData.discountPrice} onChange={handleChange} />
          </div>

          <Input label="Stock" type="number" name="stock" value={formData.stock} onChange={handleChange} />

          {/* Flags */}
          <div className="flex gap-6">
            <Checkbox label="Featured" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
            <Checkbox label="Active" name="isActive" checked={formData.isActive} onChange={handleChange} />
          </div>

          {/* Description */}
          <RichTextEditor value={formData.description} onChange={handleDescriptionChange} />

          {/* Images */}
          <ImageUploader
            previews={previewImages}
            onRemove={removeImage}
            onAdd={handleImageChange}
            fileRef={fileRef}
          />

          <button className="w-full bg-[#d4af37] text-[#0d2b45] py-3 rounded-md font-semibold">
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

/* ================= UI HELPERS ================= */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block mb-1">{label}</label>
      <input {...props} className="w-full p-3 rounded-md bg-[#071d33] border border-[#d4af37]/30" />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block mb-1">{label}</label>
      <select {...props} className="w-full p-3 rounded-md bg-[#071d33] border border-[#d4af37]/30">
        <option value="">Select {label}</option>
        {options.map((o) => (
          <option key={o} value={o.toLowerCase()}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" {...props} />
      {label}
    </label>
  );
}

function ImageUploader({ previews, onRemove, onAdd, fileRef }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        {previews.map((img, i) => (
          <div key={i} className="relative">
            <img src={img.url} className="h-28 w-full object-cover rounded-md" />
            <button type="button" onClick={() => onRemove(i)} className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full">
              <FiX size={14} />
            </button>
          </div>
        ))}
      </div>

      <label className="flex items-center gap-2 text-[#d4af37] cursor-pointer">
        <FiUpload /> Add Images
        <input ref={fileRef} type="file" hidden multiple onChange={onAdd} />
      </label>
    </div>
  );
}
