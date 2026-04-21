"use client";

import { useState } from "react";
import { IoDiamondOutline } from "react-icons/io5";
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

                    <div className="flex items-center justify-between gap-2 md:gap-0 h-auto md:h-12 py-2 md:py-0 text-[11px] font-semibold tracking-[0.2em] uppercase">

                        {/* ─── TRY AT HOME ─── */}
                        <Link
                            href="/try-at-home"
                            className="flex font-extrabold items-center gap-2 text-white/70 hover:text-[#e6c984] transition group"
                        >
                            <BiHomeAlt className="text-[#e6c984] group-hover:rotate-12 group-hover:scale-110 transition" />
                            Try At Home
                        </Link>

                        {/* Custom Design */}
                        <button
                            onClick={() => setOpen(true)}
                            className="flex font-extrabold items-center gap-2 group transition-all"
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

                        {/* Sell Jewellery */}
                        <button
                            onClick={() => setOpenSell(true)}
                            className="flex font-extrabold items-center gap-2 group transition-all"
                        >
                            <IoDiamondOutline
                                className="text-[#e6c984]/70 group-hover:text-[#e6c984] transition"
                                size={14}
                            />
                            <span className="relative text-white/80 group-hover:text-white">
                                Sell Jewellery/Gold
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#e6c984] transition-all group-hover:w-full" />
                            </span>
                        </button>

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