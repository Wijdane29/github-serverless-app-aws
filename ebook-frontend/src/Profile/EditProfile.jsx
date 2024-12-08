import './EditProfile.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../HomePage/Header';
import Footer from '../HomePage/Footer';
import { NavLink, useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate(); // for navigation after successful login

  const [userData, setUserData] = useState({
    name: user?.userName || '',
    email: user?.Email || '',
    password: '', 
    aboutMe: user?.aboutMe || '',
    profileImage: user?.profileImage || '',
  });

  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(user?.profileImage || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setUserData({
          ...userData,
          profileImage: reader.result, // Save the base64 string in state
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://41hgrm82qh.execute-api.eu-north-1.amazonaws.com/prod/updateUser/${user.UserID}`,
        userData
      );
      localStorage.setItem('user', JSON.stringify({ ...user, ...userData }));
      alert('Profile updated successfully!');
      navigate('/HomePage');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };

  return (
    <>
    <Header></Header>
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="aboutMe">About Me</label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            value={userData.aboutMe}
            onChange={handleChange}
            required
          />
        </div>

        <div className="profile-image-container">
          {previewImage && <img src={previewImage} alt="Profile Preview" />}
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
    <Footer></Footer>
    </>
  );
};

export default EditProfile;
