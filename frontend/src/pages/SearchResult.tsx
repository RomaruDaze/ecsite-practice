import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { searchItem } from "../api/itemApi";
import Product from "../components/product-comp/Product";
import type { Item } from "../types/item";

const SearchResult = () => {
  const { word } = useParams<{ word: string }>();
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    if (!word) return;

    const fetchSearchData = async () => {
      try {
        const data = (await searchItem(word)) as unknown as Item[];
        setItems(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    };

    fetchSearchData();
  }, [word]);

  return (
    <div className="search-result-container">
      <h2>「{word}」の検索結果</h2>
      <div className="products-container">
        {items?.map((item) => (
          <Product
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
