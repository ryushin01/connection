import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductText = ({ id, path, title }) => {
  return (
    <ProductProductTextWrap>
      <Link to={`/detail/${id}`} aria-hidden="true">
        <h2>상품명 상품명 상품명 상품명 상품명 상품명</h2>
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
  a {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    h2,
    strong {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    h2 {
      font-size: 24px;
      font-weight: 700;
    }
    strong {
      font-size: 20px;
      span:first-child {
        text-decoration: line-through;
        & + span {
          margin-left: 12px;
          font-weight: 700;
        }
      }
    }
  }
`;

export default ProductText;
