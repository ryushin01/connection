import React from 'react';
import styled from 'styled-components';

const ProductDescription = ({ productDetailImages }) => {
  let container = document.getElementById('map');
  let options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };

  let map = new kakao.maps.Map(container, options);
  return (
    <>
      <Description>
        {productDetailImages?.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.url} alt={item.comments} />
            </div>
          );
        })}
      </Description>
      <Map id="map">지도 API 영역</Map>
    </>
  );
};

const Description = styled.div`
  font-size: 0;
`;

const Map = styled.div`
  width: 100%;
  height: 40vw;
  margin-top: 4vw;

  border: 1px red solid;
`;

export default ProductDescription;
