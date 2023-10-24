import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../config';
import { ReactComponent as CheckIcon } from '../../svg/icon_check.svg';
import Loading from '../Loading/Loading';
import Button from '../../components/Button/Button';
import styled, { css } from 'styled-components';

/**
 * Payment.js logics
 * @property {function} advancedPaymentComplete     - 결제 완료 유무에 따라 UI 조건부 렌더링을 처리한 함수입니다.
 */

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  let userId,
    totalPrice,
    shippingMethod,
    paymentId,
    products,
    course = null;
  if (location.state != null) {
    userId = location.state.userId;
    totalPrice = location.state.totalPrice;
    shippingMethod = location.state.shippingMethod;
    paymentId = location.state.paymentId;
    products = location.state.products;
    course = location.state.course;
  }

  const isBuyNow = course === 'directly';

  let API_URL;
  if (isBuyNow) {
    // 바로구매
    API_URL = `${API.ORDERS}/now`;
  } else {
    // 장바구니
    API_URL = `${API.ORDERS}`;
  }

  // let randomValue;
  // const random = () => {
  //   randomValue = Math.random().toString(36).substring(2, 10);
  //   return randomValue;
  // };

  let randomValue = Math.random().toString(36).substring(2, 12);

  console.log(randomValue);

  const IMP = window.IMP;
  IMP.init('imp62852632');

  const requestPay = () => {
    IMP.request_pay(
      {
        // param
        pg: 'TC0ONETIME',
        pay_method: 'card',
        // merchant_uid: 'ORD20180131-0000011',
        merchant_uid: randomValue,
        name: '노르웨이 회전 의자',
        amount: 64900,
        buyer_email: 'gildong@gmail.com',
        buyer_name: '홍길동',
        buyer_tel: '010-4242-4242',
        buyer_addr: '서울특별시 강남구 신사동',
        buyer_postcode: '01181',
      },
      rsp => {
        // callback
        if (rsp.success) {
          console.log('결제 성공 로직');
        } else {
          console.log('결제 실패 로직');
        }
      },
    );
  };

  // 통합 함수
  const postPaymentData = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        userId: userId,
        totalPrice: totalPrice,
        shippingMethod: shippingMethod,
        paymentId: paymentId,
        products: products,
      }),
    })
      .then(response => response.json())
      .then(result => {
        setPaymentComplete(true);
        requestPay();
        setLoading(false);
      });
  };

  // 장바구니 로직의 최종 함수
  // const postCartPayment = () => {
  //   // fetch(`${API.ORDERS}`, {
  //   fetch('http://10.58.52.59:8000/orders', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: localStorage.getItem('accessToken'),
  //     },
  //     body: JSON.stringify({
  //       userId: userId,
  //       totalPrice: totalPrice,
  //       shippingMethod: shippingMethod,
  //       paymentId: paymentId,
  //       products: products,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(result => {
  //       setPaymentComplete(true);
  //       setLoading(false);
  //     });
  // };

  // 바로구매 로직의 최종 함수
  // const postBuyNowPayment = () => {
  //   // fetch(`${API.ORDERS}/now`, {
  //   fetch('http://10.58.52.149:8000/orders/now', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: localStorage.getItem('accessToken'),
  //     },
  //     body: JSON.stringify({
  //       userId: userId,
  //       totalPrice: totalPrice,
  //       shippingMethod: shippingMethod,
  //       paymentId: paymentId,
  //       products: products,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(result => {
  //       setPaymentComplete(true);
  //       setLoading(false);
  //     });
  // };

  useEffect(() => {
    setLoading(true);
    // random();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Main id="main">
        <div>
          {!paymentComplete && (
            <Before>
              <SectionTitle>결제하기</SectionTitle>
              <Section>
                <SectionSubtitle>주문 정보</SectionSubtitle>
                <TableGroup>
                  <SectionTable>
                    <colgroup>
                      <col style={{ width: '50%' }} />
                      <col style={{ width: '20%' }} />
                      <col style={{ width: '30%' }} />
                    </colgroup>
                    <caption>주문 정보</caption>
                    <thead>
                      <tr>
                        <th>제품명</th>
                        <td>수량</td>
                        <td>가격</td>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map(
                        ({ productName, quantity, totalPrice }, index) => {
                          return (
                            <tr key={index}>
                              <th>{productName}</th>
                              <td>{quantity}</td>
                              <td>{totalPrice.toLocaleString()}원</td>
                            </tr>
                          );
                        },
                      )}
                    </tbody>
                  </SectionTable>
                  <SectionTable>
                    <colgroup>
                      <col style={{ width: '20%' }} />
                      <col style={{ width: '80%' }} />
                    </colgroup>
                    <caption>결제 금액</caption>
                    <tbody>
                      <tr>
                        <th>상품 금액</th>
                        <td>{totalPrice.toLocaleString()}원</td>
                      </tr>
                      <tr>
                        <th>배송비</th>
                        <td>
                          무료(배송 방법:{' '}
                          {shippingMethod === 1 ? '직접수령' : '택배배송'})
                        </td>
                      </tr>
                      <tr>
                        <th>총 결제 금액</th>
                        <td>{totalPrice.toLocaleString()}원</td>
                      </tr>
                      <tr>
                        <th>포인트 차감</th>
                        <td>
                          <span>{totalPrice.toLocaleString()}원</span>
                          <RemainingPoints>
                            (잔여 포인트: <strong>10,000</strong>)
                          </RemainingPoints>
                        </td>
                      </tr>
                    </tbody>
                  </SectionTable>
                </TableGroup>
              </Section>
              <ButtonGroup>
                <Button
                  shape="solid"
                  color="neutral"
                  size="large"
                  content="돌아가기"
                  onClick={() => navigate(-1)}
                />
                <Button
                  shape="solid"
                  color="primary"
                  size="large"
                  content="결제하기"
                  onClick={postPaymentData}
                />
                {/* {course !== 'directly' && (
                  <Button
                    shape="solid"
                    color="primary"
                    size="large"
                    content="결제하기"
                    onClick={postCartPayment}
                  />
                )}
                {course === 'directly' && (
                  <Button
                    shape="solid"
                    color="primary"
                    size="large"
                    content="결제하기"
                    onClick={postBuyNowPayment}
                  />
                )} */}
              </ButtonGroup>
            </Before>
          )}

          {paymentComplete && (
            <After>
              <SectionTitle>결제 완료</SectionTitle>
              <Section>
                <SectionInnerWrap>
                  <CheckIcon />
                  <OrderNumber>주문 번호: 100-2023-1021</OrderNumber>
                </SectionInnerWrap>
              </Section>
              <ButtonGroup>
                <Button
                  shape="solid"
                  color="neutral"
                  size="large"
                  content="주문 내역 확인하러 가기"
                  onClick={() => navigate('/mypage')}
                />
                <Button
                  shape="solid"
                  color="primary"
                  size="large"
                  content="메인 화면으로 돌아가기"
                  onClick={() => navigate('/')}
                />
              </ButtonGroup>
            </After>
          )}
        </div>
      </Main>
    </>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  display: flex;
  align-items: center;
`;

const Before = styled.div`
  position: relative;
`;

const After = styled.div`
  ${FlexCenter};
  flex-direction: column;

  section {
    flex: 1;
  }
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  text-align: center;
`;

const Section = styled.section`
  position: relative;
  padding: 80px 0;
  color: ${props => props.theme.grayscaleF};

  & + section {
    border-top: 1px ${props => props.theme.grayscaleD} solid;
  }

  table {
    table-layout: fixed;
    width: 100%;
    flex: 1;

    caption {
      padding: 12px 0;
      border-bottom: 1px ${props => props.theme.grayscaleF} solid;
      font-size: 24px;
      text-align: left;
    }

    th,
    td {
      padding: 12px 4px;
      font-size: 20px;
      line-height: 1.5;
      text-align: left;
      vertical-align: top;
    }

    thead {
      th,
      td {
        border-bottom: 1px ${props => props.theme.grayscaleD} solid;
      }
    }
  }
`;

const SectionInnerWrap = styled.div`
  ${FlexCenter};
  flex-direction: column;
  gap: 4vw;

  svg {
    fill: ${props => props.theme.grayscaleF};
    path {
      fill: ${props => props.theme.grayscaleF};
      stroke: ${props => props.theme.grayscaleF};
    }
  }
`;

const OrderNumber = styled.em`
  color: ${props => props.theme.grayscaleF};
  font-size: 24px;
`;

const SectionSubtitle = styled.h3`
  margin-bottom: 40px;
  font-size: 28px;
`;

const TableGroup = styled.div`
  display: flex;
  gap: 8vw;
  align-items: flex-start;
`;

const SectionTable = styled.table`
  position: relative;

  span {
    vertical-align: middle;
  }
`;

const RemainingPoints = styled.span`
  margin-left: 8px;

  strong {
    color: ${props => props.theme.secondaryColor};
    font-weight: 700;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: 0 auto 40px;
  gap: 4vw;
`;

export default Payment;
