import React from 'react';
import styled from 'styled-components';

function Input({
  flex = 0,
  type = 'text',
  shape = 'solid',
  size = 'medium',
  color = 'primary',
  status,
  name,
  value,
  defaultValue,
  onChange,
  disabled,
  placeholder,
}) {
  return (
    // 인풋 Props
    <FlexLabel flex={flex}>
      <DefaultInput
        type={type}
        dataShape={shape}
        dataSize={size}
        dataColor={color}
        dataStatus={status}
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
 * @property {number} flex - 인풋 flex 값
 * @property {string} type - 인풋 타입
 * @property {string} dataShape - 인풋 모양 (solid, round)
 * @property {string} dataSize - 인풋 크기 (small, medium)
 * @property {string} dataColor - 인풋 색상 (primary, secondary, neutral)
 * @property {string} dataStatus - 인풋 상태 (default, error, done)
 * @property {string} name - 인풋 이름
 * @property {string} value - 인풋 값 (변경 불가)
 * @property {string} defaultValue - 인풋 기본 값 (변경 가능)
 * @property {function} onChange - 인풋 값 변경 이벤트
 * @property {boolean} disabled - 인풋 비활성화
 * @property {string} placeholder - 인풋 플레이스홀더
 */

const INPUT_SIZE = {
  small: {
    height: '40px',
  },
  medium: {
    height: '50px',
  },
  large: {
    height: '60px',
  },
};

const FlexLabel = styled.label`
  display: flex;
  align-items: center;
  flex: ${props => props.flex === '1' && '1'};
`;

const DefaultInput = styled.input`
  opacity: 0.9;
  width: 100%;
  padding: 0 20px;
  height: ${({ dataSize }) => INPUT_SIZE[dataSize]?.height};
  border: 1px solid transparent;
  border-radius: ${props => props.dataShape === 'round' && '50px'};

  border-color: ${props =>
    (props.dataColor === 'primary' && props.theme.primary) ||
    (props.dataColor === 'secondary' && props.theme.secondary) ||
    props.theme.grayscaleC};

  background-color: ${props =>
    (props.dataColor === 'primary' && props.theme.primary) ||
    (props.dataColor === 'secondary' && props.theme.secondary) ||
    props.theme.grayscaleB};

  color: ${props =>
    (props.dataColor === 'primary' && props.theme.primary) ||
    (props.dataColor === 'secondary' && props.theme.secondary) ||
    props.theme.grayscaleB};

  &[dataStatus='default'] {
    border-color: #011627;
    color: #011627;

    &:focus {
      outline: none;
    }
  }

  &[dataStatus='error'] {
    border-color: #e71d36;
    color: #e71d36;

    &:focus {
      outline: none;
    }
  }

  &[dataStatus='done'] {
    border-color: #2ec4b6;
    color: #2ec4b6;

    &:focus {
      outline: none;
    }
  }
`;
export default Input;
