import React from 'react';
import { Link } from 'react-router-dom';
import CategoryListItem from './CategoryLIstItem/CategoryLIstItem';
import styled from 'styled-components';

const CATEGORY_LIST = [
  { id: 1, text: '푸드', path: 'list?category=food' },
  { id: 2, text: '디지털', path: 'list?category=digital' },
  { id: 3, text: '리빙', path: 'list?category=living' },
  { id: 4, text: '패션', path: 'list?category=fashion' },
  { id: 5, text: '뷰티', path: 'list?category=beauty' },
  { id: 6, text: '스포츠', path: 'list?category=sports' },
  { id: 7, text: '유아', path: 'list?category=baby' },
  { id: 8, text: '공예', path: 'list?category=craft' },
  { id: 9, text: '펫', path: 'list?category=pet' },
];

const NavListItem = ({ id, text, path }) => {
  return (
    <ListItem>
      <Link to={path}>{text}</Link>
      {id === 2 && (
        <CategoryListLayer>
          <ul>
            {CATEGORY_LIST.map(item => {
              return (
                <CategoryListItem
                  key={item.id}
                  text={item.text}
                  path={item.path}
                />
              );
            })}
          </ul>
        </CategoryListLayer>
      )}
    </ListItem>
  );
};

const ListItem = styled.li`
  position: relative;

  a {
    font-size: 20px;
    color: ${props => props.theme.grayscaleA};
  }
`;

const CategoryListLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 300px;
  height: 300px;

  background-color: red;

  display: none;
`;

export default NavListItem;
