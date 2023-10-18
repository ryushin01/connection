import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input/Input';
import DaumPostCode from './DaumPostCode/DaumPostCode';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const SellerSignUp = () => {
  const [sellerInfo, setSellerInfo] = useState({
    // 셀러 회원정보 보관 state
    sellerName: '',
    zipCode: '',
    address: '',
    addressDetail: '',
    phone: '',
  });
  const [onAddressSelect, serOnAddressSelect] = useState(''); // 우편번호 API 실행 후 받아온 data를 state에 저장

  // var
  const navigate = useNavigate();

  // function

  const handleSellerInfo = e => {
    const { name, value } = e.target;
    setSellerInfo({ ...sellerInfo, [name]: value });
  };

  const handleAddressSelect = address => {
    serOnAddressSelect(address);
    setSellerInfo({
      ...sellerInfo,
      zipCode: address.zonecode,
      address: address.address,
    });
  };

  const postSellerInfoSubmitBtn = e => {
    e.preventDefault();

    fetch('http://10.58.52.198:8000/users/seller', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('access_token'),
      },
      body: JSON.stringify({
        name: sellerInfo.sellerName,
        image: 'no-image.jpg',
        zipCode: sellerInfo.zipCode,
        address: sellerInfo.address,
        addressDetails: sellerInfo.addressDetail,
        phoneNumber: sellerInfo.phone,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          alert('판매자 등록이 완료되었습니다.');
          navigate('/');
        } else {
          alert('판매자 등록에 실패하였습니다.');
        }
      });
  };

  return (
    <Main id="main">
      <div>
        <SignUpContainer>
          <SellerSignUpLeftSection>
            <span>셀러 회원가입</span>
          </SellerSignUpLeftSection>
          <SellerSignUpRightSection>
            <SellerSignUpForm
              onSubmit={postSellerInfoSubmitBtn}
              onChange={handleSellerInfo}
            >
              <fieldset>
                <SellerSignUpLegend>셀러 회원가입</SellerSignUpLegend>
              </fieldset>
              <SellerSignUpInputWrap>
                <Input
                  type="text"
                  placeholder="판매자 이름을 입력해주세요."
                  borderRadius="4px"
                  name="sellerName"
                />
              </SellerSignUpInputWrap>
              <SellerSignUpAddressWrap>
                <Input
                  type="text"
                  placeholder="우편번호"
                  value={sellerInfo.zipCode}
                  name="zipCode"
                  labelFlex="1"
                />
                <DaumPostCode onAddressSelect={handleAddressSelect} />
              </SellerSignUpAddressWrap>
              <SellerSignUpInputWrap>
                <Input
                  type="text"
                  placeholder="주소"
                  value={sellerInfo.address}
                  name="address"
                  labelFlex="1"
                />
              </SellerSignUpInputWrap>
              <SellerSignUpInputWrap>
                <Input
                  type="text"
                  placeholder="상세주소"
                  name="addressDetail"
                  labelFlex="1"
                />
              </SellerSignUpInputWrap>
              <SellerSignUpInputWrap>
                <Input
                  type="text"
                  placeholder="휴대폰 번호"
                  name="phone"
                  labelFlex="1"
                />
              </SellerSignUpInputWrap>
              <SellerSignUpButtonWrap>
                <Button
                  type="submit"
                  content="회원가입"
                  shape="solid"
                  color="primary"
                  onClick={postSellerInfoSubmitBtn}
                />
              </SellerSignUpButtonWrap>
            </SellerSignUpForm>
          </SellerSignUpRightSection>
        </SignUpContainer>
      </div>
    </Main>
  );
};

export default SellerSignUp;

const Main = styled.main`
  display: flex;
  align-items: center;
`;

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SellerSignUpLeftSection = styled.section`
  flex: 1;
  background: url(/images/account/bg_login.jpg) no-repeat center/cover;
  font-size: 0;
`;

const SellerSignUpRightSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const SellerSignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 80px 20%;
`;

const SellerSignUpLegend = styled.legend`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const SellerSignUpInputWrap = styled.div`
  width: 100%;
  margin-top: 20px;
  color: ${props => props.theme.grayscaleF};
`;

const SellerSignUpAddressWrap = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 8px;

  button {
    width: 150px;
  }
`;

const SellerSignUpButtonWrap = styled.div`
  width: 100%;
  margin-top: 20px;
  color: ${props => props.theme.grayscaleF};
`;
