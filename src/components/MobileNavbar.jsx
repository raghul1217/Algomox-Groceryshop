import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faHeart, faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { IoStorefrontSharp, IoMenuSharp } from "react-icons/io5";
import { Toggle } from "./Toggle";
import "../styles/MobileNavbar.css";
import { AiOutlineBars } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa";



const MobileNavbar = ({ isDark, setIsDark }) => {
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      navigate("/account");
    } else {
      navigate("/signup");
    }
  };

  // Handle search bar visibility
  const [showSearchBar, setShowSearchBar] = useState(false);
  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  // Handle menu toggle
  const [showNav, setShowNav] = useState(false);
  const handleMenuClick = () => {
    setShowNav(!showNav);
  };

  return (
    <div className="d-navbar">
      {/* Desktop Navbar */}
      <div className="nav-line1 desktop">
        <div className="d-brand">
          <p>Grocer<span>Mart</span></p>
        </div>
        <div className="d-searchbar">
          <input type="text" placeholder="Search for products..." />
        </div>
        <div className="d-navicons">
          <FontAwesomeIcon icon={faUser} onClick={handleUserIconClick} />
          <Link to="wishlist">
            <FontAwesomeIcon icon={faHeart} />
          </Link>
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
        </div>
      </div>

      {/* Desktop Navbar Second Line */}
      <div className="nav-line2 desktop">
        <div className="d-navleft">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><a href="#">Fruits & Vegetables</a></li>
            <li><a href="#">Beverages</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="d-navright">
          <button id="d-navsigup">Signup</button>
          <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="mobile">
        <div className="mobile-header">
          <FontAwesomeIcon icon={faBars} onClick={handleMenuClick} className="menu-bar" />
          <div className="d-brand">
            <p>Grocer<span>Mart</span></p>
          </div>
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
        </div>

        {showNav && (
          <div className="mobile-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><a href="#">Fruits & Vegetables</a></li>
              <li><a href="#">Beverages</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        )}

<div className="mobile-icons">
      {/* Shop Icon */}
      <Link to="/shop" className="mn-link">
        <div className="m-bottom-icons">
        <IoStorefrontSharp className="m-icon" />
        <p className="ic">shop</p>
        </div>
      </Link>

      {/* Wishlist Icon */}
      <Link to="/wishlist" className="mn-link">
        <div className="m-bottom-icons">
        <FontAwesomeIcon icon={faHeart} className="m-icon" />
        <p className="ic">Wishlist</p>
        </div>
      </Link>

      {/* Search Icon */}
      <Link className="mn-link">
        <div className="m-bottom-icons">
        <FontAwesomeIcon icon={faSearch} onClick={handleSearchClick} className="m-icon" />
        <p className="ic">Search</p>
        </div>
      </Link>

      {/* Account/User Icon */}
      <Link className="mn-link">
        <div className="m-bottom-icons">
        <FontAwesomeIcon icon={faUser} onClick={handleUserIconClick} className="m-icon" />
        <p className="ic">Account</p>
        </div>
      </Link>

      {/* Categories Icon */}
      <Link className="mn-link">
        <div className="m-bottom-icons">
        <AiOutlineBars className="m-icon" />
        <p className="ic">Categories</p>
        </div>
      </Link>

      {/* <IoMenuSharp className="m-icon" /> */}
      
      {/* <FiFilter className="m-icon" />
      <FaFolderOpen className="m-icon" />
      <MdCategory className="m-icon" /> */}
    </div>

        {showSearchBar && (
          <div className="mobile-searchbar">
            <input type="text" placeholder="Search for products..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;
