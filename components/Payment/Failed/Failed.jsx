"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiXCircle } from "react-icons/fi";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function Failed() {
  const searchParams = useSearchParams();
  const transactionUuid =
    searchParams.get("transaction_uuid") ||
    searchParams.get("transactionId") ||
    searchParams.get("oid");

  useEffect(() => {
    if (!transactionUuid) {
      console.warn("No transaction UUID found in URL");
      return;
    }

    axios
      .post("/api/payment/esewa/failed", {
        transactionUuid,
      })
      .catch((err) => {
        console.error("Failed to update order status", err);
      });
  }, [transactionUuid]);

  return (
    <div className="h-screen flex items-center justify-center bg-red-50 px-4">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-md text-center border-t-4 border-red-600"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ repeat: 2, duration: 0.8 }}
          className="flex justify-center mb-4"
        >
          <FiXCircle className="text-red-600 w-16 h-16" />
        </motion.div>

        <h1 className="text-3xl font-extrabold text-red-700 mb-2">
          Payment Failed
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment could not be completed. Please try again.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/checkout"
            className="bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-red-700 transition"
          >
            Retry Payment
          </Link>

          <Link
            href="/"
            className="bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-300 transition"
          >
            Go to Home
          </Link>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          You were not charged.
        </p>
      </motion.div>
    </div>
  );
}
