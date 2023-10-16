import React from 'react';
import styled, { css } from 'styled-components';

const ListTitle = ({ productName, ...props }) => {
  return (
    <ListTitleSection {...props}>
      <ListTitleSectionInnerWrap>
        <h2>{productName}</h2>
      </ListTitleSectionInnerWrap>
    </ListTitleSection>
  );
};

const CATEGORY_IMAGE = {
  1: {
    backgroundImage: `url(/images/bigbanner/food.jpg)`,
  },
  2: {
    backgroundImage: `url(/images/bigbanner/digital.jpg)`,
  },
  3: {
    backgroundImage: `url(/images/bigbanner/living.jpg)`,
  },
  4: {
    backgroundImage: `url(/images/bigbanner/fashion.jpg)`,
  },
  5: {
    backgroundImage: `url(/images/bigbanner/beauty.jpg)`,
  },
  6: {
    backgroundImage: `url(/images/bigbanner/sports.jpg)`,
  },
  7: {
    backgroundImage: `url(/images/bigbanner/baby.jpg)`,
  },
  8: {
    backgroundImage: `url(/images/bigbanner/craft.jpg)`,
  },
  9: {
    backgroundImage: `url(/images/bigbanner/pet.jpg)`,
  },
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListTitleSection = styled.section`
  ${FlexCenter};
  position: relative;
  height: 20vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  background-image: ${({ categoryId }) =>
    CATEGORY_IMAGE[categoryId]?.backgroundImage};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.4);
  }

  h2 {
    position: relative;
    z-index: 10;
    font-size: 40px;
    color: #fff;
    text-shadow: 2px 2px 6px #888;
    text-align: center;
  }
`;

const ListTitleSectionInnerWrap = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export default ListTitle;
