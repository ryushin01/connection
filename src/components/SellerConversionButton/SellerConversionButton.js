import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SellerConversionButton = () => {
  return (
    <SellerConversionButtonWrap>
      <Link to="/">
        판매자
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
  width: 150px;
  height: 150px;
  border-top: 75px transparent solid;
  border-right: 75px transparent solid;
  border-bottom: 75px transparent solid;
  border-left: 75px #e71d36 solid;
  transform: translateY(-50%) rotate(180deg);
  opacity: 0.7;

  a {
    position: absolute;
    top: -75px;
    left: -75px;
    width: 100px;
    height: 100px;
    transform: rotate(180deg);
    font-size: 20px;
    color: #fff;
    line-height: 1.2;
    text-align: right;
  }
`;

export default SellerConversionButton;
