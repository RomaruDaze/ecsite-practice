import { useEffect, useState, useRef } from "react";
import type { Item } from "../../types/item";
import { fetchAll } from "../../api/itemApi";
import { useNavigate } from "react-router";

const Recommend = () => {
  const [items, setItems] = useState<Item[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const handleToProductDetail = (id: number | undefined) => {
    if (id !== undefined) {
      navigate(`/product/${id}`);
    } else {
      console.warn("Product ID is missing.");
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
                <button className="item-show-detail">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
