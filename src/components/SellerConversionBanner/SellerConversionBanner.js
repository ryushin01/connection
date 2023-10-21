import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const SellerConversionBanner = () => {
  return (
    <SellerConversionBannerWrap>
      <Link to="/sellersignup">판매자가 되어 커넥션만의 혜택을 받으세요!</Link>
    </SellerConversionBannerWrap>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SellerConversionBannerWrap = styled.section`
  background-color: ${props => props.theme.primaryColor};

  a {
    ${FlexCenter};
    gap: 8px;
    width: 100%;
    height: 60px;
    font-size: 28px;
    color: #fff;

    &::before {
      content: '';
      width: 32px;
      height: 32px;
      background-image: url(/images/common/icon_best_seller.png);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
`;

export default SellerConversionBanner;
