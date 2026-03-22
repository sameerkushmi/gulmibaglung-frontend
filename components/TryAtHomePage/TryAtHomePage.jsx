'use client'

import FAQFormSection from "./FAQFormSection/FAQFormSection"
import HowItWorks from "./HowItWorks/HowItWorks"
import TryAtHomeHero from "./TryAtHomeHero/TryAtHomeHero"

const TryAtHomePage = () => {
    return (
        <div>
            <TryAtHomeHero />
            <HowItWorks />
            <FAQFormSection />
        </div>
    )
}

export default TryAtHomePage