import React from 'react';
import { ReactComponent as PrevIcon } from '../../svg/icon_arrow_left.svg';
import { ReactComponent as NextIcon } from '../../svg/icon_arrow_right.svg';
import styled, { css } from 'styled-components';
// import Button from '../Button/Button';

const Pagination = ({ totalPages, page, setPage }) => {
  const handlePrevButtons = totalPages => {
    let arr = [];
    for (let i = 0; i < totalPages; i++) {
      arr.push(
        <button
          key={i + 1}
          onClick={() => setPage(i + 1)}
          status={page - 1 === i && 'selected'}
        >
          {i + 1}
        </button>,
      );
    }
    return arr;
  };

  return (
    <PaginationWrap>
      <PrevButton onClick={() => setPage(page - 1)} disabled={page === 1}>
        <PrevIcon />
      </PrevButton>
      <div className="pagination-number">{handlePrevButtons(totalPages)}</div>
      <NextButton
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        <NextIcon />
      </NextButton>
    </PaginationWrap>
  );
};

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

    &[status='selected'] {
      background-color: ${props => props.theme.primaryColor};
      color: ${props => props.theme.grayscaleA};
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
