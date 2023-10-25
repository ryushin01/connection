import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Button from '../../../components/Button/Button';

/**
 * @property {function} open = 우편번호 검색 팝업을 띄우는 함수
 * @property {function} handelComplete = 주소 검색 완료 후 실행할 함수
 * @property {function} handelClick = 버튼 클릭 시 실행할 함수
 */

const DaumPostCode = props => {
  const open = useDaumPostcodePopup(
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
  ); // 우편번호 검색 팝업을 띄우는 함수

  const handelComplete = data => {
    let fullAddress = data.address; // 최종 주소 변수
    let extraAddress = ''; // 추가될 주소 변수

    if (data.addressType === 'R') {
      // 주소 타입이 도로명 주소일 경우
      if (data.bname !== '') {
        // 법정동명이 있을 경우
        extraAddress += data.bname; // 법정동, 법정리
      }
      if (data.buildngName !== '') {
        // 건물명이 있을 경우
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildngName}` : data.buildngName; // 건물명
      }
      // 지역 주소 제외 전체 주소 치환
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    props.onAddressSelect(data); // API 실행 후 받아온 data를 props로 부모 컴포넌트에게 전달
  };

  const handelClick = () => {
    // 버튼 클릭 시 실행할 함수 (주소 팝업 창 OPEN)
    open({
      onComplete: handelComplete,
    });
  };

  return (
    <Button
      onClick={handelClick} // 우편번호 API 실행
      content="우편번호 찾기"
      shape="solid"
      color="primary"
    />
  );
};

export default DaumPostCode;
