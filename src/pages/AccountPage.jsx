import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AccountPage.css";

const AccountPage = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    navigate("/"); // Redirect to the home page after logout
  };

  if (!loggedInUser) {
    navigate("/login"); // Redirect to login page if no user is logged in
  }

  return (
    <div className="ap-account-page">
      {loggedInUser ? (
        <>
          <h2 className="ap-welcome-title">Welcome, {loggedInUser.name}!</h2>
          <div className="ap-info-container">
            <div className="ap-account-text">
              <p className="ap-introduction">
                Welcome to your account dashboard! Here you can view and manage all your personal details, shopping activities, and rewards. 
                Use the links below to explore your cart, wishlist, and any rewards you've earned.
              </p>
              <p className="ap-cart-info">
                <strong>Your Cart:</strong> Here, you'll find the items you have added to your cart, ready for checkout. 
                You can update quantities or remove items before making your purchase.
              </p>
              <p className="ap-wishlist-info">
                <strong>Your Wishlist:</strong> You can save products that you're interested in for future purchase. 
                Easily move items from your wishlist to the cart when you're ready to buy.
              </p>
              <p className="ap-rewards-info">
                <strong>Your Rewards:</strong> As you shop, you'll earn points towards discounts and other exciting offers. 
                Keep an eye on your rewards balance and redeem them during checkout for great savings!
              </p>
            </div>
            <div className="ap-actions">
              <button className="ap-view-cart-btn" onClick={() => navigate("/cart")}>
                View Cart
              </button>
              <button className="ap-view-wishlist-btn" onClick={() => navigate("/wishlist")}>
                View Wishlist
              </button>
              <button className="ap-view-rewards-btn" onClick={() => navigate("/rewards")}>
                Your Rewards
              </button>
            </div>
            <button className="ap-logout-btn1" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="ap-login-prompt">Please log in to view your account.</p>
          <Link to="/login"><button>Login</button></Link>
        </>
      )}
    </div>
  );
};

export default AccountPage;
