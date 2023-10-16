import React from 'react';
import ProductListItem from './ProductListItem/ProductListItem';
import styled from 'styled-components';

const ProductList = ({ listData }) => {
  return (
    <ProductListWrap>
      {listData?.map((item, index) => {
        return (
          <li key={index}>
            <ProductListItem item={item} />
          </li>
        );
      })}
    </ProductListWrap>
  );
};

const ProductListWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 12px;
  row-gap: 24px;

  li {
    overflow-x: auto;
  }
`;

export default ProductList;
