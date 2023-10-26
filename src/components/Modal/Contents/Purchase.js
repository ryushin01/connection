import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../config';
import { useDispatch } from 'react-redux';
import Counter from '../../Counter/Counter';
import Button from '../../Button/Button';
import styled, { css } from 'styled-components';

/**
 * Modal/Contents/Purchase.js logics
 * @property {function} cartProcess     - 장바구니 프로세스 함수입니다. postOrder()와 putInCart() 함수를 담고 있습니다.
 * @property {function} postOrder       - 장바구니 데이터(제품명, 수량, 가격, 총 금액)를 서버로 전송하는 함수입니다.
 * @property {function} putInCart       - 장바구니로 데이터(productId, quantity)를 Redux store로 보내고 모달 팝업을 닫는 함수입니다.
 * @property {function} buyNowProcess   - 바로구매 프로세스 함수입니다. 데이터를 가지고 주문 페이지로 이동하면서 모달 팝업을 닫습니다.
 */

const Purchase = ({ productId, productName, totalPrice, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productData = {
    productId: productId,
    quantity: quantity,
  };

  console.log(productData);

  const finalPrice = totalPrice * quantity;

  const cartProcess = () => {
    postCart();
    putInCart();
  };

  const postCart = () => {
    // fetch('http://10.58.52.149:8000/order', {
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
    onClose();
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
    <CartModalWrap>
      <CartModalInnerWrap>
        <ProductName>{productName}</ProductName>
        <PriceDisplay>
          <Counter quantity={quantity} setQuantity={setQuantity} />
          <ProductPrice>{finalPrice?.toLocaleString()}원</ProductPrice>
        </PriceDisplay>
      </CartModalInnerWrap>
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
  align-self: center;
  font-size: 32px;
  line-height: 1.2;
`;

const PriceDisplay = styled.div`
  ${FlexCenter};
  width: 100%;

  & > div {
    flex: 1;
    height: 100%;
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

export default Purchase;
