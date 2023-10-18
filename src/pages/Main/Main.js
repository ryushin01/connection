import React, { useEffect, useState } from 'react';
// import { API } from '../../config';
import Loading from '../../pages/Loading/Loading';
import BigBanner from './BigBanner/BigBanner';
import Band from '../../components/Band/Band';

import Modal from '../../components/Modal/Modal';

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [categoryBandData, setCategoryBandData] = useState([]);
  const [sellerBandData, setSellerBandData] = useState([]);

  const getCategoryBandData = () => {
    fetch('/data/categoryBandData.json', {
      // fetch(`${API.CATEGORY_BAND}`, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        // real data
        // if (result.message === 'Success') {
        //   setCategoryBandData(result.data);
        // }

        // mock data
        setCategoryBandData(result);

        setLoading(false);
      });
  };

  const getSellerBandData = () => {
    fetch('/data/sellerBandData.json', {
      // fetch(`${API.SELLER_BAND}`, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        // real data
        // if (result.message === 'Success') {
        //   setSellerBandData(result.data);
        // }

        // mock data
        setSellerBandData(result);

        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getCategoryBandData();
    getSellerBandData();
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
