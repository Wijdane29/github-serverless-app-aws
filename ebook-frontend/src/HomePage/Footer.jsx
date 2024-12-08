// import React from "react";
// import '../css/homepage.css';

// export default function Footer() {
//     return (
//         <footer className="footer">
//             <div className="footer-container">
//                 <div className="footer-section">
//                     <h3>About Us</h3>
//                     <p>We are a company dedicated to providing the best books at affordable prices.</p>
//                 </div>
//                 <div className="footer-section">
//                     <h3>Contact</h3>
//                     <p>Email: hafsaeltouil@gmail.com</p>
//                     <p>Phone: +212652583565</p>
//                 </div>

//             </div>
//             <div className="footer-bottom">
//                 <p>&copy; 2024 Bookstore. All rights reserved.</p>
//             </div>
//         </footer>
//     );
// }

import React from "react";
import {FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt,} from "react-icons/fa";
import { GiBookmarklet } from "react-icons/gi";

import "./Footer.css"; 

const FooterLinks = [
  { title: "Home", link: "/#" },
  { title: "Shop", link: "/#shop" },
  { title: "Categories", link: "/#categories" },
  { title: "Contact", link: "/#contact" },
  { title: "About Us", link: "/#about" },
  { title: "Blog", link: "/#blog" },
];

const Footer = () => {
  return (
    <div className="footer-banner text-white">
      <div className="container">
        <div data-aos="zoom-in" className="footer-grid">
          <div className="footer-company">
            <h1 className="footer-title">
              <GiBookmarklet className="feature-icon text-5xl text-primary" />              
               BookNest
            </h1>
            <p className="footer-description">
              Welcome to BookNest, your home for all genres of books. Whether you're looking for the latest bestsellers or timeless classics, we have something for every reader.
            </p>
          </div>

          <div className="footer-links-container">
            {Array(1)
              .fill("")
              .map((_, i) => (
                <div key={i} className="footer-links">
                  <h1 className="footer-links-title">Explore</h1>
                  <ul className="liste-total">
                    {FooterLinks.map((link,index) => (
                      <li key={link.title} className={`footer-link ${index < 4 ? "col-1" : "col-2"}`}>
                        <a href={link.link} className="link-title" >{link.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>

          <div className="footer-social">
            <div className="social-icons">
              <a href="#"><FaInstagram className="social-icon" /></a>
              <a href="#"><FaFacebook className="social-icon" /></a>
              <a href="#"><FaLinkedin className="social-icon" /></a>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <p className="para">123 Book Street, Bibliophile City</p>
              </div>
              <div className="contact-item">
                <FaPhoneAlt />
                <p className="para">+1 (123) 456-7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
