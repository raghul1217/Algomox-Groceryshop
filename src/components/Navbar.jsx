import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../styles/Navbar.css";
import { Link, useNavigate  } from "react-router-dom";
import { Toggle } from "./Toggle";

const Navbar = ({ isDark, setIsDark }) => {
  const navigate = useNavigate();
  
  // Check if the user is logged in (using localStorage)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  // Handle User Icon Click
  const handleUserIconClick = () => {
    if (isLoggedIn) {
      navigate("/account");  // Redirect to the Account Page
    } else {
      navigate("/signup");    // Redirect to the Login Page
    }
  };

  return (
    <div className="d-navbar">
      {/* First Line */}
      <div className="nav-line1">
        <div className="d-brand">
          <p>
            Grocer<span>Mart</span>
          </p>
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
      {/* Second Line */}
      <div className="nav-line2">
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
          <button id="d-navsigup">Sigup</button>
          <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
