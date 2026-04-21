"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline, IoLogoWhatsapp, IoLocationOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";
import Link from "next/link";

const CustomDesignModal = ({ open, setOpen }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow || "auto";
        };
    }, [open]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] md:max-h-[90vh] md:flex-row md:rounded-[2rem]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-4 right-4 z-20 rounded-full border border-white/20 bg-white/50 p-2 text-stone-400 shadow-sm backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:text-stone-900"
                        >
                            <IoCloseOutline size={28} />
                        </button>

                        <div className="hidden lg:flex relative h-[180px] w-full overflow-hidden sm:h-[220px] md:h-auto md:w-1/2 group">
                            <Image
                                src="/images/navbar/top-header/design-banner.jpg"
                                alt="Jewellery Crafting"
                                fill
                                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                                priority
                            />
                            <div className="absolute inset-0 bg-stone-900/10" />
                        </div>

                        <div className="max-h-[90vh] w-full overflow-y-auto bg-gradient-to-br from-white to-stone-50 p-6 sm:p-8 md:w-1/2 md:p-16">
                            <div className="mb-4 flex items-center gap-2 text-amber-600">
                                <HiOutlineSparkles size={18} />
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                                    Custom Jewellery Service
                                </span>
                            </div>

                            <h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-stone-900 sm:text-3xl md:text-4xl">
                                Custom Jewellery <span className="italic font-normal">Design</span> <br />
                                Consultation
                            </h2>

                            <p className="mb-10 text-[15px] font-light leading-relaxed text-stone-500">
                                Design your own custom gold and diamond jewellery with our expert designers in Nepal. Book a personalised consultation to create rings, necklaces, or bridal jewellery tailored to your style and budget. Available online or in-store.
                            </p>

                            <div className="mb-8 flex items-center gap-4 rounded-3xl border border-stone-100 bg-white p-4 transition-all sm:gap-6 sm:p-5 md:p-6">

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                                        <IoLogoWhatsapp className="text-emerald-500" size={18} />
                                        Quick Jewellery Consultation
                                    </div>
                                    <p className="text-[13px] font-medium text-stone-400">
                                        WhatsApp • Viber • Messenger
                                    </p>
                                    <p className="mt-1 text-[11px] uppercase tracking-wider text-stone-400">
                                        9am – 6pm • Open 365 Days
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
                                <Link
                                    href="/contact-us"
                                    onClick={() => setOpen(false)}
                                    className="group relative overflow-hidden rounded-full bg-stone-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:shadow-2xl active:scale-95 sm:px-8 text-[11px]"
                                >
                                    <span className="relative z-10">Start Consultation</span>
                                    <div className="absolute inset-0 translate-y-full bg-amber-700 transition-transform duration-300 group-hover:translate-y-0" />
                                </Link>

                                <Link
                                    target="_blank"
                                    href="https://www.google.com/maps/place/Gulmi+Baglung+Jewellers/@27.7381912,85.3358145,15.95z/data=!4m6!3m5!1s0x39eb19e4389e4971:0xa770f31db7c3a4c7!8m2!3d27.7400235!4d85.3367106!16s%2Fg%2F11yshh5v9g?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D"
                                    className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400 transition-colors hover:text-stone-900"
                                >
                                    <IoLocationOutline
                                        size={18}
                                        className="transition-transform group-hover:-translate-y-1"
                                    />
                                    View Store Location
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default CustomDesignModal;