import { useState } from "react";
import { createPortal } from "react-dom";
import CustomizeDrawer from "./CustomizeDrawer";
import RingInfoCell from "./RingInfoCell";

export function CustomizationSection({ product }) {
    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        size: product?.ringSize || "6",
        metal: product?.material || "14 KT Rose",
        diamond: product?.diamondQuality || "FG-SI",
    });

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="mb-8">
            <div className="overflow-hidden rounded-[18px] border border-[#d4af37] bg-white">
                <div className="grid grid-cols-4">
                    <RingInfoCell label="Size" value={form.size} />
                    <RingInfoCell label="Metal" value={form.metal} />
                    <RingInfoCell label="Diamond" value={form.diamond} />

                    <button
                        onClick={() => setOpen(true)}
                        className="bg-[#f2b705] text-[#472b00] font-extrabold uppercase text-[13px]"
                    >
                        Customise
                    </button>
                </div>
            </div>

            {/* Drawer rendered via portal to escape stacking context */}
            {typeof window !== "undefined" && createPortal(
                <CustomizeDrawer
                    open={open}
                    setOpen={setOpen}
                    form={form}
                    handleChange={handleChange}
                />,
                document.body
            )}
        </div>
    );
}