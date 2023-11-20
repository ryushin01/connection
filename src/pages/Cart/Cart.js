import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../config';
import CheckBox from '../../components/CheckBox/CheckBox';
import Button from '../../components/Button/Button';
import CartCount from '../../components/CartCount/CartCount';
import styled from 'styled-components';

const Cart = () => {
  /**
   * @property {function} handleAllCheck = 전체 체크박스 선택/취소 시 실행되는 함수
   * @property {function} checkedItemOriginalPrice = 체크박스가 체크된 상품의 가격 구하는 함수
   * @property {function} checkedItemDiscountedAmount = 체크박스가 체크된 상품의 할인 가격 구하는 함수
   * @property {function} checkedItemTotalPrice = 체크된 상품의 최종 가격을 구하는 함수
   * @property {function} handleItemPrice = 전체 선택 시 cartData에서 data를 뽑아서 checkItem에 넣어주는 함수
   * @property {function} handleItemIdInfoChange = 체크 된 상품 중 productId data를 뽑아서 checkItem에 넣어주는 함수 (체크한 상품 삭제 시 사용)
   * @property {function} handleMarketCheck = 마켓 선택 체크박스 선택/취소 시 실행되는 함수
   * @property {function} getCartInfoData = 장바구니를 데이터 가져오기 위한 GET 요청
   * @property {function} patchCheckItemBtn = 장바구니에서 선택한 상품을 주문하기 위한 PATCH 요청
   * @property {function} patchItemInfo = 체크된 상품의 productId와 quantity만 뽑아서 checkItem에 넣어주는 함수
   * @property {function} deleteCheckItemBtn = 장바구니에서 선택한 상품을 삭제하기 위한 DELETE 요청
   * @property {function} handleQuantityChange = 가져온 데이터에서 상품의 수량을 변경하기 위한 함수
   */

  // hook
  const [cartData, setCartData] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false); // 1. 전체 선택 체크박스 상태 확인용  State 생성
  const [checkItem, setCheckItem] = useState([]);
  const navigate = useNavigate();

  // function
  const getMokData = () => {
    fetch('/data/CartData.json')
      .then(Response => Response.json())
      .then(result => setCartData(result.data));
  };

  const cartListData =
    cartData !== undefined &&
    cartData
      .map(item => {
        return item.products?.map(product => {
          return product.productId;
        });
      })
      .flat();

  // 전체 선택

  const handleAllCheck = checked => {
    // 1. 전체 선택 체크박스 상태 확인용 State 생성
    setSelectAllChecked(!selectAllChecked); // 2. 전체 선택 체크박스 상태 반전

    setCheckItem(selectAllChecked ? [] : handleItemPrice()); // 3. 전체 선택 체크박스가 체크되어 있으면 cartData를 checkItem에 넣고, 체크되어 있지 않으면 checkItem을 빈 배열로 설정
  };

  const checkedItemOriginalPrice = (checked, productId) => {
    // 체크된 상품의 원가를 구하는 함수
    const itemPrice = checkItem?.map(item => {
      return item.totalPrice;
    });

    return itemPrice;
  };

  const checkedItemDiscountedAmount = (checked, productId) => {
    // 체크된 상품의 할인 가격을 구하는 함수
    const itemPrice = checkItem
      ?.map(item => {
        return item.discountedAmount;
      })
      .flat();
    return itemPrice;
  };

  const checkedItemTotalPrice = (checked, productId) => {
    // 체크박스가 체크되어 있을 때의 상품의 최종 가격을 구하는 함수
    const itemPrice = checkItem
      ?.map(item => {
        return item.totalPrice - (item.discountedAmount || 0);
      })
      .flat();
    return itemPrice;
  };

  const ItemOriginalPrice = checkedItemOriginalPrice(); // 체크된 상품의 원가를 배열에 담기 위한 변수
  const ItemTotalPrice = checkedItemTotalPrice(); // 체크된 상품의 최종 가격을 배열에 담기 위한 변수
  const ItemDiscountAmount = checkedItemDiscountedAmount(); // 체크된 상품의 할인 가격을 배열에 담기 위한 변수

  const totalOriginalPrice = ItemOriginalPrice.reduce(
    // 체크된 상품의 원가를 reduce함수를 사용하여 합산
    (acc, cur) => acc + cur,
    0,
  );
  const totalDiscountAmount = ItemDiscountAmount.reduce(
    // 체크된 상품의 할인 가격을 reduce함수를 사용하여 합산
    (acc, cur) => acc + cur,
    0,
  );
  const totalPrice = ItemTotalPrice.reduce((acc, cur) => acc + cur, 0); // 체크된 상품의 최종 가격을 reduce함수를 사용하여 합산

  const handleItemPrice = () => {
    // 전체 선택 시 cartData에서 data를 뽑아서 checkItem에 넣어주는 함수
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
    return itemPrice;
  };

  const handleItemIdInfoChange = () => {
    // 체크 된 상품 중 productId data를 뽑아서 checkItem에 넣어주는 함수 (체크한 상품 삭제 시 사용)
    const itemIdInfo = checkItem
      .map(item => ({
        productId: item.productId,
      }))
      .flat(); // flat() : 중첩 배열을 평탄화 (2차원 배열을 1차원 배열로 만듦)
    return itemIdInfo;
  };

  const handleMarketCheck = (checked, sellerId) => {
    // 마켓 선택 체크박스 선택/취소 시 실행되는 함수
    if (checked) {
      const unMarketData = checkItem.filter(item => item.sellerId !== sellerId); // sellerId가 같지 않은 checkItem을 unMarketData에 넣어줌

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
        //
        cart => cart.sellerId !== sellerId,
      );

      setCheckItem(unCheckMarketData);
    }
  };

  // 장바구니를 데이터 가져오기 위한 GET 요청
  // const FETCH_URL = 'http://10.58.52.176:8000/carts';

  const getCartInfoData = () => {
    // fetch(FETCH_URL, {
    fetch(`${API.CART}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
    })
      .then(response => response.json())
      .then(result => {
        setCartData(result.data);
      });
  };

  // 장바구니에서 선택한 상품을 주문하기 위한 PATCH 요청
  const patchCheckItemBtn = () => {
    // fetch(FETCH_URL, {
    fetch(`${API.CART}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({ data: patchItemInfo() }),
    })
      .then(response => response.json())
      .then(result => {
        navigate(`/order`, {
          state: {
            cartPriceData: {
              totalOriginalPrice,
              totalDiscountAmount,
              totalPrice,
            },
          },
        });
      });
  };

  const patchItemInfo = () => {
    // 체크된 상품의 productId와 quantity만 뽑아서 checkItem에 넣어주는 함수
    const itemInfo = checkItem
      ?.map(item => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      })

      .flat();
    return itemInfo;
  };

  const deleteCheckItemBtn = () => {
    // 장바구니에서 선택한 상품을 삭제하기 위한 DELETE 요청
    // fetch(FETCH_URL, {
    fetch(`${API.CART}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({ data: handleItemIdInfoChange() }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Delete item!') {
          window.location.reload();
        }
      });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    // 가져온 데이터에서 상품의 수량을 변경하기 위한 함수
    // cartCount Component에서 받아온 productId와 newQuantity를 매개변수로 받음
    // fetch(FETCH_URL + '/updatequantity', {
    fetch(`${API.CART}/updatequantity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        data: { productId, quantity: Number(newQuantity) },
      }), // productId가 같은 제품의 수량이 변경되는 것을 감지하고 변경된 값으로 POST 요청
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'Update Success!') {
          alert('수량이 변경되었습니다.');
          getCartInfoData();
        } else {
          alert('수량 변경에 실패하였습니다.');
        }
      }); // 정상적으로 통신이 되었으면 장바구니 데이터를 다시 불러옴.
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
                checked={checkItem.length === (cartListData.length || 0)}
              />
              <CartAllCheckText>전체선택</CartAllCheckText>
              <CartSelectDeleteBtn onClick={deleteCheckItemBtn}>
                선택삭제
              </CartSelectDeleteBtn>
            </CartLeftWrap>
            {!!cartData === false && (
              <CartIsEmpty>장바구니에 담긴 상품이 없습니다.</CartIsEmpty>
            )}
            {!!cartData &&
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
                                <CartCount
                                  productId={item.productId}
                                  quantity={item.quantity}
                                  onQuantityChange={handleQuantityChange}
                                />
                              </CartItemCounterWrap>
                            </CartItemLi>
                            <CartItemLi>
                              <h3>
                                {item.totalPrice
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
