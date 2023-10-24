import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ReactComponent as MoreIcon } from '../../svg/icon_more.svg';
import ProductListItem from '../ProductList/ProductListItem/ProductListItem';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';

/**
 * Band.js logics
 * @property {function} goToList      - 밴드 목록 더보기 버튼 클릭 시 카테고리/셀러에 따라 다른 목록 페이지로 이동하는 함수입니다.
 */

const Band = ({ item }) => {
  const navigate = useNavigate();
  const { categoryName, sellerName, categoryId, sellerId, product } = item;

  const goToCategoryList = () => {
    navigate(`/products/category/${categoryId}`, {
      state: { categoryId: categoryId, sellerId: null },
    });
  };

  const goToSellerList = () => {
    navigate(`/products/category/${sellerId}`, {
      state: { sellerId: sellerId, categoryId: null },
    });
  };

  return (
    <BandWrap>
      <BandInnerWrap>
        <BandTitle tabIndex="0">{categoryName || sellerName}</BandTitle>
        <Swiper
          slidesPerView="5"
          slidesPerGroup="5"
          spaceBetween="12"
          modules={[Navigation]}
          navigation={{
            prevEl: '.swiper-prev-btn',
            nextEl: '.swiper-next-btn',
          }}
        >
          {product?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <ProductListItem item={item} />
              </SwiperSlide>
            );
          })}

          <SwiperController>
            <SwiperPrevBtn type="button" className="swiper-prev-btn">
              이전
            </SwiperPrevBtn>
            <SwiperNextBtn type="button" className="swiper-next-btn">
              다음
            </SwiperNextBtn>
          </SwiperController>
        </Swiper>
        {categoryId && (
          <BandListLink
            aria-label="밴드 목록 더보기"
            onClick={goToCategoryList}
          >
            <MoreIcon />
          </BandListLink>
        )}
        {sellerId && (
          <BandListLink aria-label="밴드 목록 더보기" onClick={goToSellerList}>
            <MoreIcon />
          </BandListLink>
        )}
      </BandInnerWrap>
    </BandWrap>
  );
};

const BandWrap = styled.section`
  padding: 40px 0;

  .swiper:hover {
    .swiper-prev-btn {
      left: 0;
    }

    .swiper-next-btn {
      right: 0;
    }
  }
`;

const BandInnerWrap = styled.div`
  position: relative;
`;

const BandTitle = styled.h1`
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 64px;
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.grayscaleF};
`;

const BandListLink = styled.button`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s linear;

  svg {
    path {
      stroke: ${props => props.theme.grayscaleF};
    }
  }

  &:hover {
    transform: rotate(-180deg);
  }
`;

const SwiperController = styled.div`
  button {
    width: 36px;
    height: 36px;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    z-index: 1;
    border: 0;
    border-radius: 50%;
    background-color: transparent;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-size: 0;
    transition:
      left 0.2s ease-in-out,
      right 0.2s ease-in-out;

    &.swiper-button-disabled {
      opacity: 0.2;
    }
  }
`;

const SwiperPrevBtn = styled.button`
  left: -48px;
  background-image: url(/images/band/icon_prev.png);
}
`;

const SwiperNextBtn = styled.button`
  right: -48px;
  background-image: url(/images/band/icon_next.png);
}
`;

export default Band;
