import React from 'react';
import { Map } from 'react-kakao-maps-sdk';
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
      <Map
        center={{ lat: latitude, lng: longitude }} // 지도의 중심 좌표
        style={{ width: '100%', height: '300px' }} // 지도 크기
        level={3} // 지도 확대 레벨
      />
    </>
  );
};

const Description = styled.div`
  font-size: 0;
`;

export default ProductDescription;
