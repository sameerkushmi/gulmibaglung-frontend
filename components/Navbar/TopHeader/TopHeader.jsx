"use client";

import { useState } from "react";
import { IoCallOutline, IoDiamondOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";
import { BiHomeAlt } from "react-icons/bi";
import Link from "next/link";
import CustomDesignModal from "./CustomDesingModal";
import SellJewelleryModal from "./SellJewelleryModal";

const TopHeader = () => {
    const [open, setOpen] = useState(false);
    const [openSell, setOpenSell] = useState(false);

    return (
        <>
            <nav className="w-full bg-[#0d2b45]/95 backdrop-blur-md text-[#e6c984] border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 h-auto md:h-12 py-2 md:py-0 text-[11px] font-semibold tracking-[0.2em] uppercase">

                        {/* ─── LEFT: CONTACT + TRY AT HOME ─── */}
                        <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">

                            <div className="flex items-center gap-2 group cursor-default transition-all">
                                <IoCallOutline className="text-[#e6c984]/70 group-hover:text-[#e6c984]" size={14} />
                                <span className="tabular-nums text-white/80 group-hover:text-white transition">
                                    {process.env.NEXT_PUBLIC_SUPPORT_NUMBER || "+977-9800000000"}
                                </span>
                            </div>

                            <Link
                                href="/try-at-home"
                                className="flex items-center gap-2 text-white/70 hover:text-[#e6c984] transition group"
                            >
                                <BiHomeAlt className="text-[#e6c984] group-hover:rotate-12 group-hover:scale-110 transition" />
                                Try At Home
                            </Link>
                        </div>

                        {/* ─── RIGHT: ACTIONS ─── */}
                        <div className="flex items-center gap-4 md:gap-8">

                            {/* Custom Design */}
                            <button
                                onClick={() => setOpen(true)}
                                className="flex items-center gap-2 group transition-all"
                            >
                                <HiOutlineSparkles
                                    className="text-[#e6c984] group-hover:rotate-12 group-hover:scale-110 transition"
                                    size={15}
                                />
                                <span className="relative text-white/80 group-hover:text-white">
                                    Custom Design
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#e6c984] transition-all group-hover:w-full" />
                                </span>
                            </button>

                            {/* Divider (hide on mobile) */}
                            <div className="hidden md:block w-[1px] h-4 bg-white/20" />

                            {/* Sell Jewellery */}
                            <button
                                onClick={() => setOpenSell(true)}
                                className="flex items-center gap-2 group transition-all"
                            >
                                <IoDiamondOutline
                                    className="text-[#e6c984]/70 group-hover:text-[#e6c984] transition"
                                    size={14}
                                />
                                <span className="relative text-white/80 group-hover:text-white">
                                    Sell Jewellery
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#e6c984] transition-all group-hover:w-full" />
                                </span>
                            </button>

                        </div>
                    </div>
                </div>

                {/* ✨ Bottom subtle glow line */}
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#e6c984]/40 to-transparent" />
            </nav>

            {/* ─── MODALS ─── */}
            <CustomDesignModal open={open} setOpen={setOpen} />
            <SellJewelleryModal open={openSell} setOpen={setOpenSell} />
        </>
    );
};

export default TopHeader;