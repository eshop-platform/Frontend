import { electronicsProducts } from "./electronics.js";
import { sportsProducts, beautyProducts } from "./sportsBeauty.js";
import { kidsProducts, furnitureProducts } from "./kidsFurniture.js";
import { jewelryProducts, foodProducts, booksProducts } from "./jewelryFoodBooks.js";

export const extraProducts = [
  ...electronicsProducts,
  ...sportsProducts,
  ...beautyProducts,
  ...kidsProducts,
  ...furnitureProducts,
  ...jewelryProducts,
  ...foodProducts,
  ...booksProducts,
];
