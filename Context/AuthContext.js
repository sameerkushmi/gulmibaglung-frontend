"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Interceptor from "@/utils/Interceptor";
import toast from "react-hot-toast";
import { loginUser, logoutUser } from "@/utils/globalLogout";

const AuthContext = createContext();
const api = Interceptor();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("NPR");
  const [cart, setCart] = useState({ items: [] });
  const [orders, setOrders] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [isLoggedOutState, setIsLoggedOutState] = useState(true); // reactive version

  const USD_RATE = 0.0069; // Example conversion rate
  const EURO_RATE = 0.0058;
  const AUS_RATE = 0.0096;
  const currencyConfig = {
    NPR: { symbol: "रु", locale: "ne-NP" },
    USD: { symbol: "$", locale: "en-US" },
    AUD: { symbol: "A$", locale: "en-AU" },
    EUR: { symbol: "€", locale: "de-DE" },
  };

  const LOGOUT_AFTER_MS = 7 * 24 * 60 * 60 * 1000; // 7 days


  // ----------------- Helper -----------------
  const checkAutoLogout = () => {
    if (typeof window !== "undefined") {
      const loginTime = localStorage.getItem("loginTimestamp");
      const storedStatus = localStorage.getItem("isLoggedOut");

      if (!storedStatus || storedStatus === "true" || !loginTime) {
        logoutUser();
        setIsLoggedOutState(true);
      } else {
        const elapsed = Date.now() - parseInt(loginTime, 10);
        if (elapsed >= LOGOUT_AFTER_MS) {
          logoutUser();
          setIsLoggedOutState(true);
        } else {
          loginUser();
          setIsLoggedOutState(false);
        }
      }
    }
  };



  // ----------------- check admin -----------------
  const checkAdmin = async () => {
    try {
      await api.get('/api/user/get-admin')
    } catch (error) {
      toast.error('You Are Not Admin !')
      router.push('/')
    }
  }
  // ----------------- Fetch User -----------------
  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/user/get-user");
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ----------------- Login -----------------
  const login = (userData) => {
    setUser(userData);
    loginUser();
    setIsLoggedOutState(false);
  };

  // ----------------- Logout -----------------
  const logout = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/auth/logout");
      toast.success(data.message);
      logoutUser();
      setIsLoggedOutState(true);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    } finally {
      setUser(null);
      setLoading(false);
      setOrders(null)
      setCart({ items: [] })
      setWishlist(null)
      router.push("/login");
    }
  };

  // ----------------- Fetch Cart -----------------
  const fetchCart = async () => {
    try {
      const { data } = await api.get("/api/cart/get-all");
      setCart(data || { items: [] });
    } catch (err) {
      setCart({ items: [] })
      console.error(err);
    }
  };

  // ----------------- Add To Cart -----------------
  const addToCart = async (payload) => {

    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }

    try {
      const { data } = await api.post("/api/cart/add", payload);
      if (data.success) {
        setCart(data);
        fetchCart();
      }
      return data;
    } catch (err) {
      console.error(err);
      toast.error("add to cart failed");
      return { success: false };
    }
  };

  // ----------------- Fetch Orders -----------------
  const fetchOrder = async () => {
    try {
      const { data } = await api.get("/api/orders/user/get-all");
      if (data.success) {
        setOrders(data);
      }
    } catch (error) {
      setOrders(null)
      console.error(error);
    }
  };

  // ----------------- Wishlist -----------------
  const fetchWishlist = async () => {
    try {
      const { data } = await api.get("/api/wishlist");
      const ids = data.wishlist.map((p) => p._id);
      setWishlist(ids);
    } catch (error) {
      console.error("Wishlist fetch failed");
    }
  };

  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }
    fetchCart();
    fetchOrder();
    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (productId) => {
    if (!user) {
      toast.error("Please login to use wishlist");
      return;
    }

    try {
      const isWishlisted = wishlist.includes(productId);

      if (isWishlisted) {
        await api.delete(`/api/wishlist/remove/${productId}`);
        setWishlist((prev) => prev.filter((id) => id !== productId));
        toast.success("Removed from wishlist");
      } else {
        await api.post("/api/wishlist/add", { productId });
        setWishlist((prev) => [...prev, productId]);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Wishlist action failed");
    }
  };

  // ----------------- Payment Handlers -----------------
  // (Keep your handleEsewaPay, handleKhaltiPay, handleStripePay here as-is)
  // Handle esewa pay
  const handleEsewaPay = async (products, billingDetails) => {
    if (!user) {
      toast.error("Please login to proceed with payment");
      return;
    }

    if (!products) {
      toast.error("Product not selected");
      return;
    }
    const payload = products.map((p) => ({
      productId: p._id,
      quantity: p.quantity,
      name: p.name,
    }));

    try {

      const { data } = await api.post('/api/payment/esewa/create-payment', {
        products: payload,
        billingDetails
      });


      if (!data.success) {
        alert("Failed to create payment");
        return;
      }

      // Create a hidden form to auto-submit to eSewa
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.paymentUrl;

      const fields = {
        amount: data.amount,
        tax_amount: 0,        // tax fields if needed
        total_amount: data.amount,
        transaction_uuid: data.transactionId,
        product_code: data.merchantCode,
        product_service_charge: 0, // service charge if any
        product_delivery_charge: 0, // delivery charge if any
        success_url: data.successUrl,
        failure_url: data.failureUrl,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: data.signature,
      };

      for (const name in fields) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = fields[name];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit(); // redirect user to eSewa

    } catch (err) {
      console.error(err);
      alert("Error initiating payment");
    }
  };

  //handle kahlti pay
  const handleKhaltiPay = async (products, billingDetails) => {
    if (!user) {
      toast.error("Please login to continue payment");
      return;
    }
    const payload = products.map((p) => ({
      productId: p._id,
      quantity: p.quantity,
      name: p.name,
    }));

    try {

      const { data } = await api.post("/api/payment/khalti/create", {
        products: payload,
        billingDetails
      });

      if (!data?.payment_url) {
        throw new Error("Invalid Khalti response");
      }

      window.location.href = data.payment_url;
    } catch (error) {
      console.error(error);
      toast.error("Failed to initiate Khalti payment");
    }
  };


  // handle stripe pay
  const handleStripePay = async (products, billingDetails) => {
    if (!user) return toast.error("Please login");

    try {
      const payload = products.map((p) => ({
        productId: p._id,
        quantity: p.quantity,
        name: p.name,
      }));

      const { data } = await api.post(
        "/api/payment/stripe/create-session",
        { products: payload, billingDetails }
      );

      window.location.href = data.url;
    } catch (err) {
      toast.error("Stripe payment failed");
    }
  };

  // ...

  // ----------------- On Mount -----------------
  useEffect(() => {
    checkAutoLogout(); // check 7-day auto logout
    fetchUser();
  }, []);

  const option = {
    checkAdmin,
    user,
    isLoggedOut: isLoggedOutState,
    login,
    logout,
    loading,
    setLoading,
    currency,
    setCurrency,
    setUser,
    fetchUser,
    addToCart,
    cart,
    fetchCart,
    orders,
    fetchOrder,
    wishlist,
    toggleWishlist,
    USD_RATE,
    handleEsewaPay,
    handleKhaltiPay,
    handleStripePay,
    EURO_RATE,
    AUS_RATE,
    currencyConfig
  };

  return <AuthContext.Provider value={option}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);