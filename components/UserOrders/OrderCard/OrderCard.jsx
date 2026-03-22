"use client";

import { useAuth } from "@/Context/AuthContext";
import formatPrice from "@/utils/formatPrice";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import {
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaCircleExclamation,
  FaCreditCard,
  FaBox
} from "react-icons/fa6";

export default function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const { USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig } = useAuth()

  /* Status Design Logic */
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]";
      case "cancelled":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.1)]";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  const paymentStatusMap = {
    paid: {
      text: "Paid",
      styles: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      icon: <FaCheckCircle className="text-[10px]" />,
    },
    unpaid: {
      text: "Pending",
      styles: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      icon: <FaClock className="text-[10px]" />,
    },
    failed: {
      text: "Failed",
      styles: "text-rose-400 bg-rose-400/10 border-rose-400/20",
      icon: <FaCircleExclamation className="text-[10px]" />,
    },
  };

  const paymentStatus = paymentStatusMap[order.paymentStatus?.toLowerCase()] || paymentStatusMap.unpaid;

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`relative overflow-hidden group border transition-all duration-500 cursor-pointer
      ${expanded
          ? "bg-slate-900/80 border-blue-500/40 shadow-2xl shadow-blue-500/10"
          : "bg-slate-900/40 border-slate-800 hover:border-slate-700 shadow-lg"
        } backdrop-blur-md rounded-[2rem] p-6`}
    >
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/5 blur-[50px] pointer-events-none group-hover:bg-blue-600/10 transition-colors" />

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-blue-500/50 transition-colors">
            <FaBox className={`text-xl ${expanded ? "text-blue-400" : "text-slate-500"}`} />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Order ID</h3>
            <p className="font-mono text-white text-sm">#{order._id.slice(-8).toUpperCase()}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all duration-500 ${getStatusStyles(order.orderStatus)}`}>
            {order.orderStatus}
          </span>
          <div className="p-2 bg-slate-800/50 rounded-lg text-slate-400 group-hover:text-white transition-colors">
            {expanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </div>
        </div>
      </div>

      {/* Main Info Body */}
      <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-800/50">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Placed On</span>
          <p className="text-sm font-medium text-slate-200">
            {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Total Value</span>
          <p className="text-xl font-black text-white flex items-center justify-end gap-1">
            {formatPrice(order.totalAmount, {
              USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig
            })}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2 text-slate-400">
          <FaCreditCard className="text-xs" />
          <span className="text-xs font-medium uppercase tracking-tight">{order.paymentMethod}</span>
        </div>

        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-widest ${paymentStatus.styles}`}>
          {paymentStatus.icon}
          {paymentStatus.text}
        </div>
      </div>

      {/* Expanded Details Section */}
      <div className={`grid transition-all duration-500 ease-in-out ${expanded ? "grid-rows-[1fr] mt-8 opacity-100" : "grid-rows-[0fr] opacity-0 overflow-hidden"}`}>
        <div className="overflow-hidden">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-4 border-b border-blue-500/10 pb-2">Manifest</h4>
          <div className="space-y-3">
            {order.products.map((item) => (
              <div
                key={item.productId._id}
                className="flex items-center gap-4 p-3 bg-slate-950/40 rounded-2xl border border-slate-800 group/item hover:border-slate-600 transition-all"
              >
                <div className="relative w-14 h-14 shrink-0 overflow-hidden rounded-xl border border-slate-800">
                  <img
                    src={item.productId.images[0]?.url || "/placeholder.png"}
                    alt={item.productId.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-200 truncate">{item.productId.name}</p>
                  <p className="text-xs text-slate-500 font-medium">Qty: {item.quantity} units</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-black text-white italic">{formatPrice((item.productId.price * item.quantity), {
                    USD_RATE, EURO_RATE, AUS_RATE, currency, currencyConfig
                  })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}