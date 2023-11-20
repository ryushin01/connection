import React from 'react';
import styled, { css } from 'styled-components';

const Rating = ({ rating }) => {
  const calcRating = Math.round(rating);
  return <RatingWrap>{calcRating}</RatingWrap>;
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RatingWrap = styled.span`
  ${FlexCenter};
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 20px;
  color: ${props => props.theme.grayscaleF};

  &::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background: url(/images/common/icon_star.png) no-repeat center/cover;
  }
`;

export default Rating;
