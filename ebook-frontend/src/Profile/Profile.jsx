import React, { useState, useEffect } from "react";
import "./Profile.css";
import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";
import userProfile from "../assets/profilepicture.jpg";
import book1Image from "../assets/fav-book1.jpeg";
import book2Image from "../assets/fav-book2.jpeg";
import book3Image from "../assets/fav-book3.jpeg";
import book4Image from "../assets/fav-book4.jpeg";
import book5Image from "../assets/fav-book5.jpeg";
import { FaHeart, FaBook, FaEdit } from "react-icons/fa";
import EditProfile from "./EditProfile"; // Import the EditProfile component
import { NavLink, useNavigate } from 'react-router-dom';


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false); // State to toggle EditProfile view
  const [profileData, setProfileData] = useState({
    name: "",
    aboutMe: "Please edit your profile to add information about yourself.",
    profileImage: userProfile,
  });

 // Fetch user data from localStorage
 useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    setProfileData({
      name: user.userName || "Unknown User",
      aboutMe: user.aboutMe || "Please edit your profile to add information about yourself.",
      profileImage: user.profileImage || userProfile,
    });
  }
}, []);


  const books = [
    {
      title: "The Art of War",
      author: "Sun Tzu",
      description:
        "An ancient Chinese military treatise offering timeless strategies.",
      rating: 4.5,
      reviews: "9.3k",
      image: book1Image,
    },
    {
      title: "1984",
      author: "George Orwell",
      description: "A dystopian novel exploring the dangers of totalitarianism.",
      rating: 4.8,
      reviews: "14k",
      image: book2Image,
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description:
        "A classic novel dealing with serious social issues in America.",
      rating: 4.9,
      reviews: "13.5k",
      image: book3Image,
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A novel about the American Dream and the roaring twenties.",
      rating: 4.7,
      reviews: "11.2k",
      image: book4Image,
    },
    {
      title: "Moby Dick",
      author: "Herman Melville",
      description:
        "An epic tale of the whaling industry and Captain Ahab's obsession.",
      rating: 4.2,
      reviews: "8.1k",
      image: book5Image,
    },
  ];

  // Function to handle saving changes from EditProfile
  const handleSaveProfile = (updatedProfileData) => {
    setProfileData(updatedProfileData); // Update profile data
    setIsEditing(false); // Exit edit mode
  };

  if (isEditing) {
    return (
      <EditProfile
        profileData={profileData}
        onSave={handleSaveProfile}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="header">
          <div className="profile-container">
            <img
              src={profileData.profileImage}
              alt="Profile"
              className="profile-image"
            />
            <span className="active-icon"></span>
          </div>
          <div className="header-info">
            <h1 className="name">{profileData.name}</h1>
            {/* <p className="role">{profileData.role}</p> */}
            {/* <div className="actions">
              <button className="button primary-button">Follow</button>
              <button className="button secondary-button">Get in touch</button>
            </div> */}
          </div>
        </div>

        {/* Bio Section */}
        <div className="bio">
          <h2>About Me</h2>
          <p>{profileData.aboutMe}</p>
        </div>

        {/* Stats Section */}
        <div className="stats">
          <div className="stat-item selected">
            <FaHeart className="stat-icon" />
            <p className="stat-value selected">Favorite Books</p>
          </div>
          <div className="stat-item">
            <FaBook className="stat-icon" />
            <p className="stat-value">Books Bought</p>
          </div>
          <div
            className="stat-item"
            onClick={() => setIsEditing(true)} // Switch to EditProfile component
          >
            <FaEdit className="stat-icon" />
            <p className="stat-value"><NavLink to="/EditeProfile"></NavLink>Edit Profile</p>
          </div>
        </div>

        {/* Work Gallery */}
        <div className="work-gallery">
          {books.map((book, index) => (
            <div key={index} className="work-card">
              <img src={book.image} alt={book.title} className="work-image" />
              <div className="work-info">
                <h3 className="work-title">{book.title}</h3>
                <p className="work-category">Author: {book.author}</p>
                <p className="work-description">{book.description}</p>
                <div className="work-stats">
                  <div className="rating">
                    {"★".repeat(Math.floor(book.rating))}
                    {book.rating % 1 !== 0 ? "☆" : ""}
                  </div>
                  <p>{book.reviews} reviews</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
