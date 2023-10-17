import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../../../Rating/Rating';
import CartButton from '../../../CartButton/CartButton';
import styled, { css } from 'styled-components';

const ProductImage = ({ productId, productImage, productName, rating }) => {
  return (
    <ProductImageWrap>
      <Link to={`/detail/${productId}`}>
        <ProductImg src={productImage} alt={productName} />
      </Link>
      <Rating rating={rating} />
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

export default ProductImage;
