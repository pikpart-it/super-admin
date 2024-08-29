import { Button, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { FormInput, MyFormSelect } from "../../../../components/Forms/Form";
import { Loader } from "../../../../components/Loader";
import MsgCard from "../../../../components/MsgCard";
import { H2Heading } from "../../../../components/styled";
import { config } from "../../../../config/config";
import {
  getAuthorized,
  postAuthorized,
  putAuthorized,
} from "../../../../services";
import { FlexDiv } from "../../../../style/styled";
import { Container } from "../RoleMaster/CreateRoleMaster";
import { appMasterTypes } from "../AppMaster/ListAppMaster";
import { appModuleMasterTypes } from "./ListAppModuleMaster";
import { moduleMasterTypes } from "../ModuleMaster/ListModules";

const CreateAppModuleMaster = ({ history }) => {
  const dataForEdit: appModuleMasterTypes = history?.location?.state;
  const [appMasterList, setAppMasterList] = useState<appMasterTypes[]>([]);
  const [moduleMasterList, setModuleMasterList] = useState<moduleMasterTypes[]>(
    []
  );
  const [loader, setloader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });
  const [appModuleMaster, setAppModuleMaster] = useState({
    app_name: { appName: "", appId: "", id: 0 },
    module_name: { moduleName: "", id: 0, routeKey: "" },
  });

  const getModuleMaster = async () => {
    let url = `${config.baseUrl}/superAdmin/moduleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setModuleMasterList(data?.data);
    } catch (error) {}
  };
  const getAppMasterList = async () => {
    let url = `${config.baseUrl}/superAdmin/appMasters`;

    try {
      const { data } = await getAuthorized(url);
      setAppMasterList(data?.data);
    } catch (error) {}
  };
  const onChange = (target) => {
    const { name, value } = target;
    if (name === "app_name") {
      setAppModuleMaster({
        ...appModuleMaster,
        [name]: value,
      });
    } else {
      setAppModuleMaster({ ...appModuleMaster, [name]: value });
    }
  };

  const onSubmit = async () => {
    setloader({ ...loader, isLoading: true });
    const { app_name, module_name } = appModuleMaster;
    const payload = {
      ...appModuleMaster,
      app_name: app_name?.appId,
      app_id: app_name?.id,
      module_name: module_name?.moduleName,
      module_id: module_name?.id,
      route_key: module_name?.routeKey,
    };
    try {
      let res;
      let url;

      if (dataForEdit?.id) {
        url = `${config.baseUrl}/superAdmin/updateAppModuleMaster`;
        res = await putAuthorized(url, { ...payload, id: dataForEdit?.id });
      } else {
        url = `${config.baseUrl}/superAdmin/addAppModuleMaster`;
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
    } catch (error) {}
  };

  useEffect(() => {
    if (dataForEdit) {
      setAppModuleMaster({
        ...appModuleMaster,
        module_name: moduleMasterList?.find(
          (i) => i?.id === dataForEdit?.moduleId
        )!,
        app_name: appMasterList?.find((i) => i?.id === dataForEdit?.appId)!,
      });
    }
  }, [dataForEdit, appMasterList, moduleMasterList]);
  useEffect(() => {
    getAppMasterList();
    getModuleMaster();
  }, []);

  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>App Module Master</H2Heading>
      </FlexDiv>

      <FlexDiv justifyContentCenter>
        <FlexDiv column alignItemsCenter width="80%">
          <Container>
            <MyFormSelect
              name="app_name"
              list={[]}
              fieldErrors={{}}
              selectProps={{
                renderValue: (val) => val?.appName,
              }}
              value={appModuleMaster?.app_name}
              onChange={(target) => onChange(target)}
              label="App Name"
              options={appMasterList}
            />
          </Container>
          <Container>
            <MyFormSelect
              name="module_name"
              list={[]}
              fieldErrors={{}}
              selectProps={{
                renderValue: (val) => val?.moduleName,
              }}
              value={appModuleMaster?.module_name}
              onChange={(target) => onChange(target)}
              label="Module Name"
              options={moduleMasterList}
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

export default CreateAppModuleMaster;
