import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../config';
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

/**
 * BigBanner.js logics
 * @property {function} goToListPage      - 빅배너 클릭 시 해당 카테고리 목록 페이지로 이동하는 함수입니다.
 */

const BigBanner = () => {
  const navigate = useNavigate();

  const goToListPage = id => {
    navigate(`/products/category/${id}`, {
      state: { categoryId: id },
    });
  };

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
        {BIG_BANNER_SWIPER_DATA.map(({ id, path, image, title, subtitle }) => {
          return (
            <SwiperSlide key={id}>
              <SwiperLinkButton
                type="button"
                onClick={e => {
                  goToListPage(id);
                }}
              >
                <img src={image} alt={title} />
                <TextWrap>
                  <TextInnerWrap>
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>
                  </TextInnerWrap>
                </TextWrap>
              </SwiperLinkButton>
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
  margin-top: -40px;
  font-size: 0;

  & > div > div:first-child > div > button {
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

  & > div > div:first-child > div.swiper-slide-active {
    span {
      top: 0;
      opacity: 1;
    }
  }
`;

const SwiperLinkButton = styled.button`
  font-size: 0;
`;

const TextWrap = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 100;
  width: 90%;
  height: 100%;
  transform: translateX(-50%);
  text-shadow: 2px 2px 6px #888;
`;

const TextInnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  height: 100%;
  text-align: left;

  span {
    position: relative;
    color: #fff;
    opacity: 0;
  }

  span:first-child {
    top: 40px;
    transition:
      opacity 0.4s ease-out 0.1s,
      top 0.4s ease-out 0.1s;
  }

  span:last-child {
    top: -20px;
    transition:
      opacity 0.3s ease-out 0.2s,
      top 0.3s ease-out 0.2s;
  }
`;

const Title = styled.span`
  font-size: 40px;
`;

const Subtitle = styled.span`
  font-size: 28px;
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
