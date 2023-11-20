import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API } from '../../config';
import Loading from '../../pages/Loading/Loading';
import BigBanner from './BigBanner/BigBanner';
import Band from '../../components/Band/Band';

/**
 * Main.js logics
 * @property {function} getCategoryBandData     - 카테고리 밴드 데이터를 받아오는 함수입니다.
 * @property {function} getSellerBandData       - 셀러 밴드 데이터를 받아오는 함수입니다.
 */

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [categoryBandData, setCategoryBandData] = useState([]);
  const [sellerBandData, setSellerBandData] = useState([]);
  const location = useLocation();

  const globalCartQuantity = location.state;

  const getCategoryBandData = () => {
    fetch('/data/categoryBandData.json', {
      // fetch(`${API.CATEGORY_BAND}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
    })
      .then(response => response.json())
      .then(result => {
        // real data
        if (result.message === 'SUCCESS') {
          setCategoryBandData(result.data);
        }

        // mock data
        // setCategoryBandData(result);

        setLoading(false);
      });
  };

  const getSellerBandData = () => {
    fetch('/data/sellerBandData.json', {
      // fetch(`${API.SELLER_BAND}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
    })
      .then(response => response.json())
      .then(result => {
        // real data
        if (result.message === 'SUCCESS') {
          setSellerBandData(result.data);
        }

        // mock data
        // setSellerBandData(result);

        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getCategoryBandData();
    // getSellerBandData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <main id="main">
        <BigBanner />
        <div>
          {categoryBandData?.map((item, index) => {
            return <Band key={index} item={item} />;
          })}

          {sellerBandData?.map((item, index) => {
            return <Band key={index} item={item} />;
          })}
        </div>
      </main>
    </>
  );
};

export default Main;
