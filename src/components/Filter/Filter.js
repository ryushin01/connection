import React from 'react';
import styled from 'styled-components';

function Filter() {
  return (
    <FilterWrap>
      <FilterInnerWrap>
        <Select>
          <Option>별점순</Option>
          <Option>리뷰순</Option>
          <Option>최신순</Option>
        </Select>
      </FilterInnerWrap>
    </FilterWrap>
  );
}

const FilterWrap = styled.div`
  padding: 20px 0;
  text-align: right;
`;

const FilterInnerWrap = styled.div`
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 40%;
    right: 8px;
    width: 10px;
    height: 10px;
    border-style: solid;
    border-width: 0 0 1px 1px;
    border-color: ${props => props.theme.grayscaleF};
    transform: rotate(-45deg) scale(1) translateY(-50%);
  }
`;

const Select = styled.select`
  padding: 8px 32px 8px 12px;
  font-size: 20px;
  appearance: none;
  border-radius: 4px;
  background-color: ${props => props.theme.grayscaleA};
  color: ${props => props.theme.grayscaleF};
`;

const Option = styled.option`
  position: relative;
`;

export default Filter;
