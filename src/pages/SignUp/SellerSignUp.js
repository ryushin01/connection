import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config';
import DaumPostCode from './DaumPostCode/DaumPostCode';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ImageFile from '../../components/ImageFile/ImageFile';
import styled from 'styled-components';

/**
 *
 * @property {function} handleSellerInfo - 셀러 회원정보를 state에 저장하는 함수입니다.
 * @property {function} handleAddressSelect - 우편번호 API 실행 후 받아온 data를 state에 저장하는 함수입니다.
 * @property {function} postSellerInfoSubmitBtn - 셀러 회원정보를 서버에 전송하는 함수입니다.
 */

const SellerSignUp = props => {
  const [sellerInfo, setSellerInfo] = useState({
    sellerName: '',
    zipCode: '',
    address: '',
    addressDetail: '',
    phoneNumber: '',
  });
  const [onAddressSelect, setOnAddressSelect] = useState(''); // 우편번호 API 실행 후 받아온 data를 state에 저장
  const [upLoadedImage, setUpLoadedImage] = useState(null); // 이미지 url state

  // var
  const navigate = useNavigate();
  const { sellerName, zipCode, address, addressDetail, phoneNumber } =
    sellerInfo; // 구조 분해 할당

  // function
  const handleSellerInfo = e => {
    const { name, value } = e.target;
    setSellerInfo({ ...sellerInfo, [name]: value });
  };

  const handleAddressSelect = address => {
    setOnAddressSelect(address);
    setSellerInfo({
      ...sellerInfo,
      zipCode: address.zonecode,
      address: address.address,
    });
  };

  console.log(upLoadedImage);

  const postSellerInfoSubmitBtn = e => {
    e.preventDefault();

    const formData = new FormData(); // formData 생성
    formData.append('image', upLoadedImage); // formData에 image 추가

    const seller = {
      name: sellerName,
      zipCode,
      address,
      addressDetails: addressDetail,
      phoneNumber,
    };
    formData.append('seller', JSON.stringify(seller)); // formData에 seller 추가(JSON 형식으로 저장)
    // fetch('http://10.58.52.64:8000/users/seller', {
    fetch(`${API.USERS}/seller`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data', // formData를 사용할 때는 Content-Type을 지정하지 않는다. form 태그의 enctype 속성을 사용하면 자동으로 multipart/form-data로 설정된다.
        Authorization: localStorage.getItem('accessToken'),
      },
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          alert('판매자 등록이 완료되었습니다.');
          localStorage.setItem('isSeller', true);
          navigate('/main');
          window.location.reload();
        } else {
          alert('판매자 등록에 실패하였습니다.');
        }
      });
  };

  const isDisabledBtnValid =
    sellerName.length >= 2 && phoneNumber.length === 11;

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
              encType="multipart/form-data"
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
                  status={
                    (sellerInfo?.sellerName?.length === 0 && 'default') ||
                    (sellerInfo?.sellerName?.length < 2 && 'error')
                  }
                  error="이름을 두 글자 이상 입력하세요."
                />
              </SellerSignUpInputWrap>
              <SellerSignUpInputWrap>
                <ImageFile
                  name="image"
                  borderRadius="4px"
                  placeholder="이미지"
                  upLoadedImage={upLoadedImage}
                  setUpLoadedImage={setUpLoadedImage}
                />
              </SellerSignUpInputWrap>

              <SellerSignUpAddressWrap>
                <Input
                  type="text"
                  placeholder="우편번호"
                  value={zipCode}
                  name="zipCode"
                  labelFlex="1"
                  borderRadius="4px"
                />
                <DaumPostCode onAddressSelect={handleAddressSelect} />
              </SellerSignUpAddressWrap>
              <SellerSignUpInputWrap>
                <Input
                  type="text"
                  placeholder="주소"
                  value={address}
                  name="address"
                  labelFlex="1"
                  borderRadius="4px"
                />
              </SellerSignUpInputWrap>
              <SellerSignUpInputWrap>
                <Input
                  type="text"
                  placeholder="상세주소"
                  name="addressDetail"
                  labelFlex="1"
                  borderRadius="4px"
                />
              </SellerSignUpInputWrap>
              <SellerSignUpInputWrap>
                <Input
                  type="text"
                  placeholder="휴대폰 번호"
                  name="phoneNumber"
                  labelFlex="1"
                  borderRadius="4px"
                />
              </SellerSignUpInputWrap>
              <SellerSignUpButtonWrap>
                <Button
                  type="submit"
                  content="회원가입"
                  shape="solid"
                  color="primary"
                  onClick={postSellerInfoSubmitBtn}
                  disabled={!isDisabledBtnValid}
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
  border-radius: 4px;
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
