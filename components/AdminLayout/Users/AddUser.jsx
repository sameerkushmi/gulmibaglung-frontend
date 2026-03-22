"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";
import { useAuth } from "@/Context/AuthContext";

const api = Interceptor();

export default function AddUser() {
    const { loading, setLoading } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
        status: "active",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [strengthLabel, setStrengthLabel] = useState("Weak");

    const [passwordRules, setPasswordRules] = useState({
        length: false,
        uppercase: false,
        number: false,
        specialChar: false,
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Update password strength and rules
    useEffect(() => {
        const pwd = formData.password;
        let score = 0;

        const lengthRule = pwd.length >= 8;
        const uppercaseRule = /[A-Z]/.test(pwd);
        const numberRule = /[0-9]/.test(pwd);
        const specialCharRule = /[\W]/.test(pwd);

        if (lengthRule) score += 25;
        if (uppercaseRule) score += 25;
        if (numberRule) score += 25;
        if (specialCharRule) score += 25;

        setPasswordRules({
            length: lengthRule,
            uppercase: uppercaseRule,
            number: numberRule,
            specialChar: specialCharRule,
        });

        setPasswordStrength(score);

        if (score < 50) setStrengthLabel("Weak");
        else if (score < 75) setStrengthLabel("Medium");
        else setStrengthLabel("Strong");
    }, [formData.password]);

    const getStrengthColor = () => {
        if (passwordStrength < 50) return "bg-red-500";
        if (passwordStrength < 75) return "bg-yellow-500";
        return "bg-green-500";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordStrength < 50) {
            toast.error("Password is too weak");
            return;
        }

        setLoading(true);

        try {
            await api.post("/api/user/create", formData);
            toast.success("User created successfully");
            setFormData({ name: "", email: "", password: "", role: "customer", status: "active" });
        } catch (err) {
            console.log(err)
            toast.error("Failed to create user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout
            breadcrumbs={[
                { label: "Dashboard", href: "/admin" },
                { label: "Users", href: "/admin/users" },
                { label: "Add User" },
            ]}
        >
            <div className="max-w-3xl mx-auto p-6 bg-[#0d2b45]/90 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Add New User</h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block mb-1 text-sm">Full Name</label>
                        <div className="relative">
                            <FiUser className="absolute left-3 top-2.5 text-[#d4af37]" />
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37] outline-none"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm">Email</label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-2.5 text-[#d4af37]" />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="user@email.com"
                                className="w-full pl-10 pr-3 py-2 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37] outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-sm">Password</label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-2.5 text-[#d4af37]" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-10 py-2 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37] outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-[#d4af37]"
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        {/* Strength bar */}
                        {formData.password && (
                            <div className="mt-1">
                                <div className="h-2 w-full bg-gray-700 rounded-full">
                                    <div
                                        className={`h-2 rounded-full transition-all ${getStrengthColor()}`}
                                        style={{ width: `${passwordStrength}%` }}
                                    ></div>
                                </div>
                                <p className={`text-sm mt-1 font-semibold ${getStrengthColor()}`}>
                                    {strengthLabel}
                                </p>

                                {/* Password rules */}
                                <ul className="text-xs mt-2 space-y-1">
                                    <li className={passwordRules.length ? "text-green-400" : "text-red-500"}>
                                        • Minimum 8 characters
                                    </li>
                                    <li className={passwordRules.uppercase ? "text-green-400" : "text-red-500"}>
                                        • At least 1 uppercase letter
                                    </li>
                                    <li className={passwordRules.number ? "text-green-400" : "text-red-500"}>
                                        • At least 1 number
                                    </li>
                                    <li className={passwordRules.specialChar ? "text-green-400" : "text-red-500"}>
                                        • At least 1 special character
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block mb-1 text-sm">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full py-2 px-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37] outline-none"
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block mb-1 text-sm">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full py-2 px-3 rounded-md bg-[#071d33] border border-[#d4af37]/30 focus:ring-2 focus:ring-[#d4af37] outline-none"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || passwordStrength < 50}
                        className={`w-full text-black font-semibold py-2 rounded-md transition ${passwordStrength < 50 ? "bg-gray-500 cursor-not-allowed" : "bg-[#d4af37] hover:bg-[#c9a634]"
                            }`}
                    >
                        {loading ? "Creating..." : "Create User"}
                    </button>

                </form>
            </div>
        </AdminLayout>
    );
}
