import React from 'react';
import styled, { css } from 'styled-components';

function Counter({ count, setCount }) {
  const counter = (e, count) => {
    let target = e.target.name;

    if (target === 'minus') {
      if (count <= 1) {
        alert('1개부터 구매가 가능합니다.');
      } else {
        setCount(count - 1);
      }
    } else if (target === 'plus') {
      setCount(count + 1);
    } else {
      setCount(1);
    }
  };

  return (
    <CounterWrap>
      <MinusButton
        name="minus"
        onClick={e => {
          counter(e, count);
        }}
      />
      <CountDisplay>{count}</CountDisplay>
      <PlusButton
        name="plus"
        onClick={e => {
          counter(e, count);
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
