import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
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
  const [listData, setListData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('rating');
  const [page, setPage] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const location = useLocation();

  let categoryId,
    sellerId = null;
  if (location.state != null) {
    categoryId = location.state.categoryId;
    sellerId = location.state.sellerId;
  }

  let API_URL;
  if (categoryId != null) {
    API_URL = `${API.LIST}?categoryId=${categoryId}`;
  }
  if (sellerId != null) {
    API_URL = `${API.LIST}?sellerId=${sellerId}`;
  }

  // sort: review, created_at, rating
  const offset = searchParams.get('offset');
  let limit = searchParams.get('limit');
  const totalPages = Math.ceil(totalQuantity / 10);
  limit = 10;
  const calc_offset = (page - 1) * limit;

  const getListData = () => {
    fetch(
      '/data/categoryListData.json',
      // fetch(
      //   API_URL + `&sort=${sort}&offset=${calc_offset || 0}&limit=${limit || 10}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('accessToken'),
        },
      },
    )
      .then(response => response.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          setListTitle(result?.name);
          setListData(result?.data);
          setTotalQuantity(result?.totalQuantity);
          // setListSortParams();
          setLoading(false);
        }
      });
  };

  // [Issue] Router 이슈로 인한 주석 처리
  // const setListSortParams = () => {
  //   limit = 10;
  //   searchParams.set('sort', sort);
  //   searchParams.set('offset', (page - 1) * limit);
  //   searchParams.set('limit', limit);
  //   setSearchParams(searchParams);
  // };

  useEffect(() => {
    setLoading(true);
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, page]);

  return (
    <>
      {loading && <Loading />}
      <main id="main">
        <ListTitle listTitle={listTitle} categoryId={categoryId} />
        <div>
          <ListSection>
            <Filter sort={sort} setSort={setSort} />
            <ProductList listData={listData} />
            <Pagination totalPages={totalPages} page={page} setPage={setPage} />
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
