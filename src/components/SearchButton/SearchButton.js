import React from 'react';
import { ReactComponent as SearchIcon } from '../../svg/icon_search.svg';
import styled from 'styled-components';

const SearchButton = ({ onClick }) => {
  return (
    <SearchButtonWrap>
      <button type="button" onClick={onClick}>
        <SearchIcon />
      </button>
    </SearchButtonWrap>
  );
};

const SearchButtonWrap = styled.div`
  button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px transparent solid;
    background-color: ${props => props.theme.grayscaleB};
    svg {
      fill: ${props => props.theme.grayscaleF};
    }
    &:hover,
    &:active {
      background-color: ${props => props.theme.grayscaleF};
      svg {
        fill: ${props => props.theme.grayscaleB};
      }
    }
  }
`;

export default SearchButton;
