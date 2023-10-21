import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import Button from '../../components/Button/Button';
import styled, { css } from 'styled-components';

/**
 * Order.js logics
 * @property {function} getUserData     - 유저 데이터(이름, 연락처, 주소)를 받아오는 함수입니다.
 */

const Gateway = () => {
  const [loading, setLoading] = useState(false);

  // const forcedLoading = () => {};

  // useEffect(() => {
  //   setTimeout(() => setLoading(true), 1000);
  //   return () => clearTimeout(setLoading(false));
  // }, []);

  return (
    <>
      {loading && <Loading />}
      <div>
        <Section>1</Section>
        <Section>2</Section>
        <Section>3</Section>
      </div>
    </>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  ${FlexCenter};
  height: 100vh;

  &:nth-child(1) {
    background-color: #c0392b;
  }

  &:nth-child(2) {
    background-color: #e67e22;
  }

  &:nth-child(3) {
    background-color: #f1c40f;
  }
`;

export default Gateway;
