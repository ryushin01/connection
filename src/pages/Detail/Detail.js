import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { API } from '../../config';
import { useDispatch } from 'react-redux';
import Loading from '../Loading/Loading';
import Rating from '../../components/Rating/Rating';
import Counter from '../../components/Counter/Counter';
import Button from '../../components/Button/Button';
import DetailTab from './DetailTab/DetailTab';
import styled, { css } from 'styled-components';

/**
 * Detail.js logics
 * @property {function} getDetailData     - 제품 상세 데이터를 받아오는 함수입니다.
 */

const Detail = () => {
  const [loading, setLoading] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [reviewData, setReviewData] = useState([]);
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = params;
  const productId = Number(params?.id);

  const productData = {
    productId: productId,
    quantity: quantity,
  };

  function getDetailData() {
    fetch('/data/detailData.json', {
      // fetch(`${API.LIST}/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.message === 'SUCCESS') {
          setDetailData(result?.product[0]);
          setLoading(false);
        }
      });
  }

  function getReviewData() {
    // fetch(`http://10.58.52.203:8000/reviews/${productId}`, {
    fetch(`${API.REVIEWS}/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          setReviewData(result?.review);
        }
      });
  }

  useEffect(() => {
    setLoading(true);
    getDetailData();
    // getReviewData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    // productId,
    productName,
    productImg,
    discountRate,
    rating,
    originalPrice,
    discountAmount,
    totalPrice,
    reviewNumbers,
    latitude,
    longitude,
  } = detailData;

  const productDetailImages = detailData?.productDetailImages;
  const finalPrice = totalPrice * quantity;

  const cartProcess = () => {
    postCart();
    putInCart();
  };

  const postCart = () => {
    // fetch('http://10.58.52.140:8000/carts', {
    fetch(`${API.CART}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(productData),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        // setCartData(result.data);
      });
  };

  const putInCart = () => {
    // [Redux] 전역 상태를 변경하는 유일한 방법은 액션을 발생시키는 겁니다. store의 내장 함수인 dispatch를 통해 액션은 물론이고, 데이터까지 보낼 수 있습니다. 데이터는 payload 안에 담아야 합니다
    dispatch({
      type: 'ADD',
      payload: { productId: productId, quantity: quantity },
    });
  };

  const buyNowProcess = () => {
    navigate('/order', {
      state: {
        productData,
        course: 'directly',
        finalPrice: finalPrice,
      },
    });
  };

  return (
    <>
      {loading && <Loading />}
      <main id="main">
        <div>
          <DetailWrap>
            <DetailTopSection>
              <ImageArea>
                <ImageAreaInnerWrap>
                  <img src={productImg} alt={productName} />
                  <Rating rating={rating} />
                </ImageAreaInnerWrap>
              </ImageArea>
              <MetadataArea>
                <MetadataAreaInnerWrap>
                  <ProductTitle>{productName}</ProductTitle>
                  <MetadataTableWrap>
                    <MetadataTable>
                      <tbody>
                        <tr>
                          <th>원가</th>
                          <td>{originalPrice?.toLocaleString()}원</td>
                        </tr>
                        <tr>
                          <th>할인가 (할인율)</th>
                          <td>
                            -{discountAmount?.toLocaleString()}원 (
                            {discountRate}
                            %)
                          </td>
                        </tr>
                        <tr>
                          <th>구매 가격 (1개)</th>
                          <td>{totalPrice?.toLocaleString()}원</td>
                        </tr>
                      </tbody>
                    </MetadataTable>
                  </MetadataTableWrap>
                  <PriceDisplay>
                    <Counter quantity={quantity} setQuantity={setQuantity} />
                    <span>{finalPrice?.toLocaleString()}원</span>
                  </PriceDisplay>
                  <ButtonGroup>
                    <Button
                      shape="solid"
                      color="neutral"
                      size="medium"
                      content="장바구니"
                      onClick={cartProcess}
                    />
                    <Button
                      shape="solid"
                      color="primary"
                      size="medium"
                      content="바로구매"
                      onClick={buyNowProcess}
                    />
                  </ButtonGroup>
                </MetadataAreaInnerWrap>
              </MetadataArea>
            </DetailTopSection>
            <DetailBottomSection>
              <DetailTab
                productId={productId}
                productDetailImages={productDetailImages}
                reviewNumbers={reviewNumbers}
                latitude={latitude}
                longitude={longitude}
                reviewData={reviewData}
              />
            </DetailBottomSection>
          </DetailWrap>
        </div>
      </main>
    </>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailWrap = styled.div`
  margin-top: -40px;
`;

const DetailTopSection = styled.section`
  position: relative;
  display: flex;
  border-bottom: 1px ${props => props.theme.grayscaleC} solid;

  & > div {
    flex: 1;
    padding-top: 7vw;
    padding-bottom: 7vw;
  }
`;

const ImageArea = styled.div`
  ${FlexCenter};
`;

const ImageAreaInnerWrap = styled.div`
  ${FlexCenter};
  position: relative;
  width: 30vw;
  height: 30vw;
  border-radius: 4px;
  background-color: ${props => props.theme.grayscaleB};

  img {
    width: 20vw;
    height: 20vw;
    object-fit: contain;
  }
`;

const MetadataArea = styled.div`
  padding-left: 3vw;
  padding-right: 3vw;
  font-size: 24px;
`;

const ProductTitle = styled.h2`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  white-space: normal;
  font-size: 32px;
  line-height: 1.2;
`;

const MetadataAreaInnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 100%;
`;

const MetadataTableWrap = styled.div`
  position: relative;
`;

const MetadataTable = styled.table`
  table-layout: fixed;
  width: 100%;
  text-align: left;

  th,
  td {
    line-height: 1.4;
  }

  th {
    width: 35%;
  }

  tr:nth-child(2) {
    td {
      color: ${props => props.theme.secondaryColor};
    }
  }

  tr:last-child {
    td {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

const PriceDisplay = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  & > div {
    flex: 1;
  }

  & > span {
    flex: 2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 32px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const DetailBottomSection = styled.section`
  position: relative;
`;

export default Detail;
