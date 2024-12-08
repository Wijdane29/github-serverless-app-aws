
import React from "react";
import BannerImg from "../assets/THe_dark_Side.jpg";
import { GrSecure } from "react-icons/gr";
import { IoBookOutline } from "react-icons/io5";
import { GiBookmarklet } from "react-icons/gi";
import { FaGift } from "react-icons/fa";
import "./Banner.css"; 

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="container">
        <div className="banner-grid">
          <div data-aos="zoom-in">
            <img
              src={BannerImg}
              alt="Banner"
              className="banner-image"
            />
          </div>

          <div className="banner-text">
            <h1 data-aos="fade-up" className="banner-title">
              Book Fair - Up to 50% Off
            </h1>
            <p data-aos="fade-up" className="banner-description">
              Explore a wide collection of bestselling novels, academic books,
              and rare editions at discounted prices. A paradise for book lovers!
            </p>
            <div className="banner-features">
              <div data-aos="fade-up" className="feature-item">
                <GrSecure className="feature-icon indigo-bg" />
                <p>Authentic & Quality Books</p>
              </div>
              <div data-aos="fade-up" className="feature-item">
                <IoBookOutline className="feature-icon blue-bg" />
                <p>Exclusive Collections</p>
              </div>
              <div data-aos="fade-up" className="feature-item">
                <GiBookmarklet className="feature-icon green-bg" />
                <p>Free Bookmark with Every Purchase</p>
              </div>
              <div data-aos="fade-up" className="feature-item">
                <FaGift className="feature-icon yellow-bg" />
                <p>Special Gift Offers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
