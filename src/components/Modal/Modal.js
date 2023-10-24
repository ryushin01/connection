import React from 'react';
import { ReactComponent as MoreIcon } from '../../svg/icon_more.svg';
import styled from 'styled-components';

// 1. Modal 컴포넌트를 먼저 생성합니다. Content 안에는 데이터가 전달됩니다.
// 2. Modal 컴포넌트는 props로 onClose 함수를 받습니다. 배경 영역과 닫기 버튼 클릭 시 닫힘 처리가 됩니다. (다음 주석은 Portal.js에서 계속됩니다.)
function Modal({ data, onClose, ...props }) {
  return (
    <ModalPopup>
      <Backdrop onClick={onClose} />
      <Content {...props}>
        <ModalCloseButton
          type="button"
          aria-label="모달 팝업 닫기"
          onClick={onClose}
        >
          <MoreIcon />
        </ModalCloseButton>
        {data}
      </Content>
    </ModalPopup>
  );
}

const MODAL_SIZES = {
  small: {
    width: '32vw',
    height: '32vw',
  },
  medium: {
    width: '36vw',
    height: '36vw',
  },
  large: {
    width: '40vw',
    height: '40vw',
  },
  extra: {
    width: '90%',
    height: '90%',
  },
};

const ModalPopup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: 100;
  color: #000;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Content = styled.section`
  position: relative;
  width: ${({ scale }) => MODAL_SIZES[scale]?.width};
  height: ${({ scale }) => MODAL_SIZES[scale]?.height};
  border-radius: 4px;
  background: #fff;
  padding: 20px;
  z-index: 1;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: -20px;
  right: -20px;
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);

  svg {
    transform: rotate(45deg) scale(0.8);
    fill: #fff;
    path {
      stroke: #fff;
    }
  }
`;

export default Modal;
