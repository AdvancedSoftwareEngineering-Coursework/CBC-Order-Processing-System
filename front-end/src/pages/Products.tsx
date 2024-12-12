import React, {useState} from "react";
import Header from "../components/Header";
import { useBasket } from "../context/BasketContext";
import './Products.css'; 

type Product = {
    name: string;
    price: string;
    img: string;
  };


  const products: Product[] = [
  { name: "Product 1", price: "$10", img: "https://individualproducts.com/wp-content/uploads/CHAP0010-Lemon-Neutral-Cleaner-1-1-300x300.jpg" },
  { name: "Product 2", price: "$20", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaD3t-JUxUU9ahdjv-iuuJAQ-X4NKUNdoER9HTfA2CopgEMntokLIxFJV_PyCsnlEfIUc&usqp=CAU" },
  { name: "Product 3", price: "$30", img: "https://individualproducts.com/wp-content/uploads/FCCCSH0001_General-Purpose-Spotter_Individual-1-300x300.jpg" },
  { name: "Product 4", price: "$40", img: "https://individualproducts.com/wp-content/uploads/CHAP0015_Fantastico_Individual-1-300x300.jpg" },
  { name: "Product 5", price: "$50", img: "https://individualproducts.com/wp-content/uploads/CHRE0005-Creme-Cleanser-Restrooms-1-1-2-300x300.jpg" },
  { name: "Product 6", price: "$60", img: "https://individualproducts.com/wp-content/uploads/SCHSO0012-1-300x300.jpg" },
  { name: "Product 7", price: "$70", img: "https://individualproducts.com/wp-content/uploads/SCHSO0012-1-300x300.jpg" },
  { name: "Product 8", price: "$80", img: "https://individualproducts.com/wp-content/uploads/CHAP0010-Lemon-Neutral-Cleaner-1-1-300x300.jpg" },
  { name: "Product 9", price: "$90", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaD3t-JUxUU9ahdjv-iuuJAQ-X4NKUNdoER9HTfA2CopgEMntokLIxFJV_PyCsnlEfIUc&usqp=CAU" },
  { name: "Product 10", price: "$100", img: "https://individualproducts.com/wp-content/uploads/FCCCSH0001_General-Purpose-Spotter_Individual-1-300x300.jpg" },
  { name: "Product 11", price: "$110", img: "https://individualproducts.com/wp-content/uploads/CHAP0015_Fantastico_Individual-1-300x300.jpg" },
  { name: "Product 12", price: "$120", img: "https://individualproducts.com/wp-content/uploads/CHRE0005-Creme-Cleanser-Restrooms-1-1-2-300x300.jpg" },
];

const Products: React.FC = () => {
  const { addToBasket } = useBasket(); // Use the addToBasket function from the context

  return (
    <div className="products-page">
      <Header />
      <div className="content">
        <h2 className="page-title">Products</h2>
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
                    quantity: 1, // Add default quantity
                  })
                }
              >
                Add to Basket
              </button>
            </div>
          ))}
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default Products;