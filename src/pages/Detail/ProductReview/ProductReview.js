import React from 'react';
import Rating from '../../../components/Rating/Rating';
import styled, { css } from 'styled-components';

const ProductReview = ({ reviewData }) => {
  return (
    <ReviewList>
      {reviewData?.map(
        ({ email, date, contents, reviewImages, rating }, index) => {
          return (
            <ReviewListItem key={index}>
              <ReviewMetadataArea>
                <ReviewerInfo>
                  <span>{email}</span>
                  <span>{date.substring(2, 10)}</span>
                </ReviewerInfo>
                <textarea value={contents} readOnly />
              </ReviewMetadataArea>
              <ReviewImageArea>
                <img src={reviewImages} alt="리뷰 이미지" />
                <Rating rating={rating} />
              </ReviewImageArea>
            </ReviewListItem>
          );
        },
      )}
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
    font-size: 20px;
    line-height: 1.4;
    resize: none;
    outline: 0;
  }
`;

const ReviewerInfo = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4vw;
  font-size: 20px;
  color: ${props => props.theme.grayscaleF};
`;

const ReviewImageArea = styled.div`
  ${FlexCenter};
  position: relative;
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
