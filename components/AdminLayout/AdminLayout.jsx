"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiHome,
    FiUsers,
    FiBox,
    FiShoppingCart,
    FiLogOut,
    FiMenu,
    FiChevronDown,
    FiBell,
    FiBook,
    FiMail,
    FiCreditCard,
    FiX,
} from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/Context/AuthContext";
import Loading from "../Shared/Loading/Loading";
import Interceptor from "@/utils/Interceptor";
import socket from "@/utils/socket";
import toast from "react-hot-toast";

const api = Interceptor()

export default function AdminLayout({ children, breadcrumbs = [] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [desktopCollapsed, setDesktopCollapsed] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState({});
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const { user, logout, checkAdmin } = useAuth();
    const [isMounted, setIsMounted] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);


    // Ref for notification drawer
    const notificationRef = useRef();

    useEffect(() => {
        checkAdmin();
        setIsMounted(true);
    }, []);

    // Close notification drawer when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setNotificationsOpen(false);
            }
        };
        if (notificationsOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [notificationsOpen]);

    const adminLinks = [
        { label: "Dashboard", href: "/admin", icon: <FiHome /> },
        {
            label: "Manage Products",
            icon: <FiBox />,
            submenu: [
                { label: "Add Product", href: "/admin/products/add" },
                { label: "All Products", href: "/admin/products" },
            ],
        },
        {
            label: "Manage Orders",
            icon: <FiShoppingCart />,
            submenu: [
                { label: "Pending Orders", href: "/admin/orders/pending" },
                { label: "Completed Orders", href: "/admin/orders/completed" },
                { label: "Canceled Orders", href: "/admin/orders/canceled" },
                { label: "All Orders", href: "/admin/orders" },
            ],
        },
        {
            label: "Manage Blogs",
            icon: <FiBook />,
            submenu: [
                { label: "Add Blog", href: "/admin/blogs/add" },
                { label: "All Blogs", href: "/admin/blogs" },
            ],
        },
        {
            label: "Manage Users",
            icon: <FiUsers />,
            submenu: [
                { label: "Add User", href: "/admin/users/add" },
                { label: "All Users", href: "/admin/users" },
            ],
        },
        {
            label: "Payments", icon: <FiCreditCard />,
            submenu: [
                { label: "Payment Analytics", href: "/admin/payments/payment-analytics" },
                { label: "Payment logs", href: "/admin/payments/payment-logs" },
            ],
        },
        {
            label: "Newsletter Subscribers",
            href: "/admin/subscribe",
            icon: <FiMail />
        },
    ];

    const toggleSubmenu = (label) => {
        setSubmenuOpen((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const SidebarLink = ({ link }) => (
        <div>
            {link.submenu ? (
                <>
                    <div
                        className={`flex items-center justify-between p-3 hover:bg-[#d4af37]/10 transition rounded-md cursor-pointer ${desktopCollapsed ? "justify-center" : ""
                            }`}
                        onClick={() => toggleSubmenu(link.label)}
                    >
                        <div className={`flex items-center gap-3 ${desktopCollapsed ? "justify-center" : ""}`}>
                            {link.icon}
                            {!desktopCollapsed && <span>{link.label}</span>}
                        </div>
                        {!desktopCollapsed && (
                            <FiChevronDown
                                className={`transition-transform ${submenuOpen[link.label] ? "rotate-180" : ""
                                    }`}
                            />
                        )}
                    </div>
                    <AnimatePresence>
                        {submenuOpen[link.label] && !desktopCollapsed && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="flex flex-col pl-10"
                            >
                                {link.submenu.map((sublink) => (
                                    <Link
                                        key={sublink.href}
                                        href={sublink.href}
                                        className="p-2 text-sm hover:text-[#d4af37] transition rounded-md"
                                    >
                                        {sublink.label}
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <Link
                    href={link.href}
                    className={`flex items-center gap-3 p-3 hover:bg-[#d4af37]/10 transition rounded-md ${desktopCollapsed ? "justify-center" : ""
                        }`}
                >
                    {link.icon}
                    {!desktopCollapsed && <span>{link.label}</span>}
                </Link>
            )}
        </div>
    );

    useEffect(() => {
        socket.on("new-notification", (data) => {
            setNotifications((prev) => [data, ...prev]);
            setUnreadCount((prev) => prev + 1);
            toast.success(data.title);
        });

        return () => {
            socket.off("new-notification");
        };
    }, []);


    const fetchNotifications = async () => {
        try {
            const res = await api.get('/api/notifications/get-all');
            setNotifications(res.data.notifications);
            setUnreadCount(res.data.unreadCount);
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleNotificationClick = async () => {
        setNotificationsOpen((prev) => !prev);
        setUnreadCount(0); // 👈 clear badge count
        await api.patch('/api/notifications/mark-all-read');
    };


    if (!isMounted || user?.role !== 'admin') return null;

    return (
        <div className="flex h-screen bg-[#071d33] text-[#e6c984]">
            {!user && <Loading />}

            {/* Mobile Overlay Sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween" }}
                            className="fixed top-0 left-0 h-full w-72 bg-[#0d2b45] border-r border-[#d4af37]/30 flex flex-col z-50 md:hidden"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-[#d4af37]/30">
                                <span className="text-lg font-bold">Admin Panel</span>
                                <button onClick={() => setSidebarOpen(false)}>
                                    <FiX size={24} />
                                </button>
                            </div>

                            <div className="px-4 py-2 border-b border-[#d4af37]/20">
                                <span className="font-semibold">{user?.name}</span>
                            </div>

                            <nav className="mt-2 flex flex-col gap-1 flex-1 overflow-auto px-2">
                                {adminLinks.map((link) => (
                                    <SidebarLink key={link.label} link={link} />
                                ))}

                                <button
                                    onClick={logout}
                                    className="flex items-center gap-3 p-3 mt-auto mb-4 hover:bg-red-400/10 transition rounded-md text-red-400"
                                >
                                    <FiLogOut />
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <div
                className={`hidden md:flex flex-col transition-all duration-300 border-r border-[#d4af37]/30 bg-[#0d2b45] ${desktopCollapsed ? "w-20" : "w-64"
                    }`}
            >
                <div className="flex flex-col items-center justify-center p-4 border-b border-[#d4af37]/30">
                    {!desktopCollapsed && <span className="text-lg font-bold">Admin Panel</span>}
                    <span className="mt-1 text-sm text-[#d4af37]">{user?.name}</span>
                    <button
                        onClick={() => setDesktopCollapsed(!desktopCollapsed)}
                        className="mt-2 text-xl cursor-pointer text-[#d4af37] hover:text-white transition"
                    >
                        {desktopCollapsed ? "➤" : "⇤"}
                    </button>
                </div>

                <nav className="mt-2 flex flex-col gap-1 flex-1 overflow-auto px-2">
                    {adminLinks.map((link) => (
                        <SidebarLink key={link.label} link={link} />
                    ))}

                    <button
                        onClick={logout}
                        className="flex items-center gap-3 p-3 mt-auto mb-4 hover:bg-red-400/10 transition rounded-md text-red-400"
                    >
                        <FiLogOut />
                        {!desktopCollapsed && <span>Logout</span>}
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-auto">
                {/* Top Navbar */}
                <div className="flex items-center justify-between p-4 border-b border-[#d4af37]/30 bg-[#0d2b45] relative">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <FiMenu size={24} />
                        </button>
                        <div className="text-sm text-[#e6c984]">
                            {breadcrumbs.map((bc, i) => (
                                <span key={i}>
                                    {bc.href ? (
                                        <Link
                                            href={bc.href}
                                            className="hover:text-[#d4af37] transition"
                                        >
                                            {bc.label}
                                        </Link>
                                    ) : (
                                        <span className="text-[#d4af37] font-medium">
                                            {bc.label}
                                        </span>
                                    )}
                                    {i < breadcrumbs.length - 1 && (
                                        <span className="mx-1 text-[#e6c984]">/</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 relative">
                        {/* Notification Bell */}
                        <button
                            onClick={handleNotificationClick}
                            className="relative cursor-pointer"
                        >
                            <FiBell size={22} />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>


                        {/* Admin initials rounded and clickable */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(prev => !prev)}
                                className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center text-[#071d33] font-semibold focus:outline-none"
                            >
                                {user?.name
                                    ? user.name
                                        .split(" ")
                                        .map(n => n[0])
                                        .slice(0, 2)
                                        .join("")
                                        .toUpperCase()
                                    : ""}
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-32 bg-[#0d2b45] border border-[#d4af37]/30 shadow-lg rounded-md overflow-hidden z-50"
                                    >
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm hover:bg-[#d4af37]/10 transition"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-red-400/10 transition text-red-400"
                                        >
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Notification Drawer */}
                        <AnimatePresence>
                            {notificationsOpen && (
                                <motion.div
                                    ref={notificationRef}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    className="absolute right-0 top-10 w-80 bg-[#0d2b45] border border-[#d4af37]/30 shadow-lg rounded-md overflow-hidden z-50"
                                >
                                    <div className="p-4 border-b border-[#d4af37]/20 font-semibold">
                                        Notifications
                                    </div>
                                    <div className="flex flex-col max-h-64 overflow-y-auto">
                                        {notifications.map((n) => (
                                            <div
                                                key={n._id}
                                                className="px-4 py-3 hover:bg-[#d4af37]/10 cursor-pointer transition"
                                            >
                                                <p className="font-bold">{n.title}</p>
                                                <p className="text-sm">{n.message}</p>
                                                <span className="text-xs text-[#d4af37]">{new Date(n.createdAt).toDateString()}</span>
                                            </div>
                                        ))}
                                        {notifications.length === 0 && (
                                            <div className="px-4 py-3 text-sm text-[#e6c984]/50">
                                                No notifications
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>


                <div className="flex-1 p-6">{children}</div>
            </main>
        </div>
    );
}
