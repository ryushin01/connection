import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../config';
import Loading from '../Loading/Loading';
import RadioGroup from '../../components/RadioGroup/RadioGroup';
import Button from '../../components/Button/Button';
import DELIVERY_DATA from '../../data/DeliveryData';
import PAYMENT_DATA from '../../data/PaymentData';
import styled from 'styled-components';

/**
 * Order.js logics
 * @property {function} getUserData     - 유저 데이터(이름, 연락처, 주소)를 받아오는 함수입니다.
 * @property {function} getCartData     - 장바구니 데이터(제품명, 수량, 가격, 총 금액)를 받아오는 함수입니다.
 * @property {function} sumCartData     - 장바구니 데이터 중 수량과 가격을 각각 더해 반환하는 함수입니다.
 * @property {function} selectingSentry - 배송 방법 선택 시 값을 모니터링하고 배송 방법 값을 정하는 함수입니다.
 * @property {function} dataTransfer   - 유저 데이터, 장바구니 데이터, 배송 방법, 결제 방법을 결제 페이지(Payment.js)로 전달하는 함수입니다.
 */

const Order = ({ points }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [shippingMethod, setShippingMethod] = useState('visiting');
  const [paymentId, setPaymentId] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const intPoints = Number(points);

  let productData,
    productId,
    quantity,
    course = null;
  if (location?.state?.productData !== null) {
    productData = location?.state?.productData;
    productId = location?.state?.productData?.productId;
    quantity = location?.state?.productData?.quantity;
    course = location?.state?.course;
  }

  // Payment.js로 전달할 데이터 모음
  let cartPriceData,
    totalPrice = null;
  if (location?.state?.cartPriceData !== null) {
    cartPriceData = location?.state?.cartPriceData;
    totalPrice = location?.state?.cartPriceData?.totalPrice;
  }

  const isBuyNow = course === 'directly';

  let API_URL;
  if (isBuyNow) {
    // 바로구매
    API_URL = `${API.LIST}/${productId}`;
  } else {
    // 장바구니
    API_URL = `${API.CART}/complete`;
  }

  const getUserData = () => {
    // fetch(`${API.CART}/getuserinfo`, {
    fetch(`/data/CartGetUserInfoData.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'userInformation') {
          setUserData(result?.data);
        }

        setLoading(false);
      });
  };

  const {
    userId,
    userName,
    phoneNumber,
    address,
    addressDetail,
    zipCode,
    isSubscribe,
  } = userData;

  const sumCartData = data => {
    if (Array.isArray(data)) {
      let values = {
        quantity: 0,
        totalPrice: 0,
      };

      data.forEach(cartData => {
        values.quantity += cartData.quantity;
        values.totalPrice += cartData.totalPrice;
      });
      return values;
    }
  };

  const sumCartDataValues = sumCartData(cartData);

  // 통합 함수
  const getOrderData = () => {
    fetch('/data/CartCompleteData.json', {
      // fetch(`${API_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);

        // 장바구니
        if (result.message === 'Order_Item') {
          if (!isBuyNow) {
            setCartData(result?.data.products);
            setLoading(false);
          }
        }

        // 바로구매
        if (result.message === 'SUCCESS') {
          if (isBuyNow) {
            setCartData(result?.product);
            setLoading(false);
          }
        }
      });
  };

  const selectingSentry = e => {
    const { id, value } = e.target;
    setShippingMethod(value);
    setPaymentId(id);
  };

  useEffect(() => {
    setLoading(true);
    getUserData();
    getOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataTransfer = () => {
    navigate('/payment', {
      state: {
        userId: userId,
        totalPrice: finalPrice || totalPrice,
        shippingMethod: shippingMethod,
        paymentId: paymentId,
        products: productData || cartData,
        productName: cartData[0].productName,
        course: course,
      },
    });
  };

  const finalPrice = cartData[0]?.totalPrice * quantity;

  return (
    <>
      {loading && <Loading />}
      <main id="main">
        <div>
          <SectionTitle>주문하기</SectionTitle>
          <Section>
            <SectionSubtitle>배송지 및 주문 정보</SectionSubtitle>
            <TableGroup>
              <SectionTableWrap>
                <SectionTable>
                  <colgroup>
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '80%' }} />
                  </colgroup>
                  <caption>배송지 정보</caption>
                  <tbody>
                    <tr>
                      <th>이름</th>
                      <td>{userName}</td>
                    </tr>
                    <tr>
                      <th>연락처</th>
                      <td>{phoneNumber}</td>
                    </tr>
                    <tr>
                      <th>주소</th>
                      <td>
                        {address} {addressDetail} {zipCode}
                      </td>
                    </tr>
                  </tbody>
                </SectionTable>
              </SectionTableWrap>
              <SectionTableWrap>
                <SectionTable>
                  <colgroup>
                    <col style={{ width: '70%' }} />
                    <col style={{ width: '30%' }} />
                  </colgroup>
                  <caption>주문 정보</caption>
                  <thead>
                    <tr>
                      <th>제품명</th>
                      <td>수량</td>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData?.map(
                      ({ productName, quantity, totalPrice }, index) => {
                        return (
                          <tr key={index}>
                            <th>{productName}</th>
                            <td>
                              {location?.state?.productData?.quantity ||
                                quantity}
                            </td>
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>총 금액</th>
                      {/* <td>
                        {finalPrice?.toLocaleString() ||
                          sumCartDataValues?.totalPrice?.toLocaleString()}
                        원
                      </td> */}
                      <td>
                        {totalPrice === undefined
                          ? finalPrice?.toLocaleString()
                          : sumCartDataValues?.totalPrice?.toLocaleString()}
                        원
                      </td>
                    </tr>
                  </tfoot>
                </SectionTable>
              </SectionTableWrap>
            </TableGroup>
          </Section>
          <Section>
            <SectionSubtitle>배송 및 결제 방법</SectionSubtitle>
            <TableGroup>
              <SectionTableWrap>
                <SectionTable>
                  <colgroup>
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '80%' }} />
                  </colgroup>
                  <caption>배송 방법</caption>
                  <tbody>
                    <tr>
                      <th>배송 방법</th>
                      <td>
                        <RadioGroup
                          data={DELIVERY_DATA}
                          name="delivery"
                          defaultChecked="directly"
                          onChange={selectingSentry}
                        />
                      </td>
                    </tr>
                  </tbody>
                </SectionTable>
              </SectionTableWrap>
              <SectionTableWrap>
                <SectionTable>
                  <colgroup>
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '80%' }} />
                  </colgroup>
                  <caption>결제 방법</caption>
                  <tbody>
                    <tr>
                      <th>결제 방법</th>
                      <td>
                        <RadioGroup
                          data={PAYMENT_DATA}
                          name="payment"
                          onChange={selectingSentry}
                        />
                        <RemainingPoints>
                          (잔여 포인트:&nbsp;
                          <strong>{intPoints?.toLocaleString()}</strong>)
                        </RemainingPoints>
                      </td>
                    </tr>
                  </tbody>
                </SectionTable>
              </SectionTableWrap>
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
              content="주문하기"
              onClick={dataTransfer}
            />
          </ButtonGroup>
        </div>
      </main>
    </>
  );
};

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

    tfoot {
      th,
      td {
        border-top: 1px ${props => props.theme.grayscaleD} dashed;
      }
    }
  }
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

const SectionTableWrap = styled.div`
  position: relative;

  & > label {
    position: absolute;
    top: 8px;
    right: 0;
  }
`;

const SectionTable = styled.table`
  flex: 1;

  span {
    vertical-align: top;
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

export default Order;
