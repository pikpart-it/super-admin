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
const headers = [
  "Id",
  "Module Name",
  "Module Description",
  "Route Key",
  "Actions",
];
export type moduleMasterTypes = {
  moduleName: any;
  moduleDescription: string;
  moduleId: number;
  routeKey: string;
  id: number;
};
const ListModules = ({ moduleMasterList, deleteItem, edit }) => {
  const [removeModal, setRemoveModal] = useState<any>({
    show: false,
    type: "confirm",
    id: "",
  });

  return (
    <>
      {moduleMasterList?.length > 0 ? (
        <FlexDiv width="100%" justifyContentCenter style={{ margin: "30px" }}>
          <TableContainer sx={{ width: "800px" }} component={Paper}>
            <Table sx={{ minWidth: "fit-content" }} aria-label="vehicle models">
              <Header titles={headers} color="#000" />
              <TableBody>
                {moduleMasterList.length
                  ? moduleMasterList.map((row, index: number) => {
                      return (
                        <StyledTableRow key={row?.id}>
                          <StyledTableCell align="center">
                            {row?.id}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row?.moduleName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row?.moduleDescription}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row?.routeKey}
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
                    })
                  : null}
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
        body="Are you sure to delete This Module Master?"
      />
    </>
  );
};

export default ListModules;
