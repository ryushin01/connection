import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SellerConversionButton = () => {
  return (
    <SellerConversionButtonWrap>
      <Link to="/">
        셀러
        <br />
        전환
      </Link>
    </SellerConversionButtonWrap>
  );
};

const SellerConversionButtonWrap = styled.div`
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 1;
  width: 100px;
  height: 100px;
  border-top: 50px transparent solid;
  border-right: 50px transparent solid;
  border-bottom: 50px transparent solid;
  border-left: 50px ${props => props.theme.secondaryColor} solid;
  transform: translateY(-50%) rotate(180deg);
  opacity: 0.9;

  a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: -50px;
    left: -120px;
    width: 100px;
    height: 100px;
    transform: rotate(180deg);
    font-size: 16px;
    color: #fff;
    line-height: 1.2;
    text-align: right;
  }
`;

export default SellerConversionButton;
