import { useNavigate } from "react-router";

interface Props {
  id?: number;
  name?: string;
  price?: number;
  imageUrl?: string;
}

const Product = ({ id, name, price, imageUrl }: Props) => {
  const navigate = useNavigate();

  const handleToProductDetail = () => {
    if (id !== undefined) {
      navigate(`/product/${id}`);
    } else {
      console.warn("Product ID is missing.");
    }
  };

  return (
    <div className="product-container" onClick={handleToProductDetail}>
      <img src={imageUrl} alt="" />

      <div className="product-details">
        <h3>{name}</h3>
        <p>¥ {price?.toLocaleString()}</p>
        <button className="item-show-detail" onClick={handleToProductDetail}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default Product;
