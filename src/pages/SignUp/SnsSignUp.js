import React, { useState } from 'react';
import { API } from '../../config';
import styled from 'styled-components';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import DaumPostCode from './DaumPostCode/DaumPostCode';
import { useNavigate } from 'react-router';

const SnsSignUp = props => {
  // userInfo state 정의 (회원가입 정보)
  const [userInfo, setUserInfo] = useState({
    phone: '',
    zipCode: '',
    address: '',
    addressDetail: '',
  });

  const [onAddressSelect, setOnAddressSelect] = useState('');
  const navigate = useNavigate();

  // userInfo state onChange 핸들러 함수 정의
  const handleUserInfo = e => {
    const { name, value } = e.target; // e.target으로 각 name에 맞는 value를 가져온다.
    setUserInfo({ ...userInfo, [name]: value }); // userInfo를 카피하여 각각 name에 맞는 곳에 value 값을 넣어준다.
  };

  // const isValidCheck =
  // userInfo?.name.length >= 2 && userInfo?.phone.length === 11; // 모든 조건이 만족하면 버튼 활성화

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
    // 회원가입 API 실행
    // fetch('http://10.58.52.64:8000/users/kakao/address', {
    fetch(`${API.USERS}/kakao/address`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        phoneNumber: userInfo.phone,
        zipCode: userInfo.zipCode,
        address: userInfo.address,
        addressDetails: userInfo.addressDetail,
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.message === 'SUCCESS') {
          navigate('/main');
        } else {
          alert('회원가입에 실패하였습니다.');
        }
      });
  };

  const handleSubmitUserInfo = e => {
    e.preventDefault(); // submit 기본 이벤트 막기
    postSignUp();
  };

  const isPhoneNumberValid = userInfo.phone.length === 11;

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
                <SignUpLegend>추가 정보입력</SignUpLegend>

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
                    disabled={!isPhoneNumberValid}
                    content="추가정보 저장"
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

export default SnsSignUp;

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
