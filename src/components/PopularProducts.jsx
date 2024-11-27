import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Shop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faEye } from "@fortawesome/free-solid-svg-icons";

// Import your product images
import potato4 from "../assets/products/vegtables/potato3-resized.png";

const PopularProducts = () => {
  // Predefined Product Data
  const productData = [
    { name: "Apple", image: potato4, category: "Fruits", brand: "Ooty Products", price: 150 },
    { name: "Banana", image: potato4, category: "Fruits", brand: "Nestle", price: 50 },
    { name: "Chips", image: potato4, category: "Snacks", brand: "Parle", price: 100 },
    { name: "Milk", image: potato4, category: "Dairy", brand: "Coca-Cola", price: 120 },
    { name: "Drinks", image: potato4, category: "Dairy", brand: "Coca-Cola", price: 120 },
    { name: "Snacks", image: potato4, category: "Dairy", brand: "Coca-Cola", price: 120 },
  ];

  // Generate 50 products from the predefined data
  const products = Array.from({ length: 50 }, (_, index) => {
    const product = productData[index % productData.length];
    return {
      id: index + 1,
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      image: product.image,
    };
  });

  // Select 12 products for Popular Products
  const popularProducts = products.slice(0, 6);

  // Budget States
  const [budget, setBudget] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Add to Cart Functionality
  const addToCart = (product) => {
    const newTotal = cartTotal + product.price;

    if (newTotal > budget) {
      alert("Exceeds your budget!");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductInCart = existingCart.some((item) => item.id === product.id);

    if (isProductInCart) {
      const updatedCart = existingCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...existingCart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    setCartTotal(newTotal);
    alert(`${product.name} added to cart!`);
  };

  // Add to Wishlist Functionality
  const addToWishlist = (product) => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isProductInWishlist = existingWishlist.some((item) => item.id === product.id);

    if (!isProductInWishlist) {
      const updatedWishlist = [...existingWishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} is already in your wishlist!`);
    }
  };

  return (
    <div className="popular-products-container">
      <h2>New Arrivals</h2>
      <div className="pp-products-grid">
        {popularProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <div
              className="favorite-icon"
              onClick={() => addToWishlist(product)}
            >
              <FontAwesomeIcon icon={faHeart} />
            </div>

            <div className="product-image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <Link to={`/products/${product.id}`} className="eye-icon">
                <FontAwesomeIcon icon={faEye} />
              </Link>
            </div>

            <p className="product-category">{product.category}</p>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-brand">By {product.brand}</p>
            <div className="product-details1">
              <p className="product-price">₹{product.price}</p>
              <button
                className={`add-to-cart-btn ${
                  cartTotal + product.price > budget ? "exceed-budget" : ""
                }`}
                onClick={() => addToCart(product)}
                disabled={cartTotal + product.price > budget}
              >
                <FontAwesomeIcon icon={faCartShopping} /> Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
