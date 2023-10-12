import styled from 'styled-components';

const Button = ({
  type = 'button',
  shape = 'solid',
  color = 'neutral',
  size = 'medium',
  full = false,
  content = 'button',
  onClick,
  disabled = false,
}) => {
  return (
    <DefaultButton
      type={type}
      dataShape={shape}
      dataColor={color}
      dataSize={size}
      dataFull={full}
      aria-label={content}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </DefaultButton>
  );
};

/**
 * Button props list
 * @property {string} type: button, submit, reset           - 버튼 타입을 정의합니다.
 * @property {string} shape: solid, outline, round          - 버튼 형태를 정의합니다.
 * @property {string} color: primary, secondary, neutral    - 버튼 색상을 정의합니다.
 * @property {string} size: small, medium, large            - 버튼 크기를 정의합니다.
 * @property {boolean} full                                 - 버튼 가로 너비를 뷰포트에 가득 채울 것인지 정의합니다.
 * @property {string} content                               - 버튼 내부 텍스트와 웹 접근성 처리에 사용합니다.
 * @property {function} onClick                             - 버튼 클릭 시 실행할 함수를 위해 미리 정의합니다.
 * @property {boolean} disabled                             - 버튼의 비활성화 상태를 정의합니다.
 */

const SIZE_STYLES_LIST = {
  small: {
    minWidth: '150px',
    padding: '11px 10px',
    fontSize: '14px',
  },
  medium: {
    minWidth: '175px',
    padding: '12px 10px',
    fontSize: '16px',
  },
  large: {
    minWidth: '200px',
    padding: '13px 10px',
    fontSize: '18px',
  },
};

// 버튼 기본 구조를 스타일링합니다. 모든 버튼에서 사용할 수 있게 css로 처리하고, ${ButtonBasicStructure}처럼 mixin으로 꺼내쓰게 합니다.
const DefaultButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px transparent solid;
  opacity: 0.9;
  cursor: pointer;
  width: ${props => (props.full ? '100%' : 'auto')};

  min-width: ${({ dataSize }) =>
    SIZE_STYLES_LIST[dataSize]?.minWidth || '200px'};
  padding: ${({ dataSize }) =>
    SIZE_STYLES_LIST[dataSize]?.padding || '13px 10px'};
  font-size: ${({ dataSize }) =>
    SIZE_STYLES_LIST[dataSize]?.fontSize || '18px'};

  border-color: ${props =>
    (props.color === 'primary' && props.theme.primaryColor) ||
    (props.color === 'secondary' && props.theme.secondaryColor) ||
    props.theme.grayscaleC};

  &[dataShape='solid'] {
    background-color: ${props =>
      (props.color === 'primary' && props.theme.primaryColor) ||
      (props.color === 'secondary' && props.theme.secondaryColor) ||
      props.theme.grayscaleC};
    color: ${props => props.theme.grayscaleB};
  }

  &[dataShape='outline'],
  &[dataShape='round'] {
    background-color: ${props => props.theme.grayscaleB};
    color: ${props => props.theme.grayscaleC};
  }

  &[dataShape='round'] {
    border-radius: 50px;
  }

  &:hover,
  &:active {
    opacity: 1;
  }

  &[disabled] {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

export default Button;
