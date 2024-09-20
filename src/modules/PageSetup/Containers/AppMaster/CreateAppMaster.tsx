import { Button, FormControlLabel, Switch } from "@mui/material";
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
import ListAppMaster, { appMasterTypes } from "./ListAppMaster";
import { Container } from "../RoleMaster/CreateRoleMaster";
import { Autocomplete, FormControl, FormLabel, Input } from "@mui/joy";
import { enableSubmit } from "../../../../utility/func";

export const appTypes = [
  { name: "Mobile", value: "mobile" },
  { name: "Web", value: "web" },
];

const CreateAppMaster = () => {
  const [appMasterList, setAppMasterList] = useState<appMasterTypes[]>([]);
  const [loader, setloader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });
  const [appMaster, setAppMaster] = useState({
    app_type: { name: "", value: "" },
    app_name: "",
    app_id: "",
    app_version: "",
    is_stop_prev_version: false,
    id: 0,
  });

  const getAppMasterList = async () => {
    let url = `${config.baseUrl}/superAdmin/appMasters`;

    try {
      const { data } = await getAuthorized(url);
      setAppMasterList(data?.data);
    } catch (error) {}
  };

  const deleteItem = async (id: number) => {
    setloader({ ...loader, isLoading: true });

    let url = `${config.baseUrl}/superAdmin/deactivateAppMaster`;

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
      getAppMasterList();
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
    if (name === "is_stop_prev_version") {
      setAppMaster({ ...appMaster, [name]: target?.checked });
    } else {
      setAppMaster({ ...appMaster, [name]: value });
    }
  };
  const reset = () => {
    setAppMaster({
      ...appMaster,
      id: 0,
      app_name: "",
      app_type: { name: "", value: "" },
      app_id: "",
      app_version: "",
      is_stop_prev_version: false,
    });
  };

  const submitEnabled = () => {
    const { app_id, app_name, app_type, app_version } = appMaster;
    if (!app_id || !app_name || !app_type?.value || !app_version) {
      return true;
    } else {
      return false;
    }
  };
  const onSubmit = async () => {
    setloader({ ...loader, isLoading: true });
    try {
      let res;
      let url;

      if (appMaster?.id) {
        url = `${config.baseUrl}/superAdmin/appMaster`;
        res = await putAuthorized(url, {
          ...appMaster,
          id: appMaster?.id || undefined,
          app_type: appMaster?.app_type?.value,
        });
      } else {
        url = `${config.baseUrl}/superAdmin/appMaster`;
        res = await postAuthorized(url, {
          ...appMaster,
          app_type: appMaster?.app_type?.value,
          id: appMaster?.id || undefined,
        });
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
      getAppMasterList();
      reset();
    } catch (error) {
      setloader({
        ...loader,
        isLoading: false,
        error: true,
        msg: "Something went wrong",
      });
      setTimeout(() => {
        setloader({ ...loader, msg: "" });
      }, 5000);
    }
  };

  const edit = (dataForEdit: appMasterTypes) => {
    setAppMaster({
      ...appMaster,
      id: dataForEdit?.id,
      app_name: dataForEdit?.appName,
      app_version: dataForEdit?.appVersion,
      app_id: dataForEdit?.appId,
      is_stop_prev_version: dataForEdit?.isStopPrevVersion,
      app_type: appTypes?.find((i) => i?.value === dataForEdit?.appType)!,
    });
  };
  useEffect(() => {
    getAppMasterList();
  }, []);

  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>App Master</H2Heading>
      </FlexDiv>

      <FlexDiv justifyContentCenter>
        <FlexDiv column alignItemsCenter width="80%">
          <Container>
            <FormControl>
              <FormLabel>App Type*</FormLabel>
              <Autocomplete
                value={appMaster?.app_type}
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
                inputValue={appMaster.app_name}
                options={appMasterList}
                getOptionLabel={(option: any) => option?.appName}
                freeSolo={true}
                onInputChange={(e, value) =>
                  onChange({ name: "app_name", value })
                }
              />
            </FormControl>
          </Container>

          <Container>
            <FormControl>
              <FormLabel>App Version*</FormLabel>

              <Input
                name="app_version"
                type="text"
                value={appMaster.app_version}
                onChange={({ target }) => onChange(target)}
              />
            </FormControl>
          </Container>
          <Container>
            <FormControl>
              <FormLabel>App ID*</FormLabel>

              <Input
                name="app_id"
                type="text"
                value={appMaster.app_id}
                onChange={({ target }) => onChange(target)}
              />
            </FormControl>
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
        <Button
          variant="contained"
          color="success"
          onClick={onSubmit}
          disabled={submitEnabled()}
        >
          Submit
        </Button>
      </FlexDiv>

      <ListAppMaster
        edit={edit}
        appMasterList={appMasterList}
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
    </>
  );
};

export default CreateAppMaster;
