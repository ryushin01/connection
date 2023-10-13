import React from 'react';
import { ReactComponent as CartIcon } from '../../svg/icon_cart.svg';
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
  button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px transparent solid;
    background-color: ${props => props.theme.grayscaleB};
    box-shadow: 0 25px 10px -15px rgba(0, 0, 0, 0.12);
    svg {
      fill: ${props => props.theme.grayscaleE};
    }
    &:hover,
    &:active {
      background-color: ${props => props.theme.grayscaleE};
      svg {
        fill: ${props => props.theme.grayscaleB};
      }
    }
  }
`;

export default CartButton;
