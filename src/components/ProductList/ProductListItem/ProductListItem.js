import React from 'react';
import ProductImage from './ProductImage/ProductImage';
import ProductText from './ProductText/ProductText';
import styled from 'styled-components';

const ProductListItem = ({ id, path, title }) => {
  return (
    <ProductListItemWrap>
      <ProductImage />
      <ProductText />
    </ProductListItemWrap>
  );
};

const ProductListItemWrap = styled.div`
  // width: 20vw;
  width: 100%;
`;

export default ProductListItem;
