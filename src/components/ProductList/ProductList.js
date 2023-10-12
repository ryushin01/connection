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
