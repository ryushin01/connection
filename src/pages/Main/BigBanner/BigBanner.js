import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeftIcon } from '../../../svg/icon_arrow_left.svg';
import { ReactComponent as ArrowRightIcon } from '../../../svg/icon_arrow_right.svg';
import BIG_BANNER_SWIPER_DATA from '../../../data/BigBannerSwiperData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';

const BigBanner = () => {
  return (
    <BigBannerWrap>
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        autoplay={{ delay: 3500 }}
        effect="fade"
        loop
        navigation={{
          prevEl: '.swiper-prev-btn',
          nextEl: '.swiper-next-btn',
        }}
        pagination={{
          el: '.bigbanner-swiper-pagination',
          type: 'custom',
          renderCustom: function (swiper, current, total) {
            return `<span>${current}</span> / ${total}`;
          },
        }}
      >
        {BIG_BANNER_SWIPER_DATA.map(item => {
          return (
            <SwiperSlide key={item.id}>
              <Link to={item.path}>
                <img src={item.imageSrc} alt={item.alt} />
              </Link>
            </SwiperSlide>
          );
        })}

        <BigBannerController>
          <button type="button" className="swiper-prev-btn">
            <ArrowLeftIcon />
          </button>
          <span className="bigbanner-swiper-pagination" />
          <button type="button" className="swiper-next-btn">
            <ArrowRightIcon />
          </button>
        </BigBannerController>
      </Swiper>
    </BigBannerWrap>
  );
};

const BigBannerWrap = styled.section`
  position: relative;
  font-size: 0;

  & > div > div:first-child {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const BigBannerController = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 120px;
  padding: 12px 0;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;

  button {
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
    font-size: 0;

    &.swiper-prev-btn {
      left: 8px;
    }

    &.swiper-next-btn {
      right: 8px;
    }

    svg {
      path {
        fill: #fff;
      }
    }
  }

  span {
    font-size: 16px;
    color: #fff;
  }
`;

export default BigBanner;
