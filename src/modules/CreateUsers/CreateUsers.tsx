import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAuthorized, postAuthorized, putAuthorized } from "../../services";
import { config } from "../../config/config";
import { enableSubmit, validateEmail } from "../../utility/func";
import { FlexDiv } from "../../style/styled";
import { H2Heading } from "../../components/styled";
import { FormInput, MyFormSelect } from "../../components/Forms/Form";
import { FaEye } from "react-icons/fa";
import { Button } from "@mui/material";
import { Loader } from "../../components/Loader";
import MsgCard from "../../components/MsgCard";
import { ProductWrapper } from "../ProductManufacturer/Businessunits/component/AddBUForm";
import { useHistory } from "react-router-dom";
import { appRoleMasterSetupTypes } from "../PageSetup/Containers/AppRoleMaster/AppRoleMasterSetupList";

const RegisterDiv = styled.div`
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

const CreateSalesAdmin = () => {
  const history = useHistory();
  const dataforEdit = useHistory()?.location?.state;
  const [showPassword, setShowPassowrd] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);
  const [rankList, setRankList] = useState<appRoleMasterSetupTypes[]>([]);
  const [rankData, setRankData] = useState<any[]>([]);
  const [appRoleMasterList, setAppRoleMasterList] = useState<
    appRoleMasterSetupTypes[]
  >([]);
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
    rank: { rankCode: "", rankId: 0, rankType: "" },
    id: undefined,
  });
  const getAppRoleMaster = async () => {
    let url = `${config.baseUrl}/superAdmin/appRoleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setAppRoleMasterList(data?.data);
    } catch (error) {}
  };
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

  const getRankData = async () => {
    let url = `${config.baseUrl}/superAdmin/userRanks`;
    try {
      const resp = await getAuthorized(url);
      setRankData(resp?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log({ customerData });
  const Edit = async () => {
    setLoader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/superAdmin/updateAdminUserRole`;
    const rank_type = rankData?.find(
      (i) => i?.id === customerData?.rank?.rankId
    )?.rankType;
    const payload = {
      role_id: customerData?.role_type?.id,
      user_id: customerData?.id,
      rank_id: customerData?.rank?.rankId,
      rank_type,
    };
    try {
      const { data } = await putAuthorized(url, payload);
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
  const onSubmit = async () => {
    setLoader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/auth/registerAdmin`;
    const rank_type = rankData?.find(
      (i) => i?.id === customerData?.rank?.rankId
    )?.rankType;
    const payload = {
      ...customerData,
      resource_type: customerData?.role_type?.roleName,
      role_id: customerData?.role_type?.id,
      role_type: customerData?.role_type?.roleName,
      rank_id: customerData?.rank?.rankId,
      rank_type,
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
    rank: customerData?.rank?.rankId,
    id: "t",
  });

  useEffect(() => {
    getRoles();
    getAppRoleMaster();
  }, []);

  useEffect(() => {
    if (dataforEdit?.id) {
      setCustomerData({
        ...customerData,
        id: dataforEdit?.id,
        first_name: dataforEdit?.firstName,
        last_name: dataforEdit?.lastName,
        email: dataforEdit?.email,
        phone_number: dataforEdit?.phoneNumber,
        role_type: roles?.find((i) => i?.id === dataforEdit?.roleId),
        rank: rankList?.find((i) => i?.rankId === dataforEdit?.rankId)!,
      });
    }
  }, [dataforEdit, roles, rankList]);

  useEffect(() => {
    if (customerData?.role_type?.id) {
      const rankData = appRoleMasterList?.filter(
        (i) => i?.roleId === customerData?.role_type?.id
      );

      setRankList(rankData);
    }
  }, [customerData?.role_type]);
  useEffect(() => {
    setTimeout(() => {
      getRankData();
    }, 2000);
  }, []);
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <FlexDiv justifyContentCenter style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "1.3rem", color: "#f65000" }}>
          Register Users
        </div>
      </FlexDiv>

      <ProductWrapper style={{ background: "#fbfbfb", padding: "20px" }}>
        <FlexDiv
          alignItemsCenter
          margin="auto"
          wrap
          width="100%"
          justifyContentSpaceBetween
        >
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
            <MyFormSelect
              list={[]}
              options={rankList}
              name="rank"
              value={customerData?.rank}
              onChange={(target) => onChange(target)}
              fieldErrors={{}}
              label="Rank *"
              optionLabel="rankCode"
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

          {!dataforEdit?.id && (
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
          )}

          <Div>{null}</Div>
        </FlexDiv>
        <FlexDiv justifyContentFlexEnd width="80%">
          <Button
            variant="contained"
            color="success"
            onClick={dataforEdit?.id ? Edit : onSubmit}
            disabled={dataforEdit?.id ? false : enabled}
          >
            Submit{" "}
          </Button>
        </FlexDiv>
      </ProductWrapper>

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
