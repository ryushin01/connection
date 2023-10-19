import React from 'react';
import styled from 'styled-components';

function Radio({
  type = 'radio',
  name,
  value,
  defaultValue,
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
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <RadioText>{text}</RadioText>
    </RadioLabel>
  );
}

const RadioLabel = styled.label`
  display: flex;
  position: relative;
`;

const RadioInput = styled.input`
  position: absolute;
  z-index: -1;
  width: 1px;
  height: 1px;
`;

const RadioText = styled.span`
  &::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: 1px solid #red;
    border-radius: 50%;
    vertical-align: middle;
  }
`;

export default Radio;
