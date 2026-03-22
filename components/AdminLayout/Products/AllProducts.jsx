"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { FiEdit, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import Interceptor from "@/utils/Interceptor";
import DeleteConfirmModal from "@/components/Shared/Modals/DeleteConfirmModal/DeleteConfirmModal";
import { useAuth } from "@/Context/AuthContext";
import toast from "react-hot-toast";
import EmptyProducts from './EmptyProducts'
import MobileCard from "./MobileCard";
import { useRouter } from "next/navigation";

const api = Interceptor();

export default function AllProducts() {
  const router = useRouter()
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { setLoading } = useAuth();

  // Backend pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchProducts = async (page = 1, searchValue = search) => {
    try {
      const { data } = await api.get("/api/products/get-all", {
        params: {
          page,
          limit: itemsPerPage,
          search: searchValue,
        },
      });
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setCurrentPage(data.page);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1);
  }, [search]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await api.delete(`/api/products/delete/${selectedProduct._id}`);
      toast.success('Product Deleted.');
      setDeleteOpen(false);
      fetchProducts(currentPage);
    } catch (error) {
      console.error(error.response?.data?.message);
      toast.error('Failed to Delete Product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Products", href: "/admin/products" },
      ]}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold">All Products</h2>
        <Link
          href="/admin/products/add"
          className="flex items-center gap-2 bg-[#d4af37] text-[#0d2b45] px-4 py-2 rounded-md font-semibold hover:bg-[#e6c984] transition w-fit"
        >
          <FiPlus /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <FiSearch className="absolute left-3 top-3 text-[#e6c984]" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 p-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 text-[#e6c984] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        />
      </div>

      {products.length === 0 ? (
        <EmptyProducts search={search} />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border border-[#d4af37]/30 rounded-lg overflow-hidden">
              <thead className="bg-[#071d33]">
                <tr>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Material</th>
                  <th className="p-3 text-left">Purity</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Added</th>
                  <th className="p-3 text-left">Stock</th>
                  <th className="p-3 text-left">Active</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t border-[#d4af37]/20 hover:bg-[#071d33]/60 transition"
                  >
                    <td className="p-3 flex gap-1 grid grid-cols-2">
                      {product?.images?.map((image, i) => (
                        <Image
                          key={i}
                          src={image.url}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                      ))}
                    </td>
                    <td className="p-3">
                      <Link href={`/product-details/${product._id}`}>
                        {product?.name?.length > 20 ? product.name.slice(0, 20) + "..." : product.name}
                      </Link>
                    </td>
                    <td className="p-3">{product?.material}</td>
                    <td className="p-3">{product?.purity || 'none'}</td>
                    <td className="p-3">{product?.category?.name}</td>
                    <td className="p-3">रु {product.discountPrice || product.price}</td>
                    <td className="p-3">{new Date(product.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${product.stock > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${product.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-3">
                        <Link href={`/admin/products/edit/${product._id}`} className="p-2 rounded-full hover:bg-blue-500/20 text-blue-400">
                          <FiEdit size={18} />
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setDeleteOpen(true);
                          }}
                          className="p-2 rounded-full hover:bg-red-500/20 text-red-400"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-3 py-1 rounded-md bg-[#d4af37] disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 text-black rounded-md ${currentPage === i + 1 ? 'bg-[#e6c984]' : 'bg-[#d4af37]'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-3 py-1 rounded-md bg-[#d4af37] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* Mobile Cards */}
          <MobileCard
            filteredProducts={products}
            setDeleteOpen={setDeleteOpen}
            setSelectedProduct={setSelectedProduct}
          />
        </>
      )}

      <DeleteConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        description={`Are you sure you want to delete "${selectedProduct?.name}"?`}
      />
    </AdminLayout>
  );
}
