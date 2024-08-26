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
import styled from "styled-components";
const RackProduct = () => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <Paper sx={{ width: "60%", margin: "auto" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ background: "#222222" }}>
                <TableCell align="center" style={{ color: "#fff" }}>
                  Id
                </TableCell>
                <TableCell align="center" style={{ color: "#fff" }}>
                  Product name
                </TableCell>
                <TableCell align="center" style={{ color: "#fff" }}>
                  Product code
                </TableCell>{" "}
                <TableCell align="center" style={{ color: "#fff" }}>
                  HSN code
                </TableCell>{" "}
                <TableCell align="center" style={{ color: "#fff" }}>
                  Quantity
                </TableCell>{" "}
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

export default RackProduct;
