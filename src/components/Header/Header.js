import React from 'react';
import Gnb from './Gnb/Gnb';
import CartButton from '../CartButton/CartButton';
import SearchButton from '../SearchButton/SearchButton';
import styled, { css } from 'styled-components';
// import { ReactComponent as AppIcon } from '../../svg/icon_app.svg';
const Header = () => {
  return (
    <HeaderWrap>
      <HeaderInnerWrap>
        <TopSection>로그인 / 어드민</TopSection>
      </HeaderInnerWrap>
      <HeaderInnerWrap>
        <LeftSection>
          <Logo>
            <img src="/images/logo.png" alt="커넥션 로고" />
            <span>커넥션</span>
          </Logo>
          <Gnb />
        </LeftSection>
        <RightSection>
          <CartButton />
          <SearchButton />
        </RightSection>
      </HeaderInnerWrap>
    </HeaderWrap>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderWrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  padding-bottom: 10px;
  background-color: ${props => props.theme.grayscaleF};
  color: ${props => props.theme.grayscaleA};

  svg {
    path {
      fill: ${props => props.theme.grayscaleA};
    }
  }
`;

const HeaderInnerWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  padding: 10px 0;

  & > section {
    ${FlexCenter};
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4vw;
  width: 100%;
`;

const LeftSection = styled.section`
  gap: 8vw;
`;

const RightSection = styled.section`
  text-align: right;
`;

const Logo = styled.h1`
  ${FlexCenter};
  gap: 8px;
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.theme.primaryColor};

  img {
    width: 48px;
    height: 48px;
  }
`;

export default Header;
