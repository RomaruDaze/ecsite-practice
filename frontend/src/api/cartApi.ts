import { BASE_URL } from "../components/constants/apiUrl";
import type { Item } from "../types/item";

export async function fetchCartAllItem(id: number): Promise<Item[]> {
  const response = await fetch(BASE_URL + "/cart/fetch-all/" + id);
  if (!response.ok) {
    throw new Error("商品情報が取得できません");
  }

  const data = await response.json();
  return data.users;
}

export async function addItemToCart(
  userId: number,
  itemId: number,
): Promise<boolean> {
  const url = `${BASE_URL}/cart/add-to-cart?userid=${userId}&itemid=${itemId}`;
  const response = await fetch(url, {
    method: "POST",
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("カートに商品を追加できませんでした");
  }

  const data = await response.json();
  console.log(data);

  return data.success;
}

export async function removeItemFromCart(
  userId: number,
  itemId: number,
): Promise<boolean> {
  const url = `${BASE_URL}/cart/remove-from-cart?userid=${userId}&itemid=${itemId}`;
  const response = await fetch(url, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("カートに商品を削除できませんでした");
  }
  const data = await response.json();

  return data.success;
}
