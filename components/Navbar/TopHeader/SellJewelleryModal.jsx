"use client"

import { useState, useEffect } from "react"
import { IoCloseOutline, IoLogoWhatsapp } from "react-icons/io5"

const SellJewelleryModal = ({ open, setOpen }) => {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        message: "",
        image: null
    })
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        if (!form.image) {
            setPreview(null)
            return
        }
        const objectUrl = URL.createObjectURL(form.image)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [form.image])

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setForm({
            ...form,
            [name]: files ? files[0] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const phoneNumber = process.env.NEXT_PUBLIC_SUPPORT_NUMBER // Replace with your WhatsApp number

        const text = `
*Sell Jewellery Request*

Name: ${form.name}
Phone: ${form.phone}
Address: ${form.address}

Message:
${form.message}
`

        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`
        window.open(whatsappURL, "_blank")
    }

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
        >
            <div
                className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-4 sm:p-6 relative overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <IoCloseOutline size={28} />
                </button>

                <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center">
                    Sell Your Jewellery
                </h2>
                <p className="text-sm text-gray-500 text-center mb-4">
                    Upload your jewellery details and our team will contact you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 text-sm outline-none focus:border-amber-500"
                    />

                    {/* Phone */}
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 text-sm outline-none focus:border-amber-500"
                    />

                    {/* Address */}
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        required
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 text-sm outline-none focus:border-amber-500"
                    />

                    {/* Message */}
                    <textarea
                        name="message"
                        placeholder="Jewellery details (weight, type, gold, etc)"
                        rows="3"
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 text-sm outline-none focus:border-amber-500"
                    />

                    {/* Image Upload */}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full text-sm"
                    />

                    {/* Preview */}
                    {preview && (
                        <div className="mt-2 w-full h-40 sm:h-48 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                            <img
                                src={preview}
                                alt="Jewellery Preview"
                                className="object-contain w-full h-full"
                            />
                        </div>
                    )}

                    <p className="text-xs text-gray-400 mt-1">
                        After opening WhatsApp, please attach the jewellery image if needed.
                    </p>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition"
                    >
                        <IoLogoWhatsapp size={18} />
                        Send to WhatsApp
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SellJewelleryModal