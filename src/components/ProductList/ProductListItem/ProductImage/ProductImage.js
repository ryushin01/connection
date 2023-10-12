import React from 'react';
import { Link } from 'react-router-dom';
import CartButton from '../../../CartButton/CartButton';
import styled from 'styled-components';

const ProductImage = ({ id, path, title }) => {
  return (
    <ProductImageWrap>
      <Link to={`/detail/${id}`}>
        <img src={path} alt={title} />
      </Link>
      <span>별점</span>
      <CartButton />
    </ProductImageWrap>
  );
};

const ProductImageWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 20vw;
  background-color: #1351f9;
  a {
    display: block;
    font-size: 0;
    img {
      width: 12vw;
      height: 12vw;
    }
  }
  span,
  div {
    position: absolute;
  }
  span {
    top: 10px;
    right: 10px;
  }
  div {
    right: 0;
    bottom: 0;
  }
`;

export default ProductImage;
