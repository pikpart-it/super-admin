import React, { useEffect, useState } from "react";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../../style/styled";
import { H2Heading } from "../../../../components/styled";
import { appMasterTypes } from "../AppMaster/ListAppMaster";
import { appRoleMasterSetupTypes } from "../AppRoleMaster/AppRoleMasterSetupList";
import { config } from "../../../../config/config";
import { getAuthorized } from "../../../../services";
import { Container } from "../RoleMaster/CreateRoleMaster";
import { Autocomplete, FormControl, FormLabel } from "@mui/joy";
import { FaArrowRight } from "react-icons/fa";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import Header from "../../../../components/ListsHeader";

const headers = [
  "Module Name",
  "Page Name",
  "Page Description",
  "Route Key",
  "Route Path",
  "Is Active",
];

const ListMasterConfiguration = () => {
  const [masterConfigList, setMasterConfigList] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<appMasterTypes>();
  const [selectedRole, setSelectedRole] = useState<appRoleMasterSetupTypes>();
  const [appMasterList, setAppMasterList] = useState<appMasterTypes[]>([]);
  const [appRoleMasterList, setAppRoleMasterList] = useState<
    appRoleMasterSetupTypes[]
  >([]);

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

  const getConfigList = async () => {
    let url = `${config.baseUrl}/superAdmin/masterConfigurations?role_id=${selectedRole?.id}`;

    try {
      const { data } = await getAuthorized(url);
      setMasterConfigList(data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (selectedRole?.id) {
      getConfigList();
    }
  }, [selectedRole]);

  useEffect(() => {
    getAppMasterList();
    getAppRoleMaster();
  }, []);

  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Master Configuration List</H2Heading>
      </FlexDiv>
      <FlexDiv justifyContentCenter>
        <FlexDiv justifyContentSpaceEvenly width="70%">
          <Container>
            <FormControl>
              <FormLabel>App Name*</FormLabel>
              <Autocomplete
                value={selectedApp?.appName}
                onChange={(e, value) => setSelectedApp(value)}
                options={appMasterList}
                getOptionLabel={(option: any) => option?.appId}
              />
            </FormControl>
          </Container>
          <div style={{ margin: "3% 0px 0px 0px" }}>
            <FaArrowRight />
          </div>
          <Container>
            <FormControl>
              <FormLabel>Role Name*</FormLabel>

              <Autocomplete
                value={selectedRole?.roleName}
                onChange={(e, value) => setSelectedRole(value)}
                options={appRoleMasterList?.filter(
                  (i) => i?.appId === selectedApp?.id
                )}
                getOptionLabel={(option: any) => option?.roleName}
              />
            </FormControl>
          </Container>
        </FlexDiv>
      </FlexDiv>

      <FlexDiv width="100%" justifyContentCenter style={{ margin: "20px" }}>
        <TableContainer sx={{ width: "fit-content" }} component={Paper}>
          <Table sx={{ minWidth: "fit-content" }} aria-label="vehicle models">
            <Header titles={headers} color="#000" />
            <TableBody>
              {masterConfigList?.length
                ? masterConfigList.map((row, index) => {
                    return (
                      <StyledTableRow
                        key={row?.id}
                        style={{ background: "#fff" }}
                      >
                        <StyledTableCell align="center">
                          {row?.moduleName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.pageName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.pageDescription}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.routeKey}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.routePath}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.isActive ? "Yes" : "No"}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </FlexDiv>
    </>
  );
};

export default ListMasterConfiguration;
