import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.css"; // Import the CSS file for styling

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/account"); // Redirect to account page after successful login
    } else {
      setMessage("Invalid email or password!");
    }
  };

  return (
    <div className="lp-login-page">
      <h2 className="lp-title">Login</h2>
      <div className="lp-form-container">
        <input
          type="email"
          className="lp-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="lp-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="lp-button" onClick={handleLogin}>Login</button>
        {message && <p className="lp-message">{message}</p>}
      </div>

      <p>Dont have an account <Link to="/signup">Signup</Link></p>
    </div>
  );
};

export default LoginPage;
