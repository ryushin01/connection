import React from 'react';
import ProductListItem from './ProductListItem/ProductListItem';
import styled from 'styled-components';

const ProductList = ({ item }) => {
  const { categoryId, categoryName, products } = item;

  return (
    <ProductListWrap>
      {products?.map((item, index) => {
        return (
          <li key={index}>
            <ProductListItem item={item} />
          </li>
        );
      })}
    </ProductListWrap>
  );
};

// ln15부터는 메인 화면에서만 사용하므로 display: grid 처리 필요

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
