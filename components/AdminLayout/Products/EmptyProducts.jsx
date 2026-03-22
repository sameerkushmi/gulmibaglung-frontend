import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default function EmptyProducts({ search }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[#d4af37]/40 rounded-xl bg-[#071d33]/40">
      <FiPlus size={48} className="text-[#d4af37] mb-4" />

      <h3 className="text-xl font-semibold mb-2">
        {search ? "No products found" : "No products added yet"}
      </h3>

      <p className="text-[#e6c984] mb-6 max-w-md">
        {search
          ? "Try changing your search keyword."
          : "Start by adding your first jewellery product to the store."}
      </p>

      {!search && (
        <Link
          href="/admin/products/add"
          className="flex items-center gap-2 bg-[#d4af37] text-[#0d2b45] px-5 py-2 rounded-md font-semibold hover:bg-[#e6c984] transition"
        >
          <FiPlus /> Add Product
        </Link>
      )}
    </div>
  );
}
