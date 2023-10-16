import React from 'react';
import { ReactComponent as CartIcon } from '../../svg/icon_cart.svg';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

const CartButton = () => {
  const dispatch = useDispatch();

  return (
    <CartButtonWrap>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: 'PLUS' });
        }}
      >
        <CartIcon />
      </button>
    </CartButtonWrap>
  );
};

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
        fill: ${props => props.theme.grayscaleA};
        path {
          stroke: ${props => props.theme.grayscaleA};
        }
      }
    }
  }
`;

export default CartButton;
