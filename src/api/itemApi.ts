import type { Item } from "../types/item";

const BASE_URL = "http://localhost:8080";

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch(BASE_URL + "/api/fetch-items");
  if (!response.ok) {
    throw new Error("商品情報が取得できません");
  }

  const data = await response.json();
  return data.items;
}
