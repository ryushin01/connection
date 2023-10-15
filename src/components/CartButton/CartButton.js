import React from 'react';
import { ReactComponent as CartIcon } from '../../svg/icon_cart.svg';
import styled, { css } from 'styled-components';

const CartButton = ({ count, onClick }) => {
  return (
    <CartButtonWrap>
      <button type="button" onClick={onClick}>
        <CartIcon />
      </button>
      {count && <span>{count}</span>}
    </CartButtonWrap>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartButtonWrap = styled.div`
  position: relative;
  button {
    width: 36px;
    height: 36px;
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
        fill: ${props => props.theme.grayscaleC};
        path {
          stroke: ${props => props.theme.grayscaleC};
        }
      }
    }
  }
  span {
    ${FlexCenter};
    position: absolute;
    top: -5px;
    right: -5px;
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
