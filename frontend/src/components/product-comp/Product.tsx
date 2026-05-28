interface Props {
  name?: string;
  price?: number;
  imageUrl?: string;
}

const Product = ({ name, price, imageUrl }: Props) => {
  return (
    <div className="product-container">
      <img src={imageUrl} alt="" />

      <div className="product-details">
        <h3>{name}</h3>
        <p>{price}</p>
        <button>
          Add to cart{" "}
          <img
            src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default Product;
