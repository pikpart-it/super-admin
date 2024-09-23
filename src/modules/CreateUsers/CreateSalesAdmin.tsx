import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAuthorized, postAuthorized } from "../../services";
import { config } from "../../config/config";
import { enableSubmit, validateEmail } from "../../utility/func";
import { FlexDiv } from "../../style/styled";
import { H2Heading } from "../../components/styled";
import { FormInput, MyFormSelect } from "../../components/Forms/Form";
import { FaEye } from "react-icons/fa";
import { Button } from "@mui/material";
import { Loader } from "../../components/Loader";
import MsgCard from "../../components/MsgCard";

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

const CreateSalesAdmin = ({ history }) => {
  const [showPassword, setShowPassowrd] = useState(false);
  const [roles, setRoles] = useState([]);
  const [loader, setLoader] = useState({
    error: false,
    msg: "",
    isLoading: false,
  });
  const [customerData, setCustomerData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    role_type: { roleName: "", id: 0 },
  });

  const onChange = (target) => {
    setCustomerData({ ...customerData, [target?.name]: target?.value });
  };
  const getRoles = async () => {
    let url = `${config.baseUrl}/utilities/roleMasters`;
    try {
      const { data } = await getAuthorized(url);
      setRoles(data?.data);
    } catch (error) {}
  };
  const onSubmit = async () => {
    setLoader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/auth/registerAdmin`;
    const payload = {
      ...customerData,
      resource_type: customerData?.role_type?.roleName,
      role_id: customerData?.role_type?.id,
      role_type: customerData?.role_type?.roleName,
    };
    try {
      const { data } = await postAuthorized(url, payload);
      setLoader({
        ...loader,
        isLoading: false,
        error: data?.error,
        msg: data?.message,
      });
      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
        history.goBack();
      }, 3000);
    } catch (error) {
      setLoader({
        ...loader,
        isLoading: false,
        error: true,
        msg: "Something Went Wrong!",
      });
      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 3000);
    }
  };
  const enabled = enableSubmit({
    ...customerData,
    role_type: customerData?.role_type?.roleName,
  });

  useEffect(() => {
    getRoles();
  }, []);
  return (
    <div>
      <FlexDiv justifyContentCenter>
        <H2Heading>Register Sale Admin Users</H2Heading>
      </FlexDiv>

      <RegisterDiv>
        <Box>
          <FlexDiv column alignItemsCenter margin="auto" wrap width="100%">
            <Div>
              <FormInput
                type="text"
                name="first_name"
                value={customerData?.first_name}
                onChange={(target) => onChange(target)}
                fieldErrors={{}}
                label="First Name *"
              />
            </Div>

            <Div>
              <FormInput
                type="text"
                name="last_name"
                value={customerData?.last_name}
                onChange={(target) => onChange(target)}
                fieldErrors={{}}
                label="Last Name *"
              />
            </Div>
            <Div>
              <MyFormSelect
                list={[]}
                options={roles}
                name="role_type"
                value={customerData?.role_type}
                onChange={(target) => onChange(target)}
                fieldErrors={{}}
                label="Role Type *"
              />
            </Div>

            <Div>
              <FormInput
                type="text"
                name="email"
                value={customerData?.email}
                onChange={(target) => onChange(target)}
                fieldErrors={{}}
                label="Email *"
              />
              {customerData?.email?.length > 0 &&
                !validateEmail(customerData?.email) && (
                  <p style={{ color: "red", textAlign: "center" }}>
                    Invalid Email!!
                  </p>
                )}
            </Div>

            <Div>
              <FormInput
                type="text"
                name="phone_number"
                value={customerData?.phone_number}
                onChange={(target) => onChange(target)}
                fieldErrors={{}}
                label="Phone Number *"
                maxLength={10}
              />
              {customerData?.phone_number?.length > 0 &&
                customerData?.phone_number?.length < 10 && (
                  <p style={{ color: "red", textAlign: "center" }}>
                    Invalid phone Number!!
                  </p>
                )}
            </Div>

            <Div>
              <FlexDiv justifyContentCenter width="100%">
                <FormInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={customerData?.password}
                  onChange={(target) => onChange(target)}
                  fieldErrors={{}}
                  label="Password *"
                />
                <div
                  style={{
                    margin: "auto 5px",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassowrd(!showPassword)}
                >
                  <FaEye />
                </div>
              </FlexDiv>
            </Div>

            <Div>{null}</Div>
          </FlexDiv>
        </Box>
      </RegisterDiv>
      <FlexDiv justifyContentFlexEnd width="80%">
        <Button
          variant="contained"
          color="success"
          onClick={onSubmit}
          disabled={enabled}
        >
          Submit{" "}
        </Button>
      </FlexDiv>
      <Loader variant="m" isLoading={loader.isLoading} />
      <MsgCard
        style={{
          container: {
            width: "22%",
          },
        }}
        msg={loader?.msg}
        variant={loader?.error ? "danger" : "success"}
        ghost
        card
      />
    </div>
  );
};

export default CreateSalesAdmin;
