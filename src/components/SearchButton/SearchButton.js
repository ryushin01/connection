import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from '../../svg/icon_search.svg';
import Portal from '../Modal/Portal';
import Modal from '../Modal/Modal';
import Search from '../Modal/Contents/Search';
import styled from 'styled-components';

const SearchButton = ({ onClick }) => {
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
    <SearchButtonWrap>
      <button type="button" onClick={modalHandler}>
        <SearchIcon />
      </button>
      <Portal>
        {modalOpen && (
          <Modal
            data={<Search onClose={modalHandler} />}
            scale="extra"
            onClose={modalHandler}
          />
        )}
      </Portal>
    </SearchButtonWrap>
  );
};

const SearchButtonWrap = styled.div`
  button {
    width: 36px;
    height: 36px;
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

export default SearchButton;
