import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faHeart,
  faBars,
  faSearch,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoStorefrontSharp, IoMenuSharp } from "react-icons/io5";
import { Toggle } from "./Toggle";
import "../styles/MobileNavbar.css";
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'; 
import { AiOutlineBars } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa";

const MobileNavbar = ({ isDark, setIsDark, onSearch  }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route location

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

   // Manage search query and visibility of search bar// State to store search input
   const [showSearchBar, setShowSearchBar] = useState(false); // Toggle for mobile search bar
 
   const handleSearchClick = () => {
     setShowSearchBar(!showSearchBar); // Toggle search bar visibility
   };

  // Handle menu toggle
  const [showNav, setShowNav] = useState(false);
  const handleMenuClick = () => {
    setShowNav(!showNav);
  };

  // Conditionally render Shop/Home icon
  const isOnShopPage = location.pathname === "/shop";
  const isOnHomePage = location.pathname === "/";

  const [searchQuery, setSearchQuery] = useState(""); // State to store search input

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to the shop page with the search query
    navigate(`/shop?search=${searchQuery}`);
  };

  return (
    <div className="d-navbar">
      {/* Desktop Navbar */}
      <div className="nav-line1 desktop">
        <div className="d-brand">
          <p>
            Grocer<span>Mart</span>
          </p>
        </div>
        <div className="searchbar">
  <form onSubmit={handleSearchSubmit}>
    <div className="searchbar-with-icon">
      <input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update the state with input value
      />
      <div className="voice-icon-container">
        <FontAwesomeIcon icon={faMicrophone} className="voice-icon"/>
      </div>
      <button type="button" onClick={handleSearchSubmit}>
        <FontAwesomeIcon icon={faSearch} className="newsearch-icon" /> Search
      </button>
    </div>
  </form>
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
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <a href="#">Fruits & Vegetables</a>
            </li>
            <li>
              <a href="#">Beverages</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
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
          <FontAwesomeIcon
            icon={faBars}
            onClick={handleMenuClick}
            className="menu-bar"
          />
                <div className="searchbar">
  <form onSubmit={handleSearchSubmit}>
    <div className="searchbar-with-icon">
      <input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update the state with input value
      />
      <div className="voice-icon-container">
        <FontAwesomeIcon icon={faMicrophone} className="voice-icon" />
      </div>
      <button type="button" onClick={handleSearchSubmit}>
        <FontAwesomeIcon icon={faSearch} className="newsearch-icon" />
        <span className="search-text">Search</span>
      </button>
    </div>
  </form>
</div>

          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
        </div>

        {showNav && (
          <div className="mobile-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <a href="#">Fruits & Vegetables</a>
              </li>
              <li>
                <a href="#">Beverages</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
            <div className="d-navright">
              <button id="d-navsigup">Signup</button>
              <Toggle
                isChecked={isDark}
                handleChange={() => setIsDark(!isDark)}
              />
            </div>
          </div>
        )}

        <div className="mobile-icons">
          <div className="m1">
          {isOnShopPage ? (
            <Link to="/" className="mn-link">
              <div className="m-bottom-icons">
                <FontAwesomeIcon icon={faHome} className="m-icon" />
                <p className="ic">Home</p>
              </div>
            </Link>
          ) : (
            <Link to="/shop" className="mn-link">
              <div className="m-bottom-icons">
                <IoStorefrontSharp className="m-icon" />
                <p className="ic">Shop</p>
              </div>
            </Link>
          )}
          </div>

          <div className="m2">
          <Link to="/wishlist" className="mn-link">
            <div className="m-bottom-icons">
              <FontAwesomeIcon icon={faHeart} className="m-icon" />
              <p className="ic">Wishlist</p>
            </div>
          </Link>
          </div>

          <div className="m3">
          <Link className="mn-link" onClick={handleSearchClick}>
            <div className="m-bottom-icons">
              <FontAwesomeIcon
                icon={faSearch}
                className="m-icon"
              />
              <p className="ic">Search</p>
            </div>
          </Link>
          </div>

            <div className="m4">
            <Link to="/account" className="mn-link">
              <div className="m-bottom-icons">
                <FontAwesomeIcon
                  icon={faUser}
                  onClick={handleUserIconClick}
                  className="m-icon"
                />
                <p className="ic">Account</p>
              </div>
            </Link>
            </div>

          <div className="m5">
          <Link to="/cart" className="mn-link">
            <div className="m-bottom-icons">
              <FontAwesomeIcon icon={faCartShopping} className="m-icon" />
              <p className="ic">Cart</p>
            </div>
          </Link>
          </div>

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
