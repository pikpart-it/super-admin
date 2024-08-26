import React, { useState } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { FlexDiv } from "../../../../style/styled";

const ActiveButton = styled.div`
  display: flex;
  font-size: 1rem;
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 5px;
  background: #fff;
  color: #c3c8cc;
  cursor: pointer;
  margin-left: 1em;
  border: 1px solid #c3c8cc;
  &.active {
    background: #f2f3f6;
    color: #0c54a0;
    border: 1px solid #0c54a0;
  }
`;

function HeaderButtons({ stage, setStage, history }) {
  const changeAndRecoredStatus = (status) => {
    setStage(status);
  };
  return (
    <FlexDiv justifyContentSpaceBetween width="70%">
      <ActiveButton
        className={stage === "pending" ? "active" : ""}
        onClick={() => {
          changeAndRecoredStatus("pending");
        }}
      >
        Pending
      </ActiveButton>
      <ActiveButton
        className={stage === "approved" ? "active" : ""}
        onClick={() => {
          changeAndRecoredStatus("approved");
        }}
      >
        Approved
      </ActiveButton>
      <ActiveButton
        className={stage === "wip" ? "active" : ""}
        onClick={() => {
          changeAndRecoredStatus("wip");
        }}
      >
        Wip
      </ActiveButton>
      <ActiveButton
        className={stage === "shipped" ? "active" : ""}
        onClick={() => {
          changeAndRecoredStatus("shipped");
        }}
      >
        Shipped
      </ActiveButton>
      <ActiveButton
        className={stage === "delivered" ? "active" : ""}
        onClick={() => {
          changeAndRecoredStatus("delivered");
        }}
      >
        Delivered
      </ActiveButton>
      <ActiveButton
        className={stage === "received" ? "active" : ""}
        onClick={() => {
          changeAndRecoredStatus("received");
        }}
      >
        Received
      </ActiveButton>
      <ActiveButton
        className={stage === "completed" ? "active" : ""}
        onClick={() => {
          changeAndRecoredStatus("completed");
        }}
      >
        Completed
      </ActiveButton>
      <ActiveButton
        className={stage === "declined" ? "active" : ""}
        onClick={() => {
          changeAndRecoredStatus("declined");
        }}
      >
        Declined
      </ActiveButton>
    </FlexDiv>
  );
}

export default HeaderButtons;
