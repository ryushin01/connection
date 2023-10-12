import styled, { css } from 'styled-components';

function Button({
  shape,
  type,
  color,
  size,
  full,
  content,
  onClick,
  disabled,
}) {
  return (
    <>
      {/* 솔리드 형태 버튼 */}
      {shape === 'solid' && (
        <SolidButton
          className="btn"
          type={type}
          color={color}
          size={size}
          full={full}
          aria-label={content}
          onClick={onClick}
          disabled={disabled}
        >
          {content}
        </SolidButton>
      )}
      {/* 아웃라인 형태 버튼 */}
      {shape === 'outline' && (
        <OutlineButton
          className="btn"
          type={type}
          color={color}
          size={size}
          full={full}
          aria-label={content}
          onClick={onClick}
          disabled={disabled}
        >
          {content}
        </OutlineButton>
      )}
      {/* 라운드 형태 버튼 */}
      {shape === 'round' && (
        <RoundButton
          className="btn"
          type={type}
          color={color}
          size={size}
          full={full}
          aria-label={content}
          onClick={onClick}
          disabled={disabled}
        >
          {content}
        </RoundButton>
      )}
    </>
  );
}

/**
 * Button props list
 * @property {string} shape: solid, outline, round          - 버튼 형태를 정의합니다.
 * @property {string} type: button, submit, reset           - 버튼 타입을 정의합니다.
 * @property {string} color: primary, secondary, neutral    - 버튼 색상을 정의합니다.
 * @property {string} size: small, medium, large            - 버튼 크기를 정의합니다.
 * @property {boolean} full                                 - 버튼 가로 너비를 뷰포트에 가득 채울 것인지 정의합니다.
 * @property {string} content                               - 버튼 내부 텍스트와 웹 접근성 처리에 사용합니다.
 * @property {function} onClick                             - 버튼 클릭 시 실행할 함수를 위해 미리 정의합니다.
 * @property {boolean} disabled                             - 버튼의 비활성화 상태를 정의합니다.
 */

// 버튼의 기본 props 값을 설정합니다.
Button.defaultProps = {
  shape: 'solid',
  type: 'button',
  color: 'neutral',
  size: 'medium',
  full: false,
  content: 'button',
  disabled: false,
};

// 버튼 기본 구조를 스타일링합니다. 모든 버튼에서 사용할 수 있게 css로 처리하고, ${ButtonBasicStructure}처럼 mixin으로 꺼내쓰게 합니다.
const ButtonBasicStructure = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px transparent solid;
  opacity: 0.9;
  cursor: pointer;
  width: ${props => (props.full ? '100%' : 'auto')};
  min-width: ${props =>
    (props.size === 'small' && '150px') ||
    (props.size === 'medium' && '175px') ||
    '200px'};
  padding: ${props =>
    (props.size === 'small' && '11px 10px') ||
    (props.size === 'medium' && '12px 10px') ||
    '13px 10px'};
  border-color: ${props =>
    // theme는 theme.js에서 확인 가능한 미리 정의된 테마 컬러 셋입니다.
    (props.color === 'primary' && props.theme.primaryColor) ||
    (props.color === 'secondary' && props.theme.secondaryColor) ||
    props.theme.grayscaleC};
  &:hover,
  &:active {
    opacity: 1;
  }
  &[disabled] {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

const SolidButton = styled.button`
  ${ButtonBasicStructure};
  background-color: ${props =>
    (props.color === 'primary' && props.theme.primaryColor) ||
    (props.color === 'secondary' && props.theme.secondaryColor) ||
    props.theme.grayscaleC};
  color: ${props => props.theme.grayscaleB};
`;

const OutlineButton = styled.button`
  ${ButtonBasicStructure};
  background-color: ${props => props.theme.grayscaleB};
  color: ${props => props.theme.grayscaleC};
`;

// styled 다음 가로 안에 인자로 컴포넌트를 넣으면 그 컴포넌트에 미리 정의된 스타일링을 가져올 수 있습니다.
const RoundButton = styled(OutlineButton)`
  border-radius: 50px;
`;

export default Button;
