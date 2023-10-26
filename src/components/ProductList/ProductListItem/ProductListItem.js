import React from 'react';
import ProductImage from './ProductImage/ProductImage';
import ProductText from './ProductText/ProductText';
import styled from 'styled-components';

const ProductListItem = ({ item }) => {
  const {
    productId,
    productName,
    productImg,
    originalPrice,
    totalPrice,
    rating,
  } = item;
  return (
    <ProductListItemWrap>
      <ProductImage
        productId={productId}
        productImage={productImg}
        productName={productName}
        rating={rating}
        totalPrice={totalPrice}
      />
      <ProductText
        productId={productId}
        productName={productName}
        originalPrice={originalPrice}
        totalPrice={totalPrice}
      />
    </ProductListItemWrap>
  );
};

const ProductListItemWrap = styled.div`
  width: 100%;
  border-radius: 8px;
`;

export default ProductListItem;
