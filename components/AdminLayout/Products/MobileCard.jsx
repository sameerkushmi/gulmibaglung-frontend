import Image from "next/image";
import Link from "next/link";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const MobileCard = ({filteredProducts,setSelectedProduct,setDeleteOpen}) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredProducts?.map((product) => (
                <div
                    key={product._id}
                    className="bg-[#0d2b45]/90 border border-[#d4af37]/30 rounded-xl p-4 shadow-md flex flex-col gap-4 hover:shadow-lg transition"
                >
                    {/* Top: Image and Name */}
                    <div className="flex items-center gap-4">
                        {product?.images?.[0] && (
                            <Image
                                src={product.images[0].url}
                                alt={product.name}
                                width={60}
                                height={60}
                                className="rounded-lg object-cover border border-[#d4af37]/30"
                            />
                        )}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-[#e6c984]">{product.name}</h3>
                            <p className="text-sm text-[#d4af37]/80">{product?.category?.name}</p>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="grid grid-cols-2 gap-2 text-sm text-[#e6c984]">
                        <div>
                            <span className="font-medium">Price: </span>${product.price}
                        </div>
                        <div>
                            <span className="font-medium">Stock: </span>
                            <span
                                className={`px-2 py-1 rounded-full text-xs ${product.stock > 0
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                    }`}
                            >
                                {product.stock}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium">Material: </span>{product.material}
                        </div>
                        <div>
                            <span className="font-medium">Purity: </span>{product.purity}
                        </div>
                        <div>
                            <span className="font-medium">Weight: </span>{product.weight || "-"}g
                        </div>
                        <div>
                            <span className="font-medium">Active: </span>
                            <span
                                className={`px-2 py-1 rounded-full text-xs ${product.isActive
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                    }`}
                            >
                                {product.isActive ? "Active" : "Inactive"}
                            </span>
                        </div>
                        <div className="col-span-2">
                            <span className="font-medium">Added: </span>{new Date(product.createdAt).toLocaleDateString()}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end mt-2">
                        <Link href={`/admin/products/edit/${product._id}`}>
                            <button className="p-2 rounded-full hover:bg-blue-500/20 text-blue-400">
                                <FiEdit />
                            </button>
                        </Link>
                        <button
                            onClick={() => {
                                setSelectedProduct(product);
                                setDeleteOpen(true);
                            }}
                            className="p-2 rounded-full hover:bg-red-500/20 text-red-400"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileCard