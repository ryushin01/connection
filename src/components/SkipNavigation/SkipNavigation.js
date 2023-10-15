import React from 'react';
import styled from 'styled-components';

const SkipNavigation = () => {
  return (
    <SkipNavigationWrap>
      <ul>
        <li>
          <a href="#main">본문 바로가기</a>
        </li>
        <li>
          <a href="#menu-list">메뉴 바로가기</a>
        </li>
      </ul>
    </SkipNavigationWrap>
  );
};

const SkipNavigationWrap = styled.section`
  position: absolute;
  width: 100%;
  height: 0;
  z-index: 1000;

  a {
    display: block;
    overflow: hidden;
    width: 1px;
    height: 1px;
    background-color: ${props => props.theme.grayscaleF};
    font-size: 20px;
    color: ${props => props.theme.grayscaleA};

    &:focus,
    a:active {
      width: auto;
      height: auto;
    }
  }
`;

export default SkipNavigation;
