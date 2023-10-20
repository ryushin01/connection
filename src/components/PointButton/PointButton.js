import React, { useEffect, useState } from 'react';
import Portal from '../Modal/Portal';
import Modal from '../Modal/Modal';
import Category from '../Modal/Contents/Category';
// import { ReactComponent as PointIcon } from '../../svg/icon_point.svg';
import styled from 'styled-components';

const PointButton = () => {
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
    <PointButtonWrap>
      <button type="button" onClick={modalHandler}>
        {/* <PointIcon /> */}
      </button>
      <Portal>
        {modalOpen && (
          <Modal
            data={<Category onClose={modalHandler} />}
            scale="large"
            onClose={modalHandler}
          />
        )}
      </Portal>
    </PointButtonWrap>
  );
};

const PointButtonWrap = styled.div`
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

export default PointButton;
