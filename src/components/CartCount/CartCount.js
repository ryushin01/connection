import React, { useState } from 'react';
import styled from 'styled-components';

function CartCount({ onQuantityChange, productId, quantity }) {
  // 부모 컴포넌트에서 받아온 props
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, '10+']; // 옵션 value 값을 map으로 돌리기 위한 배열 변수
  return (
    <SelectCounterWrap>
      <select
        onChange={e => onQuantityChange(productId, e.target.value)} // 부모 컴포넌트에서 받아온 함수에 productId와 선택한 옵션 value 값을 넘겨줌
        value={quantity} // 서버에서 받아온 quantity 값으로 초기화
      >
        {options.map((option, index) => {
          // 옵션 value 값으로 map 돌리기
          return (
            <option value={option} key={index}>
              {option}
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
  width: 100%;

  select {
    width: 150px;
    height: 24px;
    padding-left: 12px;
    font-size: 16px;
    border-radius: 4px;
  }
`;
