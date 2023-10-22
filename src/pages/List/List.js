import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { API } from '../../config';
import Loading from '../../pages/Loading/Loading';
import ListTitle from './LIstTitle/ListTitle';
import Filter from '../../components/Filter/Filter';
import ProductList from '../../components/ProductList/ProductList';
import Pagination from '../../components/Pagination/Pagination';
import styled from 'styled-components';

/**
 * List.js logics
 * @property {function} getListData     - 제품 목록 데이터를 받아오는 함수입니다.
 */

const List = () => {
  const [loading, setLoading] = useState(true);
  const [listTitle, setListTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [listData, setListData] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const processedId = Number(id);

  let API_URL;
  if (location.state.categoryId) {
    API_URL = `${API.LIST}?categoryId=${processedId}`;
  } else {
    API_URL = `${API.LIST}?sellerId=${processedId}`;
  }

  const getListData = () => {
    fetch(API_URL, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Success') {
          setListTitle(result?.name);
          setCategoryId(result?.id);
          setListData(result?.data);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    setLoading(true);
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <Loading />}
      <main id="main">
        <ListTitle listTitle={listTitle} categoryId={categoryId} />
        <div>
          <ListSection>
            <Filter />
            <ProductList listData={listData} />
            <Pagination />
          </ListSection>
        </div>
      </main>
    </>
  );
};

const ListSection = styled.section`
  padding: 20px 0;
`;

export default List;
