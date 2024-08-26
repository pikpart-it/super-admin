import React, { useState } from "react";
import { Header, MainDiv } from "../../NewPmDashboard/NewPmDashboard";
import { FlexDiv } from "../../../../style/styled";
import styled from "styled-components";
import { ProductWrapper } from "../../Businessunits/component/AddBUForm";
import { Input } from "@mui/joy";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import B2COrder from "./B2COrder";
import B2BOrder from "./B2BOrder";
const Value = styled.div`
  color: #fff;
  background: #000;
  padding: 5px 8px;
  border-radius: 12px;
  margin-left: 10px;
  &.active {
    color: #e04b24;
    background: #fff;
  }
`;
const ActiveCard = styled.div`
  width: 200px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e7e7e7;
  margin-left: 15px;
  &.active {
    background: #e04b24;
    color: #fff;
  }
  cursor: pointer;
`;

const MainOrders = () => {
  const [activeOrder, SetActiveOrder] = useState("all");
  const handleActiveOrder = (clicked: string) => {
    SetActiveOrder(clicked);
  };
  return (
    <MainDiv>
      <FlexDiv column>
        <div style={{ width: "20%" }}>
          <Header>Orders</Header>
        </div>
        <div style={{ width: "100%"}}>
          <hr />
        </div>
      </FlexDiv>
      <ProductWrapper>
        <FlexDiv alignItemsCenter justifyContentSpaceEvenly>
          <FlexDiv>
            <ActiveCard
              className={activeOrder === "all" ? "active" : ""}
              onClick={() => {
                handleActiveOrder("all");
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                All Status
              </div>
              <Value className={activeOrder === "all" ? "active" : ""}>
                120
              </Value>
            </ActiveCard>
            <ActiveCard
              className={activeOrder === "b2c" ? "active" : ""}
              onClick={() => {
                handleActiveOrder("b2c");
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                B2C Orders
              </div>
              <Value className={activeOrder === "b2c" ? "active" : ""}>
                120
              </Value>
            </ActiveCard>
            <ActiveCard
              className={activeOrder === "b2b" ? "active" : ""}
              onClick={() => {
                handleActiveOrder("b2b");
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                B2B Orders
              </div>
              <Value className={activeOrder === "b2b" ? "active" : ""}>
                120
              </Value>
            </ActiveCard>
          </FlexDiv>

          <FlexDiv
            justifyContentFlexEnd
            style={{ marginTop: "1rem", width: "25%" }}
          >
            <Input
              fullWidth
              startDecorator={<SearchSharpIcon />}
              placeholder="Search Products"
            />
          </FlexDiv>
        </FlexDiv>
      </ProductWrapper>
      {activeOrder === "b2c" && <B2COrder />}
      {activeOrder === "b2b" && <B2BOrder />}
    </MainDiv>
  );
};

export default MainOrders;
