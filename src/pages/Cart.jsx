import React, { useEffect, useState } from "react";
import "../styles/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (id) => {
    // Remove item from cart
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="ca-cart">
      <h1 className="ca-title">Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <ul className="ca-item-list">
            {cart.map((item) => (
              <li className="ca-item" key={item.id}>
                <img className="ca-item-image" src={item.image} alt={item.name} />
                <div className="ca-item-details">
                  <h2 className="ca-item-name">{item.name}</h2>
                  <p className="ca-item-price">Price: ₹{item.price}</p>
                  <p className="ca-item-quantity">Quantity: {item.quantity}</p>
                </div>
                <div className="ca-btn">
                <button
                  className="ca-remove-btn"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={clearCart} className="ca-clear-cart-btn">
            Clear Cart
          </button>
        </>
      ) : (
        <p className="ca-empty-message">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
