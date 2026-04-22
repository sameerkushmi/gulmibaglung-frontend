import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const ShopInstagram = () => {

    const images = [
        "/images/instagram/insta-1.jpeg",
        "/images/instagram/insta-2.jpeg",
        "/images/instagram/insta-3.png",
    ]

    return (
        <section className="py-12 md:py-24 bg-[#0d2b45] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[30%] left-[-10%] w-[50%] h-[50%] bg-[#d4af37]/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-8xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <header className="text-center mb-12 md:mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#d4af37] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block"
                    >
                        Follow Us
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl md:text-7xl font-serif text-white mb-8"
                    >
                        Shop Our <span className="text-[#d4af37] italic">Instagram</span>
                    </motion.h2>
                    <div className="w-24 h-[1px] bg-[#d4af37]/40 mx-auto" />
                </header>

                {/* Instagram Grid - Collage Style */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[500px]">

                    {/* Left Large Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="cursor-pointer relative md:col-span-4 h-full rounded-sm overflow-hidden"
                    >
                        <Link href={process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME} target="_blank">
                            <Image
                                src={images[0]}
                                alt="Instagram 1"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="cursor-pointer relative md:col-span-3 flex-1 rounded-sm overflow-hidden"
                    >
                        <Link href={process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME} target="_blank">
                            <Image
                                src={images[1]}
                                alt="Instagram 2"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="cursor-pointer relative flex-1 md:col-span-5 rounded-sm overflow-hidden"
                    >
                        <Link href={process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME} target="_blank">
                            <Image
                                src={images[2]}
                                alt="Instagram 3"
                                fill
                                className="object-cover  hover:scale-105 transition-transform duration-500"
                            />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default ShopInstagram