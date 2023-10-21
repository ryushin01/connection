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
  position: relative;
  button {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px transparent solid;
    svg {
      fill: ${props => props.theme.grayscaleE};
      path {
        stroke: ${props => props.theme.grayscaleE};
      }
    }
    &:hover,
    &:active {
      background-color: ${props => props.theme.grayscaleF};
      svg {
        fill: ${props => props.theme.grayscaleA};
        path {
          stroke: ${props => props.theme.grayscaleA};
        }
      }
    }
  }

  span {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 20px;
    height: 20px;
    border: 1px ${props => props.theme.secondaryColor} solid;
    border-radius: 50%;
    background-color: ${props => props.theme.secondaryColor};
    color: #fff;
  }
`;

export default CartButton;
