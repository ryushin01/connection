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
  button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px transparent solid;
    background-color: #fff;
    box-shadow: 0 25px 10px -15px rgba(0, 0, 0, 0.12);
    &:hover,
    &:active {
      background-color: #011627;
      svg {
        fill: #efffe9;
      }
    }
  }
`;

export default CartButton;
