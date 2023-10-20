import React from 'react';
import { ReactComponent as PrevIcon } from '../../svg/icon_arrow_left.svg';
import { ReactComponent as NextIcon } from '../../svg/icon_arrow_right.svg';
import styled, { css } from 'styled-components';

function Pagination() {
  return (
    <PaginationWrap>
      <PrevButton>
        <PrevIcon />
      </PrevButton>
      <div className="pagination-number">
        <button type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
        <button type="button">4</button>
        <button type="button">5</button>
        <button type="button">6</button>
        <button type="button">7</button>
        <button type="button">8</button>
        <button type="button">9</button>
        <button type="button">10</button>
      </div>
      <NextButton>
        <NextIcon />
      </NextButton>
    </PaginationWrap>
  );
}

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginationWrap = styled.div`
  ${FlexCenter};
  gap: 8px;
  margin-top: 120px;

  button {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    font-size: 20px;
    color: ${props => props.theme.grayscaleF};

    &:hover {
      background-color: ${props => props.theme.grayscaleF};
      color: ${props => props.theme.grayscaleA};

      svg {
        fill: ${props => props.theme.grayscaleA};
        path {
          stroke: ${props => props.theme.grayscaleA};
        }
      }
    }

    &:disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }
  }
`;

const PrevButton = styled.button`
  font-size: 0 !important;
  svg {
    fill: ${props => props.theme.grayscaleF};
    path {
      stroke: ${props => props.theme.grayscaleF};
    }
  }
`;

const NextButton = styled.button`
  font-size: 0 !important;
  svg {
    fill: ${props => props.theme.grayscaleF};
    path {
      stroke: ${props => props.theme.grayscaleF};
    }
  }
`;

export default Pagination;
