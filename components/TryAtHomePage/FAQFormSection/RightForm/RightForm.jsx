"use client";

import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin } from "react-icons/fi";

const RightForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, phone, date, message } = formData;

        const whatsappNumber = process.env.NEXT_PUBLIC_SUPPORT_NUMBER; // 👉 replace with your number (Nepal: 977...)

        const text = `
*New Appointment Booking*

👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}
📅 Date: ${date}
📍 Message: ${message}
        `;

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

        window.open(url, "_blank");
    };

    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-[#e6c984]/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                        Book Your Appointment
                    </h3>
                    <p className="text-white/50 text-sm">
                        Fill in your details for a personalized session.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#e6c984]"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white"
                            />
                        </div>

                        <div className="relative">
                            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                            type="date"
                            name="date"
                            onChange={handleChange}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white"
                        />
                    </div>

                    <div className="relative">
                        <FiMapPin className="absolute left-4 top-5 text-white/30" />
                        <textarea
                            name="message"
                            placeholder="Your Address / Special Requests"
                            rows={3}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 bg-[#e6c984] text-[#0d2b45] py-4 rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-[#f2d9a0]"
                    >
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RightForm;