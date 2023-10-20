import React, { useState } from 'react';
import styled from 'styled-components';
import CheckBox from '../../components/CheckBox/CheckBox';
import Counter from '../../components/Counter/Counter';

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <Main id="main">
      <div>
        <CartTitle>장바구니</CartTitle>
        <CartContainer>
          <CartLeftSection>
            <CartLeftWrap>
              <CheckBox size="small" />
              <CartAllCheckText>전체선택</CartAllCheckText>
              <CartSelectDeleteBtn>선택삭제</CartSelectDeleteBtn>
            </CartLeftWrap>
            <CartMarketTitleWrap>
              <CartMarketItemWrap>
                <CheckBox size="small" />
                <h3>플레이스 마켓</h3>
              </CartMarketItemWrap>
            </CartMarketTitleWrap>
            <CartItemBoxWrap>
              <CartItemCheckBoxWrap>
                <CheckBox size="small" />
              </CartItemCheckBoxWrap>
              <CartItemUl>
                <CartItemLi>
                  <CartItemImgWrap>
                    <img src="/images/logo.png" alt="itemImage" />
                  </CartItemImgWrap>
                </CartItemLi>
                <CartItemLi>
                  <h3>
                    [커넥션 할인 특가] 50년 전통의 뼈해장국 대가 김인숙 님이
                    인정한 뼈해장국 밀키트 세트 (1팩 2인분)
                  </h3>
                </CartItemLi>
                <CartItemLi>
                  <CartItemCounterWrap>
                    <Counter quantity={quantity} setQuantity={setQuantity} />
                  </CartItemCounterWrap>
                </CartItemLi>
                <CartItemLi>
                  <h3>100,000,000원</h3>
                </CartItemLi>
                <CartItemLi>
                  <span>무료 배송</span>
                </CartItemLi>
              </CartItemUl>
            </CartItemBoxWrap>
          </CartLeftSection>
          <CartRightSection>
            <CartReceiptContainer>
              <CartTable>
                <CartHeader>
                  <th>
                    <CartReceiptTitle>결제 예정금액</CartReceiptTitle>
                  </th>
                </CartHeader>
                <tbody>
                  <CartTr>
                    <th>
                      <CartReceiptText>총 상품금액</CartReceiptText>
                    </th>
                    <td>
                      <CartReceiptText>0원</CartReceiptText>
                    </td>
                  </CartTr>

                  <CartDisCountTr>
                    <th>
                      <CartReceiptText>총 할인금액</CartReceiptText>
                    </th>
                    <td>
                      <CartReceiptPrice>0원</CartReceiptPrice>
                    </td>
                  </CartDisCountTr>
                  <CartTr>
                    <th>
                      <CartReceiptSmallText>└ 즉시 할인</CartReceiptSmallText>
                    </th>
                    <td>
                      <CartReceiptSmallPrice>0원</CartReceiptSmallPrice>
                    </td>
                  </CartTr>
                  <CartTr>
                    <th>
                      <CartReceiptText>포인트 결제</CartReceiptText>
                    </th>
                    <td>
                      <CartReceiptPrice>0원</CartReceiptPrice>
                    </td>
                  </CartTr>
                  <CartTr>
                    <th>
                      <CartReceiptText>총 배송비</CartReceiptText>
                    </th>
                    <td>
                      <CartReceiptText>0원</CartReceiptText>
                    </td>
                  </CartTr>
                  <CartDivider />
                  <CartLastTr>
                    <th>
                      <CartReceiptText>최종 구매 가격</CartReceiptText>
                    </th>
                    <td>
                      <CartReceiptText>100,000,000원</CartReceiptText>
                    </td>
                  </CartLastTr>
                </tbody>
              </CartTable>
            </CartReceiptContainer>
          </CartRightSection>
        </CartContainer>
      </div>
    </Main>
  );
};

export default Cart;

const Main = styled.main`
  display: flex;
  align-items: center;
`;

const CartTitle = styled.h3`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CartContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 2000px;
`;

const CartLeftSection = styled.section`
  flex: 1;
  margin-right: 40px;
`;

const CartLeftWrap = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  padding: 20px 0px 20px 12px;
`;

const CartAllCheckText = styled.div`
  display: flex;
  font-size: 24px;
  align-items: center;

  &::after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 20px;
    background-color: #e5e5e5;
    margin-left: 16px;
  }
`;

const CartSelectDeleteBtn = styled.button`
  font-size: 20px;
  margin-left: 16px;
  border: none;
  color: ${props => props.theme.grayscaleF};
`;

const CartMarketTitleWrap = styled.div`
  display: flex;
  width: 100%;
  margin-top: 40px;
`;

const CartItemCheckBoxWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartMarketItemWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 0px 20px 12px;
  font-size: 24px;
  border-top: 3px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
`;

const CartItemBoxWrap = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0px 20px 12px;
  margin-top: 20px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
`;

const CartItemUl = styled.ul`
  display: flex;
  width: 100%;
  align-items: center;
`;

const CartItemLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
`;

const CartItemImgWrap = styled.div`
  width: 100px;
`;

const CartItemCounterWrap = styled.div`
  width: 150px;
`;

const CartRightSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 20%;
`;

const CartReceiptContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: sticky;
  top: 200px;
  width: 100%;
  min-width: 360px;
  padding: 20px 0 0 0;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
`;

const CartReceiptTitle = styled.div`
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
`;

const CartReceiptText = styled.div`
  font-size: 24px;
  text-align: left;
`;

const CartReceiptSmallText = styled.div`
  font-size: 20px;
  padding-left: 10px;
`;

const CartReceiptSmallPrice = styled.div`
  font-size: 20px;
  color: ${props => props.theme.secondaryColor};
`;

const CartTable = styled.table`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CartHeader = styled.thead`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartReceiptPrice = styled.div`
  font-size: 24px;
  color: ${props => props.theme.secondaryColor};
`;

const CartTr = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  margin-bottom: 40px;
`;

const CartDisCountTr = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  margin-bottom: 10px;
`;

const CartDivider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
`;

const CartLastTr = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 44px 40px;
`;
