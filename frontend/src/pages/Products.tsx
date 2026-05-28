import { useEffect, useState } from "react";
import type { Item } from "../types/item";
import { fetchAll } from "../api/itemApi";
import Product from "../components/product-comp/Product";
import "../assets/css/products.style.css";

const Products = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAll();
        setItems(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("エラー", error.message);
        }
      }
    };

    void fetchData();
  }, []);

  return (
    <div>
      <div className="products-container">
        {items?.map((item) => (
          <Product
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
