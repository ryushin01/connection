import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CheckBox from '../../components/CheckBox/CheckBox';
import Counter from '../../components/Counter/Counter';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';

const Cart = () => {
  // [Redux] 카운터에 dispatch 적용 필요
  // hook
  const [quantity, setQuantity] = useState({});
  const [cartData, setCartData] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false); // 1. 전체 선택 체크박스 상태 확인용  State 생성
  const [checkItem, setCheckItem] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // function
  const getMokData = () => {
    fetch('/data/CartData.json')
      .then(Response => Response.json())
      .then(result => setCartData(result.data));
  };

  // 전체선택 시 현재 체크 된 체크박스와 전체 체크박스의 수를 비교하기 위한 함수
  const cartListData = cartData
    .map(item => {
      return item.products?.map(product => {
        return product.productId;
      });
    })
    .flat();

  // 전체 선택
  // 1. 전체 선택 체크박스 상태 확인용  State 생성
  // 2. 전체 선택 함수 생성
  // 3. 전체 선택 체크박스 상태 반전
  // 4. 전체 선택 체크박스가 체크되어 있으면 cartData를 checkItem에 넣고, 체크되어 있지 않으면 checkItem을 빈 배열로 설정

  const handleAllCheck = checked => {
    setSelectAllChecked(!selectAllChecked);

    // setCheckItem(selectAllChecked ? [] : cartData);
    setCheckItem(selectAllChecked ? [] : handleItemPrice());
  };

  // 체크박스가 체크되어 있을 때의 상품 가격 구하는 함수
  const checkedItemOriginalPrice = (checked, productId) => {
    const itemPrice = checkItem
      ?.map(item => {
        return item.originalPrice * item.quantity;
      })
      .flat();
    return itemPrice;
  };

  const checkedItemDiscountedAmount = (checked, productId) => {
    const itemPrice = checkItem
      ?.map(item => {
        return item.discountedAmount * item.quantity;
      })
      .flat();
    return itemPrice;
  };

  // 체크박스가 체크되어 있을 때의 상품 가격 구하는 함수
  const checkedItemTotalPrice = (checked, productId) => {
    const itemPrice = checkItem
      ?.map(item => {
        return (
          item.originalPrice * item.quantity -
          item.discountedAmount * item.quantity
        );
      })
      .flat();
    return itemPrice;
  };

  const ItemOriginalPrice = checkedItemOriginalPrice();
  const ItemTotalPrice = checkedItemTotalPrice();
  const ItemDiscountAmount = checkedItemDiscountedAmount();

  const totalOriginalPrice = ItemOriginalPrice.reduce(
    (acc, cur) => acc + cur,
    0,
  );
  const totalDiscountAmount = ItemDiscountAmount.reduce(
    (acc, cur) => acc + cur,
    0,
  );
  const totalPrice = ItemTotalPrice.reduce((acc, cur) => acc + cur, 0);

  // 전체 선택 시 cartData 중 productId와 quantity만 뽑아서 checkItem에 넣어주는 함수
  const handleItemPrice = () => {
    const itemPrice = cartData
      ?.map(item => {
        return item.products.map(product => ({
          sellerId: item.sellerId,
          productId: product.productId,
          quantity: product.quantity,
          originalPrice: product.originalPrice,
          discountedAmount: product.discountedAmount,
          totalPrice: product.originalPrice * product.quantity,
        }));
      })
      .flat(); // flat() : 중첩 배열을 평탄화 (2차원 배열을 1차원 배열로 만듦)
    return itemPrice; // itemInfo를 return
  };

  // 전체 선택 시 checkItem 중 productId만 뽑아서 checkItem에 넣어주는 함수 (체크한 상품 삭제 시 사용)
  const handleItemIdInfoChange = () => {
    const itemIdInfo = checkItem
      .map(item => ({
        productId: item.productId,
      }))
      .flat(); // flat() : 중첩 배열을 평탄화 (2차원 배열을 1차원 배열로 만듦)
    return itemIdInfo; // itemInfo를 return
  };

  const handleMarketCheck = (checked, sellerId) => {
    if (checked) {
      // 1. CheckItem 에서 선택한 마켓의 아이템을 filter 로 다 제거 해서 새로운 변수(a)에 넣어준다
      // 2. cartData 에서 filter 로 선택한 마켓의 아이템들을 뽑아 온다
      // 3. a 변수에 push(2번 값) 해준다.
      // 4. CheckItem에 3번 값을 넣어준다.

      const unMarketData = checkItem.filter(item => item.sellerId !== sellerId);

      const marketData = cartData.filter(cart => cart.sellerId === sellerId); // sellerId가 같은 cartData를 marketData에 넣어줌

      marketData.map(item => {
        return item.products.map(product => {
          return unMarketData.push({
            sellerId: item.sellerId,
            productId: product.productId,
            quantity: product.quantity,
            originalPrice: product.originalPrice,
            discountedAmount: product.discountedAmount,
            totalPrice: product.originalPrice * product.quantity,
          });
        });
      });

      setCheckItem(unMarketData);
    } else {
      // 체크박스가 체크되어 있지 않으면 sellerCheckedItem에서 sellerId를 제거

      const unCheckMarketData = checkItem.filter(
        cart => cart.sellerId !== sellerId,
      );

      setCheckItem(unCheckMarketData);
    }
  };

  // 장바구니를 데이터 가져오기 위한 GET 요청
  const getCartInfoData = () => {
    fetch('http://10.58.52.207:8000/carts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setCartData(result.data);
      });
  };

  // 장바구니에서 선택한 상품을 주문하기 위한 PATCH 요청
  const patchCheckItemBtn = () => {
    fetch('http://10.58.52.207:8000/carts', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({ data: patchItemInfo() }),
    })
      .then(response => response.json())
      .then(result => {
        navigate('/order');
      });
  };

  // 전체 선택 시 cartData 중 productId와 quantity만 뽑아서 checkItem에 넣어주는 함수
  const patchItemInfo = () => {
    const itemInfo = checkItem
      ?.map(item => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      })

      .flat(); // flat() : 중첩 배열을 평탄화 (2차원 배열을 1차원 배열로 만듦)
    return itemInfo; // itemInfo를 return
  };

  // 장바구니에서 선택한 상품을 삭제하기 위한 DELETE 요청
  const deleteCheckItemBtn = () => {
    fetch('http://10.58.52.207:8000/carts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({ data: handleItemIdInfoChange() }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.message === 'Delete item!') {
          window.location.reload();
        }
      });
  };

  // useEffect
  // 백엔드에 요청한 상품을 불러오기 위한 useEffect
  useEffect(() => {
    getMokData();
    // getCartInfoData();
  }, []);

  return (
    <Main id="main">
      <div>
        <CartTitle>장바구니</CartTitle>
        <CartContainer>
          <CartLeftSection>
            <CartLeftWrap>
              <CheckBox
                size="small"
                onChange={e => handleAllCheck(e.target.checked)}
                checked={checkItem.length === cartListData.length}
              />
              <CartAllCheckText>전체선택</CartAllCheckText>
              <CartSelectDeleteBtn onClick={deleteCheckItemBtn}>
                선택삭제
              </CartSelectDeleteBtn>
            </CartLeftWrap>
            {cartData.length === 0 && (
              <CartIsEmpty>장바구니에 담긴 상품이 없습니다.</CartIsEmpty>
            )}
            {cartData.length !== 0 &&
              cartData?.map((item, index) => {
                return (
                  <>
                    <CartMarketTitleWrap>
                      <CartMarketItemWrap>
                        <CheckBox
                          size="small"
                          onChange={e =>
                            handleMarketCheck(e.target.checked, item.sellerId)
                          }
                          checked={
                            !!checkItem.find(checked => {
                              //checked.sellerId === item.sellerId;
                              return checked.sellerId === item.sellerId;
                            })
                          }
                        />
                        <h3>{item.sellerName}</h3>
                      </CartMarketItemWrap>
                    </CartMarketTitleWrap>
                    {item.products?.map((item, index) => {
                      const handleSingleCheck = (checked, productId) => {
                        // 개별 선택 체크 박스 함수
                        if (checked) {
                          // 체크박스가 체크되어 있으면 checkItem에 productId와 quantity를 넣어줌
                          return setCheckItem([
                            ...checkItem,
                            {
                              sellerId: item.sellerId,
                              productId: item.productId,
                              quantity: item.quantity,
                              originalPrice: item.originalPrice,
                              discountedAmount: item.discountedAmount,
                              totalPrice: item.originalPrice * item.quantity,
                            },
                          ]);
                        } else {
                          // 체크박스가 체크되어 있지 않으면 checkItem에서 productId와 quantity를 제거
                          return setCheckItem(
                            checkItem.filter(
                              item => item.productId !== productId,
                            ),
                          );
                        }
                      };
                      return (
                        <CartItemBoxWrap key={index}>
                          <CartItemCheckBoxWrap>
                            <CheckBox
                              size="small"
                              onChange={e =>
                                handleSingleCheck(
                                  e.target.checked,
                                  item.productId,
                                )
                              }
                              checked={
                                // !! : 불린값으로 변환
                                !!checkItem.find(
                                  // find()를 이용해 checkItem의 productId와 item의 productId가 같은지 확인하여 체크박스 상태를 결정
                                  checked =>
                                    checked.productId === item.productId,
                                )
                              }
                            />
                          </CartItemCheckBoxWrap>
                          <CartItemUl>
                            <CartItemLi>
                              <CartItemImgWrap>
                                <img src={item.productImage} alt="itemImage" />
                              </CartItemImgWrap>
                            </CartItemLi>
                            <CartItemLi>
                              <h3>{item.productName}</h3>
                            </CartItemLi>
                            <CartItemLi>
                              <CartItemCounterWrap>
                                <Counter
                                  quantity={item.quantity}
                                  setQuantity={setQuantity}
                                />
                              </CartItemCounterWrap>
                            </CartItemLi>
                            <CartItemLi>
                              <h3>
                                {(
                                  item.originalPrice * item.quantity -
                                  item.discountedAmount * item.quantity
                                )
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                원
                              </h3>
                            </CartItemLi>
                            <CartItemLi>
                              <span>무료 배송</span>
                            </CartItemLi>
                          </CartItemUl>
                        </CartItemBoxWrap>
                      );
                    })}
                  </>
                );
              })}
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
                      <CartReceiptText>
                        {totalOriginalPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        원
                      </CartReceiptText>
                    </td>
                  </CartTr>

                  <CartDisCountTr>
                    <th>
                      <CartReceiptText>총 할인금액</CartReceiptText>
                    </th>
                    <td>
                      <CartReceiptPrice>
                        {totalDiscountAmount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        원
                      </CartReceiptPrice>
                    </td>
                  </CartDisCountTr>
                  <CartTr>
                    <th>
                      <CartReceiptSmallText>└ 즉시 할인</CartReceiptSmallText>
                    </th>
                    <td>
                      <CartReceiptSmallPrice>
                        {totalDiscountAmount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        원
                      </CartReceiptSmallPrice>
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
                  <CartTr>
                    <th>
                      <CartReceiptText>최종 구매 가격</CartReceiptText>
                    </th>
                    <td>
                      <CartReceiptText>
                        {totalPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        원
                      </CartReceiptText>
                    </td>
                  </CartTr>
                  <CartLastTr>
                    <td>
                      <Button
                        shape="solid"
                        size="large"
                        color="primary"
                        content={`최종 구매 금액 : ${totalPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}
                        onClick={patchCheckItemBtn}
                      />
                      {/* <Button onClick={MarketDataInfo} /> */}
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
    margin-left: 20px;
  }
`;

const CartSelectDeleteBtn = styled.button`
  font-size: 24px;
  margin-left: 20px;
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

const CartIsEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  font-size: 32px;
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

const CartLastTr = styled.tr`
  display: flex;
  justify-content: space-between;
  width: 100%;

  td {
    width: 100%;
  }
`;
