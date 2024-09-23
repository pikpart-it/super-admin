import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FormInput } from "../../../../components/Forms/Form";
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
import ListModules, { moduleMasterTypes } from "./ListModules";
import { Autocomplete, FormControl, FormLabel, Input } from "@mui/joy";
import { enableSubmit } from "../../../../utility/func";

const CreateModule = ({ history }) => {
  const [moduleMasterList, setModuleMasterList] = useState<moduleMasterTypes[]>(
    []
  );
  const [moduleMaster, setModuleMaster] = useState({
    module_name: "",
    module_description: "",
    route_key: "",
    id: 0,
  });
  const [loader, setloader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });
  const getModuleMaster = async () => {
    let url = `${config.baseUrl}/superAdmin/moduleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setModuleMasterList(data?.data);
    } catch (error) {}
  };
  const deleteItem = async (id: number) => {
    setloader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/superAdmin/deactivateModuleMaster`;

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
      getModuleMaster();
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

    setModuleMaster({
      ...moduleMaster,
      [name]: value,
    });
  };

  const submitEnabled = () => {
    const { module_description, route_key, module_name } = moduleMaster;
    if (!module_name || !module_description || !route_key) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async () => {
    setloader({ ...loader, isLoading: true });
    const { module_description, route_key, module_name } = moduleMaster;

    const payload = {
      module_name: module_name?.trimEnd(),
      route_key: route_key?.trimEnd(),
      module_description: module_description?.trimEnd(),
      id: moduleMaster?.id || undefined,
    };
    try {
      let res;
      let url;

      if (moduleMaster?.id) {
        url = `${config.baseUrl}/superAdmin/updateModuleMaster `;
        res = await putAuthorized(url, payload);
      } else {
        url = `${config.baseUrl}/superAdmin/addModuleMaster`;
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
      getModuleMaster();
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
  const reset = () => {
    setModuleMaster({
      ...moduleMaster,
      id: 0,
      module_description: "",
      module_name: "",
      route_key: "",
    });
  };
  const edit = (dataForEdit: moduleMasterTypes) => {
    setModuleMaster({
      ...moduleMaster,
      module_description: dataForEdit?.moduleDescription,
      module_name: dataForEdit?.moduleName,
      route_key: dataForEdit?.routeKey,
      id: dataForEdit?.id,
    });
  };

  useEffect(() => {
    getModuleMaster();
  }, []);

  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Create Master Module</H2Heading>
      </FlexDiv>

      <FlexDiv justifyContentCenter>
        <FlexDiv justifyContentSpaceEvenly>
          <Container>
            <FormControl>
              <FormLabel>Module Name*</FormLabel>

              <Autocomplete
                inputValue={moduleMaster?.module_name}
                options={moduleMasterList}
                getOptionLabel={(option: any) => option?.moduleName}
                freeSolo={true}
                onInputChange={(e, value) =>
                  onChange({ name: "module_name", value })
                }
              />
            </FormControl>
          </Container>

          <Container>
            <FormControl>
              <FormLabel>Module Description*</FormLabel>

              <Input
                type="text"
                name="module_description"
                value={moduleMaster?.module_description}
                onChange={({ target }) => onChange(target)}
                placeholder="Module Description"
              />
            </FormControl>
          </Container>
          <Container>
            <FormControl>
              <FormLabel>Module Route Key*</FormLabel>
              <Input
                type="text"
                name="route_key"
                value={moduleMaster?.route_key}
                onChange={({ target }) => onChange(target)}
                placeholder="Module Route Key"
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
      </FlexDiv>
      <ListModules
        deleteItem={deleteItem}
        edit={edit}
        moduleMasterList={moduleMasterList}
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
    </>
  );
};

export default CreateModule;
