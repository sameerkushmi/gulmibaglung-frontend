"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Interceptor from "@/utils/Interceptor";
import { useAuth } from "@/Context/AuthContext";
import { FaStar, FaEdit, FaTimes, FaUserCircle } from "react-icons/fa";

const api = Interceptor();

export default function ProductReviews({ productId }) {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);

    const [editReviewId, setEditReviewId] = useState(null);
    const [editRating, setEditRating] = useState(0);
    const [editComment, setEditComment] = useState("");

    const fetchReviews = async () => {
        try {
            const { data } = await api.get(`/api/products/review/get-all/${productId}`);
            if (data.success) setReviews(data.reviews);
        } catch (error) {
            console.error("Review fetch error:", error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("Please login to leave a review");
        if (!comment || rating === 0) return toast.error("Rating and comment are required");

        setLoading(true);
        try {
            const { data } = await api.post(`/api/products/review/add/${productId}`, { rating, comment });
            if (data.success) {
                setComment("");
                setRating(0);
                fetchReviews();
                toast.success("Thank you for your feedback");
            }
        } catch (err) {
            toast.error("Could not post review");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (reviewId) => {
        setLoading(true);
        try {
            const { data } = await api.put(`/api/products/review/update/${reviewId}`, {
                rating: editRating,
                comment: editComment,
            });
            if (data.success) {
                toast.success("Review updated");
                setEditReviewId(null);
                fetchReviews();
            }
        } catch (err) {
            toast.error("Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5 mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                {/* LEFT: FORM SECTION */}
                <div className="lg:col-span-1">
                    <h2 className="text-3xl font-serif text-white mb-2">Artisan Feedback</h2>
                    <p className="text-white/50 text-sm mb-8">Share your experience with this handcrafted piece.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">Your Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        type="button"
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setRating(star)}
                                        className={`text-2xl transition-colors ${star <= rating ? "text-gold-400" : "text-white/10"}`}
                                    >
                                        <FaStar />
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">Review Details</label>
                            <textarea
                                rows="4"
                                placeholder="Describe the craftsmanship..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-gold-500/50 focus:ring-0 transition-all outline-none"
                            />
                        </div>

                        <button
                            disabled={loading || !user}
                            className="w-full py-4 bg-gold-600 hover:bg-gold-500 text-black font-bold rounded-full transition-all tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "SENDING..." : "POST REVIEW"}
                        </button>
                        {!user && <p className="text-center text-[10px] text-white/30 italic">Login required to post</p>}
                    </form>
                </div>

                {/* RIGHT: REVIEWS LIST */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                        <h3 className="text-xl text-white font-light italic">Recent Appraisals ({reviews?.length})</h3>
                    </div>

                    <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                        <AnimatePresence mode="popLayout">
                            {reviews?.length > 0 ? (
                                reviews.map((review) => (
                                    <motion.div
                                        key={review._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="relative group p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 border border-gold-500/20">
                                                    <FaUserCircle size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{review?.user?.name}</p>
                                                    <div className="flex text-[10px] text-gold-400 mt-0.5">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <FaStar key={i} className={i < review.rating ? "opacity-100" : "opacity-20"} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {user?._id === review?.user?._id && editReviewId !== review._id && (
                                                <button
                                                    onClick={() => {
                                                        setEditReviewId(review._id);
                                                        setEditRating(review.rating);
                                                        setEditComment(review.comment);
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-white/40 hover:text-gold-400"
                                                >
                                                    <FaEdit size={16} />
                                                </button>
                                            )}
                                        </div>

                                        {editReviewId === review._id ? (
                                            <div className="mt-4 space-y-4">
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <FaStar
                                                            key={s}
                                                            className={`cursor-pointer ${s <= editRating ? "text-gold-400" : "text-white/10"}`}
                                                            onClick={() => setEditRating(s)}
                                                        />
                                                    ))}
                                                </div>
                                                <textarea
                                                    value={editComment}
                                                    onChange={(e) => setEditComment(e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-gold-500 outline-none"
                                                />
                                                <div className="flex gap-3">
                                                    <button onClick={() => handleUpdate(review._id)} className="text-xs bg-gold-500 text-black px-4 py-2 rounded-full font-bold">SAVE</button>
                                                    <button onClick={() => setEditReviewId(null)} className="text-xs text-white/50 px-4 py-2 hover:text-white transition-colors">CANCEL</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-white/70 leading-relaxed text-sm font-light">
                                                {review.comment}
                                            </p>
                                        )}
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-white/30 italic font-light">Be the first to leave a review...</p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(212, 175, 55, 0.1);
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(212, 175, 55, 0.3);
                }
            `}</style>
        </div>
    );
}