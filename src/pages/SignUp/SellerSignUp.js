import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input/Input';
import DaumPostCode from './DaumPostCode/DaumPostCode';
import Button from '../../components/Button/Button';

const SellerSignUp = () => {
  const [sellerInfo, setSellerInfo] = useState({
    sellerName: '',
    zipCode: '',
    address: '',
    addressDetail: '',
  });
  const [onAddressSelect, serOnAddressSelect] = useState('');

  const handleAddressSelect = address => {
    serOnAddressSelect(address);
    setSellerInfo({
      ...sellerInfo,
      zipCode: address.zonecode,
      address: address.address,
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
            <SellerSignUpForm>
              <fieldset>
                <SellerSignUpLegend>셀러 회원가입</SellerSignUpLegend>
              </fieldset>
              <SellerSignUpInputWrap>
                <Input
                  type="text"
                  placeholder="판매자 닉네임을 입력해주세요."
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
              <SellerSignUpButtonWrap>
                <Button
                  type="submit"
                  content="회원가입"
                  shape="solid"
                  color="primary"
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
