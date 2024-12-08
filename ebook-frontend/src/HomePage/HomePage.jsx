import React from "react";
import Header from "./Header";
import Slider from "./Slider";
import Footer from "./Footer";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import Banner from "./Banner";

function HomePage() {
  return (
    <>
      <Header />
      <Slider />
      <ThirdSection/>
      <SecondSection/>
      <Banner/>
      <Footer />
    </>
  );
}

export default HomePage;
