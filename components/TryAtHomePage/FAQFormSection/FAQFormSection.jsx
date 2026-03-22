'use client';

import LeftFAQ from "./LeftFAQ/LeftFAQ";
import RightForm from "./RightForm/RightForm";

export default function FAQFormSection() {

    return (
        <section className="w-full bg-[#0d2b45] py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

                {/* ─── LEFT: FAQ ─── */}
                <LeftFAQ />
                {/* ─── RIGHT: FORM ─── */}
                <RightForm />

            </div>
        </section>
    );
}