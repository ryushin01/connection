import styled from 'styled-components';

const Button = ({
  type = 'button',
  content = 'button',
  onClick,
  disabled = false,
  ...props
}) => {
  return (
    <DefaultButton
      type={type}
      aria-label={content}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </DefaultButton>
  );
};

/**
 * Button props list
 * @property {string} type: button, submit, reset           - 버튼 타입을 정의합니다.
 * @property {string} shape: solid, outline                 - 버튼 형태를 정의합니다.
 * @property {string} color: primary, secondary, neutral    - 버튼 색상을 정의합니다.
 * @property {string} size: small, medium, large            - 버튼 크기를 정의합니다.
 * @property {string} content                               - 버튼 내부 텍스트와 웹 접근성 처리에 사용합니다.
 * @property {function} onClick                             - 버튼 클릭 시 실행할 함수를 위해 미리 정의합니다.
 * @property {boolean} disabled                             - 버튼의 비활성화 상태를 정의합니다.
 */

const SIZE_STYLES = {
  small: {
    padding: '11px 10px',
    fontSize: '16px',
  },
  medium: {
    padding: '12px 10px',
    fontSize: '20px',
  },
  large: {
    padding: '13px 10px',
    fontSize: '24px',
  },
};

const DefaultButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px transparent solid;
  border-radius: 4px;
  opacity: 0.9;
  cursor: pointer;

  padding: ${({ size }) => SIZE_STYLES[size]?.padding || '13px 10px'};

  font-size: ${({ size }) => SIZE_STYLES[size]?.fontSize || '20px'};

  border-color: ${props =>
    (props.color === 'primary' && props.theme.primaryColor) ||
    (props.color === 'secondary' && props.theme.secondaryColor) ||
    props.theme.grayscaleD};

  &:hover,
  &:active {
    opacity: 1;
  }

  &[disabled] {
    opacity: 0.2;
    cursor: not-allowed;
  }

  ${props => {
    if (props.shape === 'solid') {
      return `
        background-color: ${
          (props.color === 'primary' && props.theme.primaryColor) ||
          (props.color === 'secondary' && props.theme.secondaryColor) ||
          props.theme.grayscaleD
        };
        
        color: ${props.theme.grayscaleA};
        `;
    } else {
      return `
      background-color: ${props.theme.grayscaleB};
      color: ${props.theme.grayscaleC};
    `;
    }
  }}
`;

export default Button;
