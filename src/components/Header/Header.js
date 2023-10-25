import React from 'react';
import { Link } from 'react-router-dom';
import Account from './Account/Account';
import Gnb from './Gnb/Gnb';
// import SearchButton from '../SearchButton/SearchButton';
import PointButton from '../WalletButton/WalletButton';
import GnbCartButton from '../CartButton/GnbCartButton';
import styled, { css } from 'styled-components';

const Header = ({ isKakao, points, cartCount }) => {
  return (
    <HeaderWrap>
      <HeaderInnerWrap>
        <TopSection>
          <Account isKakao={isKakao} />
        </TopSection>
      </HeaderInnerWrap>
      <HeaderInnerWrap>
        <LeftSection>
          <Logo>
            <Link to="/main">
              <img src="/images/logo.png" alt="커넥션 로고" />
              <span>커넥션</span>
            </Link>
          </Logo>
          <Gnb />
        </LeftSection>
        <RightSection>
          {/* <SearchButton /> */}
          <PointButton points={points} />
          <GnbCartButton cartCount={cartCount} />
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
  background-color: ${props => props.theme.grayscaleA};
  color: ${props => props.theme.grayscaleF};

  svg {
    path {
      fill: ${props => props.theme.grayscaleF};
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: 1px #e2e2e2 solid;
  }

  & > div:first-child::after {
    content: '';
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    border-bottom: 1px #e2e2e2 solid;
  }

  & > div:last-child {
    padding: 24px 0;
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
  height: 30px;
`;

const LeftSection = styled.section`
  gap: 8vw;
`;

const RightSection = styled.section`
  gap: 4vw;
`;

const Logo = styled.h1`
  a {
    ${FlexCenter};
    gap: 12px;
    font-size: 32px;
    font-weight: 700;
    color: ${props => props.theme.primaryColor};
  }

  img {
    width: 48px;
    height: 48px;
  }
`;

export default Header;
