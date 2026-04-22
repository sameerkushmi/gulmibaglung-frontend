"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiTrendingUp, FiTrendingDown, FiInfo } from "react-icons/fi";
import { useAuth } from "@/Context/AuthContext";

const TOLA_TO_GRAM = 11.664;
const OUNCE_TO_GRAM = 31.1035;

const KARATS = {
    "24K": 1.0,
    "22K": 0.9167,
    "18K": 0.75,
    "14K": 0.5833,
};

export default function LiveMetalPrice() {
    const [prices, setPrices] = useState({ gold: 0, silver: 0 });
    const [prevPrices, setPrevPrices] = useState({ gold: 0, silver: 0 });
    const [unit, setUnit] = useState("tola");
    const [karat, setKarat] = useState("24K");

    const { currency, USD_RATE, EURO_RATE, AUS_RATE, currencyConfig } = useAuth();

    const fetchPrices = async () => {
        try {
            const res = await axios.get(
                "https://gold-silver.sabinmagar.com.np/wp-json/v1/metal-prices/"
            );

            const metals = res.data?.data?.[0] || [];


            const goldChapawal = metals.find(
                (m) => m.metal?.name === "Chapawal Gold"
            );

            const goldTejabi = metals.find(
                (m) => m.metal?.name === "Tejabi Gold"
            );

            const silver = metals.find(
                (m) => m.metal?.name === "Silver"
            );

            // use chapawal as main gold price
            const goldPrice = Number(goldChapawal?.price_per_tola || 0);
            const silverPrice = Number(silver?.price_per_tola || 0);

            setPrevPrices(
                prices.gold === 0
                    ? { gold: goldPrice, silver: silverPrice }
                    : prices
            );

            setPrices({
                gold: goldPrice,
                silver: silverPrice,
            });

        } catch (err) {
            console.error("Fetch failed", err);
        }
    };

    useEffect(() => {
        fetchPrices();
        const interval = setInterval(fetchPrices, 300000); // 5 min
        return () => clearInterval(interval);
    }, []);

    // Convert from NPR per tola → selected unit + karat
    const convertPrice = (price, metalType) => {
        const purity = metalType === "gold" ? KARATS[karat] : 1;

        let result = price;

        if (unit === "gram") {
            result = price / TOLA_TO_GRAM;
        } else if (unit === "ounce") {
            result = (price / TOLA_TO_GRAM) * OUNCE_TO_GRAM;
        }

        result = result * purity;

        // Optional currency conversion
        if (currency === "USD") return result * USD_RATE;
        if (currency === "EUR") return result * EURO_RATE;
        if (currency === "AUD") return result * AUS_RATE;

        return result;
    };

    return (
        <section className="relative py-14 md:py-24 px-4 md:px-6 bg-[#0d2b45] overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4af37]/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#d4af37]/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-16 gap-6 text-center md:text-left">
                    <div>
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="text-[#d4af37] tracking-[0.3em] text-[10px] font-bold uppercase">
                                Market Live
                            </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-6xl font-serif text-white">
                            Gold & Silver Rate
                        </h2>
                    </div>

                    {/* Unit Toggle */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-white/5 p-1.5 md:p-2 rounded-xl md:rounded-2xl border border-white/10 backdrop-blur-md">
                        {["tola", "gram", "ounce"].map((u) => (
                            <button
                                key={u}
                                onClick={() => setUnit(u)}
                                className={`px-4 py-1.5 md:px-6 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold transition-all duration-300 ${unit === u
                                    ? "bg-[#d4af37] text-black scale-105 shadow-lg shadow-[#d4af37]/20"
                                    : "text-white/40 hover:text-white"
                                    }`}
                            >
                                {u.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-start">
                    {/* Price Cards */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <MetalCard
                            name="Gold"
                            price={convertPrice(prices.gold, "gold")}
                            prev={convertPrice(prevPrices.gold, "gold")}
                            symbol={currencyConfig[currency]?.symbol}
                            karat={karat}
                            unit={unit}
                        />

                        <MetalCard
                            name="Silver"
                            price={convertPrice(prices.silver, "silver")}
                            prev={convertPrice(prevPrices.silver, "silver")}
                            symbol={currencyConfig[currency]?.symbol}
                            unit={unit}
                        />
                    </div>

                    {/* Config Panel */}
                    <div className="lg:col-span-4 bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 backdrop-blur-sm">
                        <h4 className="text-white font-serif text-lg md:text-xl mb-5">
                            Configuration
                        </h4>

                        <div className="space-y-6">
                            <div>
                                <label className="text-white/40 text-[10px] uppercase tracking-widest block mb-4">
                                    Select Purity (Karat)
                                </label>

                                <div className="grid grid-cols-2 gap-3">
                                    {Object.keys(KARATS).map((k) => (
                                        <button
                                            key={k}
                                            onClick={() => setKarat(k)}
                                            className={`py-2.5 md:py-3 rounded-lg md:rounded-xl border text-xs md:text-sm transition-all ${karat === k
                                                ? "border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10"
                                                : "border-white/5 text-white/40 hover:border-white/20"
                                                }`}
                                        >
                                            {k}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <div className="flex items-start gap-3 text-white/40 text-xs leading-relaxed">
                                    <FiInfo className="flex-shrink-0 mt-0.5 text-[#d4af37]" />
                                    <p>
                                        Prices are based on Nepal market rates (per tola) and converted to selected units. Jewelry making charges may vary.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MetalCard({ name, price, prev, symbol, karat, unit }) {
    const isUp = price >= prev;
    const change = prev ? (((price - prev) / prev) * 100).toFixed(3) : "0.000";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="group relative bg-gradient-to-b from-white/[0.08] to-transparent p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <h4 className="text-4xl md:text-6xl font-bold text-white font-serif">
                    {name[0]}
                </h4>
            </div>

            <div className="flex justify-between items-start mb-6 md:mb-10">
                <div>
                    <h3 className="text-white/60 text-[10px] md:text-xs tracking-[0.2em] uppercase mb-1">
                        {name} {karat && `— ${karat}`}
                    </h3>

                    <span
                        className={`text-[10px] font-bold ${isUp ? "text-green-400" : "text-red-400"
                            } flex items-center gap-1`}
                    >
                        {isUp ? <FiTrendingUp /> : <FiTrendingDown />}
                        {isUp ? "+" : ""}
                        {change}%
                    </span>
                </div>
            </div>

            <div>
                <span className="text-[#d4af37] text-base md:text-lg mr-2 font-light">
                    {symbol}
                </span>

                <span className="text-2xl sm:text-3xl md:text-5xl text-white font-serif tabular-nums tracking-tighter">
                    {Number(price).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>
            </div>

            <p className="text-white/30 text-[10px] uppercase tracking-widest mt-4">
                Per {unit} price
            </p>

            <div className="mt-6 md:mt-8 h-[2px] w-full bg-white/5 relative overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute h-full bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37] to-[#d4af37]/0"
                />
            </div>
        </motion.div>
    );
}