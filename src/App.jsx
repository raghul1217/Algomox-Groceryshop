import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/Productdetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import SignupPage from "./pages/SignupPage";
import MobileNavbar from "./components/MobileNavbar";

function App() {
  const [isDark, setIsDark] = useLocalStorage("isDark", true);

  return (
    <div data-theme={isDark ? "dark" : "light"}>
      <Router>
        <MobileNavbar isDark={isDark} setIsDark={setIsDark}/>
        <Routes>
          <Route path="/" element={<Home isDark={isDark} />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
