import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchItem } from "../api/itemApi";
import type { Item } from "../types/item";
import "../assets/css/details.style.css";
import { addItemToCart } from "../api/cartApi";
import { useAuth } from "../hooks/useAuth";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const itemId = Number(id);
  const [item, setItem] = useState<Item>();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchItem(itemId);
        console.log(data);
        setItem(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("エラー", error.message);
        }
      }
    };
    void fetchData();
  }, [itemId]);

  const handleAddToCart = async () => {
    if (!user?.id) return;
    try {
      const isSuccess = await addItemToCart(user.id, itemId);
      if (isSuccess) {
        alert("カートに商品を追加しました！");
      } else {
        alert("追加に失敗しました。");
      }
    } catch (error) {
      console.error("カート追加エラー:", error);
      alert("エラーが発生しました。");
    }
  };

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
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
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
