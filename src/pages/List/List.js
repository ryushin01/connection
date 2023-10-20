import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { API } from '../../config';
import Loading from '../../pages/Loading/Loading';
import ListTitle from './LIstTitle/ListTitle';
import Filter from '../../components/Filter/Filter';
import ProductList from '../../components/ProductList/ProductList';
import Pagination from '../../components/Pagination/Pagination';
import styled from 'styled-components';

const List = () => {
  const [loading, setLoading] = useState(true);
  const [listTitle, setListTitle] = useState('');
  const [listData, setListData] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const processedId = Number(id);

  // console.log(location.state);

  // fetch(`${API.CATEGORY_BAND}/${categoryId}`, {
  // fetch(`${API.SELLER_BAND}/${sellerId}`, {

  let API_URL;

  if (location.state.categoryId) {
    console.log('카테고리 더보기 진입');
    API_URL = `/data/categoryListData.json`;
    // API_URL = `${API.CATEGORY_BAND}/${processedId}`;

    // API_URL = `${API.LIST}?categoryId=${processedId}`;
  } else {
    console.log('셀러 더보기 진입');
    API_URL = `/data/sellerListData.json`;
    // API_URL = `${API.SELLER_BAND}/${processedId}`;

    // API_URL = `${API.LIST}?sellerId=${processedId}`;
  }

  const getListData = () => {
    // fetch(`${API.DETAIL}?categoryId=${categoryId}`, {
    // fetch(`${API.LIST}/${categoryId}`, {
    // fetch(`${API.CATEGORY_BAND}/${processedId}`, {
    fetch(API_URL, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Success') {
          setListTitle(result.categoryName || result.sellerName);
          setListData(result.data);
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
        <ListTitle listTitle={listTitle} />
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
