import React from 'react';
import styled, { css } from 'styled-components';

function Radio({
  type = 'radio',
  name,
  value,
  defaultChecked,
  text,
  onChange,
  disabled,
  placeholder,
  ...props
}) {
  return (
    <RadioLabel {...props}>
      <RadioInput
        type={type}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <RadioText>{text}</RadioText>
    </RadioLabel>
  );
}

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadioLabel = styled.label`
  display: flex;
  position: relative;
`;

const RadioInput = styled.input`
  position: absolute;
  z-index: -1;
  width: 1px;
  height: 1px;

  &:checked + span::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: ${props => props.theme.primaryColor};
  }
`;

const RadioText = styled.span`
  ${FlexCenter};

  &::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    border: 1px solid ${props => props.theme.grayscaleF};
    border-radius: 50%;
    vertical-align: middle;
  }
`;

export default Radio;
