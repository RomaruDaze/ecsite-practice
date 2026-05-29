import { BASE_URL } from "../components/constants/apiUrl";
import type { Item } from "../types/item";

export async function fetchAll(): Promise<Item[]> {
  const response = await fetch(BASE_URL + "/fetch-all");
  if (!response.ok) {
    throw new Error("商品情報が取得できません");
  }

  const data = await response.json();
  return data.items;
}

export async function fetchItem(id: number): Promise<Item> {
  const response = await fetch(BASE_URL + "/fetch-item/" + id);

  if (!response.ok) {
    throw new Error("商品情報が取得できません");
  }

  const data = await response.json();
  return data.item;
}

export async function searchItem(word: string): Promise<Item> {
  const response = await fetch(BASE_URL + "/search-item/" + word);

  if (!response.ok) {
    throw new Error("商品情報が取得できません");
  }

  const data = await response.json();
  return data.item;
}
