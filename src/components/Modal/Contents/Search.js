import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import styled, { css } from 'styled-components';

const Search = ({ onClose }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const goToListPage = id => {
    navigate(`/products/category/${id}`, {
      state: { categoryId: id },
    });
    onClose();
  };

  return (
    <SearchWrap>
      <form>
        <fieldset>
          <legend>검색어 입력 폼</legend>
          <Input
            type="search"
            name="search"
            placeholder="찾으시는 상품명을 입력해 주세요."
            size="medium"
          />
          <Button content="검색" size="medium" shape="solid" color="primary" />
        </fieldset>
      </form>
    </SearchWrap>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchWrap = styled.div`
  ${FlexCenter};
  width: 100%;
  height: 100%;

  form {
    width: 50%;
  }

  fieldset {
    ${FlexCenter};
  }

  legend {
    position: absolute;
    z-index: -1;
    font-size: 1px;
    color: transparent;
  }

  label {
    flex: 1;
    margin-right: 8px;
  }

  button {
    width: 20%;
    margin-left: 8px;
  }
`;

export default Search;
