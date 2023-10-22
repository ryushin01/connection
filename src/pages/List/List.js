import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
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
  // const [categoryId, setCategoryId] = useState('');
  const [listData, setListData] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const processedId = Number(id);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('rating');
  const [page, setPage] = useState(1);

  // let categoryId,
  //   sellerId = null;

  // if (location?.state !== null) {
  //   const { categoryId, sellerId } = location?.state;
  // }

  let API_URL;

  if (location?.state.categoryId !== null) {
    const targetId = location?.state.categoryId;
    API_URL = `${API.LIST}?categoryId=${targetId}`;
    // API_URL = `${API.LIST}?categoryId=${location?.state.categoryId}`;
  }

  if (location?.state.sellerId !== null) {
    const targetId = location?.state.sellerId;
    API_URL = `${API.LIST}?sellerId=${targetId}`;
    // API_URL = `${API.LIST}?sellerId=${location?.state.sellerId}`;
  }

  // console.log(
  //   'categoryId=',
  //   location?.state.categoryId,
  //   'sellerId=',
  //   location?.state.sellerId,
  // );

  // let API_URL;
  // if (categoryId !== null) {
  //   API_URL = `${API.LIST}?categoryId=${processedId}`;
  // } else {
  //   API_URL = `${API.LIST}?sellerId=${processedId}`;
  // }

  // sort: review, created_at, rating
  const offset = searchParams.get('offset');
  let limit = searchParams.get('limit');
  const totalPages = Math.ceil(listData.length / 10);

  const setListSortParams = () => {
    limit = 10;
    // 필터
    searchParams.set('sort', sort);
    // 페이지네이션
    searchParams.set('offset', (page - 1) * limit);
    searchParams.set('limit', limit);
    setSearchParams(searchParams);
  };

  const getListData = () => {
    fetch(
      API_URL + `&sort=${sort}&offset=${offset || 0}&limit=${limit || 10}`,
      {
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Success') {
          setListSortParams();
          setListTitle(result?.name);
          // setCategoryId(result?.id);
          setListData(result?.data);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    setLoading(true);
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      {loading && <Loading />}
      <main id="main">
        <ListTitle
          listTitle={listTitle}
          // categoryId={categoryId}
        />
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
