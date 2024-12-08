import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Wishlist from '../Common/Wishlist'; // Placeholder for Wishlist component
import AccountIcon from '../Common/AccountIcon'; // Placeholder for Account Icon component
import CartIcon from '../Common/CartIcon'; // Placeholder for Cart Icon component
import './Nav.css'

const Nav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  console.log(isActive('/Books'));

  return (
<>
    <nav className="navigation">
        <a className="logo" href="/">BookNest</a>

        <div className="nav-items-container">
          <ul className="nav-items">
            <li>
              <NavLink to="/HomePage" className={isActive('/HomePage') ? 'active-link' : ''}> Home </NavLink>
            </li>
            <li>
              <NavLink to="/Books" className={isActive('/Books') ? 'active-link' : ''}>Books</NavLink>
            </li>
            <li>
              <NavLink to="/Contact" className={isActive('/Contact') ? 'active-link' : ''}>Contact</NavLink>
            </li>
            <li>
              <NavLink to="/About" className={isActive('/About') ? 'active-link' : ''}>About</NavLink>
            </li>
            
            {/* <li>
              <NavLink to="/Profile" className={isActive('/Profile') ? 'active-link' : ''}>Profile</NavLink>
            </li> */}
          
          </ul>
        </div>

        <div className="search-bar-container">
          <div className="search-bar">
            <svg className="search-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
            <input type="text" className="search-input" placeholder="Search" />
          </div>
        </div>

      <div className="action-buttons">
        <ul className="action-items">
          <li>
            <Link to="/LoginForm" className="cart-link"><Wishlist /></Link>
          </li>
          <li>
            <Link to="/Profile" className="cart-link">
            <AccountIcon bgColor={isActive('/Profile') ? 'black' : ''}/>
            </Link>
          </li>
          <li>
            <Link to="/Cart" className="cart-link">
              <CartIcon bgColor={isActive('/Cart') ? 'black' : ''} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>   
     <div className="separator"></div>
     </>
  
    
  );
};

export default Nav;