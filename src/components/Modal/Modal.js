import React, { useState } from 'react';
import styled from 'styled-components';

function Modal() {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <ModalPopup>
      <ModalPopupInnerWrap>
        <Overlay />
        <Content>모달 창입니다</Content>
      </ModalPopupInnerWrap>
    </ModalPopup>
  );
}

const ModalPopup = styled.div`
  display: none;
`;

const ModalPopupInnerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: 1;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;
const Content = styled.section`
  width: 20rem;
  height: 5rem;
  background: #fff;
  padding: 2rem;
  z-index: 1;
`;

export default Modal;
