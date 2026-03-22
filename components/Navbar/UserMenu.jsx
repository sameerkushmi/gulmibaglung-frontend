import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";
import { FiChevronDown, FiSearch, FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";

const UserMenu = ({ mounted, userMenuItems }) => {
    const { user, logout, loading, cart } = useAuth();

    return (
        <div className="flex items-center gap-6">
            {mounted && (
                <div className="hidden md:flex items-center gap-6 text-white">
                    {/* Action Icons */}
                    <div className="flex items-center gap-5">
                        <Link href={'/products/search'} className="group">
                            <FiSearch
                                size={20}
                                className="text-[#e6c984]/80 group-hover:text-[#d4af37] transition-colors duration-300 cursor-pointer"
                            />
                        </Link>

                        {user?.role !== 'admin' && (
                            <Link href={`/cart`} className="relative group">
                                <FiShoppingCart
                                    size={20}
                                    className="text-[#e6c984]/80 group-hover:text-[#d4af37] transition-colors duration-300"
                                />
                                {cart?.items?.length > 0 && (
                                    <span className="absolute -top-2 -right-2.5 bg-[#d4af37] text-[#0a1f35] rounded-full min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold shadow-lg border border-[#0d2b45]">
                                        {cart.items.length}
                                    </span>
                                )}
                            </Link>
                        )}
                    </div>

                    {/* Auth Section */}
                    {mounted && !loading && (
                        <div className="h-6 w-[1px] bg-white/10 mx-1" /> // Visual Separator
                    )}

                    {mounted && (
                        <>
                            {user ? (
                                <div className="relative group py-4">
                                    <div className="flex items-center gap-2 cursor-pointer transition-all duration-300">
                                        <div className="w-8 h-8 rounded-full border border-[#d4af37]/30 flex items-center justify-center bg-[#d4af37]/5 group-hover:border-[#d4af37] transition-colors">
                                            <FiUser size={16} className="text-[#e6c984]" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-semibold tracking-wide text-[#e6c984] group-hover:text-white transition-colors">
                                                {user?.name?.split(' ')[0]}
                                            </span>
                                        </div>
                                        <FiChevronDown className="text-[#e6c984] opacity-50 transition-transform duration-300 group-hover:rotate-180" />
                                    </div>

                                    {/* Dropdown Menu */}
                                    <ul className="absolute right-0 top-[85%] bg-[#0d2b45]/95 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 w-56 z-50 overflow-hidden">

                                        {/* Header/Role Info */}
                                        <li className="px-5 py-3 bg-white/5 border-b border-white/5">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]/60 font-bold">
                                                {user?.role === "admin" ? "Management" : "Account Holder"}
                                            </p>
                                            <p className="text-xs text-white/80 truncate">{user?.email}</p>
                                        </li>

                                        {/* Dynamic Links */}
                                        <div className="py-2">
                                            {userMenuItems[user.role]?.map((item, i) => (
                                                <li key={i}>
                                                    <Link
                                                        href={item.href}
                                                        className="flex items-center gap-3 px-5 py-2.5 text-[13px] text-[#e6c984]/80 hover:bg-[#d4af37]/10 hover:text-white transition-all duration-200"
                                                    >
                                                        <span className="opacity-70 group-hover:opacity-100">{item.icon}</span>
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </div>

                                        {/* Logout Section */}
                                        <li className="border-t border-white/5 mt-1">
                                            <button
                                                onClick={logout}
                                                className="w-full flex items-center gap-3 px-5 py-3 text-[13px] text-red-400/80 hover:bg-red-500/5 hover:text-red-400 transition-all duration-200"
                                            >
                                                <FiLogOut size={14} />
                                                Sign Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-widest text-[#e6c984] hover:text-white transition-all group"
                                >
                                    <FiUser size={18} className="group-hover:scale-110 transition-transform" />
                                    Login
                                </Link>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserMenu;