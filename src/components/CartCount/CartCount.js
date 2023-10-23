import React, { useState } from 'react';
import styled from 'styled-components';

function CartCount({ onQuantityChange, productId, quantity }) {
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'];
  return (
    <SelectCounterWrap>
      <select
        onChange={e => onQuantityChange(productId, e.target.value)}
        value={quantity}
      >
        {options.map((option, index) => {
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
