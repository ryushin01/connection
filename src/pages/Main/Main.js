import React, { useEffect, useState } from 'react';
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

  console.log(bandData);

  useEffect(() => {
    getBandData();
  }, []);

  return (
    <main>
      {/* map() */}
      <div>
        <Band />
      </div>
    </main>
  );
};

export default Main;
