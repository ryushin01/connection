import React from 'react';
import { Link } from 'react-router-dom';
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
        <h1>밴드 타이틀</h1>

        {/* swiper를 ul 태그로 변환해야 합니다. */}
        <ul>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.swiper-prev-btn',
              nextEl: '.swiper-next-btn',
            }}
          >
            <SwiperSlide>
              <ProductListItem />
            </SwiperSlide>
            <div className="controller">
              <button type="button" className="swiper-prev-btn">
                이전
              </button>
              <span className="event-swiper-pagination" />
              <button type="button" className="swiper-next-btn">
                다음
              </button>
            </div>
          </Swiper>
        </ul>
        <Link>밴드 목록 더보기</Link>
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
    }
    & > a {
      display: block;
      width: 64px;
      height: 32px;
      position: absolute;
      top: 0;
      right: 0;
      border: 1px #f00 solid;
    }
  }

  .controller {
    button {
      position: absolute;
      top: 40%;
      transform: translateY(-50%);
      z-index: 1;
      &.swiper-prev-btn {
        left: 0;
      }
      &.swiper-next-btn {
        right: 0;
      }
    }
  }
`;

export default Band;
