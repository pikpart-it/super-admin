import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { config } from "../../../../config/config";
import { postAuthorized, putAuthorized } from "../../../../services";
import { FlexDiv } from "../../../../style/styled";
import { json } from "stream/consumers";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Wrapper = styled.div`
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  padding: 4px;
  margin-top: 10px;
  width: 100%;
`;
const Div = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  padding: 4px;
  margin-right: 3em;
`;
const PickupButton = styled.div`
  width: 200;
  background: #00bd13;
  color: #fff;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 8px;
  cursor: pointer;
`;
const ListingCourier = ({
  pickupCode,
  shipingCode,
  weight,
  response,
  open,
  handleClose,
  UpdateB2COrder,
}) => {
  const shipmentid = response?.shipment_id;
  const orderId = response?.order_id;
  const channelOrderId = response?.channel_order_id;
  const [availableCompany, setAvailableCompany] = useState<any>([]);
  const [courierId, setCourierid] = useState("");
  const [courierCompanyName, setcourierCompanyName] = useState("");
  const [selectedCourier, setSelectedCourier] = useState(null);

  const [awbCode, setAwbCode] = useState("");
  const [requestPickup, setRequestPickup] = useState(false);
  const [surity, setSurity] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);

  const CourierListing = async () => {
    let url = `${config.baseUrl}/utilities/checkServiceability`;

    const payload = {
      pickup_postcode: parseInt(pickupCode),
      delivery_postcode: parseInt(shipingCode),
      weight,
      cod: 1,
    };
    try {
      const { data } = await postAuthorized(url, payload);

      const res = JSON.parse(data?.data?.body);
      console.log(JSON.parse(data?.data?.body));
      setAvailableCompany(res);
    } catch (error) {
      console.log(error);
    }
  };

  const RequestAwbHandler = async () => {
    let url = `${config.baseUrl}/utilities/assignAwb`;

    const payloadData = {
      shipment_id: shipmentid,
      courier_id: courierId,
    };
    try {
      const { data } = await postAuthorized(url, payloadData);
      const res = JSON.parse(data?.data?.body?.response?.data);
      setAwbCode(res?.awb_code);
      UpdateB2COrder({
        order_id: orderId,
        shipment_id: shipmentid,
        awbCode: res?.awb_code,
        courierId,
        channel_order_id: channelOrderId,
        courierCompanyName,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const RequestPickupHandler = async () => {
    let url = `${config.baseUrl}/utilities/assignPickup`;

    const payloadData = {
      shipment_id: shipmentid,
    };
    try {
      const { data } = await postAuthorized(url, payloadData);
      const res = JSON.parse(data?.data?.body);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  };
  const RequestHandleFun = () => {
    setAlertMessage(true);
    RequestPickupHandler();
  };

  const HandleCourier = (i: any) => {
    setCourierid(i?.courier_company_id);
    setSelectedCourier(i?.courier_company_id);
    setcourierCompanyName(i?.courier_name);
    setRequestPickup(true);
  };

  // useEffect(() => {
  //   if (awbCode) {
  //     UpdateB2COrder();
  //   }
  // }, [awbCode]);

  useEffect(() => {
    if (courierId && surity) {
      RequestAwbHandler();
    }
  }, [courierId, surity]);

  useEffect(() => {
    CourierListing();
  }, []);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>Courier Company Listing</h2>
        <FlexDiv justifyContentSpaceBetween style={{ background: "#000" }}>
          <Div>Action</Div>
          <Div>Company Name</Div>
          <Div>Estimated Date</Div>
          <Div>Amount Charging</Div>
        </FlexDiv>

        <FlexDiv column style={{ height: "50vh", overflow: "auto" }}>
          {availableCompany?.data?.available_courier_companies?.map(
            (i: any) => {
              return (
                <Wrapper>
                  <div
                    onClick={() => {
                      HandleCourier(i);
                    }}
                    style={{ width: "10%" }}
                  >
                    <input
                      type="radio"
                      style={{ transform: "scale(1.5)", cursor: "pointer" }}
                      value={i?.courier_company_id}
                      checked={selectedCourier === i?.courier_company_id}
                      onChange={() => {
                        setSelectedCourier(i?.courier_company_id);
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    {i?.courier_name}
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    {i?.etd}
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Rs: {i?.cod_charges}
                  </div>
                </Wrapper>
              );
            }
          )}
        </FlexDiv>

        {requestPickup && (
          <div style={{ marginTop: "1em" }}>
            {surity ? (
              <FlexDiv justifyContentCenter>
                {alertMessage ? (
                  <Alert severity="success">
                    Request For Pickup Submitted SuccessFully
                  </Alert>
                ) : (
                  <PickupButton
                    onClick={() => {
                      RequestHandleFun();
                    }}
                  >
                    Request Pickup
                  </PickupButton>
                )}
              </FlexDiv>
            ) : (
              <div>
                <h3>Are You Sure for this Courier Company ?</h3>
                <FlexDiv justifyContentCenter alignItemsCenter>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => setRequestPickup(false)}
                  >
                    <CloseIcon style={{ fontSize: "2em", color: "red" }} />
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSurity(true);
                    }}
                  >
                    <ChevronRightIcon
                      style={{ fontSize: "2.5em", color: "#00bd13" }}
                    />
                  </div>
                </FlexDiv>
              </div>
            )}
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default ListingCourier;
