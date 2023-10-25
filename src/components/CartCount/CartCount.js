import React from 'react';
import { ReactComponent as Checked } from '../../svg/check-solid.svg';
import styled from 'styled-components';

function CartCount({ onQuantityChange, productId, quantity }) {
  // 부모 컴포넌트에서 받아온 props
  const selectQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'];

  return (
    <SelectCounterWrap>
      <select
        onChange={e => onQuantityChange(productId, e.target.value)} // 부모 컴포넌트에서 받아온 함수에 productId와 선택한 옵션 value 값을 넘겨줌
        value={quantity} // 서버에서 받아온 quantity 값으로 초기화
      >
        <option value={quantity}>
          {quantity}
          <SelectCheckImgWrap>
            <Checked />
          </SelectCheckImgWrap>
        </option>
        {selectQuantity.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </SelectCounterWrap>
  );
}

export default CartCount;

const SelectCounterWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  select {
    width: 100px;
    height: 32px;
    font-size: 16px;
    border-radius: 4px;
    appearance: none;
    text-align: center;
  }
`;

const SelectCheckImgWrap = styled.div`
  width: 32px;
  height: 32px;
  svg {
    fill: ${props => props.theme.grayscaleA};
    path {
      stroke: ${props => props.theme.grayscaleA};
    }
  }
`;
