import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FormInput } from "../../../../components/Forms/Form";
import { Loader } from "../../../../components/Loader";
import MsgCard from "../../../../components/MsgCard";
import { H2Heading } from "../../../../components/styled";
import { config } from "../../../../config/config";
import { postAuthorized, putAuthorized } from "../../../../services";
import { FlexDiv } from "../../../../style/styled";
import { Container } from "../RoleMaster/CreateRoleMaster";
import { moduleMasterTypes } from "./ListModules";
import { FormControl, FormLabel, Input } from "@mui/joy";

const CreateModule = ({ history }) => {
  const dataForEdit: moduleMasterTypes = history?.location?.state;
  const [loader, setloader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });

  const [moduleMaster, setModuleMaster] = useState({
    module_name: "",
    module_description: "",
    route_key: "",
  });

  const onChange = (target) => {
    const { name, value } = target;

    setModuleMaster({
      ...moduleMaster,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    setloader({ ...loader, isLoading: true });

    try {
      let res;
      let url;

      if (dataForEdit?.id) {
        url = `${config.baseUrl}/superAdmin/updateModuleMaster `;
        res = await putAuthorized(url, {
          ...moduleMaster,
          id: dataForEdit?.id,
        });
      } else {
        url = `${config.baseUrl}/superAdmin/addModuleMaster`;
        res = await postAuthorized(url, moduleMaster);
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
      setModuleMaster({
        ...moduleMaster,
        module_description: "",
        module_name: "",
        route_key: "",
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
      setModuleMaster({
        ...moduleMaster,
        module_description: dataForEdit?.moduleDescription,
        module_name: dataForEdit?.moduleName,
        route_key: dataForEdit?.routeKey,
      });
    }
  }, [dataForEdit]);

  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Create Master Module</H2Heading>
      </FlexDiv>

      <FlexDiv justifyContentCenter>
        <FlexDiv column alignItemsCenter width="80%">
          <Container>
            <FormControl>
              <FormLabel>Module Name*</FormLabel>
              <Input
                type="text"
                name="module_name"
                onChange={({ target }) => onChange(target)}
                placeholder="Module Name"
                value={moduleMaster?.module_name}
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
              <FormLabel>Module Description*</FormLabel>
              <Input
                type="text"
                name="route_key"
                value={moduleMaster?.route_key}
                onChange={({ target }) => onChange(target)}
                placeholder="Module Route Key"
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

export default CreateModule;
