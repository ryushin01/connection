import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CATEGORY_CONSTANT_DATA from '../../../data/CategoryConstantData';
import styled, { css } from 'styled-components';

const Category = ({ onClose }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const goToListPage = id => {
    navigate(`/products/category/${id}`, {
      state: { categoryId: id },
    });
    onClose();
  };

  return (
    <CategoryListWrap>
      <CategoryList>
        {CATEGORY_CONSTANT_DATA?.map(({ id, text, image }) => {
          return (
            <CategoryListItem key={id}>
              <button
                type="button"
                onClick={e => {
                  goToListPage(id);
                }}
              >
                <img src={image} alt={text} />
                <span>{text}</span>
              </button>
            </CategoryListItem>
          );
        })}
      </CategoryList>
    </CategoryListWrap>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryListWrap = styled.div`
  ${FlexCenter};
  width: 100%;
  height: 100%;
  font-size: 0;
`;

const CategoryList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 28vw;
  column-gap: 4vw;
  row-gap: 4vw;
`;

const CategoryListItem = styled.li`
  position: relative;
  overflow-x: auto;
  text-align: center;

  button {
    width: 100%;
  }

  img {
    width: 70%;
  }

  span {
    display: block;
    margin-top: 8px;
    font-size: 20px;
  }
`;

export default Category;
