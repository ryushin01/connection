import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProductText = ({ productId, productName, originalPrice, totalPrice }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/detail/${productId}`, {
      state: { productId: productId },
    });
  };

  return (
    <ProductProductTextWrap>
      <button type="button" onClick={goToDetail}>
        <h2>{productName}</h2>
        <strong>
          <span>{originalPrice?.toLocaleString()}원</span>
          <span>{totalPrice?.toLocaleString()}원</span>
        </strong>
      </button>
    </ProductProductTextWrap>
  );
};

const ProductProductTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  button {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    padding: 12px;
    text-align: left;

    h2,
    strong {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: ${props => props.theme.grayscaleF};
    }

    h2 {
      width: 100%;
      font-size: 24px;
      font-weight: 700;
    }

    strong {
      width: 100%;
      font-size: 16px;

      span:first-child {
        color: ${props => props.theme.grayscaleD};
        text-decoration: line-through;
        & + span {
          margin-left: 8px;
          font-size: 20px;
        }
      }
    }
  }
`;

export default ProductText;
