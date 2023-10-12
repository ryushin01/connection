import React from 'react';
import styled from 'styled-components';
import { theme, lightTheme, darkTheme } from '../../styles/theme';

function Input({
  placeholder,
  type,
  name,
  shape,
  size,
  onChange,
  disabled,
  value,
  defaultValue,
  flex,
  full,
}) {
  return (
    // 인풋 Props
    <FlexLabel flex={flex}>
      <SolidInput
        className="input"
        shape={shape}
        size={size}
        full={full}
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
    </FlexLabel>
  );
}

/**
 * Input Props 정의
 * @property {string} shape - 인풋 모양 (solid, round)
 * @property {string} size - 인풋 크기 (small, medium, large)
 * @property {string} placeholder - 인풋 플레이스홀더
 * @property {string} type - 인풋 타입
 * @property {string} name - 인풋 이름
 * @property {function} onChange - 인풋 값 변경 이벤트
 * @property {boolean} disabled - 인풋 비활성화
 * @property {string} value - 인풋 값 (변경 불가)
 * @property {string} defaultValue - 인풋 기본 값 (변경 가능)
 */

// Input의 기본 props 값 설정
Input.defaultProps = {
  shape: 'solid',
  size: 'medium',
  type: 'text',
  flex: 0,
};

const SolidInput = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => (props.full ? '100%' : 'auto')};
  min-width: ${props =>
    (props.size === 'small' && '120px') ||
    (props.size === 'medium' && '160px') ||
    '200px'};
  height: ${props =>
    (props.size === 'small' && '40px') ||
    (props.size === 'medium' && '50px') ||
    '60px'};
  border: 1px solid transparent;
  border-radius: ${props => (props.shape === 'round' && '50px') || '0px'};
  border-color: ${props =>
    (props.color === 'primary' && props.theme.primaryColor) ||
    (props.color === 'secondary' && props.theme.secondaryColor) ||
    props.theme.grayscaleC};
  background-color: ${props =>
    (props.color === 'primary' && props.theme.primaryColor) ||
    (props.color === 'secondary' && props.theme.secondaryColor) ||
    props.theme.grayscaleA};
  color: ${props =>
    (props.color === 'primary' && props.theme.primaryColor) ||
    (props.color === 'secondary' && props.theme.secondaryColor) ||
    props.theme.grayscaleB};
`;

const FlexLabel = styled.label`
  flex: ${props => (props.flex === '1' && '1') || 0};
`;

export default Input;
