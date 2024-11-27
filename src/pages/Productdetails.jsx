import React, { useState } from "react";
import { useParams } from "react-router-dom";
import potato from "../assets/products/vegtables/potato1-pr1.png";

const productData = [
  { id: 1, name: "Apple", image: potato, category: "Fruits", brand: "Ooty Products", price: 120 },
  { id: 2, name: "Banana", image: potato, category: "Fruits", brand: "Nestle", price: 60 },
  { id: 3, name: "Chips", image: potato, category: "Snacks", brand: "Parle", price: 40 },
  { id: 4, name: "Milk", image: potato, category: "Diary", brand: "Coca-Cola", price: 90 },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
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

  return (
    <div className="pd-product-details">
      <img src={product.image} alt={product.name} className="pd-product-image" />
      <div className="pd-details">
        <h1>{product.name}</h1>
        <p>Category: {product.category}</p>
        <p>Brand: {product.brand}</p>
        <p className="pd-price">Price: ₹{product.price}</p>

        {/* Quantity Controls */}
        <div className="pd-quantity-controls">
          <button onClick={() => handleQuantityChange("decrease")} className="pd-quantity-btn">
            −
          </button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange("increase")} className="pd-quantity-btn">
            +
          </button>
        </div>

        {/* Buttons */}
        <button className="pd-add-to-cart-btn">Add to Cart</button>
        <button className="pd-wishlist-btn">Add to Wishlist</button>

        {/* Share Button */}
        <button className="pd-share-btn" onClick={handleShare}>
          Share
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
