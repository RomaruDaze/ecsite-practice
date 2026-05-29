import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { addItemToCart } from "../../api/cartApi";

interface Props {
  id?: number;
  name?: string;
  price?: number;
  imageUrl?: string;
}

const Product = ({ id, name, price, imageUrl }: Props) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleToProductDetail = () => {
    if (id !== undefined) {
      navigate(`/product/${id}`);
    } else {
      console.warn("Product ID is missing.");
    }
  };

  const handleAddToCartDirectly = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!id) return;

    if (!user?.id) {
      alert("ログインしてください。");
      navigate("/login");
      return;
    }

    try {
      const isSuccess = await addItemToCart(user.id, id);
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

  return (
    <div className="product-container" onClick={handleToProductDetail}>
      <img src={imageUrl} alt="" />

      <div className="product-details">
        <h3>{name}</h3>
        <p>¥ {price?.toLocaleString()}</p>
        <button
          className="add-to-cart-btn w-100"
          onClick={handleAddToCartDirectly}
          style={{ fontSize: "0.9rem", height: "40px" }}
        >
          <img
            src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png"
            alt=""
            style={{ height: "18px", width: "auto", marginRight: "5px" }}
          />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
