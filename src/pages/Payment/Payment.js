import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../config';
import { ReactComponent as CheckIcon } from '../../svg/icon_check.svg';
import Button from '../../components/Button/Button';
import styled, { css } from 'styled-components';

/**
 * Payment.js logics
 * @property {function} advancedPaymentComplete     - 결제 완료 유무에 따라 UI 조건부 렌더링을 처리한 함수입니다.
 */

const Payment = ({ points }) => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const intPoints = Number(points);

  let userId,
    finalPrice,
    shippingMethod,
    paymentId,
    products,
    productName,
    course = null;
  if (location?.state != null) {
    userId = location?.state?.userId;
    finalPrice = location?.state?.totalPrice;
    shippingMethod = location?.state?.shippingMethod;
    paymentId = location?.state?.paymentId;
    products = location?.state?.products;
    productName = location?.state?.productName;
    course = location?.state?.course;
  }

  const isVisiting = shippingMethod === 'visiting';
  const isBuyNow = course === 'directly';

  let API_URL;
  if (isBuyNow) {
    // 바로구매
    API_URL = `${API.ORDERS}/now`;
  } else {
    // 장바구니
    API_URL = `${API.ORDERS}`;
  }

  let randomValue = Math.random().toString(36).substring(2, 12);
  const merchant_uid = `2023-10-${randomValue}`;
  const IMP = window.IMP;
  IMP.init('imp62852632');

  // 구글 크롬에서 에러 제외 처리 필요(중단점)
  const requestPay = () => {
    IMP.request_pay(
      {
        pg: 'kakaopay',
        name: `${productName} 외`,
        amount: finalPrice,
        merchant_uid: merchant_uid,
        custom_data: { products },
      },
      function (rsp) {
        const { status, imp_uid } = rsp;
        // if (status === 'paid') {
        if (rsp.success) {
          // fetch(`http://10.58.52.138:8000/payments`, {
          fetch(`${API.PAYMENTS}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: localStorage.getItem('accessToken'),
            },
            body: JSON.stringify({
              userId: userId,
              totalPrice: finalPrice,
              shippingMethod: shippingMethod,
              paymentId: paymentId,
              products: products,
              imp_uid: imp_uid,
              course: course,
            }),
            // data: { imp_uid: imp_uid, merchant_uid: merchant_uid },
          })
            .then(response => response.json())
            .then(result => {
              console.log('결과: ', result);
              if (result.message === 'PAYMENT_SUCCESS') {
                setCartQuantity(result.cartQuantity);
                setPaymentComplete(true);
              }
            });
        } else {
          console.log('결제 실패 로직');
        }
      },
    );
  };

  const goToMain = () => {
    navigate('/main');
    refreshUserInfo();
    window.location.reload();
  };

  const refreshUserInfo = () => {
    // const refreshPoint = ;
    const refreshCartCount = cartQuantity;
    // localStorage.setItem('points', refreshPoint);
    localStorage.setItem('cartCount', refreshCartCount);
  };

  return (
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
                    {!isBuyNow &&
                      products?.map(
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

                    {isBuyNow && (
                      <tr>
                        <th>{productName}</th>
                        <td>{products?.quantity}</td>
                        <td>
                          {/* {(products?.quantity * finalPrice)?.toLocaleString()} */}
                          {finalPrice}원
                        </td>
                      </tr>
                    )}
                  </tbody>
                </SectionTable>
                <SectionTable>
                  <colgroup>
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '70%' }} />
                  </colgroup>
                  <caption>결제 금액</caption>
                  <tbody>
                    <tr>
                      <th>상품 금액</th>
                      <td>{finalPrice?.toLocaleString()}원</td>
                    </tr>
                    <tr>
                      <th>배송비&nbsp;(배송 방법)</th>
                      <td>
                        무료&nbsp;({isVisiting ? '직접 수령' : '택배 배송'})
                      </td>
                    </tr>
                    <tr>
                      <th>총 결제 금액</th>
                      <td>{finalPrice?.toLocaleString()}원</td>
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
              {/* <Button
                shape="solid"
                color="primary"
                size="large"
                content="결제하기"
                onClick={postPaymentData}
              /> */}

              <Button
                shape="solid"
                color="primary"
                size="large"
                content="결제하기"
                onClick={requestPay}
              />
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
              {/* <Button
                  shape="solid"
                  color="neutral"
                  size="large"
                  content="주문 내역 확인하러 가기"
                  onClick={() => navigate('/mypage')}
                /> */}
              <Button
                shape="solid"
                color="primary"
                size="large"
                content="메인 화면으로 돌아가기"
                onClick={goToMain}
              />
            </ButtonGroup>
          </After>
        )}
      </div>
    </Main>
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
