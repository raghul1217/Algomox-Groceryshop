import React from "react";
import "../styles/Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = React.useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    alert("Item removed from wishlist!");
  };

  return (
    <div className="wl-wishlist-page">
      <h2 className="wl-title">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="wl-empty-message">Your wishlist is empty!</p>
      ) : (
        <div className="wl-wishlist-items">
          {wishlist.map((item) => (
            <div key={item.id} className="wl-wishlist-item">
              <img
                src={item.image}
                alt={item.name}
                className="wl-wishlist-image"
              />
              <div className="wl-wishlist-details">
                <h3 className="wl-item-name">{item.name}</h3>
                <p className="wl-item-price">Price: ₹{item.price}</p>
                <button
                  className="wl-remove-btn"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
