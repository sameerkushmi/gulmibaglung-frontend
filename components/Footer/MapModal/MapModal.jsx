
const MapModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 animate-in fade-in"
            onClick={onClose} // Close on clicking the backdrop
        >
            {/* Premium Backdrop: Blurred and tinted */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

            {/* Modal Container */}
            <div
                className="relative w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-2xl animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the modal itself
            >
                {/* Header Section */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">Our Location</h3>
                        <p className="text-xs text-slate-500">Find us in the heart of the city</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 transition-colors rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Map Body */}
                <div className="relative bg-slate-50 aspect-video md:aspect-auto">
                    <iframe
                        title="Our Location"
                        src={process.env.NEXT_PUBLIC_MAP_URL}
                        width="100%"
                        height="450"
                        className="block grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    />
                </div>

                {/* Footer / Action (Optional) */}
                <div className="px-6 py-4 bg-gray-50/50">
                    <button
                        onClick={() => window.open(process.env.NEXT_PUBLIC_MAP_URL, "_blank")}
                        className="w-full py-2.5 text-sm font-medium text-white transition-all bg-slate-900 rounded-xl hover:bg-slate-800 active:scale-[0.98]"
                    >
                        Open in Google Maps
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MapModal;