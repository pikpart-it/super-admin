import React, { useEffect, useState } from "react";
import { config } from "../../../../config/config";
import {
  getAuthorized,
  postAuthorized,
  putAuthorized,
} from "../../../../services";
import { FlexDiv } from "../../../../style/styled";
import { H2Heading } from "../../../../components/styled";
import { FormInput, MyFormSelect } from "../../../../components/Forms/Form";
import { Button } from "@mui/material";
import { Container } from "../RoleMaster/CreateRoleMaster";
import { roleTypes } from "../RoleMaster/RoleMasterList";
import AppRoleMasterSetupList, {
  appRoleMasterSetupTypes,
} from "./AppRoleMasterSetupList";
import { Loader } from "../../../../components/Loader";
import MsgCard from "../../../../components/MsgCard";
import { appMasterTypes } from "../AppMaster/ListAppMaster";
import { Autocomplete, FormControl, FormLabel } from "@mui/joy";
import { appTypes } from "../AppMaster/CreateAppMaster";
import { ProductWrapper } from "../../../ProductManufacturer/Businessunits/component/AddBUForm";

const AppRoleMasterSetup = ({ history }) => {
  const [loader, setloader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });
  const [rolesList, setRolesList] = useState<roleTypes[]>([]);
  const [appRoleMasterList, setAppRoleMasterList] = useState<
    appRoleMasterSetupTypes[]
  >([]);
  const [appMasterList, setAppMasterList] = useState<appMasterTypes[]>([]);
  const [appRoleMaster, setAppRoleMaster] = useState({
    app_name: { appName: "", id: 0, appId: "" },
    app_type: { name: "", value: "" },
    app_id: "",
    rank: { id: 0, rankCode: "", rankDescription: "" },
    role_name: { roleName: "", id: 0 },
    role_id: "",
    id: 0,
  });
  const [rankData, setRankData] = useState<any>([])

  const getRankData = async () => {
    let url = `${config.baseUrl}/superAdmin/userRanks`
    try {
      const resp = await getAuthorized(url)
      setRankData(resp?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAppMasterList = async () => {
    let url = `${config.baseUrl}/superAdmin/appMasters`;

    try {
      const { data } = await getAuthorized(url);
      setAppMasterList(data?.data);
    } catch (error) { }
  };
  const getRolesList = async () => {
    let url = `${config.baseUrl}/superAdmin/roleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setRolesList(data?.data);
    } catch (error) { }
  };

  const getAppRoleMaster = async () => {
    let url = `${config.baseUrl}/superAdmin/appRoleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setAppRoleMasterList(data?.data);
    } catch (error) { }
  };
  const deleteItem = async (id: number) => {
    setloader({ ...loader, isLoading: true });

    let url = `${config.baseUrl}/superAdmin/deactivateAppRoleMaster`;

    try {
      const { data } = await putAuthorized(url, { id });
      setloader({
        ...loader,
        isLoading: false,
        error: data?.error,
        msg: data?.message,
      });
      setTimeout(() => {
        setloader({ ...loader, msg: "" });
      }, 2000);
      getAppRoleMaster();
      reset();
    } catch (error) {
      setloader({
        ...loader,
        isLoading: false,
        error: true,
        msg: "Something Went Wrong",
      });
      setTimeout(() => {
        setloader({ ...loader, msg: "" });
      }, 5000);
    }
  };

  const onChange = (target) => {
    const { name, value } = target;
    if (name === "role_name") {
      setAppRoleMaster({ ...appRoleMaster, [name]: value });
    } else {
      setAppRoleMaster({
        ...appRoleMaster,
        [name]: value,
      });
    }
  };
  const reset = () => {
    setAppRoleMaster({
      ...appRoleMaster,
      app_name: { appId: "", appName: "", id: 0 },
      app_type: { name: "", value: "" },
      role_name: { id: 0, roleName: "" },
      id: 0,
      rank: { id: 0, rankCode: "", rankDescription: "" },
    });
  };

  const submitEnabled = () => {
    const { app_type, app_name, role_name } = appRoleMaster;
    if (!role_name?.roleName || !app_name || !app_type?.value) {
      return true;
    } else {
      return false;
    }
  };
  const onSubmit = async () => {
    setloader({ ...loader, isLoading: true });

    const payload = {
      role_name: appRoleMaster?.role_name?.roleName,
      role_id: appRoleMaster?.role_name?.id,
      app_name: appRoleMaster?.app_name?.appId,
      app_id: appRoleMaster?.app_name?.id,
      app_type: undefined,
      rank_code: appRoleMaster?.rank?.rankCode,
      rank_id: appRoleMaster?.rank?.id,
      id: appRoleMaster?.id || undefined,
    };
    try {
      let res;
      let url;

      if (appRoleMaster?.id) {
        url = `${config.baseUrl}/superAdmin/updateAppRoleMaster `;
        res = await putAuthorized(url, payload);
      } else {
        url = `${config.baseUrl}/superAdmin/addAppRoleMaster`;
        res = await postAuthorized(url, payload);
      }
      setloader({
        ...loader,
        isLoading: false,
        error: res?.data?.error,
        msg: res?.data?.message,
      });
      setTimeout(() => {
        setloader({ ...loader, msg: "" });
      }, 5000);
      getAppRoleMaster();
      reset();
    } catch (error) {
      setloader({
        ...loader,
        isLoading: false,
        error: true,
        msg: "Something Went Wrong",
      });
      setTimeout(() => {
        setloader({ ...loader, msg: "" });
      }, 5000);
    }
  };

  const edit = (dataForEdit: appRoleMasterSetupTypes) => {
    console.log(dataForEdit)
    setAppRoleMaster({
      ...appRoleMaster,
      id: dataForEdit?.id,
      app_name: appMasterList?.find((i) => i?.id === dataForEdit?.appId)!,
      role_name: rolesList?.find((i) => i?.roleName === dataForEdit?.roleName)!,
      app_type: appTypes?.find((i) => i?.value === dataForEdit?.appType)!,
      rank: rankData?.find((i) => i?.rankCode === dataForEdit?.rankCode)
    });
  };

  useEffect(() => {
    getRolesList();
    getAppMasterList();
    getAppRoleMaster();
    getRankData()
  }, []);
  console.log(appRoleMaster)
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <FlexDiv justifyContentCenter style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "1.3rem", color: "#f65000" }}>Create App Role Master</div>
      </FlexDiv>

      <ProductWrapper style={{ background: "#fbfbfb", padding: "20px" }}>
        <FlexDiv justifyContentSpaceBetween wrap>
          <Container>
            <FormControl>
              <FormLabel>App Type*</FormLabel>
              <Autocomplete
                value={appRoleMaster?.app_type}
                onChange={(e, value) => onChange({ name: "app_type", value })}
                options={appTypes}
                getOptionLabel={(option: any) => option?.name}
              />
            </FormControl>
          </Container>
          <Container>
            <FormControl>
              <FormLabel>App Name*</FormLabel>
              <Autocomplete
                value={appRoleMaster?.app_name}
                onChange={(e, value) => onChange({ name: "app_name", value })}
                options={appMasterList?.filter(
                  (i) => i?.appType === appRoleMaster?.app_type?.value
                )}
                getOptionLabel={(option: any) => option?.appName}
              />
            </FormControl>
          </Container>
          <Container>
            <FormControl>
              <FormLabel>Role Name*</FormLabel>
              <Autocomplete
                value={appRoleMaster?.role_name}
                onChange={(e, value) => onChange({ name: "role_name", value })}
                options={rolesList}
                getOptionLabel={(option: any) => option?.roleName}
              />
            </FormControl>
          </Container>
          <Container>
            <FormControl>
              <FormLabel>Select Rank</FormLabel>
              <Autocomplete
                value={appRoleMaster?.rank}
                onChange={(e, value) => onChange({ name: "rank", value })}
                options={rankData}
                getOptionLabel={(option: any) => option?.rankCode}
              />
            </FormControl>
          </Container>
          <Container style={{ margin: "30px 10px" }}>
            <Button
              variant="contained"
              color="success"
              onClick={onSubmit}
              disabled={submitEnabled()}
            >
              Submit
            </Button>
          </Container>
        </FlexDiv>

      </ProductWrapper>

      <AppRoleMasterSetupList
        appRoleMasterList={appRoleMasterList}
        edit={edit}
        deleteItem={deleteItem}
      />
      <Loader variant="m" isLoading={loader.isLoading} />
      <MsgCard
        style={{
          container: {
            width: "20%",
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

export default AppRoleMasterSetup;
