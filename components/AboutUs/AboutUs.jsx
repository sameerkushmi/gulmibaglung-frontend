"use client";

import { useRef } from "react";
import AboutHero from "./AboutHero";
import OurMission from "./OurMission";
import OurStory from "./OurStory";
import Testimonial from "../TestiMonial/TestiMonial";
import BrandAboutSection from "../Home/BrandAboutSection";
import TeamSection from "./TeamSection";
import FounderPage from "./FounderPage";

const AboutUs = () => {
  const ourStoryRef = useRef(null);

  const scrollToOurStory = () => {
    ourStoryRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <AboutHero onOurStoryClick={scrollToOurStory} />

      {/* OUR STORY TARGET */}
      <div ref={ourStoryRef}>
        <OurStory />
      </div>
      <FounderPage />
      <TeamSection />
      <BrandAboutSection />
      <OurMission />
      <Testimonial />
    </div>
  );
};

export default AboutUs;
