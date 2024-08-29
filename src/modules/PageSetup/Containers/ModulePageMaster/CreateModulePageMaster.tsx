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
import { appModuleMasterTypes } from "../AppModuleMaster/ListAppModuleMaster";
import { modulePageMasterTypes } from "./ListModulePageMaster";
import { moduleMasterTypes } from "../ModuleMaster/ListModules";

const CreateModulePageMaster = ({ history }) => {
  const dataForEdit: modulePageMasterTypes = history?.location?.state;
  const [moduleMasterList, setModuleMasterList] = useState<moduleMasterTypes[]>(
    []
  );
  const [loader, setloader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });
  const [modulePageMaster, setModulePageMaster] = useState({
    page_name: "",
    page_description: "",
    module_name: { moduleName: "", id: 0 },
    route_key: "",
    route_path: "",
  });
  const getModuleMasterList = async () => {
    let url = `${config.baseUrl}/superAdmin/moduleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setModuleMasterList(data?.data);
    } catch (error) {}
  };
  const onChange = (target) => {
    const { name, value } = target;
    if (name === "app_name") {
      setModulePageMaster({
        ...modulePageMaster,
        [name]: value,
      });
    } else {
      setModulePageMaster({ ...modulePageMaster, [name]: value });
    }
  };

  const onSubmit = async () => {
    setloader({ ...loader, isLoading: true });

    const payload = {
      ...modulePageMaster,
      module_name: modulePageMaster?.module_name?.moduleName,
      module_id: modulePageMaster?.module_name?.id,
    };
    try {
      let res;
      let url;

      if (dataForEdit?.id) {
        url = `${config.baseUrl}/superAdmin/updateModulePageMaster`;
        res = await putAuthorized(url, { ...payload, id: dataForEdit?.id });
      } else {
        url = `${config.baseUrl}/superAdmin/addModulePageMaster`;
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
        msg: "Something Went Wrong!",
      });
      setTimeout(() => {
        setloader({ ...loader, msg: "" });
      }, 5000);
    }
  };

  useEffect(() => {
    if (dataForEdit) {
      setModulePageMaster({
        ...modulePageMaster,
        module_name: moduleMasterList?.find(
          (i) => i?.id === dataForEdit?.moduleId
        )!,
        route_key: dataForEdit?.routeKey,
        page_name: dataForEdit?.pageName,
        page_description: dataForEdit?.pageDescription,
        route_path: dataForEdit?.routePath,
      });
    }
  }, [dataForEdit, moduleMasterList]);
  useEffect(() => {
    getModuleMasterList();
  }, []);
  console.log({ modulePageMaster, dataForEdit });
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Module Page Master</H2Heading>
      </FlexDiv>

      <FlexDiv justifyContentCenter>
        <FlexDiv column alignItemsCenter width="80%">
          <Container>
            <MyFormSelect
              name="module_name"
              list={[]}
              fieldErrors={{}}
              selectProps={{
                renderValue: (val) => val?.moduleName,
              }}
              value={modulePageMaster?.module_name}
              onChange={(target) => onChange(target)}
              label="Module Name"
              options={moduleMasterList}
            />
          </Container>

          <Container>
            <FormInput
              type="text"
              name="page_name"
              fieldErrors={{}}
              value={modulePageMaster?.page_name}
              onChange={(target) => onChange(target)}
              label="Page Name"
            />
          </Container>
          <Container>
            <FormInput
              type="text"
              name="page_description"
              fieldErrors={{}}
              value={modulePageMaster?.page_description}
              onChange={(target) => onChange(target)}
              label="Page Description"
            />
          </Container>
          <Container>
            <FormInput
              type="text"
              name="route_key"
              fieldErrors={{}}
              value={modulePageMaster?.route_key}
              onChange={(target) => onChange(target)}
              label="Route Key"
            />
          </Container>
          <Container>
            <FormInput
              type="text"
              name="route_path"
              fieldErrors={{}}
              value={modulePageMaster?.route_path}
              onChange={(target) => onChange(target)}
              label="Route Path"
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

export default CreateModulePageMaster;
