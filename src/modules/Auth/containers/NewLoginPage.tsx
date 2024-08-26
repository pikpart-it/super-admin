import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import avtr from "../../../assets/Login/loginImgae.png";
import Circle from "../../../assets/Login/Ellipse 528.png";
import { config } from "../../../config/config";
import { postAuthorized } from "../../../services";
import { FlexDiv } from "../../../style/styled";
import { userRole } from "../../../utility/func";
import { getDashboardRoute } from "../../../utility/roles";
import { sendOTP, submitOTP } from "../service";
import {
  ActiveBox,
  Heading,
  LoginButton,
  ResetButton,
  Section1,
  Section2,
} from "../styled";
import { TLoadingFormElement } from "../types";
import styled from "styled-components";
import { RoutesPath, routesConfig } from "../../../config/routes.config";
import RegisterUser from "./RegisterUser";
import ResetPassword from "./ResetPassword";

const returnAPI = (type: string) => {
  if (type === "manufacturer") {
    return "manufacturerLogin";
  }
  if (type === "distributor") {
    return "distributorLogin";
  }
  if (type === "masterSeller") {
    return "sellerLogin";
  }
  if (type === "productManufacturer") {
    return "productManufacturerLogin";
  }
};
const MainDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const LoginBox = styled.div`
  border: 1.5px solid #ededed;
  padding: 20px;
  border-radius: 22px;
  box-shadow: rgba(0, 0, 0, 0.25) 10px 10px 10px;
`;
const NewLoginPage = ({ history }) => {
  const [formLoading, setFormLoading] = React.useState<TLoadingFormElement>("");
  const [activeTab, setActiveTab] = useState("masterSeller");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = React.useState<string>("");
  const [wrongOtp, setWrongOtp] = useState(false);
  const [resendOTP, setResendOTP] = React.useState<boolean>(false);
  const [showOTP, setShowOTP] = React.useState<boolean>(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [showRegistionForm, setShowRegistraionForm] = useState(false);
  const HandleActiveTab = (clickedtab: string) => {
    setActiveTab(clickedtab);
    setShowOTP(false);
    setEmail("");
  };

  const Login = async () => {
    let url = `${config.baseUrl}/auth/adminPassowrdLogin`;
    try {
      const response: any = await postAuthorized(url, {
        email,
        password,
      });
      if (!response?.data?.error) {
        localStorage.setItem("AuthToken", response.data?.data?.authToken);
        localStorage.setItem("user", JSON.stringify(response.data?.data));
        setTimeout(() => {
          let uRole = userRole();
          const path = getDashboardRoute(uRole, "");
          history.push(path);
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function onSuccess(res: any) {
    setFormLoading("OTP");
    // Login(email);
  }
  const SubmissionHandler = async () => {
    // submitOTP({
    //   setLoading: setFormLoading,
    //   onSuccess,
    //   session,
    //   password,
    //   onError: () => {
    //     setWrongOtp(true);
    //   },
    // });
  };

  const ReSendOTPHandler = () => {
    setPassword("");
    sendOTP({
      setLoading: setFormLoading,
      onSuccess: (response: any) => {
        setSession(response.data.detail);
        setResendOTP(true);
        setShowOTP(true);
      },
      onError: () => {
        console.log("Error");
      },
      phone: email,
    });
  };

  const SendOtphandler = () => {
    if (email.length === 10) {
      sendOTP({
        setLoading: setFormLoading,
        onSuccess: (response: any) => {
          setSession(response.data.detail);
          setResendOTP(true);
          setShowOTP(true);
        },
        onError: () => {
          setWrongOtp(true);
        },
        phone: email,
      });
    }
  };

  return (
    <div>
      {showRegistionForm ? (
        <RegisterUser toggle={() => setShowRegistraionForm(false)} />
      ) : passwordReset ? (
        <ResetPassword toggle={() => setPasswordReset(false)} />
      ) : (
        <MainDiv>
          <Section1 style={{ width: "40%", position: "relative" }}>
            <div>
              <img src={Circle} />
              <div style={{ position: "absolute", top: "25%", left: "5%" }}>
                <img src={avtr} alt="" style={{}} />
              </div>
            </div>
          </Section1>
          <LoginBox>
            <div>
              <div
                style={{
                  color: "#E14924",
                  textAlign: "center",
                  marginBottom: "10px",
                  fontSize: "2rem",
                }}
              >
                Login as
              </div>
              <div
                style={{
                  color: "#313233",
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                Enter your registered Email Address !
              </div>

              <div style={{ textAlign: "center", marginTop: "1em" }}>
                <>
                  <div style={{ marginTop: "2rem" }}>
                    <TextField
                      id="standard-basic"
                      label="Enter Your Email Address"
                      variant="standard"
                      value={email}
                      onChange={(e) => {
                        // const input = e.target.value.replace(/\D/g, "");
                        // const Number = input.slice(0, 10);
                        setEmail(e.target.value);
                      }}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div style={{ marginTop: "0.5rem" }}>
                    <TextField
                      id="standard-basic"
                      label="Enter Your Password"
                      variant="standard"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        // const input = e.target.value.replace(/\D/g, "");
                        // const Number = input.slice(0, 10);
                        setPassword(e.target.value);
                      }}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <FlexDiv
                    justifyContentSpaceBetween
                    style={{ fontWeight: "bold" }}
                  >
                    <p>Forgot Password?</p>
                    <p
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => setPasswordReset(true)}
                    >
                      Click Here
                    </p>
                  </FlexDiv>
                </>

                <div>
                  <LoginButton disabled={!email && !password} onClick={Login}>
                    Login
                  </LoginButton>
                </div>
              </div>
              <div
                style={{
                  color: "#929699",
                  fontSize: "0.8rem",
                  width: "70%",
                  margin: "auto",
                  textAlign: "center",
                  marginTop: "1rem",
                }}
              >
                By continuing you are agree with
                <span style={{ color: "#000", fontWeight: "bold" }}>
                  Terms & Condition
                </span>
                of Pikpart Smart Garage
              </div>

              <FlexDiv
                style={{ marginTop: "1.5rem" }}
                justifyContentCenter
                alignItemsCenter
                column
              >
                <FlexDiv justifyContentCenter>
                  <div style={{ fontWeight: "bold" }}>
                    <p> Don't have an account?</p>
                  </div>
                  <div
                    style={{
                      border: "1px solid #E14924",
                      color: "#E14924",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "22px",
                      padding: "6px 12px",
                      marginLeft: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setShowRegistraionForm(true);
                    }}
                  >
                    Register Now
                  </div>
                </FlexDiv>
              </FlexDiv>
            </div>
          </LoginBox>
        </MainDiv>
      )}
    </div>
  );
};

export default NewLoginPage;
