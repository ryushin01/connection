import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { API } from '../../config';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import DaumPostCode from './DaumPostCode/DaumPostCode';
import styled from 'styled-components';

/**
 * SingUp.js logics
 * @property {function} handleUserInfo = 회원가입 정보를 state에 저장하는 함수
 * @property {function} handleAddressSelect = 주소 API 실행 후 받아온 data를 state에 저장하는 함수
 * @property {function} postSignUp = 회원가입 POST API 실행하는 함수
 * @property {function} handleSubmitUserInfo = 회원가입 정보를 서버에 전달하는 함수
 * @property {function} postDuplicateCheck = 이메일 중복체크 API 실행하는 함수
 */

const SignUp = props => {
  // userInfo state 정의 (회원가입 정보)
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    phone: '',
    zipCode: '',
    address: '',
    addressDetail: '',
  });

  const [onAddressSelect, setOnAddressSelect] = useState('');
  const navigate = useNavigate();

  const handleUserInfo = e => {
    const { name, value } = e.target; // e.target으로 각 name에 맞는 value를 가져온다.
    setUserInfo({ ...userInfo, [name]: value }); // userInfo를 카피하여 각각 name에 맞는 곳에 value 값을 넣어준다.
  };

  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // 이메일 정규표현식
  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/; // 비밀번호 정규 표현식

  const isEmailValid = emailRegExp.test(userInfo.email); // 이메일 정규식 체크
  const isPasswordValid = passwordRegExp.test(userInfo.password); // 비밀번호 정규식 체크
  const isPasswordCheckValid = userInfo.password === userInfo.passwordCheck; // 비밀번호 확인 체크

  const isValidCheck =
    isEmailValid &&
    isPasswordValid &&
    isPasswordCheckValid &&
    userInfo.name.length >= 2 &&
    userInfo.phone.length === 11; // 모든 조건이 만족하면 버튼 활성화

  const handleAddressSelect = address => {
    setOnAddressSelect(address); // 주소 API 실행 후 받아온 data를 state에 저장
    setUserInfo({
      // zipCode, address는 자동으로 입력되어야 하기 때문에 useState에 저장
      ...userInfo,
      zipCode: address.zonecode,
      address: address.address,
    });
  };

  const postSignUp = () => {
    fetch('/data/signup.json', {
      // fetch(`${API.USERS}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
        name: userInfo.name,
        phoneNumber: userInfo.phone,
        zipCode: userInfo.zipCode,
        address: userInfo.address,
        addressDetails: userInfo.addressDetail,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          navigate('/login');
        } else {
          alert('회원가입에 실패하였습니다.');
        }
      });
  };

  const handleSubmitUserInfo = e => {
    e.preventDefault(); // submit 기본 이벤트 막기
    postSignUp();
  };

  const postDuplicateCheck = () => {
    // 이메일 중복체크 API 실행
    fetch('/data/duplicate.json', {
      // fetch(`${API.USERS}/duplicate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: userInfo.email,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          alert('사용 가능한 이메일입니다.');
        } else {
          alert('이미 사용중인 이메일입니다.');
        }
      });
  };

  return (
    <Main id="main">
      <div>
        <SignUpContainer>
          <SignUpLeftSection>
            <span>회원가입</span>
          </SignUpLeftSection>
          <SignUpRightSection>
            <SignUpForm
              onChange={handleUserInfo}
              onSubmit={handleSubmitUserInfo}
            >
              <fieldset>
                <SignUpLegend>회원가입</SignUpLegend>

                <SignUpEmailWrap>
                  <Input
                    placeholder="이메일을 입력하세요."
                    borderRadius="4px"
                    name="email"
                    labelFlex="1"
                    status={
                      (userInfo.email.length === 0 && 'default') ||
                      (!isEmailValid &&
                        userInfo.email.length >= 1 &&
                        'error') ||
                      (isEmailValid && 'done')
                    }
                    error="이메일 형식이 올바르지 않습니다."
                    done="사용 가능한 이메일입니다."
                  />
                  <Button
                    content="중복확인"
                    shape="solid"
                    color="primary"
                    onClick={postDuplicateCheck}
                  />
                </SignUpEmailWrap>
                <SignUpInputWrap>
                  <Input
                    type="password"
                    placeholder="패스워드를 입력하세요."
                    borderRadius="4px"
                    name="password"
                    status={
                      (userInfo.password.length === 0 && 'default') ||
                      (!isPasswordValid &&
                        userInfo.password.length >= 1 &&
                        'error') ||
                      (isPasswordValid && 'done')
                    }
                    error="비밀번호는 8~20자의 영문 대소문자, 숫자, 특수문자를 사용하세요."
                    done="사용 가능한 비밀번호입니다."
                  />
                </SignUpInputWrap>
                <SignUpInputWrap>
                  <Input
                    type="password"
                    placeholder="패스워드를 다시 한번 입력하세요."
                    borderRadius="4px"
                    name="passwordCheck"
                    status={
                      (userInfo.passwordCheck.length === 0 && 'default') ||
                      (!isPasswordCheckValid &&
                        userInfo.passwordCheck.length >= 1 &&
                        'error') ||
                      (isPasswordCheckValid && 'done')
                    }
                    error="비밀번호가 일치하지 않습니다."
                    done="비밀번호가 일치합니다."
                  />
                </SignUpInputWrap>
                <SignUpInputWrap>
                  <Input
                    placeholder="이름을 입력하세요."
                    borderRadius="4px"
                    name="name"
                    status={
                      (userInfo.name.length === 0 && 'default') ||
                      (userInfo.name.length < 2 && 'error')
                    }
                    error="이름을 두 글자 이상 입력하세요."
                  />
                </SignUpInputWrap>
                <SignUpInputWrap>
                  <SignUpAddressWrap>
                    <Input
                      borderRadius="4px"
                      value={userInfo.zipCode}
                      labelFlex="1"
                    />
                    <DaumPostCode onAddressSelect={handleAddressSelect} />
                  </SignUpAddressWrap>
                </SignUpInputWrap>
                <SignUpInputWrap>
                  <Input borderRadius="4px" value={userInfo.address} />
                </SignUpInputWrap>
                <SignUpInputWrap>
                  <Input
                    placeholder="상세주소를 입력하세요."
                    borderRadius="4px"
                    name="addressDetail"
                  />
                </SignUpInputWrap>
                <SignUpInputWrap>
                  <Input
                    type="number"
                    placeholder="휴대폰번호를 입력하세요."
                    borderRadius="4px"
                    name="phone"
                  />
                </SignUpInputWrap>
                <SignUpButtonWrap>
                  <Button
                    type="submit"
                    disabled={!isValidCheck}
                    content="회원가입"
                    shape="solid"
                    color="primary"
                    onClick={handleSubmitUserInfo}
                  />
                </SignUpButtonWrap>
              </fieldset>
            </SignUpForm>
          </SignUpRightSection>
        </SignUpContainer>
      </div>
    </Main>
  );
};

export default SignUp;

const Main = styled.main`
  display: flex;
  align-items: center;
`;

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SignUpLeftSection = styled.section`
  flex: 1;
  border-radius: 4px;
  background: url(/images/account/bg_signup.jpg) no-repeat center/cover;
  font-size: 0;
`;

const SignUpRightSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 80px 20%;
`;

const SignUpLegend = styled.legend`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const SignUpInputWrap = styled.div`
  padding: 15px 0;

  button {
    width: 150px;
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
`;

const SignUpButtonWrap = styled.div`
  width: 100%;
  margin-top: 20px;
  color: ${props => props.theme.grayscaleF};
`;

const SignUpAddressWrap = styled.div`
  display: flex;

  gap: 8px;
`;

const SignUpEmailWrap = styled.div`
  display: flex;
  padding: 15px 0;
  gap: 8px;

  button {
    width: 100px;
  }
`;
