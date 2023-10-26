import React from 'react';
import styled, { css } from 'styled-components';

const ListTitle = ({ listTitle, categoryId }) => {
  return (
    <ListTitleSection categoryId={categoryId}>
      <ListTitleSectionInnerWrap>
        <h2>{listTitle}</h2>
      </ListTitleSectionInnerWrap>
    </ListTitleSection>
  );
};

const CATEGORY_IMAGE = {
  1: {
    backgroundImage: `url(/images/list/bg_list_food.jpg)`,
    backgroundPosition: '50% 50%',
  },
  2: {
    backgroundImage: `url(/images/list/bg_list_digital.jpg)`,
    backgroundPosition: '50% 80%',
  },
  3: {
    backgroundImage: `url(/images/list/bg_list_living.jpg)`,
    backgroundPosition: '50% 80%',
  },
  4: {
    backgroundImage: `url(/images/list/bg_list_fashion.jpg)`,
    backgroundPosition: '50% 30%',
  },
  5: {
    backgroundImage: `url(/images/list/bg_list_beauty.jpg)`,
    backgroundPosition: '50% 50%',
  },
  6: {
    backgroundImage: `url(/images/list/bg_list_sports.jpg)`,
    backgroundPosition: '50% 20%',
  },
  7: {
    backgroundImage: `url(/images/list/bg_list_baby.jpg)`,
    backgroundPosition: '50% 50%',
  },
  8: {
    backgroundImage: `url(/images/list/bg_list_craft.jpg)`,
    backgroundPosition: '50% 70%',
  },
  9: {
    backgroundImage: `url(/images/list/bg_list_pet.jpg)`,
    backgroundPosition: '50% 50%',
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
  margin-top: -40px;
  background-repeat: no-repeat;
  background-size: cover;

  background-image: ${({ categoryId }) =>
    CATEGORY_IMAGE[categoryId]?.backgroundImage ||
    `url(/images/list/bg_seller.jpg)`};

  background-position: ${({ categoryId }) =>
    CATEGORY_IMAGE[categoryId]?.backgroundPosition || 'center'};

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
