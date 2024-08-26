import React from "react";
import { Button, H2Heading } from "../../../../components/styled";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material/";
import { Loader } from "../../../../components/Loader";
import MsgCard from "../../../../components/MsgCard";
import { config } from "../../../../config/config";
import { sendEmail } from "../../../../logger/sendMail";
import {
  getAuthorized,
  postAuthorized,
  putAuthorized,
} from "../../../../services";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { RoutesPath } from "../../../../config/routes.config";
import { isDistributorOrCenter } from "../../../../utility/func";
import { FlexDiv } from "../../../../style/styled";

const shipmentStatusArray = [
  {
    id: 2,
    value: "shipped",
    label: "Shipped",
  },
];

const deliveryTypeArray = [
  {
    id: 1,
    label: "Standard Delivery",
    value: "StandardDelivery",
  },
  {
    id: 2,
    label: "Express Delivery",
    value: "ExpressDelivery",
  },
];

const shipment = {
  id: "",
  cartId: "",
  shipmentDate: "",
  status: "",
  deliveryType: "",
  trackingNumber: "",
};

const shipmentDetailsObject = {
  id: "",
  deliveryBoyName: "",
  deliveryVehicle: "",
  message: "",
  messageDate: "",
  stationLoaction: "",
};

function UpdateShipmentInfo({ history }) {
  const [loader, setLoader] = React.useState({
    error: false,
    msg: "",
    isLoading: false,
  });

  const id = history.location?.state?.shipmentId;
  const orderId = history.location?.state?.orderId;
  const stage = history.location.state?.stage;

  const [shipmentDetails, setShipmentDetails] = React.useState<any>([
    shipmentDetailsObject,
  ]);
  const [shipmentMasterInfo, setShipmentMasterInfo] = React.useState(shipment);

  const setShipmentMasterInfoFromAPI = (data) => {
    setShipmentMasterInfo({
      ...shipmentMasterInfo,
      id: data?.id,
      cartId: data?.cart_id,
      shipmentDate: data?.shipment_date,
      status: data?.status,
      deliveryType: data?.delivery_type,
      trackingNumber: data?.tracking_number,
    });
    setShipmentDetails([
      ...data?.shipment_details?.map((item) => {
        return {
          id: item?.id,
          deliveryBoyName: item?.delivery_boy_name,
          deliveryVehicle: item?.delivery_vehicle,
          message: item?.message,
          messageDate: item?.message_date,
          stationLoaction: item?.station_location,
        };
      }),
    ]);
  };

  const getShipmentDetails = async (id: number) => {
    let url = `${config.baseUrl}/${isDistributorOrCenter()}/shipment?id=${id}`;

    try {
      const res = await getAuthorized(url);
      if (res?.data?.data) {
        setShipmentMasterInfoFromAPI(res?.data?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onShipmentMasterInfoChange = (target) => {
    setShipmentMasterInfo({
      ...shipmentMasterInfo,
      [target.name]: target?.value,
    });
  };

  const onChange = (target: any, key: any) => {
    const newShipmentList = [...shipmentDetails];

    newShipmentList[key] = {
      ...newShipmentList[key],
      [target.name]: target.value,
    };

    setShipmentDetails(newShipmentList);
  };

  const addNewShipmentDetail = () => {
    const newShipmentList = [...shipmentDetails, shipmentDetailsObject];

    setShipmentDetails(newShipmentList);
  };

  const deleteShipmentRow = (key: number) => {
    const modifiedArr = remove([...shipmentDetails], key);
    setShipmentDetails(modifiedArr);
  };
  const remove = (arr, key) => {
    arr.splice(key, 1);
    return arr;
  };

  const getShipmentDetailsObj = () => {
    let arr: any = [];
    shipmentDetails.map((item) => {
      if (item?.id) {
        let obj = {
          id: item?.id,
          message: item?.message,
          message_date: item?.messageDate,
          station_location: item?.stationLoaction,
          delivery_boy_name: item?.deliveryBoyName,
          delivery_vehicle: item?.deliveryVehicle,
        };
        arr.push(obj);
      } else {
        let obj = {
          message: item?.message,
          message_date: item?.messageDate,
          station_location: item?.stationLoaction,
          delivery_boy_name: item?.deliveryBoyName,
          delivery_vehicle: item?.deliveryVehicle,
        };
        arr.push(obj);
      }
    });
    return arr;
  };

  const changeOrderStatus = async (id: number, status: string) => {
    let url = `${
      config.baseUrl
    }/${isDistributorOrCenter()}/updateOrderStatus?order_id=${id}&status=${status}`;
    try {
      const res = await putAuthorized(url, {});
    } catch (error) {
      console.log("error", error);
    }
  };

  // const setOldStage = () => {
  //   history.push(`${RoutesPath?.AdminOrders}`, stage);
  // };

  const onSubmit = async () => {
    setLoader({ ...loader, isLoading: true });

    let url = `${config.baseUrl}/${isDistributorOrCenter()}/shipments`;

    let data = {
      shipment_id: shipmentMasterInfo?.id,
      status: shipmentMasterInfo?.status,
      shipment_date: shipmentMasterInfo?.shipmentDate,
      tracking_number: shipmentMasterInfo?.trackingNumber,
      delivery_type: shipmentMasterInfo?.deliveryType,
      shipment_details: JSON.stringify(getShipmentDetailsObj()),
    };

    try {
      const res = await postAuthorized(url, data);

      setLoader({
        ...loader,
        isLoading: false,
        error: false,
        msg: res?.data?.message,
      });
      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 3000);
      if (shipmentMasterInfo?.status === "shipped") {
        changeOrderStatus(orderId, "shipped");
        // setOldStage();
      }
    } catch (error) {
      sendEmail({
        subject: `Logger: Unable To Update Shipment Information`,
        body: error,
      });
      setLoader({
        ...loader,
        isLoading: false,
        error: true,
        msg: "Unable To Update Shipment Information",
      });
      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 2000);
    }
  };

  // React.useEffect(() => {
  //   window.addEventListener("popstate", setOldStage);
  // }, []);

  React.useEffect(() => {
    if (id) {
      getShipmentDetails(id);
    }
  }, []);
  return (
    <>
      <FlexDiv width="100%" justifyContentCenter>
        <H2Heading style={{ paddingTop: "10px" }}>Update Shipment</H2Heading>
      </FlexDiv>

      <FlexDiv width="100%" column>
        <FlexDiv width="100%" justifyContentCenter style={{ margin: "20px" }}>
          <FlexDiv width="100%" column alignItemsCenter>
            <FlexDiv width="100%" justifyContentSpaceEvenly>
              <FlexDiv width="25%" style={{ margin: "5px" }} column>
                <InputLabel id="deliveryType">Delivery Type</InputLabel>
                <Select
                  labelId="deliveryType"
                  placeholder="Delivery Type"
                  name="deliveryType"
                  label="Delivery Type"
                  displayEmpty
                  fullWidth
                  onChange={({ target }: any) =>
                    onShipmentMasterInfoChange(target)
                  }
                  variant="standard"
                >
                  {deliveryTypeArray.map((option) => {
                    return (
                      <MenuItem key={option?.id} value={option.value}>
                        {option?.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FlexDiv>

              <FlexDiv width="25%" style={{ margin: "5px" }} column>
                <InputLabel id="ShipmentStatus">Status</InputLabel>
                <Select
                  labelId="ShipmentStatus"
                  placeholder="Select Status"
                  name="status"
                  label="Shipment Status"
                  displayEmpty
                  value={shipmentMasterInfo.status}
                  fullWidth
                  onChange={({ target }: any) =>
                    onShipmentMasterInfoChange(target)
                  }
                  variant="standard"
                >
                  {shipmentStatusArray.map((option) => {
                    return (
                      <MenuItem key={option?.id} value={option.value}>
                        {option?.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FlexDiv>

              <FlexDiv width="25%">
                <TextField
                  type="text"
                  name="trackingNumber"
                  label="Tracking Number"
                  placeholder="Tracking Number"
                  variant="standard"
                  value={shipmentMasterInfo.trackingNumber}
                  fullWidth
                  onChange={({ target }: any) =>
                    onShipmentMasterInfoChange(target)
                  }
                />
              </FlexDiv>
            </FlexDiv>
            <FlexDiv width="100%" justifyContentSpaceEvenly>
              <FlexDiv width="40%">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Purchase Date"
                    value={shipmentMasterInfo.shipmentDate}
                    minDate={new Date()}
                    onChange={(target: any) =>
                      onShipmentMasterInfoChange({
                        value: target,
                        name: "shipmentDate",
                      })
                    }
                    renderInput={(params) => (
                      <>
                        <FlexDiv width="100%" column>
                          <InputLabel>Shipment Date</InputLabel>
                          <Input
                            fullWidth
                            type="text"
                            inputRef={params.inputRef}
                            inputProps={params.inputProps}
                            value={params.value}
                            onChange={params.onChange}
                            onClick={params.onClick}
                            placeholder={params.placeholder}
                            color="primary"
                            endAdornment={params.InputProps?.endAdornment}
                          />
                        </FlexDiv>
                      </>
                    )}
                  />
                </LocalizationProvider>
              </FlexDiv>
            </FlexDiv>
            <FlexDiv width="100%" style={{ margin: "20px 0px" }} column>
              {shipmentDetails?.map((value: any, i: number) => {
                return (
                  <React.Fragment key={i}>
                    <FlexDiv
                      width="100%"
                      justifyContentSpaceEvenly
                      style={{ margin: "10px 0px" }}
                    >
                      <FlexDiv width="20%">
                        <TextField
                          type="text"
                          name="message"
                          label="Message"
                          placeholder="Message"
                          variant="standard"
                          value={value?.message}
                          fullWidth
                          onChange={({ target }: any) => onChange(target, i)}
                        />
                      </FlexDiv>
                      <FlexDiv width="15%">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DesktopDatePicker
                            label="Message Date"
                            value={value?.messageDate}
                            minDate={new Date()}
                            onChange={(target: any) =>
                              onChange(
                                { value: target, name: "messageDate" },
                                i
                              )
                            }
                            renderInput={(params) => (
                              <>
                                <FlexDiv width="100%" column>
                                  <InputLabel>Message Date</InputLabel>
                                  <Input
                                    fullWidth
                                    type="text"
                                    inputRef={params.inputRef}
                                    inputProps={params.inputProps}
                                    value={params.value}
                                    onChange={params.onChange}
                                    onClick={params.onClick}
                                    placeholder={params.placeholder}
                                    color="primary"
                                    endAdornment={
                                      params.InputProps?.endAdornment
                                    }
                                  />
                                </FlexDiv>
                              </>
                            )}
                          />
                        </LocalizationProvider>
                      </FlexDiv>
                      <FlexDiv width="15%">
                        <TextField
                          type="text"
                          name="stationLoaction"
                          label="Station Loaction"
                          placeholder="Station Loaction"
                          variant="standard"
                          value={value?.stationLoaction}
                          fullWidth
                          onChange={({ target }: any) => onChange(target, i)}
                        />
                      </FlexDiv>
                      <FlexDiv width="15%">
                        <TextField
                          type="text"
                          name="deliveryBoyName"
                          label="Delivery Boy Name"
                          placeholder="Delivery Boy Name"
                          variant="standard"
                          value={value?.deliveryBoyName}
                          fullWidth
                          onChange={({ target }: any) => onChange(target, i)}
                        />
                      </FlexDiv>
                      <FlexDiv width="15%">
                        <TextField
                          type="text"
                          name="deliveryVehicle"
                          label="Delivery Vehicle"
                          placeholder="Delivery Vehicle"
                          variant="standard"
                          value={value?.deliveryVehicle}
                          fullWidth
                          onChange={({ target }: any) => onChange(target, i)}
                        />
                      </FlexDiv>
                      {value?.id ? null : (
                        <IconButton onClick={() => deleteShipmentRow(i)}>
                          <DeleteForever />
                        </IconButton>
                      )}
                    </FlexDiv>
                  </React.Fragment>
                );
              })}
              <FlexDiv width="10%">
                <IconButton
                  onClick={() => addNewShipmentDetail()}
                  title="Add New Shipping Detail"
                >
                  <AddCircleIcon color="primary" />
                </IconButton>
              </FlexDiv>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
        <FlexDiv
          wrap
          style={{ margin: "0px 0px 20px 0px" }}
          justifyContentFlexEnd
          width="90%"
        >
          <Button
            onClick={onSubmit}
            variant="success"
            style={{ margin: 5, color: "white", fontWeight: 400 }}
          >
            Submit
          </Button>
        </FlexDiv>
      </FlexDiv>
      <Loader variant="m" isLoading={loader.isLoading} />
      <MsgCard
        msg={loader?.msg}
        variant={loader?.error ? "danger" : "success"}
        ghost
        card
      />
    </>
  );
}

export default UpdateShipmentInfo;
