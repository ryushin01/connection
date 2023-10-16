import React, { useEffect, useState } from 'react';
import { API } from '../../config';
import { useParams } from 'react-router-dom';
import Loading from '../../pages/Loading/Loading';
import ListTitle from './LIstTitle/ListTitle';
import Filter from '../../components/Filter/Filter';
import ProductList from '../../components/ProductList/ProductList';
import Pagination from '../../components/Pagination/Pagination';
import styled from 'styled-components';

const List = () => {
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  const [listData, setListData] = useState([]);
  const { id } = useParams();
  const categoryId = Number(id);

  const getListData = () => {
    // fetch(`${API.DETAIL}?categoryId=${categoryId}`, {
    fetch(`${API.LIST}/${categoryId}`, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Success') {
          setCategoryName(result.categoryName);
          setListData(result.data);
          setLoading(false);
        }
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
        setCategoryName(result.categoryName);
        setListData(result.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);

    // real data
    // getListData();

    // mock data
    getListMockData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <main id="main">
        {/* <ListTitle categoryId={categoryId} categoryName={categoryName} /> */}
        <ListTitle categoryName={categoryName} />
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
