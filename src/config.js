// AWS
// const BASE_URL = 'http://43.200.31.13:8000';

const BASE_URL = 'http://13.124.161.55:8000';

export const API = {
  CATEGORY_BAND: `${BASE_URL}/products/category`,
  SELLER_BAND: `${BASE_URL}/products/seller`,
  LIST: `${BASE_URL}/products`,
  CART: `${BASE_URL}/carts`,
  ORDERS: `${BASE_URL}/orders`,
  USERS: `${BASE_URL}/users`,
  REVIEWS: `${BASE_URL}/reviews`,
};

// 사용하는 컴포넌트
// import { API } from "config";

// fetch(`${API.MYPAGE}/5`).then(...).then(...);
