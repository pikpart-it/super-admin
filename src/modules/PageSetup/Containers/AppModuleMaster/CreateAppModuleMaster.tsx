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
import { Autocomplete, FormControl, FormLabel } from "@mui/joy";
import { appTypes } from "../AppMaster/CreateAppMaster";

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
    app_type: { name: "", value: "" },
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
      app_type: undefined,
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
      setAppModuleMaster({
        ...appModuleMaster,
        app_name: { appName: "", appId: "", id: 0 },
        app_type: { name: "", value: "" },
        module_name: { id: 0, moduleName: "", routeKey: "" },
      });
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
      setAppModuleMaster({
        ...appModuleMaster,
        module_name: moduleMasterList?.find(
          (i) => i?.id === dataForEdit?.moduleId
        )!,
        app_name: appMasterList?.find((i) => i?.id === dataForEdit?.appId)!,
        app_type: appTypes?.find((i) => i?.value === dataForEdit?.appType)!,
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
            <FormControl>
              <FormLabel>App Type*</FormLabel>
              <Autocomplete
                value={appModuleMaster?.app_type}
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
                value={appModuleMaster?.app_name}
                onChange={(e, value) => onChange({ name: "app_name", value })}
                options={appMasterList?.filter(
                  (i) => i?.appType === appModuleMaster?.app_type?.value
                )}
                getOptionLabel={(option: any) => option?.appName}
              />
            </FormControl>
          </Container>

          <Container>
            <FormControl>
              <FormLabel>Module Name*</FormLabel>
              <Autocomplete
                value={appModuleMaster?.module_name}
                onChange={(e, value) =>
                  onChange({ name: "module_name", value })
                }
                options={moduleMasterList}
                getOptionLabel={(option: any) => option?.moduleName}
              />
            </FormControl>
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
