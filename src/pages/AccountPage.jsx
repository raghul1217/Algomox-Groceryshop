import React from "react";
import { useNavigate } from "react-router-dom";
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
          <h2 className="ap-welcome-title">Welcome, {loggedInUser.username}!</h2>
          <div className="ap-user-info">
            <p className="ap-email">Email: {loggedInUser.email}</p>
            <button className="ap-logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <p className="ap-login-prompt">Please log in to view your account.</p>
      )}
    </div>
  );
};

export default AccountPage;
