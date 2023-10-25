import React from 'react';
import Map from '../../../components/Map/Map';
import styled from 'styled-components';

const ProductDescription = ({ productDetailImages }) => {
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
      <Map />
    </>
  );
};

const Description = styled.div`
  font-size: 0;
`;

export default ProductDescription;
