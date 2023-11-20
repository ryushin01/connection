import React from 'react';
// import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const ProductDescription = ({ productDetailImages, latitude, longitude }) => {
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
      {/* <Map
        center={{ lat: latitude, lng: longitude }} // 지도의 중심 좌표
        style={{
          width: '80%',
          height: '32vw',
          margin: '0 auto',
          border: '1px #ccc solid',
        }} // 지도 크기
        level={3} // 지도 확대 레벨
      >
        <MapMarker position={{ lat: latitude, lng: longitude }} />
      </Map> */}
    </>
  );
};

const Description = styled.div`
  margin-bottom: 40px;
  font-size: 0;
`;

export default ProductDescription;
