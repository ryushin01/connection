import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as CartIcon } from '../../svg/icon_cart.svg';
import styled, { css } from 'styled-components';

/**
 * GnbCartButton.js logics
 * @property {function} sumQuantity     - 장바구니 버튼 UI에 수량 정보를 노출하는 함수입니다.
 */

const GnbCartButton = ({ cartCount }) => {
  // [Redux] useSelector hook으로 store에 저장된 데이터(productId, quantity)를 꺼내옵니다.
  let state = useSelector(state => {
    return state;
  });

  // store에서 꺼내온 데이터를 배열 순회하면서 총 수량을 구합니다. 그리고 이 수량을 GNB의 장바구니 버튼 옆에 표시합니다.
  const sumQuantity = state => {
    if (Array.isArray(state)) {
      return state.reduce((prev, current) => prev + current.quantity, 0);
    }
  };

  const totalQuantity = sumQuantity(state);

  return (
    <GnbCartButtonWrap>
      <Link to="/cart">
        <CartIcon />
      </Link>
      {/* {totalQuantity && <span>{totalQuantity}</span>} */}
      {totalQuantity || cartCount ? (
        <span>{totalQuantity || cartCount}</span>
      ) : null}
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

  a {
    ${FlexCenter};
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
    ${FlexCenter};
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 24px;
    height: 24px;
    border: 1px ${props => props.theme.secondaryColor} solid;
    border-radius: 50%;
    background-color: ${props => props.theme.secondaryColor};
    color: #fff;
  }
`;

export default GnbCartButton;
