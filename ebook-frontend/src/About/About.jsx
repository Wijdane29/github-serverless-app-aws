import React from 'react';
import './About.css';
import Header from '../HomePage/Header';
import Footer from '../HomePage/Footer';

const About = () => {
  return (
    <div className='main-about-container'>
      <Header />
      <div className="about-container">
        <div className="about-wrapper">
          <h1>About Us</h1>
          <p className="about-intro">
            Welcome to our platform! Our mission is to deliver exceptional solutions and services tailored to meet your needs. We are a dedicated team of professionals passionate about innovation, quality, and customer satisfaction.
          </p>
          <div className="about-section">
            <h2>Our Vision</h2>
            <p>
              To be a leader in our industry by continuously innovating and delivering world-class solutions. We aim to empower businesses and individuals by providing the tools and services necessary to achieve their goals.
            </p>
          </div>
          <div className="about-section">
            <h2>Our Team</h2>
            <p>
              Our team is composed of experienced professionals with diverse expertise across various industries. We believe in collaboration, continuous learning, and a customer-centric approach to everything we do.
            </p>
          </div>
          <div className="about-section">
            <h2>Our Values</h2>
            <ul>
              <li><strong>Integrity:</strong> We uphold the highest standards of integrity in all our actions.</li>
              <li><strong>Innovation:</strong> We embrace change and strive for continuous improvement.</li>
              <li><strong>Excellence:</strong> We deliver high-quality services that exceed customer expectations.</li>
              <li><strong>Collaboration:</strong> We believe in the power of teamwork and partnership.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
