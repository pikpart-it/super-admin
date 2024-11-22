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
  "Module Name",
  "Page Name",
  "Page Description",
  "Route Key",
  "Route Path",
  "Is Active",
  "Actions",
];
export type modulePageMasterTypes = {
  pageName: string;
  pageDescription: string;
  id: number;
  isActive: boolean;
  moduleName: string;
  moduleId: number;
  routeKey: string;
  routePath: string;
  checked: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  get: boolean;
};
const ListModulePageMaster = ({ modulePageMasterList, edit, deleteItem }) => {
  const [removeModal, setRemoveModal] = useState<any>({
    show: false,
    type: "confirm",
    id: "",
  });

  return (
    <>
      {modulePageMasterList?.length > 0 ? (
        <FlexDiv width="100%" justifyContentCenter style={{ margin: "30px" }}>
          <TableContainer sx={{ width: "fit-content" }} component={Paper}>
            <Table sx={{ minWidth: "fit-content" }} aria-label="vehicle models">
              <Header titles={headers} color="#000" />
              <TableBody>
                {modulePageMasterList
                  ?.sort((a, b) => b?.id - a?.id)
                  ?.map((row) => {
                    return (
                      <StyledTableRow key={row?.id}>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: "12px" }}
                        >
                          {row?.id}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: "12px" }}
                        >
                          {row?.moduleName}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: "12px" }}
                        >
                          {row?.pageName}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: "12px" }}
                        >
                          {row?.pageDescription}
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          style={{ fontSize: "12px" }}
                        >
                          {row?.routeKey}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: "12px" }}
                        >
                          {row?.routePath}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: "12px" }}
                        >
                          {row?.isActive ? "Yes" : "No"}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: "12px" }}
                        >
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
        body="Are you sure to delete This Module Page Master?"
      />
    </>
  );
};

export default ListModulePageMaster;
