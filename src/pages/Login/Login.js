import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config';
import styled from 'styled-components';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

/**
 * Login.js logics
 * @property {function} handleLogin = 카카오 로그인 버튼 클릭 시 실행되는 함수 (카카오 소셜 로그인 RedirectUri로 이동)
 * @property {function} handleUserInfo = userInfo state onChange 핸들러 함수 정의
 * @property {function} postUserInfo = 로그인 버튼 클릭 시 POST 실행되는 함수
 * @property {function} handleLoginSubmit = 로그인 버튼 클릭 시 실행되는 함수
 */

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    // 로그인 Valid를 위한 state
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  // 카카오 소셜 로그인을 위한 변수
  const RestApiKey = process.env.REACT_APP_RestApiKey;
  const RedirectUri = process.env.REACT_APP_RedirectUri;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${RestApiKey}&redirect_uri=${RedirectUri}&response_type=code`;

  // userInfo Email, Password Valid Check
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // 이메일 정규표현식
  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/; // 비밀번호 정규 표현식

  // 실시간 유효성 검사
  const isEmailValid = emailRegExp.test(userInfo.email); // 이메일 정규식 체크
  const isPasswordValid = passwordRegExp.test(userInfo.password); // 비밀번호 정규식 체크

  // 모든 조건이 만족하면 버튼 활성화
  const isValidCheck = isEmailValid && isPasswordValid;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const handleUserInfo = e => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const postUserInfo = () => {
    // fetch('http://10.58.52.126:8000/users/', {
    fetch(`${API.USERS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.message === 'SUCCESS') {
          localStorage.setItem('accessToken', result.accessToken.accessToken);
          localStorage.setItem('isKakao', result.accessToken.isKakao);
          localStorage.setItem('isSeller', result.accessToken.isSeller);
          localStorage.setItem('points', result.accessToken.points);
          localStorage.setItem('cartCount', result.accessToken.cartCount);
          navigate('/main');
          window.location.reload();
        } else {
          alert('로그인 실패하였습니다. 다시 시도해주세요.');
        }
      });
  };

  const handleLoginSubmit = e => {
    e.preventDefault();
    postUserInfo();
  };

  return (
    <Main id="main">
      <div>
        <LoginContainer>
          <LoginLeftSection>로그인</LoginLeftSection>
          <LoginRightSection>
            <LoginForm onChange={handleUserInfo} onSubmit={handleLoginSubmit}>
              <fieldset>
                <LoginLegend>로그인</LoginLegend>
                <LoginInputWrap>
                  <Input
                    type="text"
                    name="email"
                    placeholder="이메일"
                    borderRadius="4px"
                    status={
                      (userInfo.email === '' && 'default') ||
                      (!isEmailValid &&
                        userInfo.email.length >= 1 &&
                        'error') ||
                      (isEmailValid && 'done')
                    }
                    error="이메일 형식에 맞지 않습니다."
                  />
                </LoginInputWrap>
                <LoginInputWrap>
                  <Input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    borderRadius="4px"
                    status={
                      (userInfo.password === '' && 'default') ||
                      (!isPasswordValid &&
                        userInfo.password.length >= 1 &&
                        'error') ||
                      (isPasswordValid && 'done')
                    }
                    error="비밀번호는 8~20자의 영문 대소문자, 숫자, 특수문자 입니다."
                  />
                </LoginInputWrap>
                <LoginButtonWrap>
                  <Button
                    type="submit"
                    content="로그인"
                    shape="solid"
                    color="primary"
                    disabled={!isValidCheck}
                    onClick={handleLoginSubmit}
                  />
                </LoginButtonWrap>
                <LoginSnsButtonWrap>
                  <button type="button" onClick={handleLogin}>
                    <img
                      src="/images/kakao/kakao_login_medium_wide.png"
                      alt="kakao"
                    />
                  </button>
                </LoginSnsButtonWrap>
              </fieldset>
            </LoginForm>
          </LoginRightSection>
        </LoginContainer>
      </div>
    </Main>
  );
};

export default Login;

const Main = styled.main`
  display: flex;
  align-items: center;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginLeftSection = styled.section`
  flex: 1;
  border-radius: 4px;
  background: url(/images/account/bg_login.jpg) no-repeat center/cover;
  font-size: 0;
`;

const LoginRightSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 20%;
`;

const LoginLegend = styled.legend`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const LoginInputWrap = styled.div`
  padding: 15px 0;
`;

const LoginButtonWrap = styled.div`
  margin-top: 20px;
`;

const LoginSnsButtonWrap = styled.div`
  position: relative;
  width: 100%;
  padding-top: 80px;

  button {
    width: 100%;
    border-radius: 4px;
    background: #fee500; // 이미지 빈 공간 같은 색으로 채우기
    font-size: 0;

    img {
      width: auto;
      height: 100%;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 50%;
    height: 1px;
    margin: 0 auto;
    background-color: ${props => props.theme.grayscaleE};
  }
`;
