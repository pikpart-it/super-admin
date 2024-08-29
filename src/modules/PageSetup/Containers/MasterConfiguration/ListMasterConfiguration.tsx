import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import Header from "../../../../components/ListsHeader";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../../style/styled";
import { modulePageMasterTypes } from "../ModulePageMaster/ListModulePageMaster";
import { ChangeEvent } from "react";

const headers = [
  "Module Name",
  "Page Name",
  "Page Description",
  "Route Key",
  "Route Path",
  "Is Active",
  "Assign",
];

const ListMasterConfiguration = ({
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
              {modulePageMasterList?.length
                ? modulePageMasterList.map((row, index) => {
                    return (
                      <StyledTableRow key={row?.id}>
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
                        <StyledTableCell align="center">
                          <input
                            type="checkbox"
                            checked={row?.checked}
                            onChange={(e) => onPageSelect(e, index)}
                          />
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
