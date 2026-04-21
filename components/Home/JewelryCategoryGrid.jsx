"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function JewelryCategoryGrid() {
    const router = useRouter();

    const cards = [
        {
            title: "Exclusive Rings",
            image: "/images/products/rings/1.jpg",
            span: "md:col-span-2",
            tint: "bg-[#c7a97a]/30",
            gradient: "from-black/60 via-black/30 to-transparent",
            text: "text-white",
            link: "/products/search?category=rings",
        },
        {
            title: "Earrings",
            image: "/images/products/earrings/1.jpg",
            span: "md:col-span-2",
            tint: "bg-[#d6d3d1]/20",
            gradient: "from-black/50 via-black/20 to-transparent",
            text: "text-white",
            link: "/products/search?category=earrings",
        },
        {
            title: "Gifts",
            image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80",
            span: "md:col-span-2",
            tint: "bg-[#0D2A43]/60",
            gradient: "from-[#0D2A43]/80 via-[#0D2A43]/40 to-transparent",
            text: "text-white",
            link: "/products/search?category=gifts",
        },
        {
            title: "Bracelets",
            image: "/images/products/silver-kada/2/3.png",
            span: "md:col-span-2",
            tint: "bg-[#7c2d12]/40",
            gradient: "from-[#160404]/80 via-[#2a0606]/40 to-transparent",
            text: "text-white",
            link: "/products/search?category=bracelets",
        },
        {
            title: "Bangles",
            image: "/images/products/gold-bala/1/2.png",
            span: "md:col-span-2",
            tint: "bg-[#a16207]/40",
            gradient: "from-[#291400]/80 via-[#533000]/40 to-transparent",
            text: "text-white",
            link: "/products/search?category=bangles",
        },
        {
            title: "Wedding\nJewelry",
            image: "/images/products/mangalsutra/3/1.png",
            span: "md:col-span-2",
            tint: "bg-[#6b21a8]/30",
            gradient: "from-[#1b1024]/80 via-[#351348]/40 to-transparent",
            text: "text-white",
            link: "/products/search?category=jewellery",
        },
    ];

    return (
        <section className="w-full bg-[#0D2B45] px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
                    {cards.map((card, index) => (
                        <article
                            key={index}
                            onClick={() => router.push(card.link)}
                            className={`group cursor-pointer relative min-h-[165px] overflow-hidden rounded-xl ${card.span}`}
                        >
                            {/* Background Image */}
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="absolute inset-0 object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Color Tint */}
                            <div className={`absolute inset-0 ${card.tint}`} />

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient}`} />

                            {/* Soft Dark Overlay */}
                            <div className="absolute inset-0 bg-black/20" />

                            {/* Content */}
                            <div className="relative z-10 flex h-full items-center justify-between p-6 md:p-8">
                                <h3 className={`whitespace-pre-line font-serif text-xl md:text-2xl uppercase tracking-[0.2em] ${card.text}`}>
                                    {card.title}
                                </h3>

                                {/* Floating Product Image */}
                                <div className="relative w-[35%] h-[80px] md:h-[100px]">
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        fill
                                        sizes="35vw"
                                        className="object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
