import React from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {
  returnOrderDateUI,
  returnOrderDetailsUI,
  returnProductNameUI,
  returnCustomerOptionsUI,
  returnButtons,
} from "./ReturnCustomUi";
import { CircularProgress } from "@mui/material";
import { Div } from "../containers/B2BOrder";
import { FlexDiv } from "../../../../style/styled";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#EFEFEF",
    fontSize: 14,
    fontWeight: 400,
    width: "160px",
    minWidth: "140px",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 400,
    maxWidth: "160px",
    width: "160px",
    minWidth: "130px",
    padding: "12px",
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  minwidth: "100%",
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const headers = [
  "Order date",
  "Order details",
  "Product Description",
  "Qty",
  "Order Value",
  "Customer option",
  "Order Status",
  "Action",
];

function OrdersListingComponent({
  ordersList,
  stage,
  history,
  cancelOrderModal,
  setCancelOrderModal,
  filterdOrderDateOptionsArray,
  filterdOrderDetailsOptionsArray,
  filterdProductNameOptionsArray,
  filterdCustomerOptionsArray,
  changeOrderStatus,
  moveToPickup,
  loading,
  orderType,
}) {
  const cancel = (orderId) => {
    setCancelOrderModal({ ...cancelOrderModal, show: true, id: orderId });
  };
  return (
    <div>
      {loading ? (
        <FlexDiv style={{ marginTop: "5em" }}>
          <div>
            <CircularProgress />
          </div>
        </FlexDiv>
      ) : (
        <>
          {ordersList?.length ? (
            <FlexDiv column>
              <TableHead style={{ width: "100%" }}>
                <TableRow style={{ width: "100%" }}>
                  {headers.map((title, index: number) => (
                    <React.Fragment key={index}>
                      <StyledTableCell align="center">{title}</StyledTableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{ width: "100%" }}>
                {ordersList
                  ?.sort((a, b) => b?.orderId - a?.orderId)
                  ?.map((item, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{item?.orderTime}</StyledTableCell>
                        <StyledTableCell>
                          <FlexDiv>
                            <Div>Order ID:</Div>
                            <span>{item?.orderId}</span>
                          </FlexDiv>
                          <FlexDiv
                            style={{
                              margin: "5px 0px 5px 0pxs",
                            }}
                          >
                            <Div>Buyer Name:</Div>
                            <span>{item?.customer?.firstName}</span>
                          </FlexDiv>
                          <FlexDiv>
                            <Div>Mobile :</Div>
                            <span>{item?.customer?.phoneNumber}</span>
                          </FlexDiv>
                        </StyledTableCell>
                        <StyledTableCell>
                          <FlexDiv>
                            <Div>Name:</Div>
                            <span>{item?.name}</span>
                          </FlexDiv>
                          <FlexDiv>
                            <Div>Brand:</Div>
                            <span>{item?.brand}</span>
                          </FlexDiv>
                        </StyledTableCell>
                        <StyledTableCell>
                          <FlexDiv justifyContentCenter>
                            <Div>qty:</Div>
                            <span>{item?.quantity}</span>
                          </FlexDiv>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div style={{ fontWeight: "" }}>{item?.amount}</div>
                        </StyledTableCell>

                        <StyledTableCell>
                          {returnCustomerOptionsUI(
                            filterdCustomerOptionsArray,
                            item
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <p
                            style={{
                              color: "#000",
                              padding: "5px",
                              borderRadius: "5px",
                              textAlign: "center",
                              fontWeight: "bold",
                              width: "100px",
                              margin: "auto",
                            }}
                          >
                            {item?.status}
                          </p>
                        </StyledTableCell>

                        <StyledTableCell>
                          {returnButtons(
                            history,
                            changeOrderStatus,
                            item?.orderId,
                            stage,
                            cancel,
                            item?.shipmentId,
                            orderType,
                            moveToPickup
                          ) || "----"}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </FlexDiv>
          ) : (
            <FlexDiv width="100%" justifyContentCenter>
              <h2>No Matching Data</h2>
            </FlexDiv>
          )}
        </>
      )}
    </div>
  );
}

export default OrdersListingComponent;
