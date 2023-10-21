import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CheckBox from '../../components/CheckBox/CheckBox';
import Counter from '../../components/Counter/Counter';
import Button from '../../components/Button/Button';

const Cart = () => {
  // [Redux] 카운터에 dispatch 적용 필요
  // hook
  const [quantity, setQuantity] = useState(1);
  const [cartData, setCartData] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false); // 1. 전체 선택 체크박스 상태 확인용  State 생성
  const [sellerCheckedItem, setSellerCheckedItem] = useState({});
  const [checkItem, setCheckItem] = useState([]);
  const navigate = useNavigate();

  // function
  // const getMokData = () => {
  //   fetch('/data/CartData.json')
  //     .then(Response => Response.json())
  //     .then(result => setCartData(result.data));
  // };
  const cartListData = cartData
    .map(item => {
      return item.products.map(product => {
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

    setCheckItem(selectAllChecked ? [] : handleItemInfoChange());
  };

  // 전체 선택 시 cartData 중 productId와 quantity만 뽑아서 checkItem에 넣어주는 함수
  const handleItemInfoChange = () => {
    const itemInfo = cartData
      .map(item => {
        return item.products.map(product => ({
          productId: product.productId,
          quantity: product.quantity,
        }));
      })
      .flat(); // flat() : 중첩 배열을 평탄화 (2차원 배열을 1차원 배열로 만듦)

    return itemInfo; // itemInfo를 return
  };

  // 전체 선택 시 cartData 중 productId와 quantity만 뽑아서 checkItem에 넣어주는 함수
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
      const marketData = cartData.filter(cart => cart.sellerId === sellerId); // sellerId가 같은 cartData를 marketData에 넣어줌
      setSellerCheckedItem(marketData);
      // checkItem.push(marketData);
    } else {
      // 체크박스가 체크되어 있지 않으면 sellerCheckedItem에서 sellerId를 제거
      setSellerCheckedItem(
        sellerCheckedItem.filter(item => item.sellerId !== sellerId),
      );
    }
  };
  console.log(sellerCheckedItem);

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

  console.log(checkItem);
  const patchCheckItemBtn = () => {
    fetch('http://10.58.52.207:8000/carts', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({ data: handleItemInfoChange() }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        navigate('/order');
      });
  };

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
  useEffect(() => {
    // getMokData();
    getCartInfoData();
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
            {cartData?.map((item, index) => {
              return (
                <>
                  <CartMarketTitleWrap>
                    <CartMarketItemWrap>
                      <CheckBox
                        size="small"
                        onChange={e => handleMarketCheck(e.target.checked)}
                        // checked={
                        //   !!sellerCheckedItem.find(checked => {
                        //     checked.sellerId === item.sellerId;
                        //   })
                        // }
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
                            productId: item.productId,
                            quantity: item.quantity,
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
                              !!checkItem.find(
                                // !! : 불린값으로 변환
                                checked => checked.productId === item.productId,
                              ) // find()를 이용해 checkItem의 productId와 item의 productId가 같은지 확인하여 체크박스 상태를 결정
                              // 전체 선택 체크박스가 체크되어 있으면 체크박스 상태를 true로 설정
                              // checkItem.includes(item.productId)
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
                            <h3>{item.originalPrice * item.quantity}원</h3>
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
                      <CartReceiptText>100,000,000원</CartReceiptText>
                    </td>
                  </CartTr>
                  <CartLastTr>
                    <td>
                      <Button
                        shape="solid"
                        size="large"
                        color="primary"
                        content="최종 구매 금액 : 100,000,000원"
                        onClick={patchCheckItemBtn}
                      />
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
