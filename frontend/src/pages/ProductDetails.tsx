import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchItem } from "../api/itemApi";
import type { Item } from "../types/item";
import "../assets/css/details.style.css";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchItem(productId);
        console.log(data);
        setItem(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("エラー", error.message);
        }
      }
    };
    void fetchData();
  }, [productId]);

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={item?.imageUrl} alt="" />
      </div>
      <div className="product-detail-details">
        <h2>{item?.name}</h2>
        <p className="product-detail-desc">{item?.description}</p>
        <h3>
          <span>{item?.price ? `¥${item.price.toLocaleString()}` : ""}</span>
        </h3>
        <button className="add-to-cart-btn">
          <img
            src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png"
            alt=""
          />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
