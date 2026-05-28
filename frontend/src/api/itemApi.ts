import type { Item } from "../types/item";

const BASE_URL = "http://localhost:8080";

export async function fetchAll(): Promise<Item[]> {
  const response = await fetch(BASE_URL + "/api/fetch-all");
  if (!response.ok) {
    throw new Error("商品情報が取得できません");
  }

  const data = await response.json();
  return data.items;
}

export async function fetchItem(id: number): Promise<Item> {
  const response = await fetch(BASE_URL + "/api/fetch-item/" + id);

  if (!response.ok) {
    throw new Error("商品情報が取得できません");
  }

  const data = await response.json();
  return data.item;
}

export async function searchItem(word: string): Promise<Item> {
  const response = await fetch(BASE_URL + "/api/search-item/" + word);

  if (!response.ok) {
    throw new Error("商品情報が取得できません");
  }

  const data = await response.json();
  return data.item;
}
