import React from 'react';
import NavListItem from './NavListItem/NavListItem';
import styled, { css } from 'styled-components';

const GNB_LIST = [
  { id: 1, text: '홈', path: '/main' },
  { id: 2, text: '카테고리', path: '/' },
  { id: 3, text: '마이페이지', path: '/mypage' },
];

const Gnb = () => {
  return (
    <Nav>
      <NavList id="menu-list">
        {GNB_LIST.map(item => {
          return (
            <NavListItem
              key={item.id}
              id={item.id}
              text={item.text}
              path={item.path}
            />
          );
        })}
      </NavList>
    </Nav>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  position: relative;
`;

const NavList = styled.ul`
  ${FlexCenter};
  gap: 4vw;
`;

export default Gnb;
