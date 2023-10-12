import React from 'react';
import { ReactComponent as CartIcon } from '../../svg/cart.svg';
import styled from 'styled-components';

const CartButton = ({ onClick }) => {
  return (
    <CartButtonWrap>
      <button type="button" onClick={onClick}>
        <CartIcon />
      </button>
    </CartButtonWrap>
  );
};

const CartButtonWrap = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;

  & > button {
    width: 50px;
    height: 50px;
    background-color: #fff;
  }

  // hover 시
`;

export default CartButton;
