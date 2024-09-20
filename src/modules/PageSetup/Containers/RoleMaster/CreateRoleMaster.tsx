import React, { useEffect, useState } from "react";
import { FlexDiv } from "../../../../style/styled";
import { H2Heading } from "../../../../components/styled";
import styled from "styled-components";
import { FormInput } from "../../../../components/Forms/Form";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { config } from "../../../../config/config";
import {
  getAuthorized,
  postAuthorized,
  putAuthorized,
} from "../../../../services";
import { Loader } from "../../../../components/Loader";
import MsgCard from "../../../../components/MsgCard";
import RoleMasterList, { roleTypes } from "./RoleMasterList";
import { Autocomplete, FormControl, FormLabel, Input } from "@mui/joy";
import { enableSubmit } from "../../../../utility/func";
export const Container = styled.div`
  width: 25%;
  margin: 10px 0px;
  text-align: center;
`;
const CreateRoleMaster = () => {
  const [rolesList, setRolesList] = useState<roleTypes[]>([]);
  const [loader, setloader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });
  const [roleData, setRoleData] = useState({
    role_name: "",
    role_description: "",
  });

  const getRolesList = async () => {
    let url = `${config.baseUrl}/superAdmin/roleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setRolesList(data?.data);
    } catch (error) {}
  };
  const deleteItem = async (id: number) => {
    setloader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/superAdmin/deactivateRoleMaster`;

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
      getRolesList();
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

    setRoleData({ ...roleData, [name]: value });
  };

  const onSubmit = async () => {
    setloader({ ...loader, isLoading: true });
    try {
      let res;
      let url;

      url = `${config.baseUrl}/superAdmin/roleMaster`;
      res = await postAuthorized(url, roleData);

      setloader({
        ...loader,
        isLoading: false,
        error: res?.data?.error,
        msg: res?.data?.message,
      });
      setTimeout(() => {
        setloader({ ...loader, msg: "" });
      }, 5000);
      getRolesList();
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
    setRoleData({ ...roleData, role_description: "", role_name: "" });
  };
  const submitEnabled = enableSubmit(roleData);
  const edit = (dataForEdit: roleTypes) => {
    setRoleData({
      ...roleData,
      //id: dataForEdit?.id,
      role_name: dataForEdit?.roleName,
      role_description: dataForEdit?.roleDescription,
    });
  };

  useEffect(() => {
    getRolesList();
  }, []);
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Role Master</H2Heading>
      </FlexDiv>

      <FlexDiv justifyContentCenter>
        <FlexDiv column alignItemsCenter width="80%">
          <Container>
            <FormControl>
              <FormLabel>Role Name*</FormLabel>
            </FormControl>

            <Autocomplete
              inputValue={roleData.role_name}
              options={rolesList}
              getOptionLabel={(option: any) => option?.roleName}
              freeSolo={true}
              onInputChange={(e, value) =>
                onChange({ name: "role_name", value })
              }
            />
          </Container>
          <Container>
            <FormControl>
              <FormLabel>Role Description*</FormLabel>
            </FormControl>
            <Input
              name="role_description"
              type="text"
              value={roleData.role_description}
              onChange={({ target }) => onChange(target)}
            />
          </Container>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv justifyContentFlexEnd width="70%">
        <Button
          variant="contained"
          color="success"
          onClick={onSubmit}
          disabled={submitEnabled}
        >
          Submit
        </Button>
      </FlexDiv>

      <RoleMasterList
        rolesList={rolesList}
        deleteItem={deleteItem}
        edit={edit}
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

export default CreateRoleMaster;
