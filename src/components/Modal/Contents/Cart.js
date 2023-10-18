import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Counter from '../../Counter/Counter';
import Button from '../../Button/Button';
import styled, { css } from 'styled-components';

const Cart = ({ onClose }) => {
  const [modalOpen, setModalOpen] = useState(false);
  // const navigate = useNavigate();

  // const goToListPage = id => {
  //   navigate(`/products/category/${id}`, {
  //     state: { categoryId: id },
  //   });
  //   onClose();
  // };

  return (
    <CartModalWrap>
      <CartModalInnerWrap>
        <ProductName>
          [커넥션 할인 특가] 50년 전통의 뼈해장국 대가 김인숙 님이 인정한
          뼈해장국 밀키트 세트 (1팩 2인분)
        </ProductName>
        <PriceDisplay>
          <Counter />
          <ProductPrice>10,000원</ProductPrice>
        </PriceDisplay>
      </CartModalInnerWrap>
      <ButtonGroup>
        <Button
          shape="solid"
          color="neutral"
          size="medium"
          content="장바구니"
        />
        <Button
          shape="solid"
          color="primary"
          size="medium"
          content="바로구매"
        />
      </ButtonGroup>
    </CartModalWrap>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartModalWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const CartModalInnerWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 40px;
`;

const ProductName = styled.strong`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  white-space: normal;
  font-size: 32px;
  line-height: 1.2;
`;

const PriceDisplay = styled.div`
  ${FlexCenter};
  width: 100%;

  & > div {
    flex: 1;
  }
`;

const ProductPrice = styled.span`
  flex: 2;
  display: flex;
  justify-content: flex-end;
  font-size: 32px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;

  & > button {
    flex: 1;
  }
`;

export default Cart;
