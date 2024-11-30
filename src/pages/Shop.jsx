import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Shop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

// Import your product images
import potato4 from "../assets/products/vegtables/potato3-resized.png";
import potato5 from "../assets/products/vegtables/potato2.png";

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



const Shop = () => {
  
  const productData = [
    //1
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
    //7
    {
      name: "Kitchen FD Sliced Strawberries – 1.08lb",
      image: fruit1,
      category: "Fruits",
      brand: "Dmart",
      price: 150,
    },
    //8
    {
      name: "Tillamook Cheddar Cheese Loaf – 32oz",
      image: diary4,
      category: "Dairy",
      brand: "Ram stores",
      price: 120,
    },
    //9
    {
      name: "Yellow Potatoes Whole Fresh, 5lb Bag",
      image: potato4,
      category: "Vegetables",
      brand: "smart dealers",
      price: 150,
    },
    //10
    {
      name: "Caramel Apple Soft Caramels – 8.57oz",
      image: snacks1,
      category: "Snacks",
      brand: "Dmart",
      price: 120,
    },
    //11
    {
      name: "Caramel Apple Soft Caramels – 8.57oz",
      image: diary1,
      category: "Dairy",
      brand: "Dmart",
      price: 120,
    },
    //12
    {
      name: "Caramel Apple Soft Caramels – 8.57oz",
      image: diary1,
      category: "Dairy",
      brand: "Ram stores",
      price: 120,
    },
    //13
    {
      name: "Crispy Thin Crust Pizza, 15.5oz",
      image: snacks3,
      category: "Snacks",
      brand: "Dmart",
      price: 140,
    },
  ];

  // Generate 50 unique products based on the predefined product data
  const products = Array.from({ length: 50 }, (_, index) => {
    const product = productData[index % productData.length]; // Rotate through productData
    return {
      id: index + 1,
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      image: product.image,
    };
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const [budget, setBudget] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const categories = ["Fruits", "Vegetables", "Dairy", "Snacks", "juice", "Meats", "Seafoods"];
  const brands = ["Ak Provisions", "smart dealers", "Dmart", "Ram stores"];

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    applyFilters(updatedCategories, selectedBrands);
  };

  const handleBrandChange = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updatedBrands);
    applyFilters(selectedCategories, updatedBrands);
  };

  const applyFilters = (categories, brands) => {
    let filtered = products;

    if (categories.length > 0) {
      filtered = filtered.filter((product) =>
        categories.includes(product.category)
      );
    }

    if (brands.length > 0) {
      filtered = filtered.filter((product) => brands.includes(product.brand));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Add to Cart with Budget Check
  const addToCart = (product) => {

      if (!budget || budget <= 0) {
    alert("Please enter your budget before adding items to the cart.");
    return;
  }
    const newTotal = cartTotal + product.price;

    if (newTotal > budget) {
      alert("Exceeds your budget, Check your budget on shop!");
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

  // Add to Wishlist
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

  // Effect to handle search filtering from URL
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search")?.toLowerCase() || "";

    if (searchQuery) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // If no search, show all products
    }
  }, [location.search]);

  return (
    <div className="shop-container">
      {/* Left Section - Filters */}
      {/* The commented-out filter section can be restored if necessary */}

      <div className="d-shop-left">
        <div className="filter-section">
          <div className="budget-input">
            <label>
              <h3>Budget:</h3>
              <input
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                placeholder="Enter budget..."
              />
            </label>
            <p>Cart Total: ₹{cartTotal}</p>
          </div>
          <div className="filter2">
            <h3>Categories</h3>
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleCategoryChange(category)}
                    />
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="filter3">
            <h3>Dealers</h3>
            <ul>
              {brands.map((brand) => (
                <li key={brand}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleBrandChange(brand)}
                    />
                    {brand}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="m-shop-left">
        <div className="m-filter-head-div">
          <div className="filter-header" onClick={toggleFilter}>
            <h3>Filter</h3>
            <FontAwesomeIcon icon={faCaretDown} className="filter-icon"/>
          </div>
          <div className="m-budget-input">
            <label>
              <h3>Budget:</h3>
              <input
                // type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                placeholder="Enter budget..."
              />
            </label>
            <p>Cart Total: ₹{cartTotal}</p>
          </div>
        </div>
        <div className="m-filter-section">
          {isFilterOpen && (
            <div className="m-filter-content">
              <div className="m-filter2">
                <h3>Categories</h3>
                <ul>
                  {categories.map((category) => (
                    <li key={category}>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() => handleCategoryChange(category)}
                        />
                        {category}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="m-filter3">
                <h3>Brands</h3>
                <ul>
                  {brands.map((brand) => (
                    <li key={brand}>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() => handleBrandChange(brand)}
                        />
                        {brand}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Products */}
      <div className="d-shop-right">
        <div className="products-grid">
          {paginatedProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div
                className="favorite-icon"
                onClick={() => {
                  console.log("Wishlist icon clicked!");
                  addToWishlist(product);
                }}
              >
                <FontAwesomeIcon icon={faHeart} className="faheart"/>
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

              <Link to={`/products/${product.id}`} className="s-productcard">
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
</Link>

            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
