import React from 'react';
import styled, { css } from 'styled-components';

const Point = () => {
  return (
    <PointArea>
      보유 포인트:&nbsp;<span>50000</span>
    </PointArea>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PointArea = styled.span`
  ${FlexCenter};

  span {
    color: ${props => props.theme.secondaryColor};
  }
`;

export default Point;
