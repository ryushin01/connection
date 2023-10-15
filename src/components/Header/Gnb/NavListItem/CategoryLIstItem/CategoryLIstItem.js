import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CategoryLIstItem = ({ text, path }) => {
  return (
    <ListItem>
      <Link to={path}>{text}</Link>
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

export default CategoryLIstItem;
