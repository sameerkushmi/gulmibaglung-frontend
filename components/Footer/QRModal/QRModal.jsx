import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { FiX } from "react-icons/fi"

const QRModal = ({ activePayment, setActivePayment }) => {
    return (
        <AnimatePresence>
            {activePayment && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 backdrop-blur-md bg-[#0a1f35]/80 flex items-center justify-center p-4"
                    onClick={() => setActivePayment(null)}
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
                        className="bg-[#0f2a47] border border-[#d4af37]/30 rounded-3xl p-8 max-w-sm w-full relative shadow-2xl text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={() => setActivePayment(null)} className="absolute top-4 right-4 text-[#ffffff66] hover:text-[#e6c984]">
                            <FiX size={24} />
                        </button>
                        <h3 className="text-lg font-light tracking-widest mb-6 uppercase text-[#e6c984]">
                            {activePayment.name} Gateway
                        </h3>
                        <div className="relative w-full aspect-square bg-white p-4 rounded-xl shadow-inner">
                            <Image src={activePayment.qr} alt="QR" fill className="object-contain p-2" />
                        </div>
                        <p className="mt-6 text-xs text-[#ffffff88] leading-relaxed">
                            Scan the QR code to complete your luxury purchase securely via {activePayment.name}.
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default QRModal