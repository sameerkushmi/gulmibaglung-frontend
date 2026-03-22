import { motion } from "framer-motion"

const HeroHeader = () => {
    return (
        <div className="pt-32 pb-16 px-6 text-center bg-[#0d2b45">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-serif mb-4 tracking-tight"
            >
                The <span className="text-[#d4af37] italic">Collection</span>
            </motion.h1>
            <p className="text-gray-400 max-w-xl mx-auto font-light tracking-widest uppercase text-xs">
                Timeless Elegance • Handcrafted Mastery • Ethical Luxury
            </p>
        </div>
    )
}

export default HeroHeader