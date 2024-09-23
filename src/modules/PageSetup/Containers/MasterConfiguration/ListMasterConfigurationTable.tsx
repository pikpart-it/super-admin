import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import Header from "../../../../components/ListsHeader";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../../style/styled";
import { modulePageMasterTypes } from "../ModulePageMaster/ListModulePageMaster";
import { ChangeEvent, useEffect, useState } from "react";

const headers = [
  "Module Name",
  "Page Name",
  //  "Page Description",
  "Route Key",
  "Route Path",
  "Is Active",
  "Assign",
  "Create",
  "Update",
  "Delete",
  "Get",
];
const ListMasterConfigurationTable = ({
  modulePageMasterList,
  onPageSelect,
}: {
  modulePageMasterList: modulePageMasterTypes[];
  onPageSelect: (e: ChangeEvent<HTMLInputElement>, key: number) => void;
}) => {
  return (
    <>
      <FlexDiv width="100%" justifyContentCenter style={{ margin: "20px" }}>
        <TableContainer sx={{ width: "fit-content" }} component={Paper}>
          <Table sx={{ minWidth: "fit-content" }} aria-label="vehicle models">
            <Header titles={headers} color="#000" />
            <TableBody>
              {modulePageMasterList
                ?.sort((a, b) => b?.id - a?.id)
                ?.map((row, index) => {
                  return (
                    <StyledTableRow
                      key={row?.id}
                      style={{ background: "#fff" }}
                    >
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
                      {/* <StyledTableCell align="center" style={{fontSize:'12px'}}>
                          {row?.pageDescription}
                        </StyledTableCell> */}
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
                        <input
                          name="checked"
                          type="checkbox"
                          checked={row?.checked}
                          onChange={(e) => onPageSelect(e, index)}
                        />
                      </StyledTableCell>
                      {row?.checked ? (
                        <>
                          <StyledTableCell
                            align="center"
                            style={{ fontSize: "12px" }}
                          >
                            <input
                              name="create"
                              type="checkbox"
                              checked={row?.create}
                              onChange={(e) => onPageSelect(e, index)}
                            />
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ fontSize: "12px" }}
                          >
                            <input
                              name="update"
                              type="checkbox"
                              checked={row?.update}
                              onChange={(e) => onPageSelect(e, index)}
                            />
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ fontSize: "12px" }}
                          >
                            <input
                              name="delete"
                              type="checkbox"
                              checked={row?.delete}
                              onChange={(e) => onPageSelect(e, index)}
                            />
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ fontSize: "12px" }}
                          >
                            <input
                              name="get"
                              type="checkbox"
                              checked={row?.get}
                              onChange={(e) => onPageSelect(e, index)}
                            />
                          </StyledTableCell>
                        </>
                      ) : null}
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </FlexDiv>
    </>
  );
};

export default ListMasterConfigurationTable;
