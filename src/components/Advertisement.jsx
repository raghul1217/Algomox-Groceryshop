import React from "react";
import "../styles/Advertisement.css";
import eggs from "../assets/eggs.png";
import cookies from "../assets/cookies.png";
import chips from "../assets/chips.png";
import darkeggs from "../assets/eggs-d.png";
import darkcookies from "../assets/cookies-d.png";
import darkchips from "../assets/chips-d.png";


const Advertisement = ({ isDark }) => {
  const cards = [
    {
      id: 1,
      background: isDark ? darkeggs : eggs, // Update paths accordingly
      title: "Quality eggs at an affordable price",
      subtitle: "Eat one every day",
      content: "Only this week",
    },
    {
      id: 2,
      background: isDark ? darkcookies : cookies,
      title: "Snacks that nourishes our mind",
      subtitle: "sweety bites",
      content: "Only this week",
    },
    {
      id: 3,
      background: isDark ? darkchips : chips,
      title: "Unbeatable quality, Unbeatable prices",
      subtitle: "Crunchy and tasty",
      content: "Only this week",
    },
  ];

  return (
    <div className="advertisement-container">
      {cards.map((card) => (
        <div
          className="advertisement-card"
          key={card.id}
          style={{ backgroundImage: `url(${card.background})` }}
        >
          <p id="ad-content">{card.content}</p>
          <h2 style={{width: '60%', 'padding-top': "16px", 'padding-left': "16px", }}>{card.title}</h2>
          <p>{card.subtitle}</p>
          <button className="a-shop-now-btn">Shop Now</button>
        </div>
      ))}
    </div>
  );
};

export default Advertisement;
