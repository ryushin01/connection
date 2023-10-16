import React from 'react';
import { ReactComponent as PhoneIcon } from '../../svg/icon_phone.svg';
import { ReactComponent as AppIcon } from '../../svg/icon_app.svg';
import { ReactComponent as EmailIcon } from '../../svg/icon_email.svg';
import { ReactComponent as InstagramIcon } from '../../svg/icon_instagram.svg';
import styled, { css } from 'styled-components';

const Footer = () => {
  return (
    <FooterWrap>
      <FooterInnerWrap>
        <LeftSection>
          <Metadata>
            <span>(주)커넥션&nbsp;&nbsp;|&nbsp;&nbsp;대표이사: 류창선</span>
            <address>주소: 서울 강남구 테헤란로 427 위워크타워 10층</address>
            <span>사업자등록번호: 000-00-00000</span>
            <span>톹신판매업신고번호: 2023-서울선릉-0000</span>
            <span>개인정보관리책임자: 박요진</span>
            <em>© 2023 Connection Inc. All rights reserved.</em>
          </Metadata>
        </LeftSection>
        <RightSection>
          <Customer>
            <span>고객센터</span>
            <a href="tel:010-7160-7921">
              <PhoneIcon />
              0000-0000
            </a>
            <span>연중무휴 10:00 - 22:00</span>
          </Customer>
          <Contact>
            <button type="button">
              <AppIcon />
            </button>
            <a href="mailto:ryushin0167@gmail.com">
              <EmailIcon />
            </a>
            <a
              href="https://www.instagram.com/ryushin0/"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
            </a>
          </Contact>
        </RightSection>
      </FooterInnerWrap>
    </FooterWrap>
  );
};

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterWrap = styled.footer`
  height: 160px;
  border-top: 1px ${props => props.theme.grayscaleF} solid;
  color: ${props => props.theme.grayscaleF};

  svg {
    path {
      fill: ${props => props.theme.grayscaleF};
    }
  }
`;

const FooterInnerWrap = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;

  & > section {
    flex: 1;
    line-height: 1.2;
  }
`;

const LeftSection = styled.section`
  text-align: left;
`;

const RightSection = styled.section`
  text-align: right;
`;

const Metadata = styled.div`
  font-size: 12px;

  * {
    display: block;
  }

  em {
    margin-top: 28px;
  }
`;

const Customer = styled.div`
  font-size: 12px;

  span {
    display: block;
  }

  svg {
    margin-right: 8px;
    vertical-align: middle;
  }

  a {
    font-size: 28px;
    font-weight: 700;
    color: ${props => props.theme.grayscaleF};
  }
`;

const Contact = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 28px;
  font-size: 12px;

  a,
  button {
    ${FlexCenter};
    width: 32px;
    height: 32px;
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }
`;

export default Footer;
