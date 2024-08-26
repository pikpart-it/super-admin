import styled from "styled-components";
import { FlexDiv } from "../style/styled";
import { Link } from "react-router-dom";

export const H2Heading = styled.h1`
  padding-top: 20px;
  font-weight: 600;
  text-align: center;
  margin: 20px 0 30px 0;
  position: relative;
  user-select: none;
  color: rgb(219, 89, 45);
  &:before {
    content: " ";
    transition: 0.6s ease;
    position: absolute;
    height: 1px;
    width: 0%;
    left: 50%;
    bottom: -10px;
    background: rgb(219, 89, 45);
  }
  &:hover:before {
    transition: 0.4s ease;
    width: 85%;
    left: 50%;
    transform: translateX(-50%);
  }
  @media (max-width: 540px) {
    font-size: 16px;
    padding-top: 10px;
  }
  @media (max-width: 786px) {
    padding-top: 10px;
  }
`;

export const NewHeading = styled.div`
  font-weight: 600;
  text-align: center;
  color: #f96500;
  font-size: 1.4rem;
`;
export const ViewButton = styled.div`
  width: 150px;
  height: 31px;
  border-radius: 4px;
  background: #50c878;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const H2HeadingService = styled.h1`
  padding-top: 40px;
  font-size: 35px;
  font-weight: 400;
  text-align: center;
  margin: 50px 0 30px 0;
  margin-top: 0;
  position: relative;
  user-select: none;
  color: rgb(219, 89, 45);

  &:before {
    content: " ";
    transition: 0.6s ease;
    position: absolute;
    height: 1px;
    width: 0%;
    left: 50%;
    bottom: -10px;
    background: rgb(219, 89, 45);
  }
  &:hover:before {
    transition: 0.4s ease;
    width: 85%;
    left: 50%;
    transform: translateX(-50%);
  }
  @media (max-width: 786px) {
    margin: 15px 0 0px 0;
    font-size: 20px;
    // padding-top: 10px
  }
  @media (max-width: 540px) {
    font-size: 18px;
    margin-bottom: 10px;
    padding-top: 10px;
  }
`;

export const UserProfileMenu = styled.div`
  right: 0px;
  padding: 5px 0;
  min-width: 100px;
  background: #fff;
  border-radius: 4px;
  position: absolute;
  top: calc(100% + 5px);
  flex-direction: column;
  box-shadow: 0 1px 5px rgba(204, 204, 204);
  a {
    padding: 7px 15px;
    border-radius: 0;
    transition: 0.6s ease;
    &:hover {
      background: #222222;
      color: #fff;
      transition: 0.8s ease;
    }
  }
`;

export const UserMenuLink = styled.div`
  position: relative;
  $:hover {
  }
  > span {
    cursor: pointer;
    padding: 7px;
    display: flex;
    align-items: center;
    label {
      cursor: pointer;
      text-transform: capitalize;
      font-weight: 600;
      color: #fff;
    }
  }
`;

/* ========== Footer ========== */
export const Footercontainer = styled.div`
  background-color: #222222;
  padding: 2vmax;
  @media (max-width: 786px) {
    display: none;
  }
`;

export const LogoIcon = styled.img`
  height: 50px;
  // @media (max-width: 786px) {
  //   margin-left: 5vh;
  // }
`;

export const Footerlink = styled.div`
  width: 86%;
  display: flex;
  // flex-wrap: wrap;
  margin: 0 auto;
  justify-content: space-between;
  color: white;
  flex-direction: row;
  @media (max-width: 786px) {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  @media (max-width: 540px) {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
export const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  @media (max-width: 540px) {
    width: 100%;
    justify-content: space-around;
  }
`;
export const FooterRows = styled.div`
  display: flex;

  justify-content: space-between;
  flex-wrap: wrap;
  align-self: flex-end;
  width: 80%;
  @media (max-width: 786px) {
    margin-top: 10px;
    width: 100%;
  }
  @media (max-width: 540px) {
    width: 100%;
  }
  #footer-menu-link-0 {
    order: 0;
  }
  #footer-menu-link-1 {
    order: 1;
  }
  #footer-menu-link-2 {
    order: 2;
  }
  #footer-menu-link-3 {
    order: 3;
    @media (max-width: 786px) {
      order: 5;
    }
  }
  #footer-menu-link-4 {
    order: 4;
    @media (max-width: 786px) {
      order: 8;
    }
  }
  #footer-menu-link-5 {
    order: 5;
    @media (max-width: 786px) {
      order: 2;
    }
  }
  #footer-menu-link-6 {
    order: 6;
    @media (max-width: 786px) {
      order: 6;
    }
  }
  #footer-menu-link-7 {
    order: 7;
    @media (max-width: 786px) {
      order: 7;
    }
  }
  #footer-menu-link-8 {
    order: 8;
    @media (max-width: 786px) {
      order: 11;
    }
  }
  #footer-menu-link-9 {
    order: 9;
    @media (max-width: 786px) {
      order: 10;
    }
  }
  #footer-menu-link-10 {
    order: 10;
    @media (max-width: 786px) {
      order: 4;
    }
  }
  #footer-menu-link-11 {
    order: 11;
    @media (max-width: 786px) {
      order: 9;
    }
  }
  #footer-menu-link-12 {
    order: 12;
  }
`;
export const FoooterLink = styled(Link)`
  color: white;
  font-size: 14px;
  text-decoration: none;
  padding: 9px 16px;
  width: 25%;
  cursor: pointer;
  transition: all 0.6s ease 0s;
  &:hover {
    color: rgb(24, 144, 255);
  }
  @media (max-width: 786px) {
    width: 33%;
  }
  @media (max-width: 540px) {
    width: 45%;
  }
`;

export const Social = styled.div`
  display: flex;

  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: center;
  color: white;
  @media (max-width: 540px) {
    justify-content: space-evenly;
  }
`;

export const Subscribediv = styled.div`
  width: 190px;
  display: none;
`;
export const SocialCircle = styled.span`
  margin: 1vmax;
  color: white;
  padding: 7px;
  display: flex;
  border-radius: 50%;
  background-color: #e95330;
`;
export const WebLink = styled.a`
  color: white;
  font-size: 25px;
  width: 25%;
  text-decoration: none;
  padding: 9px 16px;
  @media (max-width: 786px) {
    width: 33%;
  }
  @media (max-width: 540px) {
    width: 45%;
  }
  &:hover {
    color: #2e769e;
    transition: 0.4s ease;
  }
`;
export const SocialMediaMobile = styled.div`
  display: none;
  height: 70px;
  background-color: #ddd;
  padding: 2vmax 2vmax 5;
  margin-bottom: 40px;
  @media (max-width: 786px) {
    display: block;
  }
`;
export const Span = styled.span<{
  fontSize?: number;
  color?: string;
  variant?: string;
}>`
  font-size: ${({ fontSize }) => fontSize || 14}px;
  color: ${({ color }) => color || "#000"};
`;
/* ========== Footer ========== */

export const HStyle = styled(Span)`
  display: block;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
`;
const ButtonColors = {
  success: "rgb(115, 209, 61) ",
  secondary: "rgb(140, 140, 140)",
  primary: "rgb(64, 169, 255)",
  danger: "rgb(255, 77, 79)",
};

export const Button = styled.button<{ variant?: string }>`
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  outline: none;
  padding: 9px 16px;
  font-size: 14px;
  line-height: 1.1;
  letter-spacing: normal;
  font-stretch: 100%;
  transition: all 0.4s ease 0s;
  border-radius: 4px;
  border: 1px solid rgb(217, 217, 217);
  margin: 0px;
  color: ${({ variant }) => (variant ? "#fff" : "#000")};
  cursor: pointer;
  border-color: ${({ variant }) => ButtonColors[variant!]};
  background-color: ${({ variant }) => ButtonColors[variant!] || "#fff"};
  &:disabled {
    background-color: rgb(183, 235, 143);
    border-color: rgb(217, 217, 217);
    cursor: not-allowed;
  }
`;
