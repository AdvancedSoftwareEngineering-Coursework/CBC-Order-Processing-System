import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/CBC-LOGO.png";
import "./Header.css";
import { useBasket } from "../context/BasketContext";

const Header: React.FC = () => {
  const { basket } = useBasket();

  // Calculate the total number of items in the basket
  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <h1 className="company-name">Clean Bright Company</h1>
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
        <Link to="/basket" className="nav-link basket-link">
          <img
            src="https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png"
            alt="Basket"
            className="basket-icon"
          />
          {totalItems > 0 && <span className="basket-counter">{totalItems}</span>}
        </Link>
      </nav>
    </header>
  );
};

export default Header;