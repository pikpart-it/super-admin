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
import { appRoleMasterSetupTypes } from "./AppRoleMasterSetupList";
import { Loader } from "../../../../components/Loader";
import MsgCard from "../../../../components/MsgCard";
import { appMasterTypes } from "../AppMaster/ListAppMaster";

const AppRoleMasterSetup = ({ history }) => {
  const dataForEdit: appRoleMasterSetupTypes = history?.location?.state;
  const [loader, setloader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });
  const [rolesList, setRolesList] = useState<roleTypes[]>([]);
  const [appMasterList, setAppMasterList] = useState<appMasterTypes[]>([]);
  const [appRoleMaster, setAppRoleMaster] = useState({
    app_name: { appName: "", id: 0 },
    app_id: "",
    role_name: { roleName: "", id: 0 },
    role_id: "",
  });
  const getAppMasterList = async () => {
    let url = `${config.baseUrl}/superAdmin/appMasters`;

    try {
      const { data } = await getAuthorized(url);
      setAppMasterList(data?.data);
    } catch (error) {}
  };
  const getRolesList = async () => {
    let url = `${config.baseUrl}/superAdmin/roleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setRolesList(data?.data);
    } catch (error) {}
  };
  const onChange = (target) => {
    const { name, value } = target;
    if (name === "role_name") {
      setAppRoleMaster({ ...appRoleMaster, [name]: value, role_id: value?.id });
    } else {
      setAppRoleMaster({
        ...appRoleMaster,
        [name]: value,
        app_id: value?.appId,
      });
    }
  };

  const onSubmit = async () => {
    setloader({ ...loader, isLoading: true });

    const payload = {
      ...appRoleMaster,
      role_name: appRoleMaster?.role_name?.roleName,
      app_name: appRoleMaster?.app_name?.appName,
    };
    try {
      let res;
      let url;

      if (dataForEdit?.id) {
        url = `${config.baseUrl}/superAdmin/updateAppRoleMaster `;
        res = await putAuthorized(url, { ...payload, id: dataForEdit?.id });
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

  useEffect(() => {
    if (dataForEdit) {
      setAppRoleMaster({
        ...appRoleMaster,
        app_name: appMasterList?.find(
          (i) => i?.appName === dataForEdit?.appName
        )!,
        role_name: rolesList?.find(
          (i) => i?.roleName === dataForEdit?.roleName
        )!,
      });
    }
  }, [dataForEdit]);

  useEffect(() => {
    getRolesList();
    getAppMasterList();
  }, []);
  console.log({ appRoleMaster, dataForEdit });
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Create App Role Master</H2Heading>
      </FlexDiv>

      <FlexDiv justifyContentCenter>
        <FlexDiv column alignItemsCenter width="80%">
          <Container>
            <MyFormSelect
              name="app_name"
              list={[]}
              fieldErrors={{}}
              value={appRoleMaster?.app_name}
              onChange={(target) => onChange(target)}
              label="App Name"
              options={appMasterList}
            />
          </Container>

          <Container>
            <MyFormSelect
              name="role_name"
              list={[]}
              fieldErrors={{}}
              value={appRoleMaster?.role_name}
              onChange={(target) => onChange(target)}
              label="Role Name"
              options={rolesList}
            />
          </Container>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv justifyContentFlexEnd width="70%">
        <Button variant="contained" color="success" onClick={onSubmit}>
          Submit
        </Button>
      </FlexDiv>
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
    </>
  );
};

export default AppRoleMasterSetup;
