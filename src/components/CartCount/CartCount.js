import React, { useState } from 'react';
import styled from 'styled-components';

function CartCount({ onQuantityChange, productId, quantity }) {
  return (
    <SelectCounterWrap>
      <select
        onChange={e => onQuantityChange(productId, e.target.value)}
        value={quantity}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
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
