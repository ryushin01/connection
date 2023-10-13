import React from 'react';
import { Link } from 'react-router-dom';
import CartButton from '../../../CartButton/CartButton';
import styled, { css } from 'styled-components';

const ProductImage = ({ id, path, title, rating }) => {
  return (
    <ProductImageWrap>
      <Link to={`/detail/${id}`}>
        {/* <img src={path} alt={title} /> */}
        <img src="/images/products/milk.png" alt="샘플 이미지" />
      </Link>
      <span>
        4.5
        {rating}
      </span>
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
  width: 20vw;
  height: 20vw;
  background-color: #f9f9f9;
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
    &::before {
      content: '';
      display: block;
      width: 28px;
      height: 28px;
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
