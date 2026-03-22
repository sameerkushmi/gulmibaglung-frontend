"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function ProductImageGallery({ product }) {

    const [zoomStyle, setZoomStyle] = useState({});
    const [fullscreen, setFullscreen] = useState(false);
    const [active, setActive] = useState(0);
    const [hovered, setHovered] = useState(null);

    const handleMouseMove = (e, index) => {

        const { left, top, width, height } =
            e.currentTarget.getBoundingClientRect();

        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;

        setHovered(index);

        setZoomStyle({
            transformOrigin: `${x}% ${y}%`,
            transform: "scale(2)",
        });
    };

    const resetZoom = () => {
        setHovered(null);
        setZoomStyle({
            transform: "scale(1)",
        });
    };

    return (
        <>
            <div className="lg:col-span-7">

                {/* MOBILE VIEW */}
                <div className="md:hidden overflow-x-auto flex gap-4 snap-x snap-mandatory pb-4">
                    {product.images.map((img, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                setActive(i);
                                setFullscreen(true);
                            }}
                            className="min-w-full snap-center relative aspect-square overflow-hidden border border-white/10"
                        >
                            <Image
                                src={img.url}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* DESKTOP GRID */}
                <div className="hidden md:grid grid-cols-2">

                    {product.images.map((img, i) => (
                        <motion.div
                            key={i}
                            onMouseMove={(e) => handleMouseMove(e, i)}
                            onMouseLeave={resetZoom}
                            className="relative aspect-square overflow-hidden border border-white/10 cursor-zoom-in"
                        >
                            <Image
                                src={img.url}
                                alt={product.name}
                                fill
                                style={hovered === i ? zoomStyle : {}}
                                className="object-cover transition-transform duration-200"
                            />
                        </motion.div>
                    ))}

                </div>

            </div>

            {/* FULLSCREEN MOBILE VIEWER */}
            {fullscreen && (
                <div className="fixed w-screen h-screen inset-0 z-100 bg-black">

                    <button
                        onClick={() => setFullscreen(false)}
                        className="absolute top-6 right-6 text-white text-2xl z-50"
                    >
                        <FaTimes />
                    </button>

                    <div className="h-full w-full flex overflow-x-auto snap-x snap-mandatory">

                        {product.images.map((img, i) => (
                            <div
                                key={i}
                                className="min-w-full relative snap-center"
                            >
                                <Image
                                    src={img.url}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}

                    </div>

                </div>
            )}
        </>
    );
}