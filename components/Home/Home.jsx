'use client'

import LiveMetalPrice from "../LiveMetalPrice/LiveMetalPrice"
import Testimonial from "../TestiMonial/TestiMonial"
import AboutGulmi from "./AboutGulmi"
import BrandAboutSection from "./BrandAboutSection"
import CategorySlider from "./CategorySlider"
import Collection from "./Collection"
import FeaturedProduct from "./FeaturedProduct"
import HomeHero from "./HomeHero"
import ProductDetail from "./HomeProductDetail"
import Subscribe from "./Subscribe"

const Home = () => {
  return (
    <div>
      <HomeHero />
      <CategorySlider />
      <LiveMetalPrice />
      <FeaturedProduct />
      <BrandAboutSection />
      <ProductDetail />
      <Collection />
      <Testimonial />
      <Subscribe />
      <AboutGulmi />
    </div>
  )
}

export default Home