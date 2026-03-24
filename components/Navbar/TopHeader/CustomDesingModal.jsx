"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
// Using IonIcons and HeroIcons for a high-end feel
import { IoCloseOutline, IoLogoWhatsapp, IoLocationOutline } from "react-icons/io5"
import { HiOutlineSparkles } from "react-icons/hi2"
import Link from "next/link"

const CustomDesignModal = ({ open, setOpen }) => {
    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    {/* Backdrop with high-end blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        className="relative w-full max-w-5xl overflow-hidden bg-white 
                            shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] 
                            rounded-2xl md:rounded-[2rem] 
                            flex flex-col md:flex-row 
                            max-h-[90vh] md:max-h-none 
                            overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Elegant Close Button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute z-20 p-2 transition-all duration-300 bg-white/50 backdrop-blur-md rounded-full top-6 right-6 text-stone-400 hover:text-stone-900 hover:rotate-90 shadow-sm border border-white/20"
                        >
                            <IoCloseOutline size={28} />
                        </button>

                        {/* Left Section: Immersive Visual */}
                        <div className="relative w-full md:w-1/2 h-[180px] sm:h-[220px] md:h-auto group overflow-hidden">                            <Image
                            src="/images/navbar/top-header/design-banner.jpg"
                            alt="Jewellery Crafting"
                            fill
                            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                            priority
                        />
                            <div className="absolute inset-0 bg-stone-900/10" />
                        </div>

                        {/* Right Section: Content & Action */}
                        <div className="flex flex-col justify-center w-full 
                            p-6 sm:p-8 md:p-16 
                            md:w-1/2 
                            bg-gradient-to-br from-white to-stone-50"
                        >
                            <div className="flex items-center gap-2 mb-4 text-amber-600">
                                <HiOutlineSparkles size={18} />
                                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                                    Atelier Service
                                </span>
                            </div>

                            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-stone-900 font-serif">                                Bespoke <span className="italic font-normal">Design</span> <br />
                                Consultation
                            </h2>

                            <p className="mb-10 text-stone-500 leading-relaxed font-light text-[15px]">
                                Collaborate with our master designers via live video to create an exclusive masterpiece. Experience luxury craftsmanship from the comfort of your home.
                            </p>

                            {/* QR Contact Card */}
                            <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 md:p-6 mb-8 transition-all border border-stone-100 rounded-3xl bg-white">                                <div className="relative p-2 bg-stone-50 rounded-2xl border border-stone-100">
                                <Image
                                    src="/whatsapp-qr.png"
                                    alt="WhatsApp Contact"
                                    width={70}
                                    height={70}
                                    className="rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                                        <IoLogoWhatsapp className="text-emerald-500" size={18} />
                                        Instant Access
                                    </div>
                                    <p className="text-[13px] text-stone-400 font-medium">
                                        WhatsApp • Viber • Messenger
                                    </p>
                                    <p className="text-[11px] uppercase tracking-wider text-stone-400 mt-1">
                                        9am – 6pm • Open 365 Days
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Actions */}
                            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
                                <Link href={'/contact-us'} onClick={() => setOpen(false)} className="relative px-6 sm:px-8 py-3 text-[11px] overflow-hidden text-xs font-bold tracking-widest text-white uppercase transition-all bg-stone-900 rounded-full group hover:shadow-2xl active:scale-95">
                                    <span className="relative z-10">Start Consultation</span>
                                    <div className="absolute inset-0 transition-transform translate-y-full bg-amber-700 group-hover:translate-y-0 duration-300" />
                                </Link >

                                <Link target="_blank" href="https://www.google.com/maps/place/Gulmi+Baglung+Jewellers/@27.7381912,85.3358145,15.95z/data=!4m6!3m5!1s0x39eb19e4389e4971:0xa770f31db7c3a4c7!8m2!3d27.7400235!4d85.3367106!16s%2Fg%2F11yshh5v9g?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D" className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-stone-400 hover:text-stone-900 transition-colors group">
                                    <IoLocationOutline size={18} className="transition-transform group-hover:-translate-y-1" />
                                    View Store Location
                                </Link >
                            </div>

                        </div>
                    </motion.div>
                </div>
            )
            }
        </AnimatePresence >
    )
}

export default CustomDesignModal