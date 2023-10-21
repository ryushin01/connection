import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

function Counter({ quantity, setQuantity }) {
  const dispatch = useDispatch();

  const counter = (e, quantity) => {
    let target = e.target.name;

    if (target === 'minus') {
      if (quantity <= 1) {
        alert('1개부터 구매가 가능합니다.');
      } else {
        setQuantity(quantity - 1);
      }
    } else if (target === 'plus') {
      setQuantity(quantity + 1);
    } else {
      setQuantity(1);
    }
  };

  return (
    <CounterWrap>
      <MinusButton
        name="minus"
        onClick={e => {
          counter(e, quantity);
        }}
      />
      <CountDisplay>{quantity}</CountDisplay>
      <PlusButton
        name="plus"
        onClick={e => {
          counter(e, quantity);
        }}
      />
    </CounterWrap>
  );
}

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CounterWrap = styled.div`
  ${FlexCenter};

  button {
    width: 44px;
    height: 44px;
    border: 1px ${props => props.theme.grayscaleF} solid;
    font-size: 32px;
    line-height: 50px;
    color: ${props => props.theme.grayscaleF};

    &:hover {
      background-color: ${props => props.theme.grayscaleF};
      color: ${props => props.theme.grayscaleA};
    }
  }
`;

const CountDisplay = styled.span`
  ${FlexCenter};
  flex: 1;
  height: 44px;
  border-top: 1px ${props => props.theme.grayscaleF} solid;
  border-bottom: 1px ${props => props.theme.grayscaleF} solid;
  text-align: center;
`;

const MinusButton = styled.button`
  border-radius: 4px 0 0 4px;
  &::before {
    content: '-';
  }
`;

const PlusButton = styled.button`
  border-radius: 0 4px 4px 0;
  &::before {
    content: '+';
  }
`;

export default Counter;
