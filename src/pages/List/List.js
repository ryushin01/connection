import React, { useEffect, useState } from 'react';
import { API } from '../../config';
import { useParams, useSearchParams } from 'react-router-dom';
import Loading from '../../pages/Loading/Loading';
import ListTitle from './LIstTitle/ListTitle';
import Filter from '../../components/Filter/Filter';
import ProductList from '../../components/ProductList/ProductList';
import Pagination from '../../components/Pagination/Pagination';
import styled from 'styled-components';

const List = () => {
  // hooks
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  const [listData, setListData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams(); // 쿼리 스트링 값을 받아오기 위한 hooks 선언
  const [sort, setSort] = useState(''); // 페이지 정렬을 위한 state
  const [page, setPage] = useState(1); // 페이지 이동을 위한 state
  const { id } = useParams();
  const categoryId = Number(id);

  // variables
  const offset = searchParams.get('offset'); // 페이지의 위치값
  let limit = searchParams.get('limit'); // 페이지당 보여줄 상품의 개수
  const totalPage = Math.ceil(listData.length / limit); // 전체 페이지 수

  // functions
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
        if (result.message === 'SUCCESS') {
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

  const setPaginationParams = () => {
    limit = 12; // 페이지당 보여줄 상품의 개수(12개 고정)
    searchParams.set('offset', (page - 1) * limit); // 페이지의 위치값
    searchParams.set('limit', limit); // 페이지당 보여줄 상품의 개수
    setSearchParams(searchParams); // 쿼리 스트링 값 변경
  };

  const getSortData = () => {
    fetch(
      `http://10.58.52.73:8000/products/category/:${categoryId}?sort=${sort}&offset=${offset}&limit=${limit}`,
    )
      .then(response => response.json())
      .then(result => {
        setPaginationParams();
      });
  };

  // useEffect
  useEffect(() => {
    setLoading(true);

    // real data
    // getListData();

    // mock data
    getListMockData();
  }, []);

  useEffect(() => {
    getSortData();
  }, [page]);

  return (
    <>
      {loading && <Loading />}
      <main id="main">
        {/* <ListTitle categoryId={categoryId} categoryName={categoryName} /> */}
        <ListTitle categoryName={categoryName} />
        <div>
          <ListSection>
            <Filter categoryId={categoryId} />
            <ProductList listData={listData} />
            <Pagination totalPage={totalPage} page={page} setPage={setPage} />
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
