// AWS
// const BASE_URL = 'http://13.209.118.105:8000';

// RYU
const BASE_URL = 'http://10.58.52.118:8000';

export const API = {
  CATEGORY_BAND: `${BASE_URL}/products/category`,
  SELLER_BAND: `${BASE_URL}/products/seller`,
  LIST: `${BASE_URL}/products`,
  CART: `${BASE_URL}/carts`,
  ORDERS: `${BASE_URL}/orders`,
  USERS: `${BASE_URL}/users`,
  REVIEWS: `${BASE_URL}/reviews`,
  PAYMENTS: `${BASE_URL}/payments`,
  KAKAO: `${BASE_URL}/users/kakao/callback`,
};

// 사용하는 컴포넌트
// import { API } from "config";

// fetch(`${API.MYPAGE}/5`).then(...).then(...);
