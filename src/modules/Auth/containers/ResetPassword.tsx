import React, { useState } from "react";
import { config } from "../../../config/config";
import { postAuthorized } from "../../../services";
import { FlexDiv } from "../../../style/styled";
import { H2Heading } from "../../../components/styled";
import { Button, TextField } from "@mui/material";

const ResetPassword = ({ toggle }: { toggle }) => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loader, setLoader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const sendPasswordInMail = async () => {
    setLoader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/auth/resetAdminPassword`;

    try {
      const { data } = await postAuthorized(url, { email });
      if (!data?.error) {
        setEmailSent(true);
        setLoader({
          ...loader,
          isLoading: false,
          error: data?.error,
          msg: data?.message,
        });
      }
    } catch (error) {}
  };

  const onSubmit = async () => {
    let url = `${config.baseUrl}/auth/updateAdminPassword`;

    const payload = {
      email,
      old_password: oldPassword,
      new_password: newPassword,
    };
    try {
      const { data } = await postAuthorized(url, payload);
      toggle();
    } catch (error) {}
  };

  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Reset Password</H2Heading>
      </FlexDiv>

      <FlexDiv alignItemsCenter column width="80%" margin="auto">
        <FlexDiv justifyContentCenter style={{ width: "40%", margin: "10px" }}>
          <TextField
            id="standard-basic"
            label="Enter Your Email Address"
            variant="standard"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{ width: "100%" }}
          />

          <Button
            variant="contained"
            color="success"
            onClick={sendPasswordInMail}
            disabled={!email?.length}
            style={{
              textTransform: "none",
              minWidth: "fit-content",
              margin: "10px",
            }}
          >
            Get Password
          </Button>
        </FlexDiv>
        {emailSent && (
          <>
            <div style={{ width: "40%", margin: "10px" }}>
              <TextField
                type="password"
                id="standard-basic"
                label="Enter Your Old Password"
                variant="standard"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ width: "40%", margin: "10px" }}>
              <TextField
                type="password"
                id="standard-basic"
                label="Enter Your New Password"
                variant="standard"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                style={{ width: "100%" }}
              />
            </div>
          </>
        )}
      </FlexDiv>

      <FlexDiv justifyContentCenter width="100%" margin="3% 0">
        <FlexDiv justifyContentCenter>
          <Button
            variant="contained"
            color="error"
            onClick={toggle}
            sx={{ width: "100%", margin: "0 10px" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={onSubmit}
            sx={{ width: "100%", margin: "0 10px" }}
          >
            Submit
          </Button>
        </FlexDiv>
      </FlexDiv>
    </>
  );
};

export default ResetPassword;
