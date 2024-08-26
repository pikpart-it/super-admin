import React, { useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import { H2Heading } from "../../../../components/styled";
import { RoutesPath } from "../../../../config/routes.config";
import { config } from "../../../../config/config";
import { getAuthorized, postAuthorized } from "../../../../services";
import { isDistributorOrCenter } from "../../../../utility/func";
import styled from "styled-components";
import { FlexDiv } from "../../../../style/styled";
import moment from "moment";
import InventoryIcon from "@mui/icons-material/Inventory";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const user = JSON.parse(localStorage.getItem("user") || "{}");
const OrderDetailbox = styled.div`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 4px;
  padding: 15px 20px;
  width: 95%;
  margin: auto;
  margin-top: 1.5rem;
`;
const OrderDetailSmallbox = styled.div`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 4px;
  padding: 15px 20px;
  width: 25%;
  margin-top: 1.5rem;
`;
const Div = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
`;
const SmallDiv = styled.div`
  text-align: center;
  margin-top: 10px;
`;
const DownloadInvoicebutton = styled.div`
  background-color: rgb(156, 71, 237);
  padding: 3px;
  color: rgb(255, 255, 255);
  border-radius: 10px;
  cursor: pointer;
  margin-left: 10px;
`;
const Span = styled.span`
  font-size: 0.8rem;
  text-align: center;
  color: #555555;
`;
const AmountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  @media (max-width: 550px) {
    justify-content: center;
  }
`;
const WrapperBox = styled.div`
  padding: 5px 15px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 4px;
  border-radius: 8px;
  @media (max-width: 550px) {
    margin: 10px 0px;
  }
`;
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CartMoreInfo({ history }) {
  const orderId = history?.location?.state;
  const [orderData, setOrderData] = useState<any>({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getOrderDetails = async (id: number) => {
    let url = `${config.baseUrl}/utilities/ecomOrderDetail`;
    const body = {
      query_param_hash: {
        login_type: user?.resourceType,
        id: user?.id,
      },
      object_hash: {
        id: id,
      },
    };

    try {
      const res = await postAuthorized(url, body);
      let result = res?.data?.responseResult?.result?.data;
      setOrderData(result);
    } catch (error) {
      console.log("errr", error);
    }
  };
  useEffect(() => {
    if (orderId) {
      getOrderDetails(orderId);
    }
  }, [orderId]);
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading style={{ paddingTop: "10px" }}>Order Details</H2Heading>
      </FlexDiv>
      <FlexDiv width="100%" column>
        <FlexDiv
          width="100%"
          justifyContentSpaceBetween
          style={{ margin: "0px 40px" }}
        >
          <FlexDiv width="90%" justifyContentSpaceBetween>
            <FlexDiv alignItemsCenter>
              <div>Order # {orderData?.orderNo}</div>
              <a
                href={orderData?.invoiceLink}
                style={{ textDecoration: "none" }}
              >
                <DownloadInvoicebutton>
                  DownLoad Invoice{" "}
                  <InventoryIcon style={{ fontSize: "1rem" }} />
                </DownloadInvoicebutton>
              </a>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>

      <OrderDetailbox>
        <FlexDiv
          justifyContentSpaceBetween
          style={{ borderBottom: "1px solid black" }}
        >
          <Div style={{ width: "7%" }}>Date</Div>
          <Div style={{ width: "7%" }}>Status</Div>
          <Div style={{ width: "7%" }}>Customer</Div>
          <Div style={{ width: "10%" }}>Email</Div>
          <Div style={{ width: "7%" }}>Phone</Div>
          <Div style={{ width: "15%" }}>Payment Status</Div>
          <Div style={{ width: "15%" }}>Shipping Address</Div>
        </FlexDiv>
        <FlexDiv justifyContentSpaceBetween style={{ marginTop: "20px" }}>
          <SmallDiv style={{ width: "7%" }}>{orderData?.orderDate}</SmallDiv>
          <SmallDiv style={{ width: "7%" }}>{orderData?.status}</SmallDiv>
          <SmallDiv style={{ width: "7%" }}>
            <div> {orderData?.customerDetail?.firstName}</div>
          </SmallDiv>
          <SmallDiv style={{ width: "10%" }}>
            {orderData?.customerDetail?.email}
          </SmallDiv>
          <SmallDiv style={{ width: "7%" }}>
            {orderData?.customerDetail?.phoneNumber}
          </SmallDiv>
          <SmallDiv style={{ width: "15%" }}>
            {orderData?.paymentStatus}
          </SmallDiv>
          <SmallDiv style={{ width: "15%" }}>
            {orderData?.customerDetail?.addressLine1},
            {orderData?.customerDetail?.addressLine2}
          </SmallDiv>
        </FlexDiv>
      </OrderDetailbox>
      <OrderDetailbox>
        <FlexDiv
          justifyContentSpaceBetween
          style={{ borderBottom: "1px solid black" }}
        >
          <Div style={{ width: "15%" }}>Item Name</Div>
          <Div style={{ width: "15%" }}>PartCode</Div>
          <Div style={{ width: "10%" }}>Model</Div>
          <Div style={{ width: "8%" }}>Discount% </Div>
          <Div style={{ width: "10%" }}>Quantity</Div>
          <Div style={{ width: "10%" }}>Unit Price</Div>
          {/* <Div style={{ width: "10%" }}>Tax</Div> */}
          <Div style={{ width: "10%" }}>Discounted Price</Div>
        </FlexDiv>
        <FlexDiv column>
          {orderData?.orderItems?.map((i) => {
            return (
              <FlexDiv justifyContentSpaceBetween>
                <SmallDiv style={{ width: "15%" }}>{i?.name}</SmallDiv>
                <SmallDiv style={{ width: "15%" }}>{i?.code}</SmallDiv>
                <SmallDiv style={{ width: "10%" }}>{i?.modelName}</SmallDiv>
                <SmallDiv style={{ width: "8%" }}>
                  {i?.discountPercent}
                </SmallDiv>
                <SmallDiv style={{ width: "10%" }}>{i?.productQty}</SmallDiv>
                <SmallDiv style={{ width: "10%" }}>{i?.price}</SmallDiv>
                {/* <SmallDiv style={{ width: "10%" }}>
                    {i?.tax?.toFixed(2)}
                  </SmallDiv> */}
                <SmallDiv style={{ width: "10%" }}>
                  {i?.discountedPrice}
                </SmallDiv>
              </FlexDiv>
            );
          })}
        </FlexDiv>
      </OrderDetailbox>
      <FlexDiv
          style={{ width: "95%", margin: "auto" }}
          alignItemsCenter
          justifyContentSpaceBetween
        >
          {orderData?.isSchemeOrder ? (
            <OrderDetailSmallbox style={{ width: "400px" }}>
              <FlexDiv justifyContentSpaceBetween>
                <div style={{ color: "#038c00" }}>Scheme Applied :</div>
                <div>{orderData?.schemeDetail?.name}</div>
                <div style={{ cursor: "pointer" }} onClick={handleOpen}>
                  <ChevronRightIcon style={{ fontSize: "1.5rem" }} />
                </div>
              </FlexDiv>
            </OrderDetailSmallbox>
          ) : null}

          <OrderDetailSmallbox>
            <FlexDiv justifyContentSpaceBetween alignItemsCenter>
              <SmallDiv>Sub Total :</SmallDiv>
              <div>{orderData?.actualAmount?.toFixed(2)}</div>
            </FlexDiv>
            <FlexDiv justifyContentSpaceBetween alignItemsCenter>
              <SmallDiv>Discount Total : </SmallDiv>
              <div>{orderData?.discountAmount?.toFixed(2)}</div>
            </FlexDiv>
            <FlexDiv
              style={{ borderBottom: "1px solid black", paddingBottom: "1rem" }}
              justifyContentSpaceBetween
              alignItemsCenter
            >
              <SmallDiv>Shipping Charges : </SmallDiv>
              <div>{orderData?.deliveryCharge?.toFixed(2)}</div>
            </FlexDiv>

            {/* <FlexDiv
            style={{ borderBottom: "1px solid black", paddingBottom: "1rem" }}
            justifyContentSpaceBetween
            alignItemsCenter
          >
            <SmallDiv>Tax Total : </SmallDiv>
            <div>{orderData?.taxAmount?.toFixed(2)}</div>
          </FlexDiv> */}

            <FlexDiv
              style={{ borderBottom: "1px solid black", paddingBottom: "1rem" }}
              justifyContentSpaceBetween
              alignItemsCenter
            >
              <SmallDiv>Totak Amount Paid : </SmallDiv>
              <div>{orderData?.paidAmount?.toFixed(2)}</div>
            </FlexDiv>
          </OrderDetailSmallbox>
        </FlexDiv>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={style}>
            <FlexDiv
              style={{
                background: "#222222",
                color: "#fff",
                padding: "8px 10px",
                borderRadius: "12px",
              }}
            >
              <div onClick={handleClose} style={{ cursor: "pointer" }}>
                <CloseIcon />
              </div>
              <div>Scheme Detail</div>
            </FlexDiv>
            <div style={{ padding: "10px" }}>
              <FlexDiv>
                <div>
                  <img
                    src={orderData?.schemeDetail?.imageUrl}
                    style={{ width: "200px" }}
                  />
                </div>
                <div style={{ marginLeft: "1rem" }}>
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {orderData?.schemeDetail?.name}
                  </div>
                  <div style={{ fontSize: "1.3rem" }}>
                    {orderData?.schemeDetail?.schemeGift?.name}
                  </div>
                  <div style={{ marginTop: "20px", fontSize: "0.7rem" }}>
                    Expire on : {orderData?.schemeDetail?.expiryDate}
                  </div>
                </div>
              </FlexDiv>

              <AmountWrapper>
                <WrapperBox>
                  <Div style={{ fontWeight: "bold" }}>Shopping Amount</Div>
                  <div style={{ fontSize: "0.9rem", marginTop: "2px" }}>
                    Rs:{orderData?.schemeDetail?.shoppingAmount}
                  </div>
                </WrapperBox>
                <WrapperBox>
                  <Div style={{ fontWeight: "bold" }}>Shopping Type</Div>
                  <div style={{ fontSize: "0.9rem", marginTop: "2px" }}>
                    {orderData?.schemeDetail?.shoppingType}
                  </div>
                </WrapperBox>
              </AmountWrapper>
              <div style={{ marginTop: "10px", fontWeight: "bold" }}>
                About Scheme :{" "}
                <Span>
                  {orderData?.schemeDetail?.terms?.map((i) => (
                    <Span>{i},</Span>
                  ))}
                </Span>
              </div>
            </div>
          </Box>
        </Modal>
    </>
  );
}

export default CartMoreInfo;
