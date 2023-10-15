import React from 'react';
import styled from 'styled-components';

function CheckBox({ name, isChecked, disabled, text, onChange, ...props }) {
  return (
    <CheckBoxLabel>
      <CheckBoxInput
        type="checkbox"
        name={name}
        dataIsChecked={isChecked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <CheckBoxSpan {...props}>{text}</CheckBoxSpan>
    </CheckBoxLabel>
  );
}

const CHECK_BOX_SIZE = {
  small: {
    width: '15px',
    height: '15px',
    checkTop: '5px',
    checkLeft: '4px',
    checkWidth: '7px',
    checkHeight: '3px',
    fontSize: '12px',
  },

  medium: {
    width: '30px',
    height: '30px',
    checkTop: '10px',
    checkLeft: '8px',
    checkWidth: '14px',
    checkHeight: '6px',
    fontSize: '16px',
  },

  large: {
    width: '45px',
    height: '45px',
    checkTop: '15px',
    checkLeft: '12px',
    checkWidth: '21px',
    checkHeight: '9px',
    fontSize: '20px',
  },
};
const CheckBoxLabel = styled.label`
  display: flex;
  position: relative;
  user-select: none;
`;

/**
 * CheckBox Props 정의g
 * @property {string} name - 체크박스 이름
 * @property {string} dataIsChecked - 체크박스 체크 여부
 * @property {string} dataSize - 체크박스 크기 (small, medium, large)
 * @property {function} onChange - 체크박스 값 변경 이벤트
 * @property {boolean} disabled - 체크박스 비활성화
 * @property {string} text - 체크박스 텍스트
 */

const CheckBoxInput = styled.input`
  position: absolute;
  z-index: -1;
  width: 1px;
  height: 1px;

  & + span:before {
    content: '';
    display: inline-block;
    width: ${({ size }) =>
      CHECK_BOX_SIZE[size]?.width || CHECK_BOX_SIZE.medium.width};
    height: ${({ size }) =>
      CHECK_BOX_SIZE[size]?.height || CHECK_BOX_SIZE.medium.height};
    margin-right: 10px;
    border: 1px solid ${props => props.theme.grayscaleF};
    vertical-align: middle;
  }

  &:checked + span::after {
    content: '';
    position: absolute;
    top: ${({ size }) => CHECK_BOX_SIZE[size]?.checkTop};
    left: ${({ size }) => CHECK_BOX_SIZE[size]?.checkLeft};
    width: ${({ size }) => CHECK_BOX_SIZE[size]?.checkWidth};
    height: ${({ size }) => CHECK_BOX_SIZE[size]?.checkHeight};
    border-style: solid;
    border-width: 0 0 1.5px 1.5px;
    transform: rotate(-45deg) scale(1);
  }
`;

const CheckBoxSpan = styled.span`
  font-size: ${({ size }) => CHECK_BOX_SIZE[size]?.fontSize};
`;

export default CheckBox;
