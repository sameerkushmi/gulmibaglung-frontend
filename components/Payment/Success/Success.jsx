"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Interceptor from "@/utils/Interceptor";

const api = Interceptor();

export default function Success() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      const dataParam = searchParams.get("data"); // eSewa
      const pidx = searchParams.get("pidx"); // Khalti

      /* ---------------- STRIPE ---------------- */
      if (!dataParam && !pidx) {
        setPaymentMethod("stripe");
        setVerified(true);
        setLoading(false);
        return;
      }

      /* ---------------- KHALTI ---------------- */
      if (pidx) {
        try {
          setPaymentMethod("khalti");

          const { data } = await api.post(
            "/api/payment/khalti/verify",
            { pidx }
          );

          if (data.success) {
            setOrderId(data.orderId);
            setVerified(true);
          } else {
            router.push("/payment/failed");
          }
        } catch (err) {
          console.error("Khalti verification failed", err);
          router.push("/payment/failed");
        } finally {
          setLoading(false);
        }
        return;
      }

      /* ---------------- ESEWA ---------------- */
      let esewaData;
      try {
        const decoded = atob(dataParam);
        esewaData = JSON.parse(decoded);
      } catch (err) {
        console.error("Invalid eSewa data", err);
        router.push("/payment/failed");
        return;
      }

      try {
        setPaymentMethod("esewa");

        const { data } = await api.post(
          "/api/payment/esewa/verify-payment",
          {
            transactionUuid: esewaData.transaction_uuid,
            totalAmount: esewaData.total_amount,
          }
        );

        if (data.success) {
          setOrderId(data.orderId);
          setVerified(true);
        } else {
          router.push("/payment/failed");
        }
      } catch (err) {
        console.error("eSewa verification failed", err);
        router.push("/payment/failed");
      } finally {
        setLoading(false);
      }
    };

    handlePaymentSuccess();
  }, [searchParams, router]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Verifying your payment...
        </p>
      </div>
    );
  }

  if (!verified) return null;

  /* ---------------- SUCCESS UI ---------------- */
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 to-green-50 px-4">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-md text-center border-t-4 border-green-600"
      >
        <div className="flex justify-center mb-4">
          <FiCheckCircle className="text-green-600 w-16 h-16 animate-bounce" />
        </div>

        <h1 className="text-3xl font-extrabold text-green-700 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          {paymentMethod === "stripe" && "Your Stripe payment was successful."}
          {paymentMethod === "esewa" && "Your eSewa payment was successfully verified."}
          {paymentMethod === "khalti" && "Your Khalti payment was successfully verified."}
        </p>

        <div className="flex flex-col gap-3">
          {orderId && (
            <Link
              href={`/order/${orderId}`}
              className="bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-green-700 transition"
            >
              Go to Order
            </Link>
          )}

          <Link
            href="/"
            className="bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-300 transition"
          >
            Go to Home
          </Link>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Payment method:{" "}
          <span className="font-semibold uppercase">
            {paymentMethod}
          </span>
        </p>
      </motion.div>
    </div>
  );
}
