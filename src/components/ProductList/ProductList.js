import React from 'react';
import ProductListItem from './ProductListItem/ProductListItem';
import styled from 'styled-components';

const ProductList = ({ id, path, title }) => {
  return (
    <ProductListWrap>
      <ProductListItem />
    </ProductListWrap>
  );
};

// ln15부터는 메인 화면에서만 사용하므로 display: grid 처리 필요

const ProductListWrap = styled.ul`
  display: flex;
  overflow-x: auto;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
    background-color: transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
`;

export default ProductList;
