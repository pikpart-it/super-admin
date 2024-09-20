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
import { getAuthorized, putAuthorized } from "../../../../services";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../../style/styled";
import { RoutesPath } from "../../../../config/routes.config";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalConfirmation from "../../../ProductManufacturer/OrderManagement/component/ModalConfirmation";
const headers = ["Id", "App Name", "App Id", "Role Name", "Actions"];
export type appRoleMasterSetupTypes = {
  appName: any;
  appType: string;
  roleName: string;
  isActive: string;
  id: number;
  roleId: number;
  appId: any;
};
const AppRoleMasterSetupList = ({ appRoleMasterList, edit, deleteItem }) => {
  const [removeModal, setRemoveModal] = useState<any>({
    show: false,
    type: "confirm",
    id: "",
  });

  return (
    <>
      {appRoleMasterList?.length > 0 ? (
        <FlexDiv width="100%" justifyContentCenter style={{ margin: "20px" }}>
          <TableContainer sx={{ width: "800px" }} component={Paper}>
            <Table sx={{ minWidth: "fit-content" }} aria-label="vehicle models">
              <Header titles={headers} color="#000" />
              <TableBody>
                {appRoleMasterList
                  ?.sort((a, b) => b?.id - a?.id)
                  ?.map((row) => {
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
                          <FlexDiv justifyContentSpaceEvenly>
                            <IconButton onClick={() => edit(row)}>
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

export default AppRoleMasterSetupList;
