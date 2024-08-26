import { Button, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { FormInput } from "../../../../components/Forms/Form";
import { Loader } from "../../../../components/Loader";
import MsgCard from "../../../../components/MsgCard";
import { H2Heading } from "../../../../components/styled";
import { config } from "../../../../config/config";
import { postAuthorized, putAuthorized } from "../../../../services";
import { FlexDiv } from "../../../../style/styled";
import { appMasterTypes } from "./ListAppMaster";
import { Container } from "../RoleMaster/CreateRoleMaster";

const CreateAppMaster = ({ history }) => {
  const dataForEdit: appMasterTypes = history?.location?.state;
  const [loader, setloader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });
  const [appMaster, setAppMaster] = useState({
    app_name: "",
    app_id: "",
    app_version: "",
    is_stop_prev_version: false,
    id: undefined || 0,
  });

  const onChange = (target) => {
    const { name, value } = target;
    if (name === "is_stop_prev_version") {
      setAppMaster({ ...appMaster, [name]: target?.checked });
    } else {
      setAppMaster({ ...appMaster, [name]: value });
    }
  };

  const onSubmit = async () => {
    setloader({ ...loader, isLoading: true });
    try {
      let res;
      let url;

      if (dataForEdit?.id) {
        url = `${config.baseUrl}/superAdmin/appMaster`;
        res = await putAuthorized(url, appMaster);
      } else {
        url = `${config.baseUrl}/superAdmin/appMaster`;
        res = await postAuthorized(url, appMaster);
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
      setAppMaster({
        ...appMaster,
        id: dataForEdit?.id,
        app_name: dataForEdit?.appName,
        app_version: dataForEdit?.appVersion,
        app_id: dataForEdit?.appId,
        is_stop_prev_version: dataForEdit?.isStopPrevVersion,
      });
    }
  }, [dataForEdit]);

  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>App Master</H2Heading>
      </FlexDiv>

      <FlexDiv justifyContentCenter>
        <FlexDiv column alignItemsCenter width="80%">
          <Container>
            <FormInput
              name="app_name"
              type="text"
              label="App Name"
              value={appMaster.app_name}
              onChange={(target) => onChange(target)}
              fieldErrors={{}}
            />
          </Container>

          <Container>
            <FormInput
              name="app_version"
              type="text"
              label="App Version"
              value={appMaster.app_version}
              onChange={(target) => onChange(target)}
              fieldErrors={{}}
            />
          </Container>
          <Container>
            <FormInput
              name="app_id"
              type="text"
              label="App ID"
              value={appMaster.app_id}
              onChange={(target) => onChange(target)}
              fieldErrors={{}}
            />
          </Container>
          <Container>
            <FormControlLabel
              value="top"
              name="is_stop_prev_version"
              control={<Switch />}
              checked={appMaster?.is_stop_prev_version}
              onChange={({ target }: any) => onChange(target)}
              label="Stop Last Version?"
              labelPlacement="start"
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

export default CreateAppMaster;
