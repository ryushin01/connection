import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as CartIcon } from '../../svg/icon_cart.svg';
import styled, { css } from 'styled-components';

const GnbCartButton = () => {
  const number = useSelector(state => state.number);

  return (
    <GnbCartButtonWrap>
      <Link to="/cart">
        <CartIcon />
      </Link>
      {number && <span>{number}</span>}
    </GnbCartButtonWrap>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GnbCartButtonWrap = styled.div`
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

export default GnbCartButton;
