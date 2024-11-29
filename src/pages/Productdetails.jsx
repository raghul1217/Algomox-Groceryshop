import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Productdetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import potato from "../assets/products/vegtables/potato1-pr1.png";
import chips from "../assets/chips.png";
import potato5 from "../assets/products/vegtables/potato2.png";

// importing juices:
import juice1 from "../assets/products/juices/juice-1.png";
import juice2 from "../assets/products/juices/juice-2.png";
import juice31 from "../assets/products/juices/juice3-1.png";
import juice32 from "../assets/products/juices/juice3-2.png";

//importing seafoods:
import seafood1 from "../assets/products/meats and seafoods/fish1-1.png";
import seafood2 from "../assets/products/meats and seafoods/fish1-2.png";
import seafood3 from "../assets/products/meats and seafoods/fish1-3.png";

//importing meats:
import meat1 from "../assets/products/meats and seafoods/meat1-1.png";
import meat2 from "../assets/products/meats and seafoods/meat1-2.png";
import meat3 from "../assets/products/meats and seafoods/meat1-3.png";

//importing diary products:
import diary1 from "../assets/products/diary/diary1-1.png"
import diary2 from "../assets/products/diary/diary1-2.png"
import diary3 from "../assets/products/diary/diary1-3.png"
import diary4 from "../assets/products/diary/diary2-1.png"
import diary5 from "../assets/products/diary/diary2-2.png"
import diary6 from "../assets/products/diary/diary2-3.png"

//importing fruits:
import fruit1 from "../assets/products/fruits/fruit1-2.png";
import fruit2 from "../assets/products/fruits/fruit1-4.png";
import fruit3 from "../assets/products/fruits/fruit1-3.png";
import fruit4 from "../assets/products/fruits/fruit2-1.png";
import fruit5 from "../assets/products/fruits/fruit2-2.png";
import fruit6 from "../assets/products/fruits/fruit2-3.png";

//importing snacks:
import snacks1 from "../assets/products/snacks/snacks1-1.png";
import snacks2 from "../assets/products/snacks/snacks1-2.png";
import snacks3 from "../assets/products/snacks/snacks2-1.png";
import snacks4 from "../assets/products/snacks/snacks2-2.png";
import snacks5 from "../assets/products/snacks/snacks2-3.png";

const productData = [
  {
    id: 1,
    name: "Marketside Fresh Organic Bananas, Bunch",
    images: [fruit4, fruit5, fruit6],
    category: "Fruits",
    brand: "Coca-Cola",
    price: 90,
  },
  {
    id: 2,
    name: "Schweppes Diet Ginger Ale 12 oz Cans – Pack of 24",
    images: [juice1, juice2],
    category: "juice",
    brand: "Nestle",
    price: 60,
  },
  {
    id: 3,
    name: "Fresh Skinless Atlantic Salmon – 2pk_10oz",
    images: [seafood1, seafood2, seafood3],
    category: "Seafoods",
    brand: "Parle",
    price: 240,
  },
  {
    id: 4,
    name: "Black Iced Tea Drink – 52 fl oz",
    images: [juice31, juice32],
    category: "juice",
    brand: "Coca-Cola",
    price: 90,
  },
  {
    id: 5,
    name: "USDA Choice Angus Beef Stew Meat – 1lb",
    images: [meat1, meat2, meat3],
    category: "Meats",
    brand: "Coca-Cola",
    price: 90,
  },
  {
    id: 6,
    name: "Halloween Harvest Caramel Apple Soft Caramels – 8.57oz",
    images: [diary1, diary2, diary3],
    category: "Diary",
    brand: "Coca-Cola",
    price: 120,
  },
  {
    id: 7,
    name: "Simple Kitchen FD Sliced Strawberries – 1.08lb",
    images: [fruit1,fruit2,fruit3],
    category: "Fruits",
    brand: "Coca-Cola",
    price: 90,
  },
  {
    id: 8,
    name: "Tillamook Medium Cheddar Cheese Loaf – 32oz",
    images: [diary4, diary5, diary6],
    category: "Diary",
    brand: "Coca-Cola",
    price: 90,
  },
  {
    id: 9,
    name: "Yellow Potatoes Whole Fresh, 5lb Bag",
    images: [potato, potato5],
    category: "vegetables",
    brand: "Ooty Products",
    price: 120,
  },
  {
    id: 10,
    name: "snacks",
    images: [snacks1, snacks2],
    category: "Snacks",
    brand: "Coca-Cola",
    price: 90,
  },
  {
    id: 11,
    name: "Milk",
    images: [juice31, juice32],
    category: "Diary",
    brand: "Coca-Cola",
    price: 90,
  },
  {
    id: 12,
    name: "Milk",
    images: [juice31, juice32],
    category: "Diary",
    brand: "Coca-Cola",
    price: 90,
  },
  {
    id: 13,
    name: "California Pizza Kitchen Margherita, Crispy Thin Crust Pizza, 15.5 oz (Frozen)",
    images: [snacks3, snacks4, snacks5],
    category: "Snacks",
    brand: "Coca-Cola",
    price: 140,
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
