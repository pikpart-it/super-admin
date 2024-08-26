import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormInput } from "../../../../components/Forms/Form";
import { Loader } from "../../../../components/Loader";
import MsgCard from "../../../../components/MsgCard";
import { config } from "../../../../config/config";
import { RoutesPath } from "../../../../config/routes.config";
import {
  getAuthorized,
  postAuthorized,
  putAuthorized,
} from "../../../../services";
import { isDistributorOrCenter } from "../../../../utility/func";
import styled from "styled-components";
import { FlexDiv } from "../../../../style/styled";
import TextField from "@mui/material/TextField";
import ListingCourier from "./ListingCourier";
import { Header, MainDiv } from "../../NewPmDashboard/NewPmDashboard";
import { ProductWrapper } from "../../Businessunits/component/AddBUForm";

const Heading = styled.h1`
  padding-top: 40px;
  font-weight: 500;
  text-align: center;
  margin: 0;
  position: relative;
  user-select: none;
  color: #000;
`;

const FirstDiv = styled.div`
  display: flex;
  justify-content: space-around;
  min-width: 1000px;
  max-width: 1200px;
  border: 1px solid #000000;
  border-radius: 15px;
  box-sizing: border-box;
`;

const P = styled.p`
  max-width: 350px;
  margin: 10px 20px 10px 0px;
  font-size: 14px;
  line-height: 20px;
`;

const SecondDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  min-width: 1000px;
  max-width: 1200px;
  border: 1px solid #000000;
  border-radius: 15px;
  box-sizing: border-box;
  margin: 15px 0px;
`;
const ThirdDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1000px;
  max-width: 1200px;
  border: 1px solid #000000;
  border-radius: 15px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  color: black;
  font-size: 15px;
  padding: 10px 15px;
  font-weight: bold;
  width: 150px;
  background-color: transparent;
  border: 1px solid #000;
  cursor: pointer;
  transition: border-color, color, background-color, 0.5s ease-in-out;
  transition-delay: 0.1s;

  &:hover {
    border-color: #ffc700;
    color: white;
    background-color: #ffc700;
  }
`;

const StyledFlex = styled(FlexDiv)`
  > * {
    margin: 5px 0px;
  }
`;

const packageDimentionsObj = {
  package_weight: "",
  package_length: "",
  package_width: "",
  package_height: "",
  package_identifier: "",
  package_dimentions: "",
  productId: [],
  productNames: [],
};

function SchedulePickup({ history }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [loader, setLoader] = React.useState({
    error: false,
    msg: "",
    isLoading: false,
  });
  const orderId = history.location.state?.orderId;
  const stage = history.location.state?.stage;
  const [packageDetails, setPackageDetails] = React.useState<any>();
  const [products, setProducts] = React.useState<any>([]);
  const [originalProducts, setOriginalProducts] = React.useState<any>([]);
  const [packageDimentions, setPackageDimentions] = React.useState<any>([
    packageDimentionsObj,
  ]);
  const [shipMentFromDetail, setShipmentFromDetail] = useState<any>([]);
  const [shipmentToDetail, setShipmentToDetail] = useState<any>([]);
  const [packageDimensionNewObject, setPackageDimensionNewObject] = useState({
    package_weight: "",
    package_length: "",
    package_width: "",
    package_height: "",
  });
  const [responseFromCreateOrderApi, setResponseFromCreateOrderApi] =
    useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [authToken, setAuthToken] = useState("");

  const onChange = (target, key: number) => {
    const newData = [...packageDimentions];
    if (target.name === "productIds") {
      newData[key] = {
        ...newData[key],
        productId: target?.value,
        productNames: target?.value?.map(
          (i) => `${i?.name},(${i?.productCode || "--"})`
        ),
      };
    } else {
      newData[key] = {
        ...newData[key],
        [target.name]: target?.value,
      };
    }

    setPackageDimentions(newData);
  };
  console.log({ packageDimentions, products });
  // const clearPackage = (index) => {
  //   const newItem = replace([...packageDimentions], index);
  //   setProducts(originalProducts);
  //   setPackageDimentions(newItem);
  // };
  const ClearHandler = () => {
    setPackageDimensionNewObject({
      package_weight: "",
      package_length: "",
      package_width: "",
      package_height: "",
    });
  };
  const replace = (arr, key) => {
    arr.splice(key, 1, packageDimentionsObj);
    return arr;
  };

  const deletePackage = (index) => {
    const newItem = remove([...packageDimentions], index);
    setPackageDimentions(newItem);
  };
  const remove = (arr, key) => {
    if (arr?.length === 1) {
      alert("cannot delete all packages");
    } else {
      arr.splice(key, 1);
    }
    return arr;
  };

  const returnIds = (Array) => {
    let arr: any = [];
    for (let i = 0; i < Array?.length; i++) {
      for (let j = 0; j < Array[i]?.productId?.length; j++) {
        arr.push(Array[i]?.productId[j]?.id);
      }
    }
    return arr;
  };

  const removeDuplicates = (Array) => {
    const filtered = Array.filter(
      ({ id }) => !returnIds(packageDimentions)?.includes(id)
    );
    return filtered;
  };
  const addNewPackageDimentionsForm = () => {
    if (
      packageDimentions?.length > products?.length ||
      packageDimentions?.length === products?.length
    ) {
      alert("dimentions forms cannot exceed products amount");
    } else if (
      packageDimentions?.length < products?.length ||
      products?.length >= packageDimentions?.length
    ) {
      const newItem = [...packageDimentions, packageDimentionsObj];
      setPackageDimentions(newItem);
    }
  };

  const getPackageDetails = async () => {
    let url = `${
      config.baseUrl
    }/${isDistributorOrCenter()}/schedulePickupDetail?order_id=${orderId}`;

    try {
      const res = await getAuthorized(url);
      setPackageDetails(res?.data?.data);
      setOriginalProducts(res?.data?.data?.products);
      setProducts(res?.data?.data?.products);
      setShipmentFromDetail(res?.data?.data?.shipementFrom);
      setShipmentToDetail(res?.data?.data?.shipementTo);
    } catch (error) {
      // console.log('error', error.response)
    }
  };
  const getPackagesDimensionsArray = async () => {
    let url = `${
      config.baseUrl
    }/${isDistributorOrCenter()}/getPackage?resource_type=${
      user?.resource_type || "admin"
    }&resource_id=${user?.id}`;

    try {
      const res = await getAuthorized(url);
    } catch (error) {
      // console.log('error', error.response)
    }
  };

  const returnPayload = (arr: any) => {
    return arr.map((item) => {
      return {
        package_dimentions: `${item?.package_length}x${item?.package_weight}x${item?.package_height}`,
        package_height: item?.package_height,
        package_width: item?.package_width,
        package_length: item?.package_length,
        resource_type: "Admin",
        resource_id: user?.id,
        order_id: orderId,
        order_ids: item?.productId?.map(({ id }) => id),
      };
    });
  };

  const setOldStage = () => {
    history.goBack();
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
  const onSubmit = async () => {
    setLoader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/${isDistributorOrCenter()}/addPackage`;
    try {
      const res = await postAuthorized(url, returnPayload(packageDimentions));
      setLoader({
        ...loader,
        isLoading: false,
        error: false,
        msg: res?.data?.message,
      });
      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 3000);
      if (products?.length === 0) {
        changeOrderStatus(orderId, "wip");
        setOldStage();
      }
      getPackagesDimensionsArray();
    } catch (error) {
      setLoader({ ...loader, isLoading: false, error: true, msg: "Failed" });
      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 3000);
    }
  };

  React.useEffect(() => {
    if (orderId) {
      getPackageDetails();
    }
    getPackagesDimensionsArray();
  }, []);

  const returnPackageData = () => {
    return packageDimentions?.map((i) => ({
      units: i?.productId?.length,
      weight: parseInt(i?.package_weight),
      length: parseInt(i?.package_length),
      height: parseInt(i?.package_height),
      width: parseInt(i?.package_width),
      display_in: "cm",
    }));
  };

  const ShipmentAuthToken = async () => {
    let url = `${config.baseUrl}/utilities/getSRB2CToekn`;
    try {
      const resp = await getAuthorized(url);
      setAuthToken(resp?.data?.data?.auth_token);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    ShipmentAuthToken();
  }, []);

  // React.useEffect(() => {
  //   setProducts(removeDuplicates(products));
  // }, [packageDimentions]);

  ////NewDevelopmentCreateOrderFromShipRocketAPI

  const returnOrderItems = () => {
    return products?.map((i) => ({
      name: i?.name,
      sku: i?.id,
      units: i?.quantity,
      selling_price: i?.discountedPrice,
    }));
  };
  const returnTotals = () => {
    let totalAmount = 0;
    let discountTotal = 0;

    products?.map((i) => {
      totalAmount += i?.discountedPrice;
      discountTotal += i?.discount;
    });

    return { totalAmount, discountTotal };
  };
  const CreateOrders = async () => {
    if (
      !packageDimensionNewObject?.package_height &&
      !packageDimensionNewObject?.package_length &&
      !packageDimensionNewObject?.package_weight &&
      !packageDimensionNewObject?.package_width
    ) {
      return alert("Please Fill the all the Dimesion of Box");
    }
    let url = `${config.baseUrl}/utilities/createShipRocketOrder`;
    setLoader({ ...loader, isLoading: true });
    const payloadData = {
      order_id: orderId,
      order_date: packageDetails?.orderDate,
      billing_address: shipMentFromDetail?.address_line_2,
      pickup_location: "Primary",
      billing_customer_name: packageDetails?.sellerName,
      billing_last_name: packageDetails?.sellerName,
      billing_city: shipMentFromDetail?.city,
      billing_pincode: shipMentFromDetail?.pincode,
      billing_state: shipMentFromDetail?.state,
      billing_country: "India",
      billing_email: shipMentFromDetail?.email,
      billing_phone: packageDetails?.sellerPhoneNo,
      shipping_is_billing: true,
      shipping_customer_name: packageDetails?.customer?.[0]?.business_name,
      shipping_address: shipmentToDetail?.address_line_1,
      shipping_city: shipmentToDetail?.city,
      shipping_pincode: shipmentToDetail?.pincode,
      shipping_country: "India",
      shipping_state: shipmentToDetail?.state,
      shipping_phone: shipmentToDetail?.phone_number,
      order_items: returnOrderItems(),
      payment_method: "PrePaid",
      total_discount: returnTotals().discountTotal,
      sub_total: returnTotals().totalAmount,
      length: parseInt(packageDimensionNewObject?.package_length),
      breadth: parseInt(packageDimensionNewObject?.package_width),
      height: parseInt(packageDimensionNewObject?.package_height),
      weight: parseInt(packageDimensionNewObject?.package_weight),
    };
    try {
      const { data } = await postAuthorized(url, payloadData);

      const res = JSON.parse(data?.data?.body);
      setResponseFromCreateOrderApi(res);
      UpdateB2COrder({
        order_id: orderId,
        shipment_id: res?.shipment_id,
        channel_order_id: res?.channel_order_id,
      });
      setOpen(true);
      setLoader({ ...loader, isLoading: false, msg: "Success" });
      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 1000);
    } catch (error) {
      setLoader({ ...loader, isLoading: false, msg: "Failed" });
      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 1000);
    }
  };

  const UpdateB2COrder = async (data) => {
    let url = `${config.baseUrl}/admin/update-B2C-order?id=${orderId}`;
    const payload = {
      courier_order_id: data?.order_id,
      courier_channel_order_id: data?.channel_order_id,
      courier_shipment_id: data?.shipment_id || undefined,
      courier_awb_code: data?.awbCode || undefined,
      courier_company_id: data?.courierId || undefined,
      courier_name: data?.courierCompanyName || undefined,
    };
    try {
      const { data } = await putAuthorized(url, payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainDiv>
      <FlexDiv column>
        <div style={{ width: "20%" }}>
          <Header>Request Pickup</Header>
        </div>
        <div style={{ width: "100%" }}>
          <hr />
        </div>
      </FlexDiv>

      <ProductWrapper>
        <FlexDiv justifyContentSpaceEvenly>
          <div>
            <div
              style={{
                margin: "10px 0px",
                color: "#575E66",
                fontSize: "1.2rem",
              }}
            >
              {" "}
              Shipping From:
            </div>
            <P>
              {`${packageDetails?.shipementFrom?.address_line_1 || "--"}, ${
                packageDetails?.shipementFrom?.address_line_2 || "--"
              },${packageDetails?.shipementFrom?.city || "--"} - ${
                packageDetails?.shipementFrom?.state || "--"
              } - ${packageDetails?.shipementFrom?.pincode || "--"}`}
            </P>
          </div>
          <div>
            <div
              style={{
                margin: "10px 0px",
                color: "#575E66",
                fontSize: "1.2rem",
              }}
            >
              {" "}
              Shipping To:
            </div>
            <P>
              {`${packageDetails?.shipementTo?.address_line_1 || "--"}, ${
                packageDetails?.shipementTo?.address_line_2 || "--"
              },${packageDetails?.shipementTo?.city || "--"} - ${
                packageDetails?.shipementTo?.state || "--"
              } - ${packageDetails?.shipementTo?.pincode || "--"}, ${
                packageDetails?.shipementTo?.landmark || "--"
              }`}
            </P>
          </div>
        </FlexDiv>
      </ProductWrapper>

      {/* <FlexDiv width="100%" justifyContentFlexStart>
          <h5
            style={{
              position: "relative",
              left: "120px",
              marginLeft: "50px",
              color: "#E85222",
            }}
          >
            1. Order details
          </h5>
        </FlexDiv> */}
      {/* {originalProducts?.length ? (
          originalProducts?.map((item, index: number) => (
            <SecondDiv key={index}>
              <img
                src={item?.image}
                width="140"
                height="140"
                alt="Product Image"
                style={{ margin: "10px" }}
              />
              <StyledFlex width="50%" column>
                <h3>{item?.name}</h3>
                <p>ASIN: {item?.productCode}</p>
              </StyledFlex>
              <FlexDiv column>
                <p>Price</p>
                <p style={{ margin: "0px 0px 20px 0px " }}>(inclusive tax)</p>
                <p>{item?.price}</p>
              </FlexDiv>
              <FlexDiv column>
                <p>Quantity</p>
                <p style={{ margin: "15px auto" }}>{item?.quantity}</p>
              </FlexDiv>
            </SecondDiv>
          ))
        ) : (
          <FlexDiv justifyContentCenter>
            <h3> No products available </h3>
          </FlexDiv>
        )} */}

      <ProductWrapper>
        <div
          style={{ margin: "10px 0px", color: "#575E66", fontSize: "1.2rem" }}
        >
          Box details
        </div>
      </ProductWrapper>
      
      <FlexDiv width="100%" column alignItemsCenter>
        <FlexDiv width="100%" column alignItemsCenter>
          <FlexDiv width="100%" justifyContentFlexStart>
            <h5
              style={{
                position: "relative",
                left: "120px",
                marginLeft: "50px",
                color: "#E85222",
              }}
            >
              2. Package details
            </h5>
          </FlexDiv>
          <ThirdDiv>
            <p
              style={{
                color: "#FF0000",
                margin: "20px 30px",
                maxWidth: "900px",
              }}
            >
              To improve your pick-up experience, we have recommended weight and
              dimensions for your package below. You will not be able to
              schedule the order if you enter the values outside recommended
              range. Please enter weight and dimensions within the range and
              schedule the order.
            </p>
            <button onClick={addNewPackageDimentionsForm}>
              Add New Package Form
            </button>
            <FlexDiv width="100%" column>
              {packageDimentions?.map((item, index: number) => (
                <React.Fragment key={index}>
                  <FlexDiv width="100%" justifyContentSpaceEvenly>
                    <FlexDiv column width="80%">
                      <FlexDiv
                        justifyContentSpaceBetween
                        width="70%"
                        style={{ margin: "15px 0px 15px  50px " }}
                      >
                        <InputLabel
                          id="Select Products"
                          style={{
                            width: "200px",
                            margin: "15px 60px 0px 70px",
                          }}
                        >
                          Select Products
                        </InputLabel>

                        <Select
                          variant="standard"
                          multiple={true}
                          name="productIds"
                          fullWidth
                          value={item?.productId}
                          multiline
                          rows={2}
                          onChange={({ target }: any) =>
                            onChange(target, index)
                          }
                          label="Products List"
                          sx={{ maxWidth: "350px" }}
                        >
                          {products?.map((val) => (
                            <MenuItem key={val?.id} value={val}>
                              {val?.name},{val?.productCode}
                            </MenuItem>
                          ))}
                        </Select>
                      </FlexDiv>
                      <FlexDiv
                        style={{
                          width: "350px",
                          margin: "15px 0px 15px  50px ",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          label="Weight"
                          variant="outlined"
                          placeholder="Weight"
                          name="package_weight"
                          value={packageDimensionNewObject?.package_weight}
                          onChange={(e) => {
                            const parsedValue = parseFloat(e.target.value);
                            setPackageDimensionNewObject({
                              ...packageDimensionNewObject,
                              package_weight: e.target.value,
                            });
                          }}
                        />
                        <span style={{ margin: "20px 30px " }}>Kg</span>
                      </FlexDiv>

                      <FlexDiv
                        column
                        style={{
                          width: "500px",
                          margin: "15px 0px 15px  50px ",
                        }}
                      >
                        <FlexDiv
                          style={{
                            width: "100%",
                            position: "relative",
                            left: "260px",
                          }}
                        >
                          <FlexDiv>
                            <TextField
                              id="outlined-basic"
                              label="Length"
                              variant="outlined"
                              placeholder="Length"
                              name="package_length"
                              value={packageDimensionNewObject?.package_length}
                              onChange={(e) => {
                                setPackageDimensionNewObject({
                                  ...packageDimensionNewObject,
                                  package_length: e.target.value,
                                });
                              }}
                            />

                            <span style={{ margin: "30px 30px 30px 5px" }}>
                              cm
                            </span>
                          </FlexDiv>
                          <FlexDiv>
                            <TextField
                              id="outlined-basic"
                              label="Breadth"
                              variant="outlined"
                              placeholder="Breadth"
                              name="package_width"
                              value={packageDimensionNewObject?.package_width}
                              onChange={(e) => {
                                setPackageDimensionNewObject({
                                  ...packageDimensionNewObject,
                                  package_width: e.target.value,
                                });
                              }}
                            />

                            <span style={{ margin: "30px 30px 30px 5px" }}>
                              cm
                            </span>
                          </FlexDiv>

                          <FlexDiv>
                            <TextField
                              id="outlined-basic"
                              label="Height"
                              variant="outlined"
                              placeholder="Height"
                              name="package_height"
                              value={packageDimensionNewObject?.package_height}
                              onChange={(e) => {
                                setPackageDimensionNewObject({
                                  ...packageDimensionNewObject,
                                  package_height: e.target.value,
                                });
                              }}
                            />

                            <span style={{ margin: "30px 30px 30px 5px" }}>
                              cm
                            </span>
                          </FlexDiv>
                        </FlexDiv>
                      </FlexDiv>
                      {/* <FlexDiv
                        style={{
                          width: "350px",
                          margin: "15px 0px 15px  50px ",
                        }}
                      >
                        <FormInput
                          variant="rowToColumn"
                          type="text"
                          name="package_identifier"
                          value={item?.package_identifier}
                          onChange={(target: any) => onChange(target, index)}
                          fieldErrors={{}}
                          label="Package Identifier"
                          style={{
                            container: {
                              paddingLeft: "60px",
                            },
                            formElement: {
                              width: "250px",
                              boxSizing: "border-box",
                              border: "1px solid #848484",
                            },
                            label: {
                              paddingRight: "60px",
                              minWidth: "150px",
                              width: "200px",
                              fontWeight: "bold",
                              color: "#000",
                            },
                          }}
                        />
                      </FlexDiv> */}
                    </FlexDiv>
                    <FlexDiv
                      width="20%"
                      style={{ marginRight: "20px", maxHeight: "fit-content" }}
                      column
                    >
                      <h3>Package Products:</h3>
                      {item?.productNames?.length ? (
                        item?.productNames?.map((i) => (
                          <ul key={i} style={{ paddingLeft: "20px" }}>
                            <li>{i}</li>
                          </ul>
                        ))
                      ) : (
                        <p>No products were added yet</p>
                      )}
                    </FlexDiv>
                  </FlexDiv>

                  <FlexDiv width="96%" justifyContentFlexEnd>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deletePackage(index)}
                      style={{ margin: "15px" }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => ClearHandler()}
                      style={{ margin: "15px" }}
                    >
                      Clear
                    </Button>
                  </FlexDiv>
                  {index + 1 === packageDimentions?.length ? null : (
                    <hr style={{ width: "100%" }} />
                  )}
                </React.Fragment>
              ))}
            </FlexDiv>
          </ThirdDiv>
        </FlexDiv>
      </FlexDiv>

      <FlexDiv width="100%" justifyContentCenter style={{ margin: "30px" }}>
        <SubmitButton onClick={CreateOrders}>Submit</SubmitButton>
      </FlexDiv>
      {open && (
        <ListingCourier
          pickupCode={shipMentFromDetail?.pincode}
          shipingCode={shipmentToDetail?.pincode}
          weight={packageDimensionNewObject?.package_weight}
          response={responseFromCreateOrderApi}
          UpdateB2COrder={UpdateB2COrder}
          open={open}
          handleClose={handleClose}
        />
      )}
      <Loader variant="m" isLoading={loader.isLoading} />
      <MsgCard
        msg={loader?.msg}
        variant={loader?.error ? "danger" : "success"}
        ghost
        card
      />
    </MainDiv>
  );
}

export default SchedulePickup;
