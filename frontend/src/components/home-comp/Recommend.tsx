import { useEffect, useState, useRef } from "react";
import type { Item } from "../../types/item";
import { fetchAll } from "../../api/itemApi";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { addItemToCart } from "../../api/cartApi";

const Recommend = () => {
  const [items, setItems] = useState<Item[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleToProductDetail = (id: number | undefined) => {
    if (id !== undefined) {
      navigate(`/product/${id}`);
    } else {
      console.warn("Product ID is missing.");
    }
  };

  const handleAddToCartDirectly = async (
    e: React.MouseEvent,
    itemId: number | undefined,
  ) => {
    e.stopPropagation();

    if (!itemId) return;

    if (!user?.id) {
      alert("ログインしてください。");
      navigate("/login");
      return;
    }

    try {
      const isSuccess = await addItemToCart(user.id, itemId);
      if (isSuccess) {
        alert("カートに商品を追加しました！");

        // Dispatches the notification instantly through pure event streams
        window.dispatchEvent(new Event("cartUpdatedDirectly"));
      } else {
        alert("追加に失敗しました。");
      }
    } catch (error) {
      console.error("カート追加エラー:", error);
      alert("エラーが発生しました。");
    }
  };

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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || items.length === 0) return;

    const autoScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 320, behavior: "smooth" });
      }
    };

    const intervalId = setInterval(autoScroll, 3000);

    return () => clearInterval(intervalId);
  }, [items]);

  return (
    <div className="recommend-container">
      <h2>Recommended Items</h2>

      <div ref={scrollContainerRef} className="recommend-scroll">
        {items.map((item) => (
          <div
            key={item.id}
            className="recommend-item-card"
            onClick={() => handleToProductDetail(item.id)}
          >
            <img src={item.imageUrl} alt={item.name || "Recommended item"} />
            <div className="recommend-item-card-body">
              <div>
                <h5 className="recommend-item-title">
                  {item.name || "Item Title"}
                </h5>
              </div>
              <div className="recommend-item-price">
                <span>
                  {item.price ? `¥${item.price.toLocaleString()}` : ""}
                </span>
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => handleAddToCartDirectly(e, item.id)}
                  style={{
                    fontSize: "0.85rem",
                    padding: "5px 10px",
                    width: "140px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png"
                    alt=""
                    style={{
                      height: "16px",
                      width: "auto",
                      marginRight: "4px",
                    }}
                  />
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
