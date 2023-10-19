import React, { useRef, useState } from 'react';
import ProductDescription from '../ProductDescription/ProductDescription';
import ProductReview from '../ProductReview/ProductReview';
import styled, { css } from 'styled-components';

const DetailTab = ({ productDetailImages, reviewNumbers }) => {
  const targetRef = useRef(null);
  const [currentTab, setTab] = useState(0);

  const selectTabHandler = index => {
    targetRef.current.scrollIntoView({ behavior: 'smooth' });
    setTab(index);
  };

  const TAB_DATA = [
    {
      name: '상품설명',
      content: <ProductDescription productDetailImages={productDetailImages} />,
    },
    { name: '상품리뷰', content: <ProductReview /> },
  ];

  return (
    <>
      <Tabs>
        {TAB_DATA?.map((item, index) => {
          return (
            <button
              type="button"
              key={index}
              className={currentTab === index ? 'selected' : null}
              onClick={() => selectTabHandler(index)}
            >
              {item.name}
              {index === 1 && <span>&nbsp;({reviewNumbers})</span>}
            </button>
          );
        })}
      </Tabs>
      <TabContents>
        <span ref={targetRef}>invisible area</span>
        <div>{TAB_DATA[currentTab]?.content}</div>
      </TabContents>
    </>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tabs = styled.div`
  ${FlexCenter};
  gap: 80px;
  position: sticky;
  z-index: 1;
  top: 160px;
  padding: 20px 0;
  border-bottom: 1px ${props => props.theme.grayscaleC} solid;
  background-color: ${props => props.theme.grayscaleA};

  button {
    position: relative;
    font-size: 24px;
    color: ${props => props.theme.grayscaleD};

    &::after {
      content: '';
      width: 8px;
      height: 8px;
      position: absolute;
      top: -6px;
      right: -6px;
      border-radius: 50%;
      background-color: ${props => props.theme.primaryColor};
      opacity: 0;
      transition: opacity 0.2s ease-out;
    }

    &.selected {
      color: ${props => props.theme.grayscaleF};

      &::after {
        opacity: 1;
      }
    }
  }
`;

const TabContents = styled.div`
  position: relative;

  & > span {
    position: absolute;
    top: -230px;
    z-index: -1;
    font-size: 1px;
    color: transparent;
  }

  & > div {
    padding-top: 4vw;
  }
`;

export default DetailTab;
