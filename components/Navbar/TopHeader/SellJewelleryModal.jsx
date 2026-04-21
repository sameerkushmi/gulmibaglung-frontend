"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline, IoLogoWhatsapp, IoCloudUploadOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const SellJewelleryModal = ({ open, setOpen }) => {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    message: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  useEffect(() => {
    if (!form.image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(form.image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [form.image]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = process.env.NEXT_PUBLIC_SUPPORT_NUMBER;
    const text = `*Sell Jewellery Request*\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Address:* ${form.address}\n\n*Details:*\n${form.message}`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, "_blank");
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Elegant Header Background */}
            <div className="bg-[#FAF9F6] border-b border-gray-100 px-8 py-6 text-center">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-amber-700 transition-colors"
              >
                <IoCloseOutline size={28} />
              </button>
              <h2 className="text-2xl font-serif text-gray-800 tracking-tight sm:text-3xl">
                Valuation Request
              </h2>
              <div className="mt-1 flex justify-center">
                <div className="h-[1px] w-12 bg-amber-600/40"></div>
              </div>
              <p className="mt-3 text-xs uppercase tracking-widest text-gray-500 font-medium">
                Exclusive Jewellery Buy-Back
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Input Group */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 bg-transparent py-2 px-1 text-sm outline-none focus:border-amber-600 transition-colors placeholder:text-gray-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 bg-transparent py-2 px-1 text-sm outline-none focus:border-amber-600 transition-colors placeholder:text-gray-300"
                    placeholder="+1 234..."
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Location</label>
                <input
                  type="text"
                  name="address"
                  required
                  onChange={handleChange}
                  className="w-full border-b border-gray-200 bg-transparent py-2 px-1 text-sm outline-none focus:border-amber-600 transition-colors placeholder:text-gray-300"
                  placeholder="Street address, City"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Item Details</label>
                <textarea
                  name="message"
                  rows="2"
                  onChange={handleChange}
                  className="w-full border-b border-gray-200 bg-transparent py-2 px-1 text-sm outline-none focus:border-amber-600 transition-colors placeholder:text-gray-300 resize-none"
                  placeholder="Carat, weight, or certificate details..."
                />
              </div>

              {/* Custom Image Upload */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Upload Photo</label>
                <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-all overflow-hidden group">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <IoCloudUploadOutline className="text-amber-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
                      <span className="text-xs text-gray-400 font-medium">Click to upload image</span>
                    </div>
                  )}
                  <input type="file" name="image" accept="image/*" onChange={handleChange} className="hidden" />
                </label>
              </div>

              {/* Submit Section */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full group relative flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white font-medium py-4 rounded-xl transition-all shadow-xl active:scale-[0.98]"
                >
                  <IoLogoWhatsapp size={20} className="text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="tracking-wide">Submit for Valuation</span>
                </button>
                <p className="mt-4 text-center text-[10px] text-gray-400 leading-relaxed italic">
                  *Please attach high-quality images in the WhatsApp chat for a precise quote.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SellJewelleryModal;