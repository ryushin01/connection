import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../../../Rating/Rating';
import CartButton from '../../../CartButton/CartButton';
import Portal from '../../../Modal/Portal';
import Modal from '../../../Modal/Modal';
import Cart from '../../../Modal/Contents/Cart';
import styled, { css } from 'styled-components';

const ProductImage = ({ productId, productImage, productName, rating }) => {
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

  return (
    <ProductImageWrap>
      <Link to={`/detail/${productId}`}>
        <ProductImg src={productImage} alt={productName} />
      </Link>
      <Rating rating={rating} />
      <CartButton onClick={modalHandler} />
      <Portal>
        {modalOpen && (
          <Modal
            data={<Cart onClose={modalHandler} />}
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
`;

const ProductImg = styled.img`
  width: 12vw;
  height: 12vw;
  object-fit: contain;
`;

export default ProductImage;
