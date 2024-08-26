import { useEffect, useState } from "react";
import { config } from "../../../../config/config";
import { getAuthorized, putAuthorized } from "../../../../services";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../../style/styled";
import { H2Heading } from "../../../../components/styled";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import Header from "../../../../components/ListsHeader";
import { RoutesPath } from "../../../../config/routes.config";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalConfirmation from "../../../ProductManufacturer/OrderManagement/component/ModalConfirmation";

const headers = [
  "Id",
  "App Name",
  "App Id",
  "App Version",
  "Is Active",
  "Stop Last Version",
  "Actions",
];
export type appMasterTypes = {
  appId: string;
  appName: string;
  appVersion: string;
  id: number;
  isActive: boolean;
  isStopPrevVersion: boolean;
};
const ListAppMaster = ({ history }) => {
  const [appMasterList, setAppMasterList] = useState<appMasterTypes[]>([]);
  const [removeModal, setRemoveModal] = useState<any>({
    show: false,
    type: "confirm",
    id: "",
  });
  const getAppMasterList = async () => {
    let url = `${config.baseUrl}/superAdmin/appMasters`;

    try {
      const { data } = await getAuthorized(url);
      setAppMasterList(data?.data);
    } catch (error) {}
  };

  const deleteItem = async (id: number) => {
    let url = `${config.baseUrl}/superAdmin/deactivateAppMaster`;

    try {
      const { data } = await putAuthorized(url, { id });
      getAppMasterList();
    } catch (error) {}
  };

  useEffect(() => {
    getAppMasterList();
  }, []);
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>App Master List</H2Heading>
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
              {appMasterList.length
                ? appMasterList.map((row) => {
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
                          {row?.appVersion}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.isActive ? "Yes" : "No"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.isStopPrevVersion ? "Yes" : "No"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <FlexDiv justifyContentSpaceEvenly>
                            <IconButton
                              onClick={() =>
                                history?.push(RoutesPath.CreateAppMaster, row)
                              }
                            >
                              <FaEdit />
                            </IconButton>

                            <IconButton
                              onClick={() =>
                                setRemoveModal({
                                  ...removeModal,
                                  show: true,
                                  id: row.id,
                                })
                              }
                            >
                              <FaTrash />
                            </IconButton>
                          </FlexDiv>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </FlexDiv>
      <ModalConfirmation
        toggleModal={removeModal.show}
        setToggleModal={() => setRemoveModal({ ...removeModal, show: false })}
        modal={removeModal}
        onConfirm={() => deleteItem(removeModal.id)}
        onCancel={() => setRemoveModal({ ...removeModal, show: false })}
        header="Remove Item"
        body="Are you sure to delete This App Master?"
      />
    </>
  );
};

export default ListAppMaster;
