import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { API } from '../../config';
import Loading from '../Loading/Loading';
import RadioGroup from '../../components/RadioGroup/RadioGroup';
import Button from '../../components/Button/Button';
import DELIVERY_DATA from '../../data/DeliveryData';
import PAYMENT_DATA from '../../data/PaymentData';
import styled from 'styled-components';

/**
 * Order.js logics
 * @property {function} getDetailData                       - 제품 상세 데이터를 받아오는 함수입니다.
 */

const Payment = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const goToBack = () => {
    navigate(-1);
  };

  return (
    <>
      {loading && <Loading />}
      <main id="main">
        <div>
          <SectionTitle>결제하기</SectionTitle>
          <Section>
            <SectionSubtitle>주문 정보</SectionSubtitle>
            <TableGroup>
              <SectionTable>
                <caption>주문 내역</caption>
                <tbody>
                  <tr>
                    <th>상품명</th>
                    <td>수량 / 가격</td>
                  </tr>
                  <tr>
                    <th>상품명</th>
                    <td>수량 / 가격</td>
                  </tr>
                </tbody>
              </SectionTable>
              <SectionTable>
                <caption>결제 금액</caption>
                <tbody>
                  <tr>
                    <th>상품 금액</th>
                    <td>-</td>
                  </tr>
                  <tr>
                    <th>할인 금액</th>
                    <td>-</td>
                  </tr>
                  <tr>
                    <th>배송비</th>
                    <td>-</td>
                  </tr>
                  <tr>
                    <th>총 결제 금액</th>
                    <td>-</td>
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
              onClick={goToBack}
            />
            <Button
              shape="solid"
              color="primary"
              size="large"
              content="결제하기"
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
      font-size: 16px;
      line-height: 1.5;
      text-align: left;
      vertical-align: top;
    }

    th {
      width: 15%;
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

const SectionTable = styled.table`
  position: relative;
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
