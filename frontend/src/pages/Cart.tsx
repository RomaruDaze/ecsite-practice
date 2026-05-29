import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { Item } from "../types/item";
import { fetchCartAllItem } from "../api/cartApi";
import "../assets/css/cart.style.css";

const Cart = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCartAllItem(user.id);
        setItems(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("カートデータの取得に失敗しました:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [user?.id]);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }
  return (
    <div className="cart-container">
      <div className="cart-items">
        {items.map((item) => (
          // Added key here for React optimization
          <div className="cart-item-list" key={item.id}>
            <div className="cart-item-detail">
              <img src={item.imageUrl} alt={item.name} />
              {/* Added a specific class wrapper for text layout */}
              <div className="cart-item-text">
                <p className="name">{item.name}</p>
                <p className="price">¥{item.price.toLocaleString()}</p>
              </div>
            </div>
            <button>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
