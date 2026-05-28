import React from "react";
import "../assets/css/products.style.css";
import Product from "../components/product-comp/Product";
import { items } from "../constants/items";
import type { Item } from "../types/item";

const Products = () => {
  const itemList: Item[] = items;

  return (
    <div>
      <div className="products-container">
        {itemList.map((item) => (
          <Product
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
