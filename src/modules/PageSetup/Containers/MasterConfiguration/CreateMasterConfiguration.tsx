import { Autocomplete, FormControl, FormLabel } from "@mui/joy";
import { Button } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Loader } from "../../../../components/Loader";
import MsgCard from "../../../../components/MsgCard";
import { H2Heading } from "../../../../components/styled";
import { config } from "../../../../config/config";
import { getAuthorized, postAuthorized } from "../../../../services";
import { FlexDiv } from "../../../../style/styled";
import { appMasterTypes } from "../AppMaster/ListAppMaster";
import { appModuleMasterTypes } from "../AppModuleMaster/ListAppModuleMaster";
import { appRoleMasterSetupTypes } from "../AppRoleMaster/AppRoleMasterSetupList";
import { modulePageMasterTypes } from "../ModulePageMaster/ListModulePageMaster";
import { Container } from "../RoleMaster/CreateRoleMaster";
import ListMasterConfigurationTable from "./ListMasterConfigurationTable";
import { appTypes } from "../AppMaster/CreateAppMaster";

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
    app_type: { name: "", value: "" },
    role_name: { roleName: "", id: 0, roleId: 0 },
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
      const modified = data?.data?.map((i) => ({
        ...i,
        checked: false,
        create: false,
        update: false,
        delete: false,
        get: false,
      }));
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
        route_path: k?.routePath,
        module_name: masterConfiguration?.module_name?.moduleName,
        module_id: masterConfiguration?.module_name?.moduleId,
        app_module_route_key: masterConfiguration?.module_name?.routeKey,
        app_name: masterConfiguration?.app_name.appId,
        app_id: masterConfiguration?.app_name.id,
        role_name: masterConfiguration?.role_name.roleName,
        role_id: masterConfiguration?.role_name.roleId,
        is_active: masterConfiguration?.is_active,
        priviledge_type: masterConfiguration?.priviledge_type,
      }));
  };

  const onSubmit = async () => {
    setloader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/superAdmin/addUpdateMasterConfiguration`;

    const payload = {
      priviledge_type_configs: perparePayload(),
      config_types: returnConfigTypes(),
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
      setMasterConfiguration({
        ...masterConfiguration,
        app_name: { appId: "", appName: "", id: 0 },
        module_name: { moduleId: 0, moduleName: "", routeKey: "" },
      });
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
    const { name, checked } = e.target;

    const newPages = [...modulePageMasterList];
    newPages[key] = {
      ...newPages[key],
      [name]: checked,
    };

    setModulePageMasterList(newPages);
  };

  const returnConfigTypes = () => {
    const configTypes: any[] = [];

    for (let i = 0; i < modulePageMasterList?.length; i++) {
      const page = modulePageMasterList[i];
      if (page.create) {
        configTypes.push({
          priviledge_type: "create",
          route_key: `${page.routeKey}create`,
          route_path: page.routePath,
          is_active: true,
        });
      }
      if (page.update) {
        configTypes.push({
          priviledge_type: "update",
          route_key: `${page.routeKey}update`,
          route_path: page.routePath,
          is_active: true,
        });
      }
      if (page.delete) {
        configTypes.push({
          priviledge_type: "delete",
          route_key: `${page.routeKey}delete`,
          route_path: page.routePath,
          is_active: true,
        });
      }
      if (page.get) {
        configTypes.push({
          priviledge_type: "get",
          route_key: `${page.routeKey}get`,
          route_path: page.routePath,
          is_active: true,
        });
      }
    }
    return configTypes;
  };

  useEffect(() => {
    getModuleMasterList();
    getAppRoleMaster();
    getAppMasterList();
  }, []);

  useEffect(() => {
    getPageMaster();
  }, [masterConfiguration?.module_name?.moduleId]);
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Master Configuration</H2Heading>
      </FlexDiv>

      <FlexDiv justifyContentCenter>
        <FlexDiv justifyContentSpaceEvenly width="90%">
          <Container style={{ width: "20%" }}>
            <FormControl>
              <FormLabel>App Type*</FormLabel>
              <Autocomplete
                value={masterConfiguration?.app_type}
                onChange={(e, value) => onChange({ name: "app_type", value })}
                options={appTypes}
                getOptionLabel={(option: any) => option?.name}
              />
            </FormControl>
          </Container>
          <div style={{ margin: "3% 0px 0px 0px" }}>
            <FaArrowRight />
          </div>
          <Container style={{ width: "20%" }}>
            <FormControl>
              <FormLabel>App Name*</FormLabel>
              <Autocomplete
                value={masterConfiguration?.app_name}
                onChange={(e, value) => onChange({ name: "app_name", value })}
                options={appMasterList?.filter(
                  (i) => i?.appType === masterConfiguration?.app_type?.value
                )}
                getOptionLabel={(option: any) => option?.appName}
              />
            </FormControl>
          </Container>
          <div style={{ margin: "3% 0px 0px 0px" }}>
            <FaArrowRight />
          </div>
          <Container style={{ width: "20%" }}>
            <FormControl>
              <FormLabel>Role Name*</FormLabel>

              <Autocomplete
                value={masterConfiguration?.role_name}
                onChange={(e, value) => onChange({ name: "role_name", value })}
                options={appRoleMasterList?.filter(
                  (i) => i?.appId === masterConfiguration?.app_name?.id
                )}
                getOptionLabel={(option: any) => option?.roleName}
              />
            </FormControl>
          </Container>
          <div style={{ margin: "3% 0px 0px 0px" }}>
            <FaArrowRight />
          </div>
          <Container style={{ width: "20%" }}>
            <FormControl>
              <FormLabel>Module Name*</FormLabel>

              <Autocomplete
                value={masterConfiguration?.module_name}
                onChange={(e, value) =>
                  onChange({ name: "module_name", value })
                }
                options={moduleMasterList?.filter(
                  (i) => i?.appId === masterConfiguration?.app_name?.id
                )}
                getOptionLabel={(option: any) => option?.moduleName}
              />
            </FormControl>
          </Container>
        </FlexDiv>
      </FlexDiv>
      {masterConfiguration?.module_name?.moduleId && (
        <ListMasterConfigurationTable
          onPageSelect={onPageSelect}
          modulePageMasterList={modulePageMasterList}
        />
      )}
      <FlexDiv justifyContentFlexEnd width="80%" margin="8% 0px 0px 0px">
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
