import React, { useEffect, useState } from 'react';
// import { API } from '../../config';
import Loading from '../Loading/Loading';
import Button from '../../components/Button/Button';
import styled, { css } from 'styled-components';

/**
 * Order.js logics
 * @property {function} getDetailData                       - 제품 상세 데이터를 받아오는 함수입니다.
 */

const Order = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loading />}
      <main id="main">
        <div>
          <Section>
            <SectionTitle>배송지 정보</SectionTitle>
            <TableGroup>
              <AddressTable>
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
              </AddressTable>
              <AddressTable>
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
              </AddressTable>
            </TableGroup>
          </Section>
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

const Section = styled.section`
  position: relative;
  color: ${props => props.theme.grayscaleF};

  table {
    table-layout: fixed;
    width: 100%;
    flex: 1;
    margin-top: 20px;

    caption {
      font-size: 32px;
      text-align: left;
    }

    th,
    td {
      font-size: 24px;
      line-height: 1.5;
      text-align: left;
    }

    th {
      width: 10%;
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  text-align: center;
`;

const TableGroup = styled.div`
  display: flex;
`;

const AddressTable = styled.table`
  position: relative;
`;

// const DetailTopSection = styled.section`
//   position: relative;
//   display: flex;
//   border-bottom: 1px ${props => props.theme.grayscaleC} solid;

//   & > div {
//     flex: 1;
//     padding-top: 7vw;
//     padding-bottom: 7vw;
//   }
// `;

// const ImageArea = styled.div`
//   ${FlexCenter};
// `;

// const ImageAreaInnerWrap = styled.div`
//   ${FlexCenter};
//   position: relative;
//   width: 30vw;
//   height: 30vw;
//   border-radius: 4px;
//   background-color: ${props => props.theme.grayscaleB};

//   img {
//     width: 20vw;
//     height: 20vw;
//     object-fit: contain;
//   }
// `;

// const MetadataArea = styled.div`
//   padding-left: 3vw;
//   padding-right: 3vw;
//   font-size: 24px;
// `;

// const ProductTitle = styled.h2`
//   display: -webkit-box;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
//   word-wrap: break-word;
//   white-space: normal;
//   font-size: 32px;
//   line-height: 1.2;
// `;

// const MetadataAreaInnerWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   position: relative;
//   height: 100%;
// `;

// const MetadataTableWrap = styled.div`
//   position: relative;
// `;

// const MetadataTable = styled.table`
//   table-layout: fixed;
//   width: 100%;
//   text-align: left;

//   th,
//   td {
//     line-height: 1.4;
//   }

//   th {
//     width: 35%;
//   }

//   tr:nth-child(2) {
//     td {
//       color: ${props => props.theme.secondaryColor};
//     }
//   }

//   tr:last-child {
//     td {
//       color: ${props => props.theme.primaryColor};
//     }
//   }
// `;

// const PriceDisplay = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: center;

//   & > div {
//     flex: 1;
//   }

//   & > span {
//     flex: 2;
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//     font-size: 32px;
//   }
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 16px;
//   width: 100%;
// `;

// const DetailBottomSection = styled.section`
//   position: relative;
// `;

export default Order;
