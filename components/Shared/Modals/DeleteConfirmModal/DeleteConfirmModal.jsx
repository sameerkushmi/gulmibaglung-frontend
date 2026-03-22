"use client";

import { useAuth } from "@/Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiX } from "react-icons/fi";


export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Delete Product",
  description = "Are you sure you want to delete this product? This action cannot be undone.",
}) {

  const { loading } = useAuth()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="bg-[#0d2b45] w-full max-w-md rounded-xl shadow-xl border border-[#d4af37]/30 p-6 relative"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-[#e6c984] hover:text-red-400"
            >
              <FiX size={20} />
            </button>

            {/* Icon */}
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-500/20 text-red-400 mx-auto mb-4">
              <FiTrash2 size={28} />
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
            <p className="text-sm text-center text-[#e6c984] mb-6">
              {description}
            </p>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-md border border-[#d4af37]/30 hover:bg-[#d4af37]/10 transition"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="px-5 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
