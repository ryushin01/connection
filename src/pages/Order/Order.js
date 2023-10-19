import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { API } from '../../config';
import Loading from '../Loading/Loading';
import Button from '../../components/Button/Button';
import styled from 'styled-components';

/**
 * Order.js logics
 * @property {function} getDetailData                       - 제품 상세 데이터를 받아오는 함수입니다.
 */

const Order = () => {
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
          <SectionTitle>주문하기</SectionTitle>
          <Section>
            <SectionSubtitle>배송지 정보</SectionSubtitle>
            <TableGroup>
              <SectionTable>
                <caption>보내시는 분</caption>
                <tbody>
                  <tr>
                    <th>이름</th>
                    <td>류창선</td>
                  </tr>
                  <tr>
                    <th>연락처</th>
                    <td>01071607921</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td>서울시 서대문구 통일로25길 30</td>
                  </tr>
                </tbody>
              </SectionTable>
              <SectionTable>
                <caption>받으시는 분</caption>
                <tbody>
                  <tr>
                    <th>이름</th>
                    <td>류창선</td>
                  </tr>
                  <tr>
                    <th>연락처</th>
                    <td>01071607921</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td>서울시 서대문구 통일로25길 30</td>
                  </tr>
                </tbody>
              </SectionTable>
            </TableGroup>
          </Section>
          <Section>
            <SectionSubtitle>배송 및 결제 방법</SectionSubtitle>
            <TableGroup>
              <SectionTable>
                <caption>배송 방법</caption>
                <tbody>
                  <tr>
                    <th>배송 방법</th>
                    <td>류창선</td>
                  </tr>
                </tbody>
              </SectionTable>
              <SectionTable>
                <caption>결제 방법</caption>
                <tbody>
                  <tr>
                    <th>결제 방법</th>
                    <td>류창선</td>
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

export default Order;
