import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/CBC-LOGO.png";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Clean Bright Company Logo" className="logo" />
        <h1 className="company-name">Clean Bright Company</h1>
      </div>
      <nav className="nav">
        <Link to="/product" className="nav-link">
          Products
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/staff" className="nav-link">
          Staff
        </Link>
        <Link to="/basket" className="nav-link">
          <img
            src="https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png"
            alt="Basket"
            className="basket-icon"
          />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
