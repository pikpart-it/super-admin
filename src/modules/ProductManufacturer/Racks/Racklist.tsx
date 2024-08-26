import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { PTable } from "../Businessunits/component/RetailerList";

const Racklist = () => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <Paper sx={{ width: "50%", margin: "auto" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ background: "#222222" }}>
                <TableCell align="center" style={{ color: "#fff" }}>
                  Id
                </TableCell>
                <TableCell align="center" style={{ color: "#fff" }}>
                  Rack Number
                </TableCell>
                <TableCell align="center" style={{ color: "#fff" }}>
                  Action
                </TableCell>{" "}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Racklist;
