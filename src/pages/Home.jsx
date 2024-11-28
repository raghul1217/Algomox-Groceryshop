import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faAppleAlt, faCarrot, faDrumstickBite, faFish, faCheese, faBreadSlice, faCoffee, faSnowflake, faHome, faHeartbeat, faCookieBite } from "@fortawesome/free-solid-svg-icons";
import '../styles/Home.css';
import diaryproduct from "../assets/diaryproducts.png";
import corousel1 from "../assets/corousel-1.png"
import lays from "../assets/lays2.png"
import Advertisement from "../components/Advertisement";
import darkc1 from "../assets/dark-c2.png";
import darkc2 from "../assets/dark-c3.png";
import darkc3 from "../assets/dark-c4.png";
import PopularProducts from "../components/PopularProducts";
import Footer from "../components/Footer";


const Home = ({ isDark }) => {
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 0,
      title: "Get the best quality fruits and vegetables at unbeatable prices",
      description1: "Stock up on essentials with farm-fresh quality at unbeatable prices. Eat healthy and save!",
      // description2: "Enjoy our seasonal discounts!",
      image: isDark ? darkc1 : corousel1,
    },
    {
      id: 1,
      title: "Having all types of products, world of grocery",
      description1: "Satisfy your cravings with our crispy, flavorful chips – the perfect snack for any time!",
      image: isDark ? darkc2 : lays,
    },
    {
      id: 2,
      title: "Get the best quality products at the lowest prices",
      description1: "Get fresh dairy products at unbeatable prices. Stay healthy and save more with our products!",
      image: isDark ? darkc3 : diaryproduct,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <div className="home-container">

        {/* Categories Dropdown */}
        <div className="home-left">
          <div className="categories-dropdown">
            <h3>Categories</h3>
            <ul>
              <li>
                <FontAwesomeIcon icon={faAppleAlt} /> Fruits
              </li>
              <li>
                <FontAwesomeIcon icon={faCarrot} /> Vegetables
              </li>
              <li>
                <FontAwesomeIcon icon={faDrumstickBite} /> Meats
              </li>
              <li>
                <FontAwesomeIcon icon={faFish} /> Seafoods
              </li>
              <li>
                <FontAwesomeIcon icon={faCheese} /> Dairy
              </li>
              <li>
                <FontAwesomeIcon icon={faBreadSlice} /> Bread and Bakeries
              </li>
              <li>
                <FontAwesomeIcon icon={faCoffee} /> Beverages
              </li>
              <li>
                <FontAwesomeIcon icon={faCookieBite} /> Snacks
              </li>
              <li>
                <FontAwesomeIcon icon={faSnowflake} /> Frozen Items
              </li>
              <li>
                <FontAwesomeIcon icon={faHome} /> Household Needs
              </li>
              <li>
                <FontAwesomeIcon icon={faHeartbeat} /> Healthcare
              </li>
            </ul>
          </div>
        </div>

        {/* Carousel */}
        <div className="home-right">
          <div className="carousel">
            {slides.map((slide, index) => (
              <div
                className={`carousel-slide ${
                  index === currentSlide ? "active" : ""
                }`}
                key={slide.id}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  display: index === currentSlide ? "block" : "none",
                }}
              >
                <div className="carousel-content">
                  <h1>{slide.title}</h1>
                  <p>{slide.description1}</p>
                  <p>{slide.description2}</p>
                  <button>Shop Now</button>
                </div>
              </div>
            ))}
            {/* Navigation Arrows */}
            <button className="carousel-arrow left" onClick={prevSlide}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className="carousel-arrow right" onClick={nextSlide}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
          </div>
          
        </div>
      </div>
      <Advertisement isDark={isDark}/>
      <PopularProducts/>
      <Footer/>
    </>
  );
};

export default Home;
