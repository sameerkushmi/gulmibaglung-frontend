"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useAuth } from "@/Context/AuthContext";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Interceptor from "@/utils/Interceptor";
import formatPrice from "@/utils/formatPrice";

// React Icons
import { FaShieldAlt, FaWhatsapp } from "react-icons/fa";
import { MdOutlineLocalShipping, MdOutlinePayment } from "react-icons/md";
import { RiBankCardLine, RiShoppingBag3Line } from "react-icons/ri";
import { IoCheckmarkCircle } from "react-icons/io5";

const api = Interceptor();

export default function Checkout() {
    const {
        cart,
        USD_RATE,
        EURO_RATE,
        AUS_RATE,
        currency,
        currencyConfig,
        user,
        handleEsewaPay,
        handleKhaltiPay,
        handleStripePay,
    } = useAuth();

    const searchParams = useSearchParams();
    const buyNow = searchParams.get("buyNow") === "true";
    const productId = searchParams.get("productId");

    const [singleProduct, setSingleProduct] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "", email: "", phone: "", address: "", city: "", country: "", zip: ""
    });

    const [selectedPayment, setSelectedPayment] = useState("esewa");

    const PAYMENT_METHODS = [
        { id: "esewa", label: "eSewa", logo: "/images/payment-logo/esewa.png" },
        { id: "khalti", label: "Khalti", logo: "/images/payment-logo/khalti.png" },
        { id: "stripe", label: "Stripe", logo: "/images/payment-logo/Stripe-Emblem.png" },
    ];

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                city: user.city || "",
                country: user.country || "",
                zip: user.zip || ""
            });
        }
    }, [user]);

    useEffect(() => {
        if (buyNow && productId) {
            (async () => {
                try {
                    const { data } = await api.get(`/api/products/get-byId/${productId}`);
                    setSingleProduct(data);
                } catch (err) {
                    toast.error("Failed to load product");
                }
            })();
        }
    }, [buyNow, productId]);

    const handleInputChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const getUnitPrice = (product) =>
        product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.price;

    const totalPrice = useMemo(() => {
        if (buyNow && singleProduct) return getUnitPrice(singleProduct);
        return cart?.items?.reduce((acc, item) => acc + getUnitPrice(item.product) * item.quantity, 0);
    }, [cart?.items, buyNow, singleProduct]);

    const validateForm = () => {
        const required = ["fullName", "email", "address", "city", "country", "zip"];
        const isInvalid = required.some(field => !formData[field]);
        if (isInvalid) {
            toast.error("Please complete all required shipping fields.");
            return false;
        }
        return true;
    };

    const handlePayment = () => {
        if (!validateForm()) return;
        const products = buyNow ? [{ _id: singleProduct._id, quantity: 1, name: singleProduct.name }] :
            cart.items.map(i => ({ _id: i.product._id, quantity: i.quantity, name: i.product.name }));

        const handlers = { esewa: handleEsewaPay, khalti: handleKhaltiPay, stripe: handleStripePay };
        handlers[selectedPayment](products, formData);
    };

    const handleWhatsAppPreBook = () => {
        if (!validateForm()) return;
        const phone = process.env.NEXT_PUBLIC_SUPPORT_NUMBER;
        const message = `✨ *New Order Request*\n\nCustomer: ${formData.fullName}\nTotal: ${formatPrice(totalPrice, { USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig })}`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
    };

    if ((!buyNow && !cart.items?.length) || (buyNow && !singleProduct)) {
        return (
            <div className="min-h-screen bg-[#0d2b45] flex flex-col items-center justify-center text-[#e6c984]">
                <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="tracking-widest uppercase text-xs opacity-70">Securing Session...</p>
            </div>
        );
    }

    const itemsToRender = buyNow ? [{ product: singleProduct, quantity: 1 }] : cart.items;

    return (
        <section className="min-h-screen bg-[#0d2b45] bg-[radial-gradient(ellipse_at_top,_#1a456d_0%,_#0d2b45_100%)] pb-20 pt-32 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT: FORM DATA */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-[#ffffff03] backdrop-blur-xl border border-[#ffffff10] rounded-3xl p-8 shadow-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <MdOutlineLocalShipping className="text-[#d4af37] text-3xl" />
                                <h2 className="text-2xl font-bold text-[#e6c984] tracking-tight">Shipping Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <PremiumInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your name" fullWidth />
                                <PremiumInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="email@example.com" />
                                <PremiumInput label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+977" />
                                <PremiumInput label="Street Address" name="address" value={formData.address} onChange={handleInputChange} placeholder="House no, Street..." fullWidth />
                                <PremiumInput label="City" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
                                <PremiumInput label="ZIP Code" name="zip" value={formData.zip} onChange={handleInputChange} placeholder="0000" />
                                <PremiumInput label="Country" name="country" value={formData.country} onChange={handleInputChange} placeholder="Country" fullWidth />
                            </div>
                        </div>

                        <div className="bg-[#ffffff03] backdrop-blur-xl border border-[#ffffff10] rounded-3xl p-8 shadow-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <RiBankCardLine className="text-[#d4af37] text-3xl" />
                                <h2 className="text-2xl font-bold text-[#e6c984] tracking-tight">Payment Method</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {PAYMENT_METHODS.map((method) => (
                                    <div
                                        key={method.id}
                                        onClick={() => setSelectedPayment(method.id)}
                                        className={`group cursor-pointer relative p-5 rounded-2xl border transition-all duration-300 ${selectedPayment === method.id
                                                ? "border-[#d4af37] bg-[#d4af3708]"
                                                : "border-[#ffffff08] bg-[#ffffff02] hover:border-[#ffffff20]"
                                            }`}
                                    >
                                        <div className="h-8 w-full relative mb-3 overflow-hidden">
                                            <Image src={method.logo} alt={method.label} fill className={`object-contain transition-all duration-500 ${selectedPayment === method.id ? "grayscale-0" : "grayscale opacity-40 group-hover:opacity-100"}`} />
                                        </div>
                                        <p className={`text-center text-[10px] font-black uppercase tracking-widest ${selectedPayment === method.id ? "text-[#d4af37]" : "text-[#ffffff30]"}`}>
                                            {method.label}
                                        </p>
                                        {selectedPayment === method.id && <IoCheckmarkCircle className="absolute top-2 right-2 text-[#d4af37]" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: SUMMARY */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32">
                        <div className="bg-[#0D2B45] border border-[#d4af3720] rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#ffffff08]">
                                <RiShoppingBag3Line className="text-[#d4af37] text-2xl" />
                                <h2 className="text-xl font-bold text-[#e6c984]">Your Selection</h2>
                            </div>

                            <div className="space-y-5 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {itemsToRender.map((item) => (
                                    <div key={item.product._id} className="flex gap-4">
                                        <div className="relative w-16 h-16 bg-[#0d2b45] rounded-xl border border-[#ffffff08] p-1 flex-shrink-0">
                                            <Image src={item.product.images[0]?.url || "/images/fallback.png"} alt={item.product.name} width={64} height={64} className="object-cover w-full h-full rounded-lg" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className="text-[#e6c984] text-sm font-medium leading-tight line-clamp-1">{item.product.name}</h4>
                                            <p className="text-[#ffffff40] text-xs mt-1">Qty: {item.quantity}</p>
                                            <p className="text-[#d4af37] text-sm font-bold mt-0.5">
                                                {formatPrice(getUnitPrice(item.product) * item.quantity, { USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 py-6 border-t border-[#ffffff08]">
                                <div className="flex justify-between text-[#ffffff60] text-sm tracking-wide">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(totalPrice, { USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig })}</span>
                                </div>
                                <div className="flex justify-between text-[#ffffff60] text-sm tracking-wide">
                                    <span>Shipping</span>
                                    <span className="text-[#d4af37] text-[10px] font-bold uppercase tracking-tighter">Luxury Standard (Free)</span>
                                </div>
                                <div className="flex justify-between items-end pt-4">
                                    <span className="text-[#e6c984] font-bold uppercase text-xs tracking-[0.2em]">Grand Total</span>
                                    <span className="text-3xl font-serif font-bold text-[#d4af37]">
                                        {formatPrice(totalPrice, { USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig })}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 mt-8">
                                <button onClick={handlePayment} className="group relative overflow-hidden w-full py-4 bg-[#d4af37] text-[#0a1f35] rounded-xl font-black uppercase tracking-[0.15em] text-sm transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] active:scale-95">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Complete Purchase <MdOutlinePayment size={18} />
                                    </span>
                                    <div className="absolute inset-0 bg-[#e6c984] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>

                                <button onClick={handleWhatsAppPreBook} className="w-full py-4 bg-transparent border border-[#25d36660] text-[#25d366] rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[#25d36610] transition-colors">
                                    <FaWhatsapp size={16} /> Pre-Book on WhatsApp
                                </button>
                            </div>

                            <div className="mt-8 flex items-center justify-center gap-2 text-[#ffffff20] text-[10px] uppercase font-bold tracking-widest">
                                <FaShieldAlt /> 256-bit Secure Transaction
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #d4af3740; border-radius: 10px; }
            `}</style>
        </section>
    );
}

// Sub-component for clean code
function PremiumInput({ label, fullWidth, ...props }) {
    return (
        <div className={`flex flex-col gap-1.5 ${fullWidth ? "md:col-span-2" : ""}`}>
            <label className="text-[#ffffff40] text-[10px] font-black uppercase tracking-widest ml-1">{label}</label>
            <input
                {...props}
                className="w-full p-4 rounded-xl bg-[#ffffff05] text-[#e6c984] border border-[#ffffff10] focus:border-[#d4af37] focus:ring-0 outline-none transition-all placeholder:text-[#ffffff10] text-sm"
            />
        </div>
    );
}