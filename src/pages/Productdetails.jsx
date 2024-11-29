import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Productdetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import potato from "../assets/products/vegtables/potato1-pr1.png";
import chips from "../assets/chips.png"

const productData = [
  {
    id: 1,
    name: "Apple",
    images: [potato, chips, potato],
    category: "Fruits",
    brand: "Ooty Products",
    price: 120,
  },
  {
    id: 2,
    name: "Banana",
    images: [potato, potato, potato],
    category: "Fruits",
    brand: "Nestle",
    price: 60,
  },
  {
    id: 3,
    name: "Chips",
    images: [potato, potato, potato],
    category: "Snacks",
    brand: "Parle",
    price: 40,
  },
  {
    id: 4,
    name: "Milk",
    image: potato,
    category: "Diary",
    brand: "Coca-Cola",
    price: 90,
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const product = productData.find((item) => item.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const handleShare = async () => {
    const productUrl = `${window.location.origin}/product/${product.id}`;
    const shareData = {
      title: `Check out this product: ${product.name}`,
      text: `I found this amazing product "${product.name}". Check it out!`,
      url: productUrl,
    };

    if (navigator.share) {
      // Use Web Share API
      try {
        await navigator.share(shareData);
        alert("Product shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
        alert("Failed to share the product.");
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(productUrl);
        alert("Product link copied to clipboard!");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        alert("Failed to copy the link.");
      }
    }
  };

  const handleQuantityChange = (action) => {
    if (action === "increase") setQuantity(quantity + 1);
    if (action === "decrease" && quantity > 1) setQuantity(quantity - 1);
  };

  // Add to Cart with Budget Check
  const addToCart = (product) => {
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

    alert(`${product.name} added to cart!`);
  };

  const addToWishlist = (product) => {
    console.log("addToWishlist called with:", product); // Verify the product object
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isProductInWishlist = existingWishlist.some(
      (item) => item.id === product.id
    );

    if (!isProductInWishlist) {
      const updatedWishlist = [...existingWishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      console.log("Updated wishlist:", updatedWishlist); // Log the updated wishlist
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} is already in your wishlist!`);
    }
  };


    // Set the first image as the default selected image
    const initialImage = product.images && product.images.length > 0 ? product.images[0] : null;
    useEffect(() => {
      setSelectedImage(initialImage);
    }, [product]);
  
    const handleImageClick = (image) => {
      setSelectedImage(image); // Set the selected image when a thumbnail is clicked
    };

  return (
    <div className="pd-product-details">
      <div className="pd-image-gallery">
        <div className="pd-thumbnails">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} thumbnail ${index + 1}`}
              className="pd-thumbnail"
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
        <div className="pd-main-image">
          {selectedImage && <img src={selectedImage} alt={product.name} />}
        </div>
      </div>
      <div className="pd-details">
        <h1>{product.name}</h1>
        <p>Category: {product.category}</p>
        <p>Brand: {product.brand}</p>
        <p className="pd-price">Price: ₹{product.price}</p>

        {/* Quantity Controls */}
        <div className="pd-quantity-controls">
          <button
            onClick={() => handleQuantityChange("decrease")}
            className="pd-quantity-btn"
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => handleQuantityChange("increase")}
            className="pd-quantity-btn"
          >
            +
          </button>
        </div>

        {/* Buttons */}
        <button
          id="pr-button1"
          onClick={(e) => {
            addToCart(product);
          }}
        >
          <FontAwesomeIcon icon={faCartShopping} /> Add
        </button>
        <button
          className=".pr-button1"
          onClick={() => {
            console.log("Wishlist icon clicked!");
            addToWishlist(product);
          }}
        >
          <FontAwesomeIcon icon={faHeart} className="pr-icon"/>
          Wishlist
        </button>

        {/* Share Button */}
        <button className="pd-share-btn" onClick={handleShare}>
          Share
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
