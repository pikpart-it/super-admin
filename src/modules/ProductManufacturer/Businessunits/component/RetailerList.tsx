import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { AllData, DistributorData, RetailerLisst } from "./constant";
import DriveFileRenameOutlineSharpIcon from "@mui/icons-material/DriveFileRenameOutlineSharp";
import { FlexDiv } from "../../../../style/styled";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";

export const PTable = styled.div`
  margin-top: 1rem;
  width: 100%;
`;
const convertDateFormat = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Ensure leading zeros for day and month if needed
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};
const RetailerList = ({ data }) => {
  return (
    <PTable>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Retailer Name</TableCell>
                <TableCell align="center">Business Name</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Date of Joining</TableCell>
                <TableCell align="center">Detail</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item: any, index: any) => (
                <TableRow>
                  <TableCell align="center">{item?.businessName}</TableCell>

                  <TableCell align="center">{item?.businessName}</TableCell>
                  <TableCell align="center">{item?.phoneNumber}</TableCell>
                  <TableCell align="center">{item?.email}</TableCell>
                  <TableCell align="center">
                    {convertDateFormat(item?.createdAt)}
                  </TableCell>
                  <TableCell align="center">
                    <FlexDiv alignItemsCenter justifyContentCenter>
                      <EditIcon /> 
                    </FlexDiv>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ color: "#41A0F9", cursor: "pointer" }}
                  >
                    View Orders
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </PTable>
  );
};

export default RetailerList;
