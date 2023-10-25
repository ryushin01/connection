import React, { useEffect, useState } from 'react';
import Portal from '../Modal/Portal';
import Modal from '../Modal/Modal';
import Charge from '../Modal/Contents/Charge';
import { ReactComponent as WalletIcon } from '../../svg/icon_wallet.svg';
import styled from 'styled-components';

/**
 * WalletButton.js logics
 * @property {function} modalHandler      - 모달 팝업 여닫기 함수입니다.
 */

const WalletButton = ({ points }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const modalHandler = () => {
    setModalOpen(prev => !prev);
  };

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', close);
  }, []);

  return (
    <WalletButtonWrap>
      <button type="button" onClick={modalHandler}>
        <WalletIcon />
      </button>
      <Portal>
        {modalOpen && (
          <Modal
            data={<Charge points={points} onClose={modalHandler} />}
            scale="small"
            onClose={modalHandler}
          />
        )}
      </Portal>
    </WalletButtonWrap>
  );
};

const WalletButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    min-width: 48px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px transparent solid;
    svg {
      fill: ${props => props.theme.grayscaleE};
      path {
        stroke: ${props => props.theme.grayscaleE};
      }
    }
    &:hover,
    &:active {
      background-color: ${props => props.theme.grayscaleF};
      svg {
        fill: ${props => props.theme.grayscaleA};
        path {
          stroke: ${props => props.theme.grayscaleA};
        }
      }
    }
  }
`;

export default WalletButton;
