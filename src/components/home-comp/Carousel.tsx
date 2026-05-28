interface Props {
  imageUrl: string;
}

const Carousel = ({ imageUrl }: Props) => {
  return (
    <div className="carousel-image-container">
      <a href="https://google.com">
        <img src={imageUrl} className="d-block w-100" alt="..." />
      </a>
    </div>
  );
};

export default Carousel;
