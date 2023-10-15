import React from 'react';
import { Link } from 'react-router-dom';
import CartButton from '../../../CartButton/CartButton';
import styled, { css } from 'styled-components';

const ProductImage = ({ productId, productImage, productName, rating }) => {
  return (
    <ProductImageWrap>
      <Link to={`/detail/${productId}`}>
        <ProductImg src={productImage} alt={productName} />
      </Link>
      <Rating>{rating}</Rating>
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
  border-radius: 4px;
  background-color: ${props => props.theme.grayscaleB};
  a {
    display: block;
    font-size: 0;
  }
  div {
    position: absolute;
    right: 8px;
    bottom: 8px;
  }
`;

const ProductImg = styled.img`
  width: 12vw;
  height: 12vw;
  object-fit: contain;
`;

const Rating = styled.span`
  ${FlexCenter};
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 20px;
  color: ${props => props.theme.grayscaleF};
  &::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background: url(/images/common/icon_star.png) no-repeat center/cover;
  }
`;

export default ProductImage;
