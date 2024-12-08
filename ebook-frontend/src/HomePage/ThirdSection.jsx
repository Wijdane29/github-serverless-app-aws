
import React from "react";
import Img1 from "../assets/itendswithus.jpeg";
import Img2 from "../assets/SOUL.jfif";
import Img3 from "../assets/THe_dark_Side.jpg";
import Img4 from "../assets/itendswithus.jpeg";
import { FaStar } from "react-icons/fa6";
import "./ThirdSection.css";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Mystery Thriller",
    rating: 5.0,
    author: "John Doe",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    title: "Sci-Fi Adventure",
    rating: 4.5,
    author: "John Doe",
    aosDelay: "200",
  },
  {
    id: 3,
    img: Img3,
    title: "Romantic Drama",
    rating: 4.7,
    author: "John Doe",
    aosDelay: "400",
  },
  {
    id: 4,
    img: Img4,
    title: "Self-Help Guide",
    rating: 4.4,
    author: "John Doe",
    aosDelay: "600",
  },
  {
    id: 5,
    img: Img2,
    title: "Historical Fiction",
    rating: 4.5,
    author: "John Doe",
    aosDelay: "800",
  },
];

const ThirdSection = () => {
  return (
    <div className="products-container2">
      <div className="container2">
        <div className="text-section2">
          <p className="subtitle2" data-aos="fade-up">
            Top Selling Books for You
          </p>
          <h1 className="main-title2" data-aos="fade-up">
          Top Selling Books
          </h1>
          <p className="description2" data-aos="fade-up">
            Discover the most sought-after books that captivate readers worldwide.
          </p>
        </div>

        <div className="products-grid2">
          {ProductsData.map((data) => (
            <div
              data-aos="fade-up"
              data-aos-delay={data.aosDelay}
              key={data.id}
              className="product-card2"
            >
              <img
                src={data.img}
                alt={data.title}
                className="product-image2"
              />
              <div className="details-section2">
                <h3 className="product-title2">{data.title}</h3>
                <p className="product-format2">{data.author}</p>
                <div className="rating2">
                  <FaStar className="star-icon2" />
                  <span>{data.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-button2">
          <button className="order-button2">
            View All Books
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
