import React from 'react';
import styled, { css } from 'styled-components';

/**
 * TopButton.js logics
 * @property {function} goToTop     - 뷰포트 최상단으로 스크롤 이동하는 함수입니다.
 */

const TopButton = () => {
  const goToTop = () => {
    window.scroll({
      top: 0,
    });
  };

  return (
    <TopButtonWrap>
      <button
        className="top-btn"
        type="button"
        aria-label="화면 최상단 이동"
        onClick={goToTop}
      >
        <span>
          위로
          <br />
          가기
        </span>
      </button>
    </TopButtonWrap>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopButtonWrap = styled.div`
  position: fixed;
  right: -50px;
  bottom: -50px;
  z-index: 1;

  button {
    display: block;
    width: 100px;
    height: 100px;
    padding: 0;
    border-top: 50px transparent solid;
    border-right: 50px transparent solid;
    border-bottom: 50px transparent solid;
    border-left: 50px #e71d36 solid;
    transform: rotate(45deg);
    opacity: 0.9;

    span {
      ${FlexCenter};
      position: relative;
      top: -50px;
      left: -75px;
      width: 100px;
      height: 100px;
      transform: rotate(-45deg);
      font-size: 16px;
      color: #fff;
    }
  }
`;

export default TopButton;
