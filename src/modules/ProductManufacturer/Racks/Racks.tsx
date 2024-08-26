import React, { useState } from "react";
import { Header, MainDiv } from "../NewPmDashboard/NewPmDashboard";
import { FlexDiv } from "../../../style/styled";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Racklist from "./Racklist";
import RackProduct from "./RackProduct";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const ActiveRack = styled.div`
  width: 150px;
  background: #f8f8f8;
  color: #c3c8cc;
  border: 1.5px solid #c3c8cc;
  cursor: pointer;
  margin-left: 1rem;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    color: #0c54a0;
    border: 1.5px solid #0c54a0;
  }
`;
const Addbutton = styled.div`
  width: 100px;
  background: #25a64c;
  color: #fff;
  cursor: pointer;
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Racks = () => {
  const [activeBox, setActivBox] = useState("racklist");
  const handleActive = (clicked: string) => {
    setActivBox(clicked);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <MainDiv>
      <FlexDiv column>
        <div style={{ width: "20%" }}>
          <Header>Racks</Header>
        </div>
        <div style={{ width: "100%", marginTop: "1rem" }}>
          <hr />
        </div>
      </FlexDiv>
      <FlexDiv justifyContentCenter style={{ marginTop: "1rem" }}>
        <ActiveRack
          className={activeBox === "racklist" ? "active" : ""}
          onClick={() => {
            handleActive("racklist");
          }}
        >
          Rack List
        </ActiveRack>
        <ActiveRack
          className={activeBox === "rackproduct" ? "active" : ""}
          onClick={() => {
            handleActive("rackproduct");
          }}
        >
          Rack Product
        </ActiveRack>
        <Addbutton onClick={handleOpen}>
          <div>
            <AddIcon />
          </div>
          <div>Add</div>
        </Addbutton>
      </FlexDiv>
      {activeBox === "racklist" && <Racklist />}
      {activeBox === "rackproduct" && <RackProduct />}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FlexDiv column alignItemsCenter>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.3rem",
              }}
            >
              Add New Rack
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              {" "}
              <TextField
                id="outlined-basic"
                label="Attribute type"
                variant="outlined"
              />
            </div>
            <Addbutton style={{ marginTop: "1rem",padding:"6px 12px" }}>Add</Addbutton>
          </FlexDiv>
        </Box>
      </Modal>
    </MainDiv>
  );
};

export default Racks;
