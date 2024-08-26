import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import React from "react";
import { getAuthorized, postAuthorized } from "../../../services";
import { config } from "../../../config/config";
import { sendEmail } from "../../../logger/sendMail";
import {
  FormInput,
  MyFormAsyncSelect,
  MyFormSelect,
  ValidateCapacity,
} from "../../../components/Forms/Form";
import { FlexDiv } from "../../../style/styled";
import { DashboardCard } from "../Scheme/components/DiscountBasedScheme";
import {
  productSearchLoadOption,
  vehicleSearchLoad,
} from "../../../utility/func";
import { vehicleType } from "../../../config/constants/vehicle";
import { Loader } from "../../../components/Loader";
import MsgCard from "../../../components/MsgCard";
import styled from "styled-components";
import { Header } from "../NewPmDashboard/NewPmDashboard";

const ButtonColors = {
  success: "rgb(115, 209, 61) ",
  secondary: "rgb(140, 140, 140)",
  primary: "rgb(64, 169, 255)",
  danger: "rgb(255, 77, 79)",
};

export const Button = styled.button<{ variant?: string }>`
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

const menu = [
  {
    id: 2,
    name: "MinorService",
  },
  {
    id: 3,
    name: "MasterProductCategory",
  },
  {
    id: 4,
    name: "Product",
  },
  {
    id: 5,
    name: "None",
  },
];

function CreateOffers() {
  const [loader, setLoader] = React.useState({
    error: false,
    msg: "",
    isLoading: false,
  });
  const [serviceCentersList, setServiceCentersList] = React.useState<
    Array<any>
  >([]);

  const [selectedStartCapacity, setSelectedStartCapacity] =
    React.useState<any>("");
  const [selectedEndCapacity, setSelectedEndCapacity] = React.useState<any>("");

  const [minorServicesList, setMinorServicesList] = React.useState<Array<any>>(
    []
  );
  const [masterProductCategoryList, setMasterProductCategoryList] =
    React.useState<Array<any>>([]);
  const imageList = React.useState<any>([{ ...ImageData }]);
  const multiImageList = React.useState<any>([{ ...ImageData }]);
  const [bikeCapacityList, setBikeCapacityList] = React.useState<any>([]);
  const [data, setData] = React.useState<any>({
    name: "",
    deal_code: "",
    service_centre_id: "",
    itemId: "" || 0,
    item_type: "",
    description: "",
    discount_percent: "",
    start_date: "",
    end_date: "",
    dealIcon: "",
    dealBanners: "",
    vehicle_type: "",
    vehicle: "",
  });
  const getMinorServicesList = async () => {
    let url = `${config.baseUrl}/admin/services`;
    try {
      const res = await getAuthorized(url);
      if (res?.data?.error) {
        sendEmail({
          subject: `Logger: ${res?.data?.message} on ListInventory admin`,
          body: res,
        });
      } else {
        setMinorServicesList(res?.data?.data);
      }
    } catch (e) {
      sendEmail({
        subject: `Logger: Unable to get products on ListInventory admin`,
        body: e,
      });
    }
  };

  const getCategory = async () => {
    let url = `${config.baseUrl}/admin/masterProductCategory`;
    try {
      const res = await getAuthorized(url);
      if (res?.data?.error) {
        sendEmail({
          subject: `Logger: ${res?.data?.message} on ListNewInventory.tsx line:62`,
          body: res,
        });
      } else {
        setMasterProductCategoryList(res?.data?.data);
      }
    } catch (error) {
      sendEmail({
        subject: `Logger: Unable to get products on ListNewInventory.tsx line:87`,
        body: error,
      });
    }
  };

  const onCapacityChange = (target: any) => {
    if (target.name === "startBikeCapacity") {
      if (!ValidateCapacity(target.value.engineCapacity, selectedEndCapacity)) {
        setSelectedStartCapacity("");
        alert("end capacity cannot be less than or equal start capacity");
        return false;
      } else {
        setSelectedStartCapacity(target.value.engineCapacity);
      }
    } else if (target.name === "endBikeCapacity") {
      if (
        !ValidateCapacity(selectedStartCapacity, target.value.engineCapacity)
      ) {
        alert("end capacity cannot be less than or equal start capacity");
        setSelectedEndCapacity("");
        return false;
      } else {
        setSelectedEndCapacity(target.value.engineCapacity);
      }
      return true;
    }
  };

  const getServiceCenters = async () => {
    try {
      let url = `${config.baseUrl}/admin/service-centres`;
      const response = await getAuthorized(url);
      if (response?.data?.error) {
        sendEmail({
          subject: `Logger: Unable to get service centers Data at Create Offers`,
          body: response,
        });
      } else {
        setServiceCentersList(response?.data?.data);
      }
    } catch (error) {
      sendEmail({
        subject: `Logger: Unable to get service centers Data at Create Offers`,
        body: error,
      });
    }
  };
  const getBikeCapacity = async () => {
    try {
      let url = `${config.baseUrl}/utilities/engines`;
      const response = await getAuthorized(url);

      if (response?.data?.error) {
        sendEmail({
          subject: `Logger: ${response?.data?.message} on getServiceTypeList in listServiceType`,
          body: response,
        });
      } else {
        setBikeCapacityList(response?.data?.data);
      }
    } catch (error) {
      sendEmail({
        subject: `Logger: Unable to get service type list on getServiceTypeList in listServiceType`,
        body: error,
      });
    }
  };
  const onChange = (target: any, name?: any) => {
    if (name === "product") {
      setData({ ...data, itemId: target });
    } else if (target.name === "item_type") {
      if (target.value?.name === "None") {
        setData({ ...data, item_type: target.value, itemId: 0 });
      } else {
        setData({ ...data, item_type: target.value, itemId: "" });
      }
    } else if (target.name === "itemId") {
      setData({ ...data, itemId: target.value });
    } else {
      setData({ ...data, [target.name]: target.value });
    }
  };

  const isSubmitEnabled = () => {
    if (
      data?.name === "" ||
      data?.deal_code === "" ||
      data?.service_centre_id === "" ||
      data?.item_type === "" ||
      data?.description === "" ||
      data?.discount_percent === "" ||
      data?.start_date === "" ||
      selectedStartCapacity === "" ||
      selectedEndCapacity === "" ||
      typeof imageList[0][0]?.value === "undefined" ||
      typeof multiImageList[0][0]?.label === "undefined"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const resetAll = () => {
    setData({
      ...data,
      name: "",
      deal_code: "",
      service_centre_id: "",
      item_type: "",
      description: "",
      discount_percent: "",
      start_date: "",
      end_date: "",
      dealIcon: "",
      dealBanners: "",
    });
    setSelectedEndCapacity("");
    setSelectedStartCapacity("");
  };

  const onSubmit = async () => {
    setLoader({ ...loader, isLoading: true });

    let url = `${config.baseUrl}/admin/deals`;
    const payload = new FormData();

    payload.append("name", data?.name);
    payload.append("deal_code", data?.deal_code);
    payload.append("service_centre_id", data?.service_centre_id?.id);
    payload.append("item_type", data?.item_type?.name);
    if (
      data?.item_type?.name === "MajorService" ||
      data?.item_type?.name === "MinorService"
    ) {
      payload.append("actual_price", data?.itemId?.basePrice);
    } else if (data?.item_type?.name === "Product") {
      payload.append("actual_price", data?.itemId?.sellingPrice);
    }
    payload.append("item_id", data?.itemId?.id || 0);
    payload.append("description", data?.description);
    payload.append("discount_percent", data?.discount_percent);
    payload.append("start_date", data?.start_date);
    payload.append("end_date", data?.end_date);
    payload.append("start_engine_cc", selectedStartCapacity);
    payload.append("end_engine_cc", selectedEndCapacity);
    payload.append("vehicle_type", data?.vehicle_type?.value);

    imageList[0].map((image) => {
      payload.append("dealIcon", image.value[0]);
    });
    multiImageList[0][0].value.map((banner) => {
      payload.append("dealBanners", banner);
    });
    try {
      const res = await postAuthorized(url, payload);
      if (res?.data?.error) {
        setLoader({
          ...loader,
          isLoading: false,
          error: true,
          msg: res?.data?.error,
        });
        setTimeout(() => {
          setLoader({ ...loader, msg: "" });
        }, 2000);
        sendEmail({
          subject: `Logger : ${res?.data?.error} on Create Offers`,
          body: res,
        });
      } else {
        setLoader({
          ...loader,
          isLoading: false,
          error: false,
          msg: "Offer Created Succesfully",
        });
        setTimeout(() => {
          setLoader({ ...loader, msg: "" });
          // resetAll()
        }, 2000);
      }
    } catch (error) {
      setLoader({
        ...loader,
        isLoading: false,
        error: true,
        msg: "Unable To Create Offers",
      });
      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 2000);
      sendEmail({
        subject: `Logger : Unable to Create Offers`,
        body: error,
      });
    }
  };

  React.useEffect(() => {
    getServiceCenters();
    getBikeCapacity();
    getCategory();
  }, []);

  React.useEffect(() => {
    getMinorServicesList();
  }, []);

  return (
    <>
      <FlexDiv justifyContentCenter>
        <Header>Create Offers</Header>
      </FlexDiv>

      <FlexDiv width="100%" justifyContentCenter>
        <DashboardCard style={{ width: "80%" }}>
          <FlexDiv width="100%" column alignItemsCenter>
            <FlexDiv width="100%" justifyContentSpaceEvenly>
              <FlexDiv width="30%">
                <FormInput
                  type="text"
                  name="name"
                  placeholder="Enter Offer Name"
                  label="Offer Name *"
                  fieldErrors={{}}
                  onChange={(target: any) => onChange(target)}
                  value={data?.name}
                />
              </FlexDiv>
              <FlexDiv width="30%">
                <FormInput
                  type="text"
                  name="deal_code"
                  placeholder="Enter Offer Code"
                  label="Offer Code *"
                  fieldErrors={{}}
                  onChange={(target: any) => onChange(target)}
                  value={data?.deal_code}
                />
              </FlexDiv>
              <FlexDiv width="30%">
                <FormInput
                  type="number"
                  name="discount_percent"
                  placeholder="Enter Offer Discount Percent"
                  label="Offer Discount Percent *"
                  fieldErrors={{}}
                  onChange={(target: any) => onChange(target)}
                  value={data?.discount_percent}
                />
              </FlexDiv>
            </FlexDiv>
            <FlexDiv width="100%" justifyContentSpaceEvenly>
              <FlexDiv width="30%">
                <MyFormSelect
                  list={[]}
                  name="service_centre_id"
                  placeholder="Select Service Center"
                  label="Service Center *"
                  value={data?.service_centre_id}
                  fieldErrors={{}}
                  options={serviceCentersList}
                  getOptionLabel={(op) => op.name}
                  getOptionValue={(op) => op.id}
                  onChange={(target: any) => onChange(target)}
                />
              </FlexDiv>
              <FlexDiv width="30%">
                <MyFormSelect
                  placeholder="Select Your Choice"
                  name="startBikeCapacity"
                  label="Start Capacity *"
                  onChange={onCapacityChange}
                  value={selectedStartCapacity}
                  selectProps={{
                    renderValue: (value: any) => value?.value || value,
                  }}
                  fieldErrors={{}}
                  list={[]}
                  options={bikeCapacityList}
                  getOptionLabel={(op) => op.engineCapacity}
                  getOptionValue={(op) => op.id}
                />
              </FlexDiv>
              <FlexDiv width="30%">
                <MyFormSelect
                  placeholder="Select Your Choice"
                  name="endBikeCapacity"
                  label="End Capacity *"
                  onChange={onCapacityChange}
                  selectProps={{
                    renderValue: (value: any) => value?.value || value,
                  }}
                  value={selectedEndCapacity}
                  fieldErrors={{}}
                  list={[]}
                  options={bikeCapacityList}
                  getOptionLabel={(op) => op.engineCapacity}
                  getOptionValue={(op) => op.id}
                />
              </FlexDiv>
            </FlexDiv>
            <FlexDiv width="100%" justifyContentSpaceEvenly>
              <FlexDiv width="30%">
                <MyFormAsyncSelect
                  list={[{}]}
                  label="Vehicle"
                  placeholder="(Enter 3 letter)"
                  name="vehicle"
                  loadOptions={(value: any, callback: any) =>
                    vehicleSearchLoad(value, callback)
                  }
                  onChange={(target: any) =>
                    onChange({ name: "vehicle", value: target })
                  }
                  value={data.vehicle}
                  getOptionLabel={(op: any) => op.name}
                  getOptionValue={(op: any) => op.id}
                  fieldErrors={{}}
                />
              </FlexDiv>
              <FlexDiv width="30%">
                <MyFormSelect
                  label="Vehicle Type"
                  placeholder="Select"
                  list={[]}
                  name="vehicle_type"
                  value={data.vehicle_type}
                  onChange={(target: any) => onChange(target)}
                  fieldErrors={{}}
                  options={vehicleType}
                  getOptionLabel={(op) => op.label}
                  getOptionValue={(op) => op.value}
                />
              </FlexDiv>
            </FlexDiv>
            <FlexDiv width="100%" justifyContentSpaceAround>
              <FlexDiv width="30%">
                <MyFormSelect
                  label="Select Item Type"
                  placeholder="Select Item"
                  list={[]}
                  name="item_type"
                  value={data.item_type}
                  onChange={(target: any) => onChange(target)}
                  fieldErrors={{}}
                  options={menu}
                  getOptionLabel={(op) => op.name}
                  getOptionValue={(op) => op.id}
                />
              </FlexDiv>
              {data?.item_type !== "" && data?.item_type?.name !== "None" ? (
                <>
                  {data?.item_type?.name === "MinorService" ? (
                    <FlexDiv width="30%">
                      <MyFormSelect
                        label="Select menu"
                        placeholder="Select Minor Service"
                        list={[]}
                        name="itemId"
                        value={data.itemId}
                        onChange={(target: any) => onChange(target)}
                        fieldErrors={{}}
                        options={minorServicesList}
                        getOptionLabel={(op) =>
                          `${op.name},(${op?.vehicleType})`
                        }
                        getOptionValue={(op) => op.id}
                      />
                    </FlexDiv>
                  ) : //: data?.item_type?.name === 'MajorService' ? (
                  //   <FlexDiv width='30%'>
                  //     <MyFormSelect
                  //       label="Select menu"
                  //       placeholder="Select Major Service"
                  //       list={[]}
                  //       name="itemId"
                  //       value={data.itemId}
                  //       onChange={(target: any) => onChange(target)}
                  //       fieldErrors={{}}
                  //       options={majorServicesList}
                  //       getOptionLabel={op => `${op.name}, (${op?.vehicleType})`}
                  //       getOptionValue={op => op.id}
                  //     />
                  //   </FlexDiv>
                  // )
                  data?.item_type?.name === "MasterProductCategory" ? (
                    <FlexDiv width="30%">
                      <MyFormSelect
                        label="Select menu"
                        placeholder="Select Master Product Category"
                        list={[]}
                        name="itemId"
                        value={data.itemId}
                        onChange={(target: any) => onChange(target)}
                        fieldErrors={{}}
                        options={masterProductCategoryList}
                        getOptionLabel={(op) => op.name}
                        getOptionValue={(op) => op.id}
                      />
                    </FlexDiv>
                  ) : data?.item_type?.name === "Product" ? (
                    <FlexDiv width="30%">
                      <MyFormAsyncSelect
                        list={[{}]}
                        label="Product"
                        placeholder={
                          !data?.vehicle?.id
                            ? "Select Vehicle To Search"
                            : "(Enter 3 letter)"
                        }
                        name="itemId"
                        loadOptions={(value: any, callback: any) =>
                          productSearchLoadOption(
                            value,
                            callback,
                            data?.service_centre_id?.id,
                            "Admin",
                            data?.vehicle?.id
                          )
                        }
                        onChange={(target: any) => onChange(target, "product")}
                        value={data.itemId}
                        getOptionLabel={(op: any) => op.name}
                        getOptionValue={(op: any) => op.id}
                        fieldErrors={{}}
                      />
                    </FlexDiv>
                  ) : null}
                </>
              ) : null}
            </FlexDiv>
            <FlexDiv width="100%" justifyContentSpaceEvenly>
              <FlexDiv width="20%" style={{ margin: "6px 10px 10px 10px" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Choose Start Date"
                    value={data.start_date}
                    minDate={data.start_date}
                    onChange={(target) =>
                      setData({ ...data, start_date: target })
                    }
                    renderInput={(params) => {
                      return <TextField variant="standard" {...params} />;
                    }}
                  />
                </LocalizationProvider>
              </FlexDiv>
              <FlexDiv width="20%" style={{ margin: "6px 10px 10px 10px" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Choose End Date"
                    value={data.end_date}
                    minDate={data.end_date}
                    onChange={(target) =>
                      setData({ ...data, end_date: target })
                    }
                    renderInput={(params) => {
                      return <TextField variant="standard" {...params} />;
                    }}
                  />
                </LocalizationProvider>
              </FlexDiv>
            </FlexDiv>
            <FlexDiv width="100%" column style={{ margin: "15px" }}>
              <FlexDiv
                width="100%"
                alignItemsCenter
                style={{ margin: "10px 0px", color: "#db592d" }}
              >
                Offer Banner Images (max 5)
              </FlexDiv>
              {/* <AddMultiImageForm main={multiImageList} />
              <hr style={{ width: '100%' }} />
              <FlexDiv width='100%' alignItemsCenter style={{ margin: '10px 0px', color: '#db592d' }}>
                Offer Logo
              </FlexDiv>
              <AddImageForm main={imageList} /> */}
              <FlexDiv
                width="100%"
                justifyContentFlexStart
                style={{ padding: "15px" }}
              >
                <textarea
                  name="description"
                  placeholder="Enter Offer Description"
                  value={data?.description}
                  onChange={({ target }: any) => onChange(target)}
                  style={{
                    width: "100%",
                    height: "60px",
                    margin: "0px",
                    fontWeight: 400,
                    borderRadius: "8px",
                    border: "1.5px solid #525252",
                  }}
                  maxLength={255}
                />
              </FlexDiv>
            </FlexDiv>
          </FlexDiv>
        </DashboardCard>
      </FlexDiv>
      <FlexDiv
        wrap
        style={{ margin: "40px 0px 20px 0px" }}
        justifyContentFlexEnd
        width="90%"
      >
        <Button
          onClick={resetAll}
          variant="danger"
          style={{ margin: 5, color: "white", fontWeight: 400 }}
        >
          Reset
        </Button>
        <Button
          disabled={isSubmitEnabled()}
          onClick={onSubmit}
          variant="success"
          style={{ margin: 5, color: "white", fontWeight: 400 }}
        >
          Submit
        </Button>
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

export default CreateOffers;
