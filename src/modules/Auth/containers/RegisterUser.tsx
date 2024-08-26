import React, { useState } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FlexDiv } from "../../../style/styled";
import { FormInput } from "../../../components/Forms/Form";
import { H2Heading } from "../../../components/styled";
import { config } from "../../../config/config";
import { postAuthorized } from "../../../services";
import { Button } from "@mui/material";
const RegisterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: auto;
`;
const Box = styled.div`
  width: 100%;
  padding: 10px;
`;
const Div = styled.div`
  width: 25%;
  margin: 10px;
`;

const RegisterUser = ({ toggle }: { toggle: () => void }) => {
  const [customerData, setCustomerData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    resource_type: "SuperAdmin",
  });

  const onChange = (target) => {
    setCustomerData({ ...customerData, [target?.name]: target?.value });
  };

  const onSubmit = async () => {
    let url = `${config.baseUrl}/auth/registerAdmin`;

    try {
      const { data } = await postAuthorized(url, customerData);
      toggle();
    } catch (error) {}
  };
  return (
    <div>
      <FlexDiv justifyContentCenter>
        <H2Heading>Register</H2Heading>
      </FlexDiv>

      <RegisterDiv>
        <Box>
          <FlexDiv justifyContentCenter margin="auto" wrap width="100%">
            <Div>
              <FormInput
                type="text"
                name="first_name"
                value={customerData?.first_name}
                onChange={(target) => onChange(target)}
                fieldErrors={{}}
                label="First Name"
              />
            </Div>

            <Div>
              <FormInput
                type="text"
                name="last_name"
                value={customerData?.last_name}
                onChange={(target) => onChange(target)}
                fieldErrors={{}}
                label="Last Name"
              />
            </Div>

            <Div>
              <FormInput
                type="text"
                name="email"
                value={customerData?.email}
                onChange={(target) => onChange(target)}
                fieldErrors={{}}
                label="Email "
              />
            </Div>

            <Div>
              <FormInput
                type="text"
                name="phone_number"
                value={customerData?.phone_number}
                onChange={(target) => onChange(target)}
                fieldErrors={{}}
                label="Phone Number"
                maxLength={10}
              />
            </Div>

            <Div>
              <FormInput
                type="password"
                name="password"
                value={customerData?.password}
                onChange={(target) => onChange(target)}
                fieldErrors={{}}
                label="Password"
              />
            </Div>

            <Div>{null}</Div>
          </FlexDiv>
        </Box>
      </RegisterDiv>
      <FlexDiv justifyContentFlexEnd width="80%">
        <Button variant="contained" color="success" onClick={onSubmit}>
          Submit{" "}
        </Button>
      </FlexDiv>
    </div>
  );
};

export default RegisterUser;
