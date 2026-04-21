"use client";

import { AnimatePresence, motion } from "framer-motion";
import { IoCloseOutline, IoCheckmarkCircle } from "react-icons/io5";

function CustomizeDrawer({ open, setOpen, form, handleChange }) {
    const metalOptions = ["14 KT Gold", "18 KT Gold", "Rose Gold", "White Gold"];
    const sizeOptions = ["5", "6", "7", "8", "9", "10"];
    const diamondOptions = ["FG-SI", "VVS", "VS"];

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Overlay with high-end blur */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9998]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-[#0d1b2a] z-[9999] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l border-white/10 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 flex items-center justify-between border-b border-white/5">
                            <div>
                                <h2 className="text-2xl font-serif text-[#e0e1dd] tracking-tight">
                                    Personalize Piece
                                </h2>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500/80 font-semibold mt-1">
                                    Bespoke Craftsmanship
                                </p>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/50 hover:text-white"
                            >
                                <IoCloseOutline size={32} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">

                            {/* METAL SELECTOR (Visual) */}
                            <section className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Select Metal</label>
                                    <span className="text-[10px] text-amber-500 font-mono italic">{form.metal}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {metalOptions.map((metal) => (
                                        <button
                                            key={metal}
                                            onClick={() => handleChange("metal", metal)}
                                            className={`relative py-4 px-3 rounded-xl border text-sm transition-all duration-300 ${form.metal === metal
                                                    ? "border-amber-500 bg-amber-500/10 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                                                    : "border-white/5 bg-white/5 text-white/40 hover:border-white/20"
                                                }`}
                                        >
                                            {metal}
                                            {form.metal === metal && (
                                                <motion.div layoutId="check" className="absolute top-2 right-2 text-amber-500">
                                                    <IoCheckmarkCircle size={14} />
                                                </motion.div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* SIZE SELECTOR (Grid) */}
                            <section className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Ring Size (US)</label>
                                <div className="flex flex-wrap gap-3">
                                    {sizeOptions.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => handleChange("size", size)}
                                            className={`w-12 h-12 rounded-full border flex items-center justify-center text-sm transition-all ${form.size === size
                                                    ? "border-amber-500 bg-amber-500 text-black font-bold scale-110"
                                                    : "border-white/10 text-white/60 hover:border-white/40"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* DIAMOND QUALITY (Modern Pills) */}
                            <section className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Diamond Grade</label>
                                <div className="flex gap-2 p-1 bg-black/20 rounded-2xl">
                                    {diamondOptions.map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => handleChange("diamond", q)}
                                            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${form.diamond === q
                                                    ? "bg-white/10 text-white shadow-inner"
                                                    : "text-white/30 hover:text-white/60"
                                                }`}
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Footer Action */}
                        <div className="p-8 bg-black/20 border-t border-white/5 backdrop-blur-xl">
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                                >
                                    Discard
                                </button>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="flex-[2] bg-gradient-to-r from-amber-600 to-amber-400 text-[#0d1b2a] font-bold py-4 rounded-xl shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs"
                                >
                                    Apply Settings
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default CustomizeDrawer;