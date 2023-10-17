import React from 'react';
import styled, { css } from 'styled-components';

const ProductReview = () => {
  return (
    <ReviewList>
      <ReviewListItem>
        <ReviewMetadataArea>
          <ReviewerInfo>
            <span>ryushin0@test.com</span>
            <span>2023-10-17</span>
          </ReviewerInfo>
          <textarea
            value="리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다. 리뷰 내용이 들어갑니다."
            readOnly
          />
        </ReviewMetadataArea>
        <ReviewImageArea>
          <img src="/images/products/milk.png" alt="리뷰 이미지" />
        </ReviewImageArea>
      </ReviewListItem>
    </ReviewList>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4vw;
`;

const ReviewListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px ${props => props.theme.grayscaleC} solid;
  border-radius: 4px;
  font-size: 0;
`;

const ReviewMetadataArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-right: 20px;

  textarea {
    width: 100%;
    height: 16vw;
    padding: 20px;
    border-color: transparent;
    border-radius: 4px;
    background-color: ${props => props.theme.grayscaleB};
    font-size: 16px;
    line-height: 24px;
    resize: none;
    outline: 0;
  }
`;

const ReviewerInfo = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4vw;
  font-size: 16px;
  color: ${props => props.theme.grayscaleF};
`;

const ReviewImageArea = styled.div`
  ${FlexCenter};
  width: 20vw;
  height: 20vw;
  border-radius: 4px;
  background-color: ${props => props.theme.grayscaleB};

  img {
    width: 12vw;
    height: 12vw;
    object-fit: contain;
  }
`;

export default ProductReview;
