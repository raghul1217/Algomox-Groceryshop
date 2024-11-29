import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Shop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faEye } from "@fortawesome/free-solid-svg-icons";

// Import your product images
import potato4 from "../assets/products/vegtables/potato3-resized.png";
// importing juices:
import juice1 from "../assets/products/juices/juice-1.png";
import juice31 from "../assets/products/juices/juice3-1.png";

//importing seafoods:
import seafood1 from "../assets/products/meats and seafoods/fish1-1.png";

//importing meats:
import meat1 from "../assets/products/meats and seafoods/meat1-1.png";

//importing diary products:
import diary1 from "../assets/products/diary/diary1-1.png"
import diary4 from "../assets/products/diary/diary2-1.png"

//importing fruits:
import fruit1 from "../assets/products/fruits/fruit1-2.png";
import fruit4 from "../assets/products/fruits/fruit2-1.png";

//importing snacks:
import snacks1 from "../assets/products/snacks/snacks1-1.png";
import snacks3 from "../assets/products/snacks/snacks2-1.png";



const PopularProducts = () => {
  // Predefined Product Data
  const productData = [
    {
      name: "Fresh Organic Bananas, Bunch",
      image: fruit4,
      category: "Fruits",
      brand: "Dmart",
      price: 120,
    },
    //2
    {
      name: "Schweppes Diet Ginger - pack of 3",
      image: juice1,
      category: "juice",
      brand: "Nestle",
      price: 50,
    },
    //3
    {
      name: "Fresh Skinless Atlantic Salmon – 2pk_10oz",
      image: seafood1,
      category: "Seafoods",
      brand: "Ak Provisions",
      price: 240,
    },
    //4
    {
      name: " Black Iced Tea Drink – 52 fl oz",
      image: juice31,
      category: "juice",
      brand: "Dmart",
      price: 90,
    },
    //5
    {
      name: "USDA Choice Angus Beef Stew Meat – 1lb",
      image: meat1,
      category: "Meats",
      brand: "Dmart",
      price: 120,
    },
    //6
    {
      name: "Caramel Apple Soft Caramels – 8.57oz",
      image: diary1,
      category: "Dairy",
      brand: "Ram stores",
      price: 120,
    },
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
        budget > 0 && cartTotal + product.price > budget ? "exceed-budget" : ""
      }`}
      onClick={(e) => {
        // Prevent navigation when clicking the button
        e.preventDefault();
        addToCart(product);
      }}
      disabled={budget > 0 && cartTotal + product.price > budget}
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
