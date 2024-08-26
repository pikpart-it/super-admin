import React from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { FlexDiv } from "../../../../style/styled";

const HideFiltersButton = styled.button`
  background: #263238;
  border-radius: 11px;
  color: #fff;
  width: 100px;
  padding: 5px;
  font-size: 14px;
  font-weight: bolder;
  cursor: pointer;
`;

const P = styled.p`
  margin: 3px 16px 16px 16px;
`;

function OrderDateRange({ ordersLength, dates, onDateChange, getOrders }) {
  return (
    <>
      <FlexDiv width="50%" justifyContentSpaceBetween style={{marginTop:"10px"}}>
        <FlexDiv alignItemsFlexStart justifyContentSpaceEvenly>
          <HideFiltersButton onClick={getOrders}>Hide Filter</HideFiltersButton>
          <p style={{ margin: "5px 16px 16px 16px" }}>
            <strong>{ordersLength}</strong> orders
          </p>
        </FlexDiv>
        <FlexDiv alignItemsFlexEnd justifyContentSpaceEvenly>
          <FlexDiv justifyContentSpaceEvenly>
            <P>From : </P>
            <TextField
              id="date"
              label=""
              type="date"
              name="from_date"
              value={dates?.from_date}
              defaultValue="2017-05-24"
              inputProps={{
                style: {
                  width: "120px",
                  padding: "5px 14px",
                },
              }}
              onChange={({ target }: any) => onDateChange(target)}
            />
          </FlexDiv>
          <FlexDiv justifyContentSpaceEvenly>
            <P>To :</P>
            <TextField
              id="date"
              label=""
              type="date"
              value={dates?.to_date}
              name="to_date"
              defaultValue="2017-05-24"
              inputProps={{
                style: {
                  width: "120px",
                  padding: "5px 14px",
                },
              }}
              onChange={({ target }: any) => onDateChange(target)}
            />
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </>
  );
}

export default OrderDateRange;
