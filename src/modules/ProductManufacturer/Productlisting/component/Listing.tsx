import React from "react";
import { MainDiv } from "../../Businessunits/component/AddBUHOC";
import { PTable } from "../../Businessunits/component/RetailerList";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "styled-components";
import { FlexDiv } from "../../../../style/styled";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

const Status = styled.div`
  background: #feeedc;
  color: #f98700;
  border-radius: 12px;
  padding: 4px 8px;
`;
const Listing = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleModalpopup = () => {
    setOpen(true);
  };
  return (
    <div style={{ width: "95%", margin: "auto" }}>
      <PTable>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Product</TableCell>
                  <TableCell align="center">Brand</TableCell>
                  <TableCell align="center">Modle</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Upload Date</TableCell>
                  <TableCell align="center">Qty</TableCell>
                  <TableCell align="center">MRP</TableCell>
                  <TableCell align="center">Discount</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Feedback</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center">Color/Size</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    <div>Air Filter</div>
                    <div>2BJ2288899</div>
                  </TableCell>
                  <TableCell align="center">Hero</TableCell>
                  <TableCell align="center">Splendor Plus</TableCell>
                  <TableCell align="center">Service Parts</TableCell>
                  <TableCell align="center">10 Feb, 2024</TableCell>
                  <TableCell align="center">10</TableCell>
                  <TableCell align="center">300</TableCell>
                  <TableCell align="center">
                    <div style={{ color: "#E04B24", fontWeight: "bold" }}>
                      View
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <Status>Pending</Status>
                  </TableCell>
                  <TableCell align="center">
                    <div
                      onClick={handleModalpopup}
                      style={{ cursor: "pointer" }}
                    >
                      <RemoveRedEyeIcon />
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <FlexDiv>
                      <div>
                        <EditIcon />
                      </div>
                      <div>
                        <MoreVertIcon />
                      </div>
                    </FlexDiv>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </PTable>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            boxShadow: "lg",
          }}
        >
          <div
            style={{
              background: "#0C54A0",
              color: "#fff",
              padding: "10px",
              fontSize: "1.4rem",
              fontWeight: "bold",
            }}
          >
            Feedback
          </div>

          <Typography id="modal-desc" textColor="text.tertiary" p={3}>
            when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five
            centuries,when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries,
          </Typography>
        </Sheet>
      </Modal>
    </div>
  );
};

export default Listing;
