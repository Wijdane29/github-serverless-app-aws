import React from "react";
import Img1 from "../assets/itendswithus.jpeg";
import Img2 from "../assets/SOUL.jfif";
import Img3 from "../assets/THe_dark_Side.jpg";
import { FaStar } from "react-icons/fa";
import "./SecondSection.css";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Mystery Novel",
    description:
      "Dive into an intriguing mystery that will keep you guessing until the final page.",
  },
  {
    id: 2,
    img: Img2,
    title: "Science Fiction",
    description:
      "Explore futuristic worlds and imaginative technologies in this thrilling sci-fi adventure.",
  },
  {
    id: 3,
    img: Img3,
    title: "Romantic Story",
    description:
      "A heartwarming tale of love and resilience that will capture your emotions.",
  },
  {
    id: 1,
    img: Img1,
    title: "Mystery Novel",
    description:
      "Dive into an intriguing mystery that will keep you guessing until the final page.",
  },
];

const SecondSection = () => {
  return (
    <div className="top-products-container">
      <div className="text-section">
        <p className="subtitle">Best Books</p>
        <h1 className="main-title">Top Rated Books for You</h1>
        <p className="description">
          Discover our selection of highly rated books, carefully curated for every reader.
        </p>
      </div>

      <div className="products-grid">
        {ProductsData.map((data) => (
          <div className="product-card" key={data.id}>
            <div className="image-section">
              <img src={data.img} alt={data.title} className="product-image" />
            </div>
            <div className="details-section">
              <div className="rating">
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
              </div>
              <h1 className="product-title">{data.title}</h1>
              <p className="product-description">{data.description}</p>
              {/* <button className="order-button" onClick={handleOrderPopup}>
                Order Now
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondSection;
