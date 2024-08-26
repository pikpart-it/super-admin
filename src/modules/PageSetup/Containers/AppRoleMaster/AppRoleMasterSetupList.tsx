import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../../../../components/ListsHeader";
import { H2Heading } from "../../../../components/styled";
import { config } from "../../../../config/config";
import { getAuthorized } from "../../../../services";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../../style/styled";
import { RoutesPath } from "../../../../config/routes.config";
import { FaEdit } from "react-icons/fa";
const headers = ["Id", "App Name", "App Id", "Role Name", "Actions"];
export type appRoleMasterSetupTypes = {
  appName: string;
  roleName: string;
  isActive: string;
  id: number;
  appId: string;
};
const AppRoleMasterSetupList = ({ history }) => {
  const [appRoleMasterList, setAppRoleMasterList] = useState<
    appRoleMasterSetupTypes[]
  >([]);

  const getRolesList = async () => {
    let url = `${config.baseUrl}/superAdmin/appRoleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setAppRoleMasterList(data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getRolesList();
  }, []);
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>App Role Master List</H2Heading>
      </FlexDiv>

      <FlexDiv
        width="100%"
        justifyContentCenter
        style={{ marginBottom: "20px" }}
      >
        <TableContainer sx={{ width: "800px" }} component={Paper}>
          <Table sx={{ minWidth: "fit-content" }} aria-label="vehicle models">
            <Header titles={headers} color="#000" />
            <TableBody>
              {appRoleMasterList.length
                ? appRoleMasterList.map((row, index: number) => {
                    return (
                      <StyledTableRow key={row?.id}>
                        <StyledTableCell align="center">
                          {row?.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.appName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.appId}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.roleName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton
                            onClick={() =>
                              history?.push(RoutesPath.AppRoleMasterSetup, row)
                            }
                          >
                            <FaEdit />
                          </IconButton>
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

export default AppRoleMasterSetupList;
