import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductText = ({ id, path, title }) => {
  return (
    <ProductProductTextWrap>
      <Link to={`/detail/${id}`}>
        <h2>상품명</h2>
        <strong>
          <span>원가격</span>
          <span>현재가격</span>
        </strong>
      </Link>
    </ProductProductTextWrap>
  );
};

const ProductProductTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: pink;
  a {
    display: block;
    h2 {
      font-size: 22px;
    }
    strong {
      font-size: 18px;
      span:first-child {
        text-decoration: line-through;
      }
    }
  }
`;

export default ProductText;
