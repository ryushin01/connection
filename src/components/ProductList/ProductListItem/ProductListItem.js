import React from 'react';
import ProductImage from './ProductImage/ProductImage';
import ProductText from './ProductText/ProductText';
import styled from 'styled-components';

const ProductListItem = ({ item }) => {
  const {
    productId,
    productName,
    productImage,
    originalPrice,
    totalPrice,
    rating,
  } = item;

  return (
    <ProductListItemWrap>
      <ProductImage
        productId={productId}
        productImage={productImage}
        productName={productName}
        rating={rating}
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
`;

export default ProductListItem;
