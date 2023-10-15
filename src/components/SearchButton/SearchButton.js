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
    svg {
      fill: ${props => props.theme.grayscaleE};
      path {
        stroke: ${props => props.theme.grayscaleE};
      }
    }
    &:hover,
    &:active {
      svg {
        fill: ${props => props.theme.grayscaleB};
        path {
          stroke: ${props => props.theme.grayscaleB};
        }
      }
    }
  }
`;

export default SearchButton;
