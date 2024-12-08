import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Books from './Books/Books'
import BookDetails from './BookDetails/BookDetails'
import Cart from './Cart/Cart'
import Profile from "./Profile/Profile";
import Contact from "./Contact/Contact";
import About from "./About/About";
import LoginForm from "./Authentication/LoginForm";
import RegisterForm from "./Authentication/RegisterForm";
import HomePage from "./HomePage/HomePage";
import EditeProfile from "./Profile/EditProfile";






createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Router>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/Books" element={<Books />} /> 
        <Route path="/BookDetails" element={<BookDetails />} /> 
        <Route path="/Cart" element={<Cart />} /> 
        <Route path="/Profile" element={<Profile />} /> 
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/RegisterForm" element={<RegisterForm />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/EditeProfile" element={<EditeProfile />} />
      </Routes>
    </Router>
  </StrictMode>,
)
