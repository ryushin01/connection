import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductText = ({ productId, productName, totalPrice }) => {
  return (
    <ProductProductTextWrap>
      <Link to={`/detail/${productId}`} aria-hidden="true">
        <h2>{productName}</h2>
        <strong>
          <span>{totalPrice.toLocaleString()}원</span>
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
      color: ${props => props.theme.grayscaleF};
    }
    h2 {
      font-size: 24px;
      font-weight: 700;
    }
    strong {
      font-size: 16px;
    }
  }
`;

export default ProductText;
