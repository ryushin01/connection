import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as MoreIcon } from '../../svg/icon_more.svg';
import styled from 'styled-components';
import ProductListItem from '../ProductList/ProductListItem/ProductListItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Band = ({ id, path, title }) => {
  return (
    <BandWrap>
      <div className="inner-wrap">
        <h1 tabIndex="0">밴드 타이틀</h1>
        <Swiper
          slidesPerView="5"
          modules={[Navigation]}
          navigation={{
            prevEl: '.swiper-prev-btn',
            nextEl: '.swiper-next-btn',
          }}
        >
          <SwiperSlide>
            <ProductListItem />
          </SwiperSlide>

          <div className="controller" aria-hidden="true">
            <button type="button" className="swiper-prev-btn">
              이전
            </button>
            <span className="event-swiper-pagination" />
            <button type="button" className="swiper-next-btn">
              다음
            </button>
          </div>
        </Swiper>
        <Link aria-label="밴드 목록 더보기">
          <MoreIcon />
        </Link>
      </div>
    </BandWrap>
  );
};

const BandWrap = styled.section`
  // display: flex;
  // overflow-x: auto;
  // width: 100%;
  // -webkit-overflow-scrolling: touch;
  // scrollbar-width: none;
  // &::-webkit-scrollbar {
  //   display: none;
  //   background-color: transparent;
  // }
  // &::-webkit-scrollbar-track {
  //   background-color: transparent;
  // }
  // &::-webkit-scrollbar-thumb {
  //   background-color: transparent;
  // }

  padding: 32px 20px;

  .inner-wrap {
    position: relative;
    & > h1 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 64px;
      font-size: 32px;
      font-weight: 700;
      & + div {
        margin-top: 8px;
      }
    }
    & > a {
      width: 32px;
      height: 32px;
      position: absolute;
      top: 0;
      right: 0;
      svg {
        path {
          // 테마 적용
          stroke: #f00;
        }
      }
    }
  }

  .controller {
    button {
      width: 36px;
      height: 36px;
      position: absolute;
      top: 40%;
      transform: translateY(-50%);
      z-index: 1;
      border: 0;
      background-color: transparent;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      font-size: 0;
      transition:
        left 0.2s ease-in-out,
        right 0.2s ease-in-out;
      &.swiper-prev-btn {
        left: -48px;
        background-image: url(/images/band/icon_prev.png);
      }
      &.swiper-next-btn {
        right: -48px;
        background-image: url(/images/band/icon_next.png);
      }
      &.swiper-button-disabled {
        opacity: 0.2;
      }
    }
  }

  &:hover {
    .controller {
      button.swiper-prev-btn {
        left: 0;
      }
      button.swiper-next-btn {
        right: 0;
      }
    }
  }
`;

export default Band;
