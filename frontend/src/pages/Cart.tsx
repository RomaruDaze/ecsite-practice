import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { Item } from "../types/item";
import {
  fetchCartAllItem,
  removeItemFromCart,
  checkoutCart,
} from "../api/cartApi";
import "../assets/css/cart.style.css";

interface GroupedItem extends Item {
  quantity: number;
}

const Cart = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // If there's no logged-in user, do nothing
    if (!user?.id) return;

    // Track active status to prevent race conditions if user changes mid-fetch
    let isMounted = true;

    const loadData = async () => {
      // Set loading state safely inside the microtask queue execution
      setIsLoading(true);
      try {
        const data = await fetchCartAllItem(user.id);
        if (isMounted) {
          setItems(data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("カートデータの取得に失敗しました:", error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadData();

    // Clean up function to discard updates if component unmounts early
    return () => {
      isMounted = false;
    };
  }, [user?.id]); // Safely synchronized purely on user ID shifts

  const handleRemoveItemFromCart = async (itemId: number) => {
    if (!user?.id) return;
    try {
      const isSuccess = await removeItemFromCart(user.id, itemId);
      if (isSuccess) {
        alert("カートから商品を削除しました！");
        const index = items.findIndex((item) => item.id === itemId);
        if (index !== -1) {
          const updatedItems = [...items];
          updatedItems.splice(index, 1);
          setItems(updatedItems);
        }
      } else {
        alert("削除に失敗しました。");
      }
    } catch (error) {
      console.error("カート削除エラー:", error);
      alert("エラーが発生しました。");
    }
  };

  const handleCheckoutProcess = async () => {
    if (!user?.id) return;
    if (items.length === 0) {
      alert("カートが空になっています。");
      return;
    }

    try {
      const result = await checkoutCart(user.id);
      if (result.success) {
        alert(result.message);
        setItems([]);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("チェックアウト例外発生:", error);
      alert("通信処理例外が発生しました。");
    }
  };

  // Grouping matches manually (No Stream API / procedural loop logic)
  const groupedItems: GroupedItem[] = [];
  for (let i = 0; i < items.length; i++) {
    const currentItem = items[i];
    let found = false;

    for (let j = 0; j < groupedItems.length; j++) {
      if (groupedItems[j].name === currentItem.name) {
        groupedItems[j].quantity += 1;
        found = true;
        break;
      }
    }

    if (!found) {
      groupedItems.push({ ...currentItem, quantity: 1 });
    }
  }

  let totalOrderSum = 0;
  for (let i = 0; i < items.length; i++) {
    totalOrderSum += items[i].price;
  }

  if (isLoading) {
    return <div className="text-center p-5">読み込み中...</div>;
  }

  return (
    <>
      <div className="cart-container">
        <h2 className="mb-4">Shopping Cart</h2>
        {groupedItems.length === 0 ? (
          <p className="text-muted text-center mt-5">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {groupedItems.map((item) => {
                // 1. Calculate the combined total for this grouped item stack
                const itemTotalLinePrice = item.price * item.quantity;

                return (
                  /* Use name or a combined string for the key to ensure React tracks changes safely */
                  <div
                    className="cart-item-list"
                    key={`${item.id}-${item.name}`}
                  >
                    <div className="cart-item-detail">
                      <img src={item.imageUrl} alt={item.name} />
                      <div className="cart-item-text">
                        <p className="name">{item.name}</p>
                        <p className="price">
                          {item.quantity > 1 && (
                            <span className="cart-item-quantity-badge text-danger font-weight-bold me-2">
                              x{item.quantity}
                            </span>
                          )}
                          {/* 2. Display the total line amount rather than just the base price */}
                          ¥{itemTotalLinePrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button
                      className="cart-remove-btn"
                      onClick={() => handleRemoveItemFromCart(item.id)}
                    >
                      <img
                        src="https://img.icons8.com/ios-filled/100/FFFFFF/waste.png"
                        alt="Remove Item"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="cart-checkout-container">
        <h4>Total Items: {items.length}</h4>
        <h4>
          Total Amount: <span>¥{totalOrderSum.toLocaleString()}</span>
        </h4>
        <button onClick={handleCheckoutProcess}>Checkout</button>
      </div>
    </>
  );
};

export default Cart;
