import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Logo = ({ scrolled }) => {
    return (
        <motion.div
            animate={{ scale: scrolled ? 0.9 : 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2
                 transition-all duration-300
                 hover:scale-110
                 md:hover:scale-110
                 hover:scale-100"
        >
            <Link href="/" className="flex items-center">
                <Image
                    src="/images/logo/arc_logo.png"
                    alt="logo"
                    width={100}
                    height={100}
                    priority
                    className="
            object-contain
            w-[55px] h-auto
            sm:w-[65px]
            md:w-[80px]
          "
                />
            </Link>
        </motion.div>
    );
};

export default Logo;
