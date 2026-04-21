import Link from "next/link";

export default function PopularLinksSection() {
    const sections = [
        {
            title: "Popular Searches",
            items: ["Gifts", "Gifts For Men", "Christmas Gifts", "Gifts Under 10000", "Gifts Under 30000", "Gifts Under 50000", "CaratLane Gift Cards", "Birthday Gifts", "Anniversary Gifts", "Romantic Gifts", "Gifts For Kids", "Gifts For Sister", "Gifts For Mom", "Gifts For Girlfriend", "International Gifting", "Gifts For Wife", "Pendant Gift", "Bracelet Gifts", "Wedding Gifts", "Ring Gifts", "9KT Gold Gifts", "Silver Diamond Gifts"],
        },
        {
            title: "CaratLane Exclusives",
            items: ["New Arrivals", "Self Gifting", "Postcards", "Digital Gold", "Gold Savings Scheme", "Store Locator", "Designathon"],
        },
        {
            title: "Jewellery",
            items: ["Gold", "Diamond", "Solitaire", "Gemstone", "22kt Jewellery", "Platinum", "Charms", "Watch Charms", "Chains", "Silver Jewellery", "Rose Gold Jewellery", "White Gold Jewellery"],
        },
        {
            title: "Earrings",
            items: ["Gold Earrings", "Diamond Earrings", "Solitaire Earrings", "Platinum Earrings", "Kids Earrings", "Jhumka Earrings", "Hoop Earrings", "Stud Earrings", "Pearl Earrings", "Sui Dhaga Earrings", "Chandbali Earrings", "Earcuff Earrings", "Fancy Earrings", "Stone Earrings", "Daily Wear Earrings", "Butterfly Earrings"],
        },
        {
            title: "Rings",
            items: ["Diamond Rings", "Gold Rings", "Platinum Rings", "Solitaire Rings", "Gemstone Rings", "Mens Rings", "Engagement Ring", "Couple Ring", "Wedding Ring", "Vanki Ring", "Ruby Ring", "Emerald Ring", "Name Ring", "Cocktail Ring", "Love Ring", "Butterfly Ring", "Infinity Rings", "Pearl rings", "Promise Rings", "3 Gram Gold Rings", "2 Gram Gold Rings", "1 Gram Gold Rings"],
        },
        {
            title: "Gold Rate in Major Cities",
            items: ["Gold rate today in Chennai", "Gold rate today in Hyderabad", "Gold rate today in Bengalore", "Gold rate today in Mumbai", "Gold rate today in Delhi", "Gold rate today in Kerala", "Gold rate today in Pune", "Gold rate today in Vijayawada", "Gold rate today in Kolkata", "Gold rate today in Ahmedabad"],
        },
        {
            title: "For Women",
            items: ["Rings for Women", "Earrings for Women", "Bracelet for Women", "Bangles For Women", "Pendants For Women", "Necklaces For Women"],
        },
        {
            title: "For Men",
            items: ["Rings for Men", "Earrings for Men", "Bracelet for Men", "Men's Kada"],
        },
        {
            title: "Mangalsutra",
            items: ["Gold Mangalsutra", "Diamond Mangalsutra", "Modern Mangalsutra", "South Indian Mangalsutra", "Fancy Mangalsutra", "Black Beads Mangalsutra", "Gold Mangalsutra Under 20000", "Traditional Mangalsutra", "Light Weight Mangalsutra", "Daily Use Mangalsutra", "Infinity Mangalsutra"],
        },
        {
            title: "Pendants",
            items: ["Gold Pendants", "Diamond Pendants", "Solitaire Pendants", "Evil Eye Pendants", "Chain Pendants", "Om Pendants", "Butterfly Pendants", "Heart Pendants"],
        },
        {
            title: "Nose Pins",
            items: ["Nose Rings", "Gold Nose Pins", "Diamond Nose Pins", "Nose Studs", "Pressing Nose Rings", "Stone Nose Rings"],
        },
        {
            title: "Bangles",
            items: ["Gold Bangles", "Diamond Bangles", "Kids Bangles", "Daily Wear Bangles", "Bridal Bangles", "Stone Bangles", "Baby Bangles", "Traditional Bangles"],
        },
        {
            title: "Bracelets",
            items: ["Gold Bracelets", "Diamond Bracelets", "Kids Bracelets", "Pearl Bracelets", "Evil Eye Bracelets", "Tennis Bracelets", "Chain Bracelets", "Name Bracelets", "Stone Bracelets", "Cuff Bracelets"],
        },
        {
            title: "Necklaces",
            items: ["Gold Necklace", "Diamond Necklace", "Kids Necklace", "Gemstone Necklace", "Ruby Necklace", "Choker Necklace", "Pearl Necklace", "Evil Eye Necklace", "Necklaces For Women", "Long Necklace", "Name Necklace", "Stone Necklace", "Butterfly Necklace", "Bridal Necklace", "Fancy Necklace", "Emerald Necklace", "22kt Gold Chains"],
        }
    ];

    return (
        <section className="bg-[#0D2B45] py-20 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="space-y-16">
                    {sections.map((section) => (
                        <div key={section.title} className="group">
                            {/* Section Title with Accent Line */}
                            <div className="flex items-center gap-4 mb-8">
                                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/90 whitespace-nowrap">
                                    {section.title}
                                </h3>
                                <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent" />
                            </div>

                            {/* Links Container */}
                            <div className="flex flex-wrap gap-x-6 gap-y-4">
                                {section.items.map((item) => (
                                    <Link
                                        key={item}
                                        href="/products/search"
                                        className="relative text-[13px] font-medium text-white/60 hover:text-white transition-all duration-300 ease-out group/link"
                                    >
                                        <span className="relative z-10">{item}</span>
                                        {/* Premium Animated Underline */}
                                        <span className="absolute left-0 bottom-[-4px] w-0 h-[1.5px] bg-white transition-all duration-300 group-hover/link:w-full" />

                                        {/* Subtle Dot Separator (Optional alternative to pipe) */}
                                        <span className="ml-6 hidden lg:inline-block opacity-10 pointer-events-none text-white">
                                            •
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}