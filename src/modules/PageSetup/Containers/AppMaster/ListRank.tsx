import React, { useState } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../../style/styled";
import { FaEdit, FaTrash } from "react-icons/fa";
import Header from "../../../../components/ListsHeader";
import ModalConfirmation from "../../../ProductManufacturer/OrderManagement/component/ModalConfirmation";

const headers = ["Rank Code", "Rank Description", "Rank Type", "Action"];
const ListRank = ({ edit, data, deleteRank }) => {
  const [removeModal, setRemoveModal] = useState<any>({
    show: false,
    type: "confirm",
    id: "",
  });
  return (
    <div>
      <>
        {data?.length > 0 ? (
          <FlexDiv width="100%" justifyContentCenter style={{ margin: "30px" }}>
            <TableContainer sx={{ width: "800px" }} component={Paper}>
              <Table
                sx={{ minWidth: "fit-content" }}
                aria-label="vehicle models"
              >
                <Header titles={headers} color="#000" />
                <TableBody>
                  {data
                    ?.sort((a, b) => b?.id - a?.id)
                    ?.map((row) => {
                      return (
                        <StyledTableRow key={row?.id}>
                          <StyledTableCell align="center">
                            {row?.rankCode}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row?.rankDescription}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row?.rankType || "--"}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <FlexDiv justifyContentSpaceEvenly>
                              <IconButton onClick={() => edit(row)}>
                                <FaEdit style={{ fontSize: "1rem" }} />
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
                                <FaTrash style={{ fontSize: "1rem" }} />
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
          onConfirm={() => deleteRank(removeModal.id)}
          onCancel={() => setRemoveModal({ ...removeModal, show: false })}
          header="Remove Item"
          body="Are you sure to delete This App Master?"
        />
      </>
    </div>
  );
};

export default ListRank;
