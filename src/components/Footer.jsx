import React from "react";
import "../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faPhone,
  faEnvelope,
  faLocationDot,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faWhatsapp,
  faFacebook,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-columns">
        {/* Column 1 */}
        <div className="footer-column">
          <h2 className="footer-brand">
            <FontAwesomeIcon icon={faShoppingCart} /> GroverMart
          </h2>
          <p>Feel free to follow us on our social media handles:</p>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTelegram} />
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div className="footer-column">
          <h3>Contact Info</h3>
          <p>
            <FontAwesomeIcon icon={faPhone} /> +1 234 567 890
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> support@grovermart.com
          </p>
          <p>
            <FontAwesomeIcon icon={faLocationDot} /> 123 Market St, San Francisco, CA
          </p>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="quick-links">
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/reviews">Reviews</a></li>
            <li><a href="/blogs">Blogs</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-column">
          <h3>Newsletter</h3>
          <p>Subscribe for latest updates:</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Enter your email" />
            <button className="send-button">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
          <button className="subscribe-button">Subscribe</button>
          <div className="payment-options">
            <img src="/path/to/visa.png" alt="Visa" />
            <img src="/path/to/debit-card.png" alt="Debit Card" />
            <img src="/path/to/credit-card.png" alt="Credit Card" />
          </div>
        </div>
      </div>

      <hr className="footer-divider" />
      <p className="footer-copyright">
        &copy; 2024 GroverMart. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
