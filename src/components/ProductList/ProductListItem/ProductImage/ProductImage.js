import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '../../../Rating/Rating';
import CartButton from '../../../CartButton/CartButton';
import Portal from '../../../Modal/Portal';
import Modal from '../../../Modal/Modal';
import Purchase from '../../../Modal/Contents/Purchase';
import styled, { css } from 'styled-components';

/**
 * ProductImage.js logics
 * @property {function} modalHandler      - 모달 팝업 여닫기 함수입니다.
 */

const ProductImage = ({
  productId,
  productImage,
  productName,
  rating,
  totalPrice,
}) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const modalHandler = () => {
    setModalOpen(prev => !prev);
  };

  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', close);
  }, []);

  const goToDetail = () => {
    navigate(`/detail/${productId}`, {
      state: { productId: productId },
    });
  };

  return (
    <ProductImageWrap>
      <button type="button" onClick={goToDetail}>
        <ProductImg src={productImage} alt={productName} />
      </button>
      <Rating rating={rating} />
      <CartButton onClick={modalHandler} />
      <Portal>
        {modalOpen && (
          <Modal
            data={
              <Purchase
                productId={productId}
                productName={productName}
                totalPrice={totalPrice}
                onClose={modalHandler}
              />
            }
            scale="small"
            onClose={modalHandler}
          />
        )}
      </Portal>
    </ProductImageWrap>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImageWrap = styled.div`
  ${FlexCenter};
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 19vw;
  border-radius: 4px;
  background-color: ${props => props.theme.grayscaleB};

  a {
    display: block;
    font-size: 0;
  }

  div {
    position: absolute;
    right: 4px;
    bottom: 4px;
  }

  &:hover {
    img {
      transform: scale(1.2);
    }
  }
`;

const ProductImg = styled.img`
  width: 10vw;
  height: 10vw;
  object-fit: contain;
  transition: transform 0.4s ease-in-out;
`;

export default ProductImage;
