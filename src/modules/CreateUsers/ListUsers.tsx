import React, { useEffect, useState } from "react";
import { config } from "../../config/config";
import { getAuthorized } from "../../services";
import { FlexDiv, StyledTableCell, StyledTableRow } from "../../style/styled";
import { H2Heading } from "../../components/styled";
import { Autocomplete, FormControl, FormLabel } from "@mui/joy";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import Header from "../../components/ListsHeader";
import { FaEdit } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { RoutesPath } from "../../config/routes.config";
const headers = [
  "Name",
  "Phone",
  "Email",
  "Role",
  "Rank",
  "Rank Type",
  "Action",
];

const ListUsers = () => {
  const history = useHistory();
  const [roles, setRoles] = useState([]);
  const [usersList, setUsersList] = useState<
    {
      id: number;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      rankType: string;
      resourceType: string;
      email: string;
    }[]
  >([]);
  const [selectedRole, setSelectedRole] = useState({ roleName: "", id: 0 });
  const getRoles = async () => {
    // let url = `${config.baseUrl}/superAdmin/roleWiseAdminUsers?role_id=${18}`;
    let url = `${config.baseUrl}/utilities/roleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setRoles(data?.data);
    } catch (error) {}
  };

  const getUsersList = async () => {
    let url = `${config.baseUrl}/superAdmin/roleWiseAdminUsers?role_id=${selectedRole?.id}`;

    try {
      const { data } = await getAuthorized(url);
      setUsersList(data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (selectedRole?.id) {
      getUsersList();
    }
  }, [selectedRole]);
  useEffect(() => {
    getRoles();
  }, []);
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>List Users</H2Heading>
      </FlexDiv>
      <FlexDiv justifyContentCenter>
        <FormControl>
          <FormLabel>App Name*</FormLabel>
          <Autocomplete
            value={selectedRole}
            onChange={(e, value) => setSelectedRole(value!)}
            options={roles}
            getOptionLabel={(option: any) => option?.roleName}
          />
        </FormControl>
      </FlexDiv>

      {usersList?.length > 0 ? (
        <FlexDiv width="100%" justifyContentCenter style={{ margin: "30px" }}>
          <TableContainer sx={{ width: "fit-content" }} component={Paper}>
            <Table sx={{ minWidth: "fit-content" }} aria-label="vehicle models">
              <Header titles={headers} color="#000" />
              <TableBody>
                {usersList
                  ?.sort((a, b) => b?.id - a?.id)
                  ?.map((row) => {
                    return (
                      <StyledTableRow key={row?.id}>
                        <StyledTableCell align="center">
                          {row?.firstName}
                          {row?.lastName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.phoneNumber}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.resourceType || "--"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.rankType || "--"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.rankType || "--"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <FlexDiv justifyContentSpaceEvenly>
                            <IconButton
                              onClick={() =>
                                history.push(RoutesPath.RegisterUser, row)
                              }
                            >
                              <FaEdit style={{ fontSize: "1rem" }} />
                            </IconButton>
                          </FlexDiv>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </FlexDiv>
      ) : (
        <FlexDiv justifyContentCenter>
          <h2>No Data Found</h2>
        </FlexDiv>
      )}
    </>
  );
};

export default ListUsers;
