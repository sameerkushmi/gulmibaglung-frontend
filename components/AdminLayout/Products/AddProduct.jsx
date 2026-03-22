"use client";

import { useState, useRef } from "react";
import AdminLayout from "../AdminLayout";
import { FiX } from "react-icons/fi";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import Interceptor from "@/utils/Interceptor";
import { useAuth } from "@/Context/AuthContext";
import Loading from "@/components/Shared/Loading/Loading";

const api = Interceptor();

const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor/RichTextEditor"),
  { ssr: false }
);

export default function AddProduct() {
  const { loading, setLoading } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    stock: "",
    material: "",
    purity: "",
    weight: "",
    description: "",
    images: [],
    isActive: true,
    isFeatured: false,
  });

  const fileInputRef = useRef(null);

  const handleDescriptionChange = (html) => {
    setFormData({ ...formData, description: html });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      const selectedFiles = Array.from(files);

      // validate file size
      const validFiles = [];

      for (let file of selectedFiles) {
        if (file.size > 2 * 1024 * 1024) {
          toast.error(`${file.name} is larger than 2MB`);
        } else {
          validFiles.push(file);
        }
      }

      setFormData((prev) => ({
        ...prev,
        images: validFiles,
      }));

    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.images.length) {
      toast.error("Please select at least one image");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", formData.price);

    // optional field
    if (formData.discountPrice) {
      form.append("discountPrice", formData.discountPrice);
    }

    form.append("stock", formData.stock);
    form.append("category", formData.category);
    form.append("description", formData.description);
    form.append("isFeatured", formData.isFeatured ? "true" : "false"); // send boolean as string
    form.append("isActive", formData.isActive ? "true" : "false");
    // new fields from schema
    form.append("material", formData.material);
    form.append("purity", formData.purity);
    form.append("weight", formData.weight); // ✅ new field

    // images
    formData.images.forEach((file) => {
      form.append("images", file);
    });


    try {
      setLoading(true)
      await api.post("/api/products/create", form);
      toast.success("Product Added!");
      setFormData({
        name: "",
        category: "",
        price: "",
        discountPrice: "",
        stock: "",
        material: "",
        purity: "",
        weight: "",
        description: "",
        images: [],
        isActive: true,
        isFeatured: false,
      })
    } catch (error) {
      console.log(error)
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Product add failed!"
      );
    } finally {
      setLoading(false)
    }
  };


  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Add Product", href: "/admin/products/add" },
      ]}
    >
      {
        loading &&
        <Loading />
      }
      <div className="bg-[#0d2b45]/90 p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div>
            <label className="block mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-[#e6c984]"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-[#e6c984]"
                required
              >
                <option value="" >Select Category</option>
                <option value="rings">Rings</option>
                <option value="earrings">Earrings</option>
                <option value="necklaces">Necklaces</option>
                <option value="mangalsutra">Mangalsutra</option>
                <option value="bracelets">Bracelets</option>
                <option value="chain">Chain</option>
                <option value="pendant">Pendant</option>
                <option value="bangels">Bangels</option>
                <option value="brooch">Brooch</option>
                <option value="nosepin">Nosepin</option>
                <option value="coins">Coins</option>
                <option value="murti">Murti</option>
              </select>
            </div>
            {/* Weight */}
            <div>
              <label className="block mb-1">Weight (grams)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-[#e6c984]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-[#e6c984]"
              // required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-[#e6c984]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Material */}
            <div>
              <label className="block mb-1">Material</label>
              <select
                name="material"
                value={formData.material}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-[#e6c984]"
              >
                <option value="" disabled>Select Material</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="diamond">Diamond</option>
                <option value="platinum">Platinum</option>
              </select>
            </div>

            {/* Purity */}
            <div>
              <label className="block mb-1">Purity</label>
              <select
                name="purity"
                value={formData.purity}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-[#e6c984]"
              >
                <option value="" disabled>Select Purity</option>
                <option value="6K">6K</option>
                <option value="8K">8K</option>
                <option value="10K">10K</option>
                <option value="12K">12K</option>
                <option value="14K">14K</option>
                <option value="16K">16K</option>
                <option value="18K">18K</option>
                <option value="20K">20K</option>
                <option value="22K">22K</option>
                <option value="24K">24K</option>
                <option value="925">925</option>
              </select>
            </div>
          </div>

          <div>
            <label>Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-[#e6c984]"
            />
          </div>

          <div className="flex items-center gap-4">
            <div>
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData({ ...formData, isFeatured: e.target.checked })
                }
              />
              <label>Featured Product</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="isActive"
                checked={!!formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
              />
              <label>Active Product</label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1">Description</label>
            <RichTextEditor
              value={formData.description}
              onChange={handleDescriptionChange}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1">Product Images</label>
            <input
              ref={fileInputRef}
              type="file"
              name="images"
              multiple
              onChange={handleChange}
              accept="image/*"
              className="w-full p-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-[#e6c984]"
            />

            {formData.images.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative w-32 h-32">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md border border-[#d4af37]/30"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-[#d4af37] text-[#0d2b45] font-semibold py-3 rounded-md hover:bg-[#e6c984] transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
