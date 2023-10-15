import React, { useEffect, useState } from 'react';
import { API } from '../../config';
import { useParams } from 'react-router-dom';
import Filter from '../../components/Filter/Filter';
import ProductList from '../../components/ProductList/ProductList';
import Pagination from '../../components/Pagination/Pagination';
import styled, { css } from 'styled-components';

const List = () => {
  const [listData, setListData] = useState([]);
  const { id } = useParams();
  // const categoryId = Number(id);

  const getListData = () => {
    fetch(`${API.DETAIL}?categoryId=${id}`, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        setListData(result);
      });
  };

  const getListMockData = () => {
    fetch('/data/ListData.json', {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        setListData(result);
      });
  };

  useEffect(() => {
    // getListData();
    getListMockData();
  }, []);

  return (
    <main id="main">
      <ListTitleSection>
        <ListTitleSectionInnerWrap>
          <h2>{listData[0]?.categoryName}</h2>
        </ListTitleSectionInnerWrap>
      </ListTitleSection>
      <div>
        <ListSection>
          <Filter />
          {listData?.map((item, index) => {
            return <ProductList key={index} item={item} />;
          })}
          <Pagination />
        </ListSection>
      </div>
    </main>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListTitleSection = styled.section`
  ${FlexCenter};
  position: relative;
  height: 12vw;
  background-color: ${props => props.theme.primaryColor};

  h2 {
    font-size: 28px;
  }
`;

const ListTitleSectionInnerWrap = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const ListSection = styled.section`
  padding: 20px 0;
`;

export default List;
