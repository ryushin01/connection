import React from 'react';
import { Link } from 'react-router-dom';
// import CategoryListItem from './CategoryLIstItem/CategoryLIstItem';
import styled from 'styled-components';

// const CATEGORY_LIST = [
//   {
//     id: 1,
//     text: '푸드',
//     path: 'list?category=food',
//     image: '/images/category/icon_category_food.svg',
//   },
//   {
//     id: 2,
//     text: '디지털',
//     path: 'list?category=digital',
//     image: '/images/category/icon_category_digital.svg',
//   },
//   {
//     id: 3,
//     text: '리빙',
//     path: 'list?category=living',
//     image: '/images/category/icon_category_living.svg',
//   },
//   {
//     id: 4,
//     text: '패션',
//     path: 'list?category=fashion',
//     image: '/images/category/icon_category_fashion.svg',
//   },
//   {
//     id: 5,
//     text: '뷰티',
//     path: 'list?category=beauty',
//     image: '/images/category/icon_category_beauty.svg',
//   },
//   {
//     id: 6,
//     text: '스포츠',
//     path: 'list?category=sports',
//     image: '/images/category/icon_category_sports.svg',
//   },
//   {
//     id: 7,
//     text: '유아',
//     path: 'list?category=baby',
//     image: '/images/category/icon_category_baby.svg',
//   },
//   {
//     id: 8,
//     text: '공예',
//     path: 'list?category=craft',
//     image: '/images/category/icon_category_craft.svg',
//   },
//   {
//     id: 9,
//     text: '펫',
//     path: 'list?category=pet',
//     image: '/images/category/icon_category_pet.svg',
//   },
// ];

const NavListItem = ({ id, text, path, image }) => {
  return (
    <ListItem>
      <Link to={path}>{text}</Link>
    </ListItem>
  );
};

const ListItem = styled.li`
  position: relative;
  padding: 20px 0;
  cursor: pointer;

  a {
    position: relative;
    font-size: 24px;
    color: ${props => props.theme.grayscaleA};

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
    &:focus,
    &:active {
      &::after {
        opacity: 1;
      }
    }
  }
`;

export default NavListItem;
