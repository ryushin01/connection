import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Button from '../../components/Button/Button';
import styled, { css } from 'styled-components';

/**
 * Gateway.js logics
 * @property {function} scrollToDown      - 버튼 클릭 시 지정된 영역으로 스크롤 이동하는 함수입니다.
 */

const Gateway = ({ isLogin }) => {
  const [loading, setLoading] = useState(true);
  const targetRef = useRef(null);
  const navigate = useNavigate();

  const scrollToDown = () => {
    targetRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);
    if (isLogin) {
      navigate('/main');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Wrapper>
        <Section>
          <SectionTitle>
            커넥션은 지역 경제를 살리기 위해 제작된
            <br />웹 사이트이자 서비스의 이름입니다.
            <ButtonGroup>
              <Button
                shape="solid"
                color="neutral"
                size="medium"
                content="서비스 이용하기"
                onClick={scrollToDown}
              />
            </ButtonGroup>
          </SectionTitle>
          <Grid>
            <GridItem />
            <GridItem />
            <GridItem />
            <GridItem />
          </Grid>
        </Section>
        <Section ref={targetRef}>
          <SectionTitle>
            커넥션은 위치 기반 서비스이므로
            <br />
            회원가입 또는 로그인을 하셔야
            <br />
            모든 서비스를 이용하실 수 있습니다.
            <ButtonGroup>
              <Button
                shape="solid"
                color="primary"
                size="medium"
                content="회원가입하기"
                onClick={() => navigate('/signup')}
              />
              <Button
                shape="solid"
                color="secondary"
                size="medium"
                content="로그인하기"
                onClick={() => navigate('/login')}
              />
            </ButtonGroup>
          </SectionTitle>
          <Grid>
            <GridItem />
            <GridItem />
            <GridItem />
            <GridItem />
          </Grid>
        </Section>
      </Wrapper>
    </>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Section = styled.section`
  ${FlexCenter};
  position: relative;
  height: 100vh;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.4);
  }

  &:first-child {
    li:nth-child(1) {
      background-image: url(/images/gateway/bg_food.jpg);
    }
    li:nth-child(2) {
      background-image: url(/images/gateway/bg_digital.jpg);
    }
    li:nth-child(3) {
      background-image: url(/images/gateway/bg_beauty.jpg);
    }
    li:nth-child(4) {
      background-image: url(/images/gateway/bg_baby.jpg);
    }
  }

  &:last-child {
    li:nth-child(1) {
      background-image: url(/images/gateway/bg_craft.jpg);
    }
    li:nth-child(2) {
      background-image: url(/images/gateway/bg_pet.jpg);
      background-position: center 30%;
    }
    li:nth-child(3) {
      background-image: url(/images/gateway/bg_sports.jpg);
    }
    li:nth-child(4) {
      background-image: url(/images/gateway/bg_living.jpg);
      background-position: center 70%;
    }
  }
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: 100%;
`;

const GridItem = styled.li`
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(2px);
`;

const SectionTitle = styled.h1`
  width: 80%;
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  line-height: 1.2;
  color: ${props => props.theme.grayscaleA};
  text-shadow: 2px 2px 6px #888;
  text-align: center;
`;

const ButtonGroup = styled.div`
  ${FlexCenter};
  gap: 4vw;
  width: 40%;
  margin: 40px auto 0;

  button {
    flex: 1;
  }
`;

export default Gateway;
