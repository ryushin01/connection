import React from 'react';
import styled from 'styled-components';

const ProductDescription = () => {
  return (
    <>
      <Description>
        <img src="/images/detail/detail.jpg" alt="제품 상세 이미지" />
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
