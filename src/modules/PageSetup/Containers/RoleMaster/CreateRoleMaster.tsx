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
import { ProductWrapper } from "../../../ProductManufacturer/Businessunits/component/AddBUForm";
export const Container = styled.div`
  width: 25%;
  margin: 10px;
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
    } catch (error) { }
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
      <FlexDiv justifyContentCenter style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "1.3rem", color: "#f65000" }}>Role Master</div>
      </FlexDiv>
      <ProductWrapper style={{ background: "#fbfbfb", padding: "10px", width: "90%", margin: "auto", marginTop: "1rem" }}>
        <FlexDiv justifyContentCenter>
          <FlexDiv justifyContentSpaceBetween width="50%">
            <Container style={{ width: "30%" }}>
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
            <Container style={{ width: "30%" }}>
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
            <Container style={{ margin: "30px 0px", width: "10%" }}>
              <Button
                variant="contained"
                color="success"
                onClick={onSubmit}
                disabled={submitEnabled}
              >
                Submit
              </Button>
            </Container>
          </FlexDiv>
        </FlexDiv>
      </ProductWrapper>


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
