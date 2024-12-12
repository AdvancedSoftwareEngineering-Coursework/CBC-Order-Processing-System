import React from "react";
import Header from "../components/Header";
import { useBasket } from "../context/BasketContext";
import "./Basket.css";

const Basket: React.FC = () => {
  const { basket, removeFromBasket, updateQuantity } = useBasket();

  const calculateSubtotal = () =>
    basket.reduce(
      (acc, item) => acc + parseFloat(item.price.replace("$", "")) * item.quantity,
      0
    );

  const subtotal = calculateSubtotal();
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  return (
    <div className="basket-page">
      <Header />
      <div className="basket-container">
        <h1>Basket</h1>
        <p>Your basket ({basket.length} items)</p>

        <div className="basket-actions">
          <button className="continue-shopping-btn">Continue Shopping</button>
          <button className="proceed-to-checkout-btn">Proceed to Checkout</button>
        </div>

        <table className="basket-table">
          <thead>
            <tr>
              <th>Product Information</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {basket.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="product-info">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="product-img"
                    />
                    <span>{item.name}</span>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromBasket(item.name)} 
                  >
                    Remove
                  </button>
                </td>
                <td>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        updateQuantity(item.name, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.name, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Checkout Section */}
        <div className="checkout-section">
          <h3>Order Summary</h3>
          <p>Subtotal (excluding discounts): ${subtotal.toFixed(2)}</p>
          <p>Your order includes VAT @20%: ${vat.toFixed(2)}</p>
          <p>Total Cost (including VAT): ${total.toFixed(2)}</p>

          <div className="checkout-buttons">
            <button className="proceed-to-checkout-btn">Proceed to Checkout</button>
            <button className="checkout-with-paypal-btn">Checkout with PayPal</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
