"use client";

import { useAuth } from "@/Context/AuthContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit,
  FiShoppingBag,
  FiHeart,
  FiLogOut,
} from "react-icons/fi";
import EditProfileModal from "./EditProfileModal";
import ProfileImageModal from "./ProfileImageModal";
import ChangePasswordModal from "./ChangePasswordModal";
import Link from "next/link";


// MAIN PROFILE COMPONENT
export default function Profile() {
  const { user, logout, loading, fetchUser, orders } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const checkAuth = () => {
    if (!user) {
      fetchUser()
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <section className="min-h-screen bg-[#0d2b45] py-16 px-6">
      {(loading || !user) && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-[#d4af37] border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT – PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl p-6 shadow-2xl"
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              onClick={() => setIsImageModalOpen(true)}
              className="relative w-32 h-32 rounded-full border-4 border-[#d4af37] overflow-hidden shadow-xl cursor-pointer group"
            >
              <Image
                src={user?.profileImage || "/images/profile/default-user.png"}
                alt="Profile"
                fill
                className="object-cover"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <span className="text-white text-sm font-semibold">Change</span>
              </div>
            </motion.div>


            <h2 className="text-2xl font-bold text-[#e6c984] mt-4">
              {user?.name}
            </h2>
            <p className="text-[#ffffffaa] text-sm">Premium Member</p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-5 py-2 rounded-full bg-[#d4af37] text-[#0a1f35] font-semibold hover:bg-[#e6c984] transition flex items-center gap-2"
            >
              <FiEdit /> Edit Profile
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-black/30 rounded-xl p-4 text-center">
              <FiShoppingBag className="mx-auto text-[#d4af37]" />
              <p className="text-[#e6c984] font-bold text-xl">
                {orders?.totalOrders || "0"}
              </p>
              <p className="text-[#ffffffaa] text-sm">Orders</p>
            </div>
            <div className="bg-black/30 rounded-xl p-4 text-center">
              <FiHeart className="mx-auto text-[#d4af37]" />
              <p className="text-[#e6c984] font-bold text-xl">
                {user?.wishlist || "0"}
              </p>
              <p className="text-[#ffffffaa] text-sm">Wishlist</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT – USER DETAILS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-2 bg-white/10 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl p-8 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-[#e6c984] mb-6">
            Account Information
          </h3>

          <div className="space-y-5">
            <div className="flex items-center gap-4 bg-black/30 rounded-xl p-4">
              <FiUser className="text-[#d4af37]" />
              <div>
                <p className="text-sm text-[#ffffffaa]">Full Name</p>
                <p className="text-[#e6c984] font-semibold">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-black/30 rounded-xl p-4">
              <FiMail className="text-[#d4af37]" />
              <div>
                <p className="text-sm text-[#ffffffaa]">Email</p>
                <p className="text-[#e6c984] font-semibold">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-black/30 rounded-xl p-4">
              <FiPhone className="text-[#d4af37]" />
              <div>
                <p className="text-sm text-[#ffffffaa]">Phone</p>
                <p className="text-[#e6c984] font-semibold">
                  {user?.phone || "+977XXXXXXXXX"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-black/30 rounded-xl p-4">
              <FiMapPin className="text-[#d4af37]" />
              <div>
                <p className="text-sm text-[#ffffffaa]">Address</p>
                <p className="text-[#e6c984] font-semibold">
                  {user?.address || "Nepal"}
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`/user/orders`}>
              <button className="px-6 py-2 rounded-full bg-[#d4af37] text-[#0a1f35] font-semibold hover:bg-[#e6c984] transition">
                View Orders
              </button>
            </Link>
            <button
              onClick={() => setIsPasswordOpen(true)}
              className="px-6 py-2 rounded-full bg-white/20 text-[#e6c984] font-semibold hover:bg-white/30 transition"
            >
              Change Password
            </button>
            <button
              onClick={logout}
              className="px-6 py-2 rounded-full bg-red-500/80 text-white font-semibold hover:bg-red-600 transition flex items-center gap-2"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </motion.div>
      </div>

      {/* EDIT MODAL */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Edit profile image */}
      <ProfileImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />

      <ChangePasswordModal
        isOpen={isPasswordOpen}
        onClose={() => setIsPasswordOpen(false)}
      />


    </section>
  );
}