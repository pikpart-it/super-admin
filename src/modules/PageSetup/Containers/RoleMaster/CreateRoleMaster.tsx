import React, { useEffect, useState } from "react";
import { FlexDiv } from "../../../../style/styled";
import { H2Heading } from "../../../../components/styled";
import styled from "styled-components";
import { FormInput } from "../../../../components/Forms/Form";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { config } from "../../../../config/config";
import { postAuthorized, putAuthorized } from "../../../../services";
import { Loader } from "../../../../components/Loader";
import MsgCard from "../../../../components/MsgCard";
import { roleTypes } from "./RoleMasterList";
export const Container = styled.div`
  width: 25%;
  margin: 10px 0px;
  text-align: center;
`;
const CreateRoleMaster = ({ history }) => {
  const dataForEdit: roleTypes = history?.location?.state;
  const [loader, setloader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });
  const [roleData, setRoleData] = useState({
    role_name: "",
    role_description: "",
    id: undefined || 0,
  });

  const onChange = (target) => {
    const { name, value } = target;

    setRoleData({ ...roleData, [name]: value });
  };

  const onSubmit = async () => {
    setloader({ ...loader, isLoading: true });
    try {
      let res;
      let url;

      if (dataForEdit?.id) {
        url = `${config.baseUrl}/superAdmin/updateRoleName`;
        res = await putAuthorized(url, roleData);
      } else {
        url = `${config.baseUrl}/superAdmin/roleMaster`;
        res = await postAuthorized(url, roleData);
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
      setRoleData({
        ...roleData,
        id: dataForEdit?.id,
        role_name: dataForEdit?.roleName,
        role_description: dataForEdit?.roleDescription,
      });
    }
  }, [dataForEdit]);

  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Role Master</H2Heading>
      </FlexDiv>

      <FlexDiv justifyContentCenter>
        <FlexDiv column alignItemsCenter width="80%">
          <Container>
            <FormInput
              name="role_name"
              type="text"
              label="Role Name"
              value={roleData.role_name}
              onChange={(target) => onChange(target)}
              fieldErrors={{}}
            />
          </Container>
          <Container>
            <FormInput
              name="role_description"
              type="text"
              label="Role Description"
              value={roleData.role_description}
              onChange={(target) => onChange(target)}
              fieldErrors={{}}
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

export default CreateRoleMaster;
