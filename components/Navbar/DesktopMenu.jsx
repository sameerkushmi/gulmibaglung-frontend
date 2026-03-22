import Link from "next/link";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import MenuItems from "./MenuItems";

const DesktopMenu = () => {
    return (
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-[12px] lg:text-[13px] uppercase tracking-[0.2em] font-medium">
            {MenuItems.map((item) => (
                <li key={item.name} className="group py-6 lg:py-8">

                    {/* Top Level Link */}
                    <div className="flex items-center gap-1.5 cursor-pointer text-[#e6c984] hover:text-white transition-all duration-500">
                        <span className="relative">
                            {item.name}

                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gradient-to-r from-[#d4af37] via-[#f9e5af] to-[#d4af37] transition-all duration-500 group-hover:w-full"></span>
                        </span>

                        {item.submenu && (
                            <FiChevronDown className="text-[10px] opacity-40 group-hover:rotate-180 group-hover:opacity-100 transition-all duration-500" />
                        )}
                    </div>

                    {/* Mega Menu */}
                    {item.submenu && (
                        <div className="fixed left-1/2 max-w-screen -translate-x-1/2 top-30 
                        w-[95vw] max-w-[1100px] 
                        bg-[#0d2b45]/98 backdrop-blur-xl 
                        border border-white/5 
                        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] 
                        opacity-0 invisible -translate-y-2 
                        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 
                        transition-all duration-300 z-50 overflow-hidden">

                            <div className="grid grid-cols-12 gap-4 lg:gap-6">

                                {/* LINKS */}
                                <div className="col-span-12 lg:col-span-6 p-4 lg:p-6 grid grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-3 lg:gap-y-4 max-h-[400px] overflow-y-auto">
                                    <h5 className="text-[#e6c984] col-span-2 text-[12px] uppercase mb-2 tracking-widest">
                                        Shop By Style
                                    </h5>
                                    {item.submenu.map((sub, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            {sub.image && (
                                                <Image
                                                    src={sub.image}
                                                    alt={sub.label}
                                                    width={50}
                                                    height={50}
                                                    className="w-8 h-8 lg:w-10 lg:h-10 object-cover"
                                                />
                                            )}

                                            <Link
                                                href={sub.path}
                                                className="group/link flex items-center text-[#e6c984]/70 hover:text-white text-[11px] lg:text-[12px] tracking-widest transition-all duration-300"
                                            >
                                                <span className="w-0 h-[1px] bg-[#d4af37] mr-0 group-hover/link:w-3 group-hover/link:mr-3 transition-all duration-300"></span>
                                                {sub.label}
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                {/* SHOP BY */}
                                <div className="hidden lg:block col-span-3 py-6 px-2">
                                    {
                                        item.submenu.label === "Earrings" || item.submenu.label === "More Jewellery" ?
                                            (
                                                <>
                                                </>
                                            ) : (
                                                <>
                                                    <h5 className="text-[#e6c984] text-[12px] uppercase mb-2 tracking-widest">
                                                        Shop By Preference
                                                    </h5>

                                                    <ul className="text-[11px] text-[#e6c984]/70 space-y-1">
                                                        <li><Link href="/products/search" className="hover:text-white">For Men</Link></li>
                                                        <li><Link href="/products/search" className="hover:text-white">For Women</Link></li>
                                                        <li><Link href="/products/search" className="hover:text-white">For Kids</Link></li>
                                                    </ul>
                                                </>
                                            )
                                    }


                                    <h5 className="text-[#e6c984] text-[12px] uppercase mt-4 mb-2 tracking-widest">
                                        Shop By Price
                                    </h5>

                                    <ul className="text-[11px] text-[#e6c984]/70 space-y-1">
                                        <li><Link href="/products/search">Below Rs. 10,000</Link></li>
                                        <li><Link href="/products/search">Rs. 10k – 20k</Link></li>
                                        <li><Link href="/products/search">Rs. 20k – 50k</Link></li>
                                        <li><Link href="/products/search">Rs. 50k – 1L</Link></li>
                                        <li><Link href="/products/search">Rs. 1L – 2L</Link></li>
                                        <li><Link href="/products/search">Above Rs. 2L</Link></li>
                                    </ul>
                                </div>

                                {/* FEATURED IMAGE */}
                                <div className="hidden xl:block col-span-3 relative overflow-hidden group/image min-h-[300px]">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-[2s] ease-out group-hover/image:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2b45] via-transparent to-transparent opacity-80" />

                                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                                        <p className="text-white text-[10px] uppercase tracking-[0.3em] mb-2 opacity-70">
                                            Curated Selection
                                        </p>

                                        <h4 className="text-white text-lg font-light tracking-wide italic">
                                            The {item.name} Series
                                        </h4>

                                        <div className="mt-3 w-10 h-[1px] bg-[#d4af37]"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default DesktopMenu;