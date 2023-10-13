import React from 'react';
import { Link } from 'react-router-dom';
import CartButton from '../../../CartButton/CartButton';
import styled, { css } from 'styled-components';

const ProductImage = ({ productId, productImage, productName, rating }) => {
  return (
    <ProductImageWrap>
      <Link to={`/detail/${productId}`}>
        <img src={productImage} alt={productName} />
      </Link>
      <span>{rating}</span>
      <CartButton />
    </ProductImageWrap>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImageWrap = styled.div`
  ${FlexCenter};
  position: relative;
  width: 100%;
  height: 19vw;
  background-color: ${props => props.theme.grayscaleB};
  a {
    display: block;
    font-size: 0;
    img {
      width: 12vw;
      height: 12vw;
      object-fit: contain;
    }
  }
  span {
    ${FlexCenter};
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 20px;
    color: ${props => props.theme.grayscaleE};
    &::before {
      content: '';
      display: block;
      width: 24px;
      height: 24px;
      background: url(/images/common/icon_star.png) no-repeat center/cover;
    }
  }
  div {
    position: absolute;
    right: 8px;
    bottom: 8px;
  }
`;

export default ProductImage;
