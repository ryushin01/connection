import React, { useEffect, useState } from 'react';
import { API } from '../../config';
import { useParams } from 'react-router-dom';
import ListTitle from './LIstTitle/ListTitle';
import Filter from '../../components/Filter/Filter';
import ProductList from '../../components/ProductList/ProductList';
import Pagination from '../../components/Pagination/Pagination';
import styled from 'styled-components';

const List = () => {
  const [listData, setListData] = useState([]);
  const { id } = useParams();
  const categoryId = Number(id);

  const getListData = () => {
    // uri 재확인 필요
    fetch(`${API.DETAIL}?categoryId=${categoryId}`, {
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

  const title = listData[0]?.categoryName;

  return (
    <main id="main">
      <ListTitle categoryId={categoryId} title={title} />
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

const ListSection = styled.section`
  padding: 20px 0;
`;

export default List;
