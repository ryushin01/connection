import React, { useState } from 'react';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import styled, { css } from 'styled-components';

const Charge = ({ onClose }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ChargeModalWrap>
      <ChargeModalInnerWrap>
        <ChargeForm>
          <fieldset>
            <legend>포인트 충전</legend>
            <Input
              type="number"
              name="point"
              labelFlex="1"
              borderRadius="4px"
            />
            <Button
              type="submit"
              shape="solid"
              color="primary"
              size="medium"
              content="충전"
            />
          </fieldset>
        </ChargeForm>
        <ChargeNotice>
          <ul>
            <li>포인트로 모든 제품을 구매하실 수 있습니다.</li>
            <li>포인트 충전 시 1%의 추가 금액이 함께 충전됩니다.</li>
            <li>보유 포인트 최대 한도는 1억원입니다.</li>
            <li>포인트 환불은 고객센터를 통해 가능합니다.</li>
            <li>
              포인트 환불 시 추가로 충전된 금액은 환불 받으실 수 없습니다.
            </li>
          </ul>
        </ChargeNotice>
      </ChargeModalInnerWrap>
    </ChargeModalWrap>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChargeModalWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  text-align: center;
`;

const ChargeModalInnerWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 40px;
`;

const ChargeForm = styled.form`
  width: 100%;

  legend {
    margin-bottom: 40px;
    font-size: 32px;
    line-height: 1.2;
  }

  fieldset {
    ${FlexCenter};
    width: 100%;
    gap: 8px;
  }

  button {
    width: 100px;
  }
`;

const ChargeNotice = styled.div`
  li {
    position: relative;
    padding-left: 12px;
    text-align: left;

    & + li {
      margin-top: 4px;
    }

    &::before {
      content: '';
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${props => props.theme.primaryColor};
      position: absolute;
      top: 4px;
      left: 0;
    }
  }
`;

export default Charge;
