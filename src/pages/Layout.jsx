import React from "react";
import Navbar from "../components/Navbar";
import MobileNavbar from "../components/MobileNavbar";

const Layout = ({ isDark, setIsDark }) => {
  const isMobile = window.innerWidth <= 768; // Define mobile breakpoint

  return (
    <div>
      {isMobile ? (
        <MobileNavbar isDark={isDark} setIsDark={setIsDark} />
      ) : (
        <Navbar isDark={isDark} setIsDark={setIsDark} />
      )}
    </div>
  );
};

export default Layout;
