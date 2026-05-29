import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { fetchCartAllItem, checkoutCart } from "../api/cartApi";
import type { Item } from "../types/item";
import "../assets/css/cart.style.css";

const CheckoutBar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let isMounted = true;

    const updateCartCount = async () => {
      // Safely check authentication state inside the asynchronous pipeline block
      if (!user?.id) {
        if (isMounted) {
          setItems([]);
        }
        return;
      }

      try {
        const data = await fetchCartAllItem(user.id);
        if (isMounted) {
          setItems(data);
        }
      } catch (error) {
        console.error("Failed to sync checkout bar count:", error);
      }
    };

    void updateCartCount();

    return () => {
      isMounted = false;
    };
  }, [user?.id, location.pathname]);

  // Hide the bar on authentication pages, or if the cart is empty
  const hiddenPaths = ["/login", "/register"];
  if (hiddenPaths.includes(location.pathname) || items.length === 0) {
    return null;
  }

  // Explicit loop to sum total amount (Avoiding Stream/Array reduction APIs)
  let totalOrderSum = 0;
  for (let i = 0; i < items.length; i++) {
    totalOrderSum += items[i].price;
  }

  const handleCheckoutProcess = async () => {
    if (!user?.id) return;
    try {
      const result = await checkoutCart(user.id);
      if (result.success) {
        alert(result.message);
        setItems([]);
        navigate("/home");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Checkout encounter exception:", error);
      alert("通信処理例外が発生しました。");
    }
  };

  return (
    <div className="cart-checkout-container">
      <div className="checkout-bar-info">
        <h4>
          Total Items: <strong>{items.length}</strong>
        </h4>
        <h4>
          {/* Using totalOrderSum here clears the unused variable error */}
          Total Amount: <span>¥{totalOrderSum.toLocaleString()}</span>
        </h4>
      </div>
      <button onClick={handleCheckoutProcess} className="checkout-bar-btn">
        Checkout Now
      </button>
    </div>
  );
};

export default CheckoutBar;
