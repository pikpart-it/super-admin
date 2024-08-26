import React from "react";
import moment from "moment";
import { styled } from "@mui/material/styles";
// import { RoutesPath } from "../../../config/routes.config";

const P = styled("p")({
  fontSize: "12px",
  margin: "5px 0px",
});

export const returnOrderDateUI = (filterdOrderDateOptionsArray, date) => {
  return filterdOrderDateOptionsArray?.map((value) => (
    <>
      {value?.valueName === "day" ? (
        <P>{moment(date).startOf(value?.valueName).fromNow()}</P>
      ) : (
        <P>{moment(date).format(value?.valueName)}</P>
      )}
    </>
  ));
};
export const returnOrderDetailsUI = (filterdOrderDetailsOptionsArray, data) => {
  return filterdOrderDetailsOptionsArray?.map((value) => (
    <>
      <P>
        {value?.displayName} : {data[value?.valueName]}
      </P>
    </>
  ));
};

export const returnProductNameUI = (filterdProductNameOptionsArray, data) => {
  return filterdProductNameOptionsArray.map((value) => (
    <>
      <P>
        {value?.displayName} : {data[value?.valueName]}
      </P>
    </>
  ));
};
export const returnCustomerOptionsUI = (filterdCustomerOptionsArray, data) => {
  return filterdCustomerOptionsArray.map((value) => (
    <>
      <P>
        {value?.displayName} : {data[value?.valueName]}
      </P>
    </>
  ));
};

export const returnButtons = (
  history,
  changeOrderStatus,
  orderId,
  stage,
  cancel,
  shipmentId,
  orderType?,
  moveToPickup?
) => {
  return (
    <>
      {stage === "pending" ? (
        <>
          <button
            onClick={() => changeOrderStatus(orderId, "approved")}
            style={{
              width: "140px",
              maxWidth: "160px",
              border: "none",
              borderRadius: "5px",
              padding: "5px",
              background: "#4ab100",
              fontWeight: "bold",
              cursor: "pointer",
              margin: "5px",
              color: "#fff",
            }}
          >
            Accept
          </button>

          <button
            onClick={() => cancel(orderId)}
            style={{
              width: "140px",
              maxWidth: "160px",
              border: "none",
              borderRadius: "5px",
              padding: "5px",
              background: "rgb(245 0 0)",
              fontWeight: "bold",
              cursor: "pointer",
              margin: "5px",
              color: "#fff",
            }}
          >
            Cancel Order
          </button>
        </>
      ) : stage === "approved" ? (
        <>
          <button
            onClick={() => {
              moveToPickup(orderId);
            }}
            style={{
              width: "140px",
              maxWidth: "160px",
              border: "none",
              borderRadius: "5px",
              padding: "5px",
              background: "#4ab100",
              fontWeight: "bold",
              cursor: "pointer",
              margin: "5px",
              color: "#fff",
            }}
          >
            Move to Pickup
          </button>

          <button
            onClick={() => cancel(orderId)}
            style={{
              width: "140px",
              maxWidth: "160px",
              border: "none",
              borderRadius: "5px",
              padding: "5px",
              background: "rgb(245 0 0)",
              fontWeight: "bold",
              cursor: "pointer",
              margin: "5px",
              color: "#fff",
            }}
          >
            Cancel Order
          </button>
        </>
      ) : stage === "wip" ? (
        <>
          <button
            // onClick={() =>
            //   // history.push(`${RoutesPath?.SchedulePickup}`, { orderId, stage })
            // }
            style={{
              width: "140px",
              maxWidth: "160px",
              border: "none",
              borderRadius: "5px",
              padding: "5px",
              background: "#4ab100",
              fontWeight: "bold",
              cursor: "pointer",
              margin: "5px",
              color: "#fff",
            }}
          >
            Schedule Pickup
          </button>
          <button
            // onClick={() =>
            //   history.push(`${RoutesPath.UpdateShipmentInfo}`, {
            //     shipmentId,
            //     orderId,
            //     stage,
            //   })
            // }
            style={{
              width: "140px",
              maxWidth: "160px",
              border: "none",
              borderRadius: "5px",
              padding: "5px",
              fontWeight: "bold",
              cursor: "pointer",
              margin: "5px",
              background: "#4ab100",
              color: "#fff",
            }}
          >
            Shipment information
          </button>
        </>
      ) : stage === "shipped" ? (
        <button
          onClick={() => changeOrderStatus(orderId, "delivered")}
          style={{
            width: "140px",
            maxWidth: "160px",
            border: "none",
            borderRadius: "5px",
            padding: "5px",
            background: "#4ab100",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            margin: "5px",
          }}
        >
          Delivered
        </button>
      ) : stage === "delivered" ? (
        <button
          onClick={() => changeOrderStatus(orderId, "received")}
          style={{
            width: "140px",
            maxWidth: "160px",
            border: "none",
            borderRadius: "5px",
            padding: "5px",
            background: "#4ab100",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            margin: "5px",
          }}
        >
          Received
        </button>
      ) : stage === "received" ? (
        <button
          onClick={() => changeOrderStatus(orderId, "completed")}
          style={{
            width: "140px",
            maxWidth: "160px",
            border: "none",
            borderRadius: "5px",
            padding: "5px",
            background: "#4ab100",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            margin: "5px",
          }}
        >
          Complete
        </button>
      ) : null}
      <button
        // onClick={() =>
        //   history.push(`${RoutesPath.CartMoreInfo}`, { orderId, orderType })
        // }
        style={{
          width: "140px",
          maxWidth: "160px",
          border: "none",
          borderRadius: "5px",
          padding: "5px",
          background: "#D9D9D9",
          fontWeight: "bold",
          cursor: "pointer",
          margin: "5px",
          color: "#000",
        }}
      >
        Order Details
      </button>
    </>
  );
};
