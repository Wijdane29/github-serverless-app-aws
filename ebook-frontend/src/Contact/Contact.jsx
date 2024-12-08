import React from 'react';
import './Contact.css';
import { FaUser, FaEnvelope, FaPaperPlane, FaPhoneAlt, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Header from '../HomePage/Header';
import Footer from '../HomePage/Footer';

const Contact = () => {
  return (
    <div className='main-contact-container'>
      <Header />
      <div className="contact-container">
        <div className="contact-wrapper">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Feel free to reach out with any questions or feedback.</p>
          <form>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter your full name here"
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Enter your email address here"
                required
              />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box message-box">
              <textarea
                placeholder="Write your message here"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit">
              Send Message <FaPaperPlane className="icon" />
            </button>
          </form>
          <div className='contact-social-media'>
            <div className="contact-info">
                <h3>Contact Information</h3>
                <p>
                <FaPhoneAlt className='phone' /> +1 (123) 456-7890<br />
                <FaEnvelope className='email'/> support@example.com<br />
                <FaMapMarkerAlt className='address'/> 123 Main Street, Anytown, USA
                </p>
            </div>
            <div className='social-media'>
                <h3>Follow Us</h3>
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="social-icon" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="social-icon" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="social-icon" />
                    </a>
                </div>
                </div>
            </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
