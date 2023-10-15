import React, { useEffect, useState } from 'react';
import BigBanner from './BigBanner/BigBanner';
import Band from '../../components/Band/Band';

const Main = () => {
  const [bandData, setBandData] = useState([]);

  const getBandData = () => {
    fetch('/data/bandData.json', {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        setBandData(result);
      });
  };

  useEffect(() => {
    getBandData();
  }, []);

  return (
    <main id="main">
      <BigBanner />
      <div>
        {bandData.map((item, index) => {
          return <Band key={index} item={item} />;
        })}
      </div>
    </main>
  );
};

export default Main;
