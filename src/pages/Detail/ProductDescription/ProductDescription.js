import React from 'react';
import styled from 'styled-components';

const ProductDescription = ({ productDetailImages }) => {
  return (
    <>
      <Description>
        {productDetailImages?.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.url} alt="n/a" />
            </div>
          );
        })}
      </Description>
      <Map>지도 API 영역</Map>
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
