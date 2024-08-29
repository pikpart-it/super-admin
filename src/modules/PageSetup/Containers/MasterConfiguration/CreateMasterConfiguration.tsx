import { Button, FormControlLabel, Switch } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
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
import { appModuleMasterTypes } from "../AppModuleMaster/ListAppModuleMaster";
import { modulePageMasterTypes } from "../ModulePageMaster/ListModulePageMaster";
import { appRoleMasterSetupTypes } from "../AppRoleMaster/AppRoleMasterSetupList";
import { roleTypes } from "../RoleMaster/RoleMasterList";
import { FaArrowRight } from "react-icons/fa";
import ListMasterConfiguration from "./ListMasterConfiguration";

const CreateMasterConfiguration = ({ history }) => {
  const [moduleMasterList, setModuleMasterList] = useState<
    appModuleMasterTypes[]
  >([]);
  const [appRoleMasterList, setAppRoleMasterList] = useState<
    appRoleMasterSetupTypes[]
  >([]);
  const [modulePageMasterList, setModulePageMasterList] = useState<
    modulePageMasterTypes[]
  >([]);
  const [appMasterList, setAppMasterList] = useState<appMasterTypes[]>([]);

  const [loader, setloader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });
  const [masterConfiguration, setMasterConfiguration] = useState({
    page_name: "",
    page_description: "",
    route_key: "",
    module_name: { moduleName: "", moduleId: 0, routeKey: "" },
    app_name: { appName: "", id: 0, appId: "" },
    role_name: { roleName: "", id: 0 },
    app_id: "",
    role_id: "",
    priviledge_type: "Create",
    app_module_route_key: "",
    route_path: "",
    is_active: true,
  });
  const getModuleMasterList = async () => {
    let url = `${config.baseUrl}/superAdmin/appModuleMasters`;

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

  const getAppRoleMaster = async () => {
    let url = `${config.baseUrl}/superAdmin/appRoleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setAppRoleMasterList(data?.data);
    } catch (error) {}
  };

  const getPageMaster = async () => {
    let url = `${config.baseUrl}/superAdmin/modulePageMasters`;

    try {
      const { data } = await getAuthorized(url);
      const modified = data?.data?.map((i) => ({ ...i, checked: false }));
      const filtered = modified?.filter(
        (i) => i?.moduleId === masterConfiguration.module_name.moduleId
      );
      setModulePageMasterList(filtered);
    } catch (error) {}
  };
  const onChange = (target) => {
    const { name, value } = target;
    setMasterConfiguration({ ...masterConfiguration, [name]: value });
  };
  const perparePayload = () => {
    return modulePageMasterList
      ?.filter((i) => i?.checked)
      ?.map((k) => ({
        page_name: k?.pageName,
        page_description: k?.pageDescription,
        route_key: k?.routeKey,
        module_name: masterConfiguration?.module_name?.moduleName,
        module_id: masterConfiguration?.module_name?.moduleId,
        app_module_route_key: masterConfiguration?.module_name?.routeKey,
        app_name: masterConfiguration?.app_name.appName,
        app_id: masterConfiguration?.app_name.appId,
        role_name: masterConfiguration?.role_name.roleName,
        role_id: masterConfiguration?.role_name.id,
        is_active: masterConfiguration?.is_active,
        priviledge_type: masterConfiguration?.priviledge_type,
      }));
  };

  const onSubmit = async () => {
    setloader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/superAdmin/addUpdateMasterConfiguration`;

    const payload = {
      priviledge_type_configs: perparePayload(),
    };
    try {
      const res = await postAuthorized(url, payload);

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
        msg: "Something Went Wrong!",
      });
      setTimeout(() => {
        setloader({ ...loader, msg: "" });
      }, 5000);
    }
  };

  const onPageSelect = (e: ChangeEvent<HTMLInputElement>, key: number) => {
    const { checked } = e.target;

    const newPages = [...modulePageMasterList];
    console.log({ key, checked });
    newPages[key] = {
      ...newPages[key],
      checked,
    };

    setModulePageMasterList(newPages);
  };

  useEffect(() => {
    getModuleMasterList();
    getAppRoleMaster();
    getAppMasterList();
  }, []);

  useEffect(() => {
    getPageMaster();
  }, [masterConfiguration?.module_name?.moduleId]);
  console.log({ modulePageMasterList });
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Master Configuration</H2Heading>
      </FlexDiv>

      <FlexDiv justifyContentCenter>
        <FlexDiv justifyContentSpaceEvenly width="80%">
          <Container>
            <MyFormSelect
              name="app_name"
              list={[]}
              fieldErrors={{}}
              selectProps={{
                renderValue: (val) => val?.appId,
              }}
              value={masterConfiguration?.app_name}
              onChange={(target) => onChange(target)}
              label="App Name *"
              options={appMasterList}
              optionLabel="appId"
            />
          </Container>{" "}
          <div style={{ margin: "auto 0px" }}>
            <FaArrowRight />
          </div>
          <Container>
            <MyFormSelect
              name="role_name"
              list={[]}
              fieldErrors={{}}
              selectProps={{
                renderValue: (val) => val?.roleName,
              }}
              value={masterConfiguration?.role_name}
              onChange={(target) => onChange(target)}
              label="App Role *"
              options={appRoleMasterList?.filter(
                (i) => i?.appId === masterConfiguration?.app_name?.id
              )}
              optionLabel="roleName"
            />
          </Container>
          <div style={{ margin: "auto 0px" }}>
            <FaArrowRight />
          </div>
          <Container>
            <MyFormSelect
              name="module_name"
              list={[]}
              fieldErrors={{}}
              selectProps={{
                renderValue: (val) => val?.moduleName,
              }}
              value={masterConfiguration?.module_name}
              onChange={(target) => onChange(target)}
              label="Module Name *"
              options={moduleMasterList?.filter(
                (i) => i?.appId === masterConfiguration?.app_name?.id
              )}
            />
          </Container>
        </FlexDiv>
      </FlexDiv>
      {masterConfiguration?.module_name?.moduleId && (
        <ListMasterConfiguration
          onPageSelect={onPageSelect}
          modulePageMasterList={modulePageMasterList}
        />
      )}
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

export default CreateMasterConfiguration;
