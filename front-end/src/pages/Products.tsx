import React, { useState } from "react";
import Header from "../components/Header";
import { useBasket } from "../context/BasketContext";
import './Products.css';

type Product = {
  name: string;
  price: string;
  img: string;
};

const initialProducts: Product[] = [
  { name: "SparkleFresh", price: "$3.50", img: "https://individualproducts.com/wp-content/uploads/CHAP0010-Lemon-Neutral-Cleaner-1-1-300x300.jpg" },
  { name: "UltraShine Degreaser", price: "$7.20", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaD3t-JUxUU9ahdjv-iuuJAQ-X4NKUNdoER9HTfA2CopgEMntokLIxFJV_PyCsnlEfIUc&usqp=CAU" },
  { name: "GleamGuard", price: "$10.99", img: "https://individualproducts.com/wp-content/uploads/FCCCSH0001_General-Purpose-Spotter_Individual-1-300x300.jpg" },
  { name: "LemonLift All-Purpose Cleaner", price: "$6.75", img: "https://individualproducts.com/wp-content/uploads/CHAP0015_Fantastico_Individual-1-300x300.jpg" },
  { name: "ProSanitize Disinfectant", price: "$12.30", img: "https://individualproducts.com/wp-content/uploads/CHRE0005-Creme-Cleanser-Restrooms-1-1-2-300x300.jpg" },
  { name: "EcoScrub Power Gel", price: "$8.50", img: "https://individualproducts.com/wp-content/uploads/SCHSO0012-1-300x300.jpg" },
  { name: "CrystalClear Glass Cleaner", price: "$9.95", img: "https://individualproducts.com/wp-content/uploads/SCHSO0012-1-300x300.jpg" },
  { name: "PureBreeze Floor Wash", price: "$11.49", img: "https://individualproducts.com/wp-content/uploads/CHAP0010-Lemon-Neutral-Cleaner-1-1-300x300.jpg" },
  { name: "GrimeAway Heavy Duty Cleaner", price: "$15.99", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaD3t-JUxUU9ahdjv-iuuJAQ-X4NKUNdoER9HTfA2CopgEMntokLIxFJV_PyCsnlEfIUc&usqp=CAU" },
  { name: "BrightFoam Bathroom Cleaner", price: "$5.75", img: "https://individualproducts.com/wp-content/uploads/FCCCSH0001_General-Purpose-Spotter_Individual-1-300x300.jpg" },
  { name: "ShimmerShield Surface Cleaner", price: "$13.80", img: "https://individualproducts.com/wp-content/uploads/CHAP0015_Fantastico_Individual-1-300x300.jpg" },
  { name: "StainZap Pro", price: "$18.20", img: "https://individualproducts.com/wp-content/uploads/CHRE0005-Creme-Cleanser-Restrooms-1-1-2-300x300.jpg" },
];

const Products: React.FC = () => {
  const { addToBasket } = useBasket();
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Sort Products
  const handleSort = (sortOrder: string) => {
    if (sortOrder === "default") {
      setProducts(initialProducts); // Reset to default order
    } else {
      const sortedProducts = [...products].sort((a, b) => {
        const priceA = parseFloat(a.price.replace("$", ""));
        const priceB = parseFloat(b.price.replace("$", ""));
        return sortOrder === "low-to-high" ? priceA - priceB : priceB - priceA;
      });
      setProducts(sortedProducts);
    }
  };

  return (
    <div className="products-page">
      <Header />
      <div className="content">
        <h2 className="page-title">Products</h2>
        <div className="sort-container">
          <label htmlFor="sort">Sort By Price:</label>
          <select
            id="sort"
            className="sort-dropdown"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <img
                src={product.img}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
              <button
                className="add-to-basket-btn"
                onClick={() =>
                  addToBasket({
                    ...product,
                    quantity: 1,
                  })
                }
              >
                Add to Basket
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
