'use client'

import LiveMetalPrice from "../LiveMetalPrice/LiveMetalPrice"
import Testimonial from "../TestiMonial/TestiMonial"
import AboutGulmi from "./AboutGulmi"
import BrandAboutSection from "./BrandAboutSection"
import CategorySlider from "./CategorySlider"
import Collection from "./Collection"
import DualCTA from "./DualCTA"
import FeaturedProduct from "./FeaturedProduct"
import HomeHero from "./HomeHero"
import JewelryCategoryGrid from "./JewelryCategoryGrid"
import Subscribe from "./Subscribe"

const Home = () => {
  return (
    <div>
      <HomeHero />
      <CategorySlider />
      <LiveMetalPrice />
      <FeaturedProduct />
      <BrandAboutSection />
      <JewelryCategoryGrid />
      <DualCTA />
      <Collection />
      <Testimonial />
      <Subscribe />
      <AboutGulmi />
    </div>
  )
}

export default Home