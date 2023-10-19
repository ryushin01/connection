import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Portal from '../../../Modal/Portal';
import Modal from '../../../Modal/Modal';
import Category from '../../../Modal/Contents/Category';
import styled from 'styled-components';

const NavListItem = ({ id, text, path }) => {
  // 5. Modal 컴포넌트 여닫기를 위한 useState hook을 선언합니다. 기본값은 false입니다.
  const [modalOpen, setModalOpen] = useState(false);

  // 6. Modal 컴포넌트 여닫기 함수를 선언합니다.
  const modalHandler = () => {
    setModalOpen(prev => !prev);
  };

  useEffect(() => {
    // 9. ESC 키로 Modal 컴포넌트를 닫을 수 있는 함수를 생성합니다.
    const close = e => {
      if (e.keyCode === 27) {
        setModalOpen(false);
      }
    };

    // 10. keydown 시에 Modal 컴포넌트 닫힘 함수를 호출합니다.
    window.addEventListener('keydown', close);
  }, []);

  const isCategory = id === 2;

  return (
    <ListItem>
      {!isCategory && <Link to={path}>{text}</Link>}
      {isCategory && (
        // 7. Modal 컴포넌트를 열 함수를 이벤트 핸들러로 호출합니다.
        // 8. 41번 줄처럼 Portal 컴포넌트 안에 조건부 렌더링으로 modalOpen이 true라면 Modal 컴포넌트를 렌더링합니다.
        <button type="button" onClick={modalHandler}>
          {text}
        </button>
      )}
      <Portal>
        {modalOpen && (
          <Modal
            data={<Category onClose={modalHandler} />}
            scale="large"
            onClose={modalHandler}
          />
        )}
      </Portal>
    </ListItem>
  );
};

const ListItem = styled.li`
  position: relative;
  padding: 20px 0;
  cursor: pointer;

  a,
  button {
    position: relative;
    font-size: 24px;
    color: ${props => props.theme.grayscaleF};

    &::after {
      content: '';
      width: 8px;
      height: 8px;
      position: absolute;
      top: -6px;
      right: -6px;
      border-radius: 50%;
      background-color: ${props => props.theme.primaryColor};
      opacity: 0;
      transition: opacity 0.2s ease-out;
    }

    &:hover,
    &:focus {
      &::after {
        opacity: 1;
      }
    }
  }
`;

export default NavListItem;
