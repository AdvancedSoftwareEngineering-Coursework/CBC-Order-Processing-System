import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BasketProvider } from "./context/BasketContext";
import StaffLogin from "./pages/StaffLogin";
import LoginPage from "./pages/Login";
import ProductPage from "./pages/Products";
import BasketPage from "./pages/Basket";

function App() {
  return (
    <BasketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductPage />} /> {/* Default route */}
          <Route path="/staff" element={<StaffLogin />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/basket" element={<BasketPage />} />
        </Routes>
      </Router>
    </BasketProvider>
  );
}

export default App;
