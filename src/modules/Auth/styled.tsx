import styled from "styled-components";
import { FlexDiv } from "../../style/styled";
import { Button } from "../../components/styled";

const CommonAuthWrapper = styled(FlexDiv)`
  box-sizing: border-box;
  padding: 5px 50px 35px;
  // border: 1px solid #727272;
  border-radius: 5px;
  margin-top: 5vh;
  margin-bottom: 5vh;
`;

export const RegisterWrapper = styled(CommonAuthWrapper)``;
export const LoginWrapper = styled(CommonAuthWrapper)``;

export const AuthFormButton: any = styled(Button)`
  justify-content: center;
  width: 100%;
`;
// ---NewLoginPage--

export const MainDiv = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(253, 116, 1, 0.4) 0%,
    rgba(243, 243, 243, 0) 99.99%,
    rgba(253, 116, 1, 0.4) 100%
  );
`;
export const Section1 = styled.div`
  display: flex;
  justify-content: center;
`;
export const Heading = styled.div`
  color: #fff;
  font-size: 40px;
  padding: 20px 20px 0px 20px;
`;
export const P = styled.p`
  color: #fff;
  font-size: 22px;
`;
export const Section2 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4em;
`;

export const ActiveBox = styled.div`
  display: flex;
  min-width: fit-content;
  width: 193px;
  height: 40px;
  padding: 7px 32px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #f4f4f4;
  border-radius: 20px;
  border: 1px solid #c3c8cc;
  &.active {
    border: 1px solid #e14924;
    background: #fcd5cc;
    color: #e14924;
  }
  cursor: pointer;
  margin: 20px;
`;
export const LoginButton = styled.button`
  display: flex;
  padding: 10px 140px;
  justify-content: center;
  align-items: center;
  border-radius: 22px;
  background: #e14924;
  color: #fff;
  margin: 20px auto;
  cursor: pointer;
  font-size: 18px;
  letter-spacing: 2px;
  border: none;
`;

export const ResetButton = styled.div`
  #E14924color: #8b8b8b;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  margin-top: 1em;
`;
