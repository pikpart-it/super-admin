import { Box, Modal } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { FlexDiv } from "../../../../style/styled";

const Span = styled.span<{
  fontSize?: number;
  color?: string;
  variant?: string;
}>`
  font-size: ${({ fontSize }) => fontSize || 14}px;
  color: ${({ color }) => color || "#000"};
`;

const ButtonColors = {
  success: "rgb(115, 209, 61) ",
  secondary: "rgb(140, 140, 140)",
  primary: "rgb(64, 169, 255)",
  danger: "rgb(255, 77, 79)",
};
const Button = styled.button<{ variant?: string }>`
  position: relative;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  outline: none;
  padding: 9px 16px;
  font-size: 14px;
  line-height: 1.1;
  letter-spacing: normal;
  font-stretch: 100%;
  transition: all 0.4s ease 0s;
  border-radius: 4px;
  border: 1px solid rgb(217, 217, 217);
  margin: 0px;
  color: ${({ variant }) => (variant ? "#fff" : "#000")};
  cursor: pointer;
  border-color: ${({ variant }) => ButtonColors[variant!]};
  background-color: ${({ variant }) => ButtonColors[variant!] || "#fff"};
  &:disabled {
    background-color: rgb(183, 235, 143);
    border-color: rgb(217, 217, 217);
    cursor: not-allowed;
  }
`;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  padding: "10px",
  outline: "none",
};

function ModalConfirmation({
  toggleModal,
  setToggleModal,
  setModal,
  modal,
  onInitiateInspection,
  onConfirm,
  onCancel,
  header,
  body,
}: any) {
  return (
    <Modal open={toggleModal} onClose={setToggleModal}>
      <Box sx={style}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0px 5px",
          }}
        >
          <p style={{ margin: "0px " }}>{header}</p>
          <p
            style={{
              margin: "0px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
            onClick={setToggleModal}
          >
            x
          </p>
        </div>
        <hr style={{ width: "100%" }} />
        <FlexDiv justifyContentFlexStart>
          <Span variant="h4" style={{ fontWeight: 600 }}>
            {body || `Do you want to ${modal.type} this booking?`}
          </Span>
        </FlexDiv>
        <hr style={{ width: "100%" }} />

        <FlexDiv justifyContentFlexEnd style={{ margin: "10px 0px 0px 0px" }}>
          <FlexDiv>
            <Button
              style={{ margin: "0px 10px", color: "#fff" }}
              variant="primary"
              onClick={() => {
                setToggleModal();
                modal.type === "inspect"
                  ? onInitiateInspection(modal.content)
                  : modal.type === "confirm"
                  ? onConfirm(modal.content)
                  : onCancel(modal.content);
              }}
            >
              Yes
            </Button>
          </FlexDiv>
          <FlexDiv>
            <Button
              style={{ margin: "0px 10px", color: "#fff" }}
              variant="danger"
              onClick={setToggleModal}
            >
              No
            </Button>
          </FlexDiv>
        </FlexDiv>
      </Box>
    </Modal>
  );
}

export default ModalConfirmation;
