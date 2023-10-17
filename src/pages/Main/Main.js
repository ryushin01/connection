import React, { useEffect, useState } from 'react';
// import { API } from '../../config';
import Loading from '../../pages/Loading/Loading';
import BigBanner from './BigBanner/BigBanner';
import Band from '../../components/Band/Band';

import Modal from '../../components/Modal/Modal';

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [bandData, setBandData] = useState([]);

  const getBandData = () => {
    // fetch('http://10.58.52.91:8000/products', {
    // fetch(`${API.MAIN}`, {
    fetch('/data/bandData.json', {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        // real data
        // if (result.message === 'Success') {
        //   setBandData(result.data);
        // }

        // mock data
        setBandData(result);

        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getBandData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <main id="main">
        <BigBanner />
        <div>
          {bandData?.map((item, index) => {
            return <Band key={index} item={item} />;
          })}
        </div>
        <Modal />
      </main>
    </>
  );
};

export default Main;
