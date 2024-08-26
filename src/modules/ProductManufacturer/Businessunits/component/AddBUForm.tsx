import React, { useRef } from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Input from "@mui/joy/Input";
import { FlexDiv } from "../../../../style/styled";
import styled from "styled-components";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
import {
  countryOptions,
  indianState,
  manufacturerVehicleType,
  ownershipType,
  tierTypes,
  usersArray,
  vehicleType,
} from "../containers/constant";
import { FormControlLabel } from "@mui/material";
const ImgContainer = styled.div`
  width: 100px;
  height: 100px;
  border: 1px dashed #aeaeae;
  background: #aeaeae;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  cursor: pointer;
`;
const BackBtn = styled.div`
  width: 100px;
  padding-top: 7px;
  padding-left: 14px;
  padding-bottom: 7px;
  padding-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 20px;
  border: 1px solid #000000;
`;
const SubmitBtn = styled.div`
  width: 100px;
  padding-top: 7px;
  padding-left: 14px;
  padding-bottom: 7px;
  padding-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f96500;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;

export const ProductWrapper = styled.div`
  background: #fff;
  padding: 20px;
  margin-top: 1rem;
`;
const HiddenInput = styled.input`
  display: none;
`;
const SX = {
  width: "30%",
  [`& .${selectClasses.indicator}`]: {
    transition: "0.2s",
    [`&.${selectClasses.expanded}`]: {
      transform: "rotate(-180deg)",
    },
  },
};
const AddBUForm = ({
  selectedUser,
  setSelectedUser,
  handleBUTypeChange,
  serviceCenter,
  handleNameChange,
  onChange,
  handleServeVehicleTypeChange,
  handleBrandChange,
  brandsList,
  handleTierChange,
  handleOwnershipChange,
  handleAssociateType,
  onImagesSelect,
  bannerSelected,
  brandLogoSelected,
  brandIconSelected,
  goToNewManufacturerDashboard,
  onSubmit,
  handleCountryChange,
  handleIsSuperStockIst,
}) => {
  const formData = serviceCenter[0];
  const handleDataChange = ({ target }: any) => onChange(target, "data");
  const handleAddressChange = ({ target }: any) => onChange(target, "address");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);
  const handleImgContainerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImgContainerClick2 = () => {
    if (fileInputRef2.current) {
      fileInputRef2.current.click();
    }
  };
  const handleImgContainerClick3 = () => {
    if (fileInputRef3.current) {
      fileInputRef3.current.click();
    }
  };
  return (
    <div>
      <ProductWrapper>
        <div style={{ fontSize: "1.4rem" }}>Personal Details</div>
        <FlexDiv
          alignItemsCenter
          justifyContentSpaceBetween
          width="100%"
          style={{ marginTop: "20px" }}
        >
          <Select
            placeholder="Select Business Unit"
            indicator={<KeyboardArrowDown />}
            sx={SX}
            value={selectedUser}
            onChange={handleBUTypeChange}
          >
            {usersArray.map((item: any) => (
              <Option key={item?.id} value={item}>
                {item?.name}
              </Option>
            ))}
          </Select>
          <Input
            name="name"
            value={formData?.serviceCenter?.name}
            placeholder={
              selectedUser?.id === 0
                ? "Service Center Name*"
                : selectedUser?.id === 1
                ? "Distributor Name *"
                : selectedUser?.id === 2
                ? "Manufacturer Name *"
                : selectedUser?.id === 3
                ? "OEM Name*"
                : selectedUser?.id === 4
                ? "Retailer Name*"
                : selectedUser?.id === 5
                ? "Dealer Name*"
                : "Service Center Name *"
            }
            onChange={handleDataChange}
            sx={{ width: "30%" }}
          />
          <Input
            name="business_name"
            value={formData.serviceCenterData.business_name}
            onChange={handleDataChange}
            placeholder="Business Name"
            sx={{ width: "30%" }}
          />
        </FlexDiv>
        <FlexDiv
          alignItemsCenter
          justifyContentSpaceBetween
          width="100%"
          style={{ marginTop: "20px" }}
        >
          <Input
            name={selectedUser?.id !== 0 ? "distributor_code" : "center_code"}
            placeholder={
              selectedUser?.id === 0
                ? "Service Center Code *"
                : selectedUser?.id === 1
                ? "Distributor Code *"
                : selectedUser?.id === 2
                ? "Manufacturer Code *"
                : selectedUser?.id === 3
                ? "OEM Code*"
                : selectedUser?.id === 4
                ? "Retailer Code*"
                : selectedUser?.id === 5
                ? "Dealer Code*"
                : "Service Center Code *"
            }
            value={
              selectedUser?.id !== 0
                ? formData.serviceCenterData.distributor_code
                : formData.serviceCenterData.center_code
            }
            onChange={handleDataChange}
            sx={{ width: "30%" }}
          />
          <Input
            name="gst"
            placeholder="GST Number"
            value={formData.serviceCenterData.gst}
            onChange={handleDataChange}
            sx={{ width: "30%" }}
          />
          <Input
            name="pan"
            placeholder="PAN Number"
            value={formData.serviceCenterData.pan}
            onChange={handleDataChange}
            sx={{ width: "30%" }}
          />
        </FlexDiv>
        <FlexDiv
          alignItemsCenter
          justifyContentSpaceBetween
          width="100%"
          style={{ marginTop: "20px" }}
        >
          {/* <Input
            name="upi_id"
            value={formData.serviceCenterData.upi_id}
            placeholder="UPI ID"
            onChange={handleDataChange}
            sx={{ width: "30%" }}
          /> */}
          <Input
            name="upi_id"
            value={formData.serviceCenterData.upi_id}
            placeholder="Aadhar No"
            onChange={handleDataChange}
            sx={{ width: "30%" }}
          />
          <Input
            name="email"
            value={formData.serviceCenterData.email}
            placeholder="Email"
            onChange={handleDataChange}
            sx={{ width: "30%" }}
          />
          <Input
            name="phone_number"
            value={formData.serviceCenterData.phone_number}
            placeholder="Phone Number"
            onChange={handleDataChange}
            sx={{ width: "30%" }}
          />
        </FlexDiv>
        <FlexDiv
          alignItemsCenter
          justifyContentSpaceBetween
          width="100%"
          style={{ marginTop: "20px" }}
        >
          <Input
            name="landline"
            value={formData.serviceCenterData.landline}
            placeholder="Landline Number"
            onChange={handleDataChange}
            sx={{ width: "30%" }}
          />
          <Select
            placeholder={
              selectedUser?.id === 1
                ? "Distributor Associated*"
                : selectedUser?.id === 4
                ? "Retailer Associated*"
                : selectedUser?.id === 5
                ? "Dealer Associated*"
                : "Associated type*"
            }
            value={formData.serviceCenterData.associate_type}
            indicator={<KeyboardArrowDown />}
            sx={SX}
            onChange={handleAssociateType}
          >
            {usersArray?.map((item: any) => (
              <Option key={item?.id} value={item}>
                {item?.name}
              </Option>
            ))}
          </Select>

          {/* <Input placeholder="Distributor type" sx={{ width: "30%" }} /> */}
          {selectedUser?.id === 1 ? (
            <>
              <FlexDiv width="30%" style={{ margin: "10px" }}>
                <FormControlLabel
                  value="top"
                  name="is_super_stockist"
                  control={<Switch onChange={handleIsSuperStockIst} />}
                  onChange={({ target }: any) => onChange(target)}
                  label="Is super stockist?"
                  labelPlacement="start"
                />
              </FlexDiv>
            </>
          ) : null}
          <div style={{ width: "30%" }}></div>
        </FlexDiv>
      </ProductWrapper>
      <ProductWrapper>
        <div style={{ fontSize: "1.4rem" }}>Bank Details</div>
        <FlexDiv
          alignItemsCenter
          justifyContentSpaceBetween
          width="100%"
          style={{ marginTop: "20px" }}
        >
          <Input
            name="bank_name"
            placeholder="Bank Name"
            value={formData.serviceCenterData.bank_name}
            onChange={handleDataChange}
            sx={{ width: "30%" }}
          />
          <Input
            name="branch_name"
            placeholder="Bank Branch Name"
            value={formData.serviceCenterData.branch_name}
            onChange={handleDataChange}
            sx={{ width: "30%" }}
          />
          <Input
            name="account_holder_name"
            placeholder="Account Holder Name"
            value={formData.serviceCenterData.account_holder_name}
            onChange={handleDataChange}
            sx={{ width: "30%" }}
          />
        </FlexDiv>
        <FlexDiv
          alignItemsCenter
          justifyContentSpaceBetween
          width="100%"
          style={{ marginTop: "20px" }}
        >
          <Input
            name="account_number"
            placeholder="Account Number"
            value={formData.serviceCenterData.account_number}
            onChange={handleDataChange}
            sx={{ width: "30%" }}
          />
          <Input
            name="ifsc_code"
            placeholder="IFSC Code"
            value={formData.serviceCenterData.ifsc_code}
            onChange={handleDataChange}
            sx={{ width: "30%" }}
          />
          <div style={{ width: "30%" }}></div>
        </FlexDiv>
      </ProductWrapper>
      <ProductWrapper>
        <div style={{ fontSize: "1.4rem" }}>Address Details</div>
        <FlexDiv
          alignItemsCenter
          justifyContentSpaceBetween
          width="100%"
          style={{ marginTop: "20px" }}
        >
          <Input
            name="address_line_1"
            placeholder="Flat/House No./Building"
            value={formData.serviceCenterData.address.address_line_1}
            onChange={handleAddressChange}
            sx={{ width: "30%" }}
          />
          <Input
            name="address_line_2"
            placeholder="Area/Street/Sector"
            value={formData.serviceCenterData.address.address_line_2}
            onChange={handleAddressChange}
            sx={{ width: "30%" }}
          />
          <Input
            name="landmark"
            value={formData.serviceCenterData.address.landmark}
            placeholder="Landmark"
            onChange={handleAddressChange}
            sx={{ width: "30%" }}
          />
        </FlexDiv>
        <FlexDiv
          alignItemsCenter
          justifyContentSpaceBetween
          width="100%"
          style={{ marginTop: "20px" }}
        >
          <Input
            name="pincode"
            value={formData.serviceCenterData.address.pincode}
            placeholder="Pincode"
            onChange={handleAddressChange}
            sx={{ width: "30%" }}
          />
          <Input
            name="city"
            value={formData.serviceCenterData.address.city}
            placeholder="City"
            onChange={handleAddressChange}
            sx={{ width: "30%" }}
          />
          <Select
            placeholder="State"
            indicator={<KeyboardArrowDown />}
            value={formData.serviceCenterData.address.state}
            sx={SX}
            onChange={handleNameChange}
          >
            {indianState?.map((item: any) => (
              <Option key={item?.key} value={item?.label}>
                {item?.label}
              </Option>
            ))}
          </Select>
        </FlexDiv>
        <FlexDiv
          alignItemsCenter
          justifyContentSpaceBetween
          width="100%"
          style={{ marginTop: "20px" }}
        >
          {/* <Select
            placeholder="Serve Vehicle Type"
            indicator={<KeyboardArrowDown />}
            sx={SX}
            value={formData.serviceCenterData?.serve_vehicle_type}
            onChange={handleServeVehicleTypeChange}
          >
            {selectedUser?.id === 2
              ? manufacturerVehicleType?.map((i: any, key) => (
                  <Option key={key} value={i?.name}>
                    {i?.name}
                  </Option>
                ))
              : vehicleType?.map((i: any, key) => (
                  <Option key={key} value={i?.name}>
                    {i?.name}
                  </Option>
                ))}
          </Select> */}
          {/* <Select
            placeholder="Brand"
            indicator={<KeyboardArrowDown />}
            sx={SX}
            onChange={handleBrandChange}
            value={formData.serviceCenterData.brand_name}
          >
            {brandsList?.map((item: any) => (
              <Option key={item?.id} value={item?.name}>
                {item?.name}
              </Option>
            ))}
          </Select> */}
          <Select
            placeholder="Tier Type"
            indicator={<KeyboardArrowDown />}
            sx={SX}
            onChange={handleTierChange}
            value={formData.serviceCenterData.tier_Type}
          >
            {tierTypes?.map((item: any) => (
              <Option key={item?.id} value={item?.value}>
                {item?.label}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Ownership Type"
            indicator={<KeyboardArrowDown />}
            sx={SX}
            onChange={handleOwnershipChange}
            value={formData.serviceCenterData?.ownership_type}
          >
            {ownershipType?.map((item: any) => (
              <Option key={item?.id} value={item?.name}>
                {item?.name}
              </Option>
            ))}
          </Select>
          <div style={{ width: "30%" }}></div>
        </FlexDiv>
        <FlexDiv
          alignItemsCenter
          justifyContentSpaceBetween
          width="100%"
          style={{ marginTop: "20px" }}
        >
          {/* <Input
            name="latitude"
            value={formData.serviceCenterData.address.latitude}
            placeholder="Latitude"
            onChange={handleAddressChange}
            sx={{ width: "30%" }}
          />
          <Input
            name="longitude"
            placeholder="Longitude"
            value={formData.serviceCenterData.address.longitude}
            onChange={handleAddressChange}
            sx={{ width: "30%" }}
          /> */}
        </FlexDiv>
        {/* <FlexDiv
            alignItemsCenter
            justifyContentSpaceBetween
            width="100%"
            style={{ marginTop: "20px" }}
          >
           
            <Select
              placeholder="Select Country"
              value={formData.serviceCenterData.address.country}
              indicator={<KeyboardArrowDown />}
              sx={SX}
              onChange={handleCountryChange}
            >
              {countryOptions?.map((item: any) => (
                <Option key={item?.id} value={item?.name}>
                  {item?.name}
                </Option>
              ))}
            </Select>
            <div style={{ width: "30%" }}></div>
          </FlexDiv> */}
      </ProductWrapper>
      <ProductWrapper>
        <div style={{ fontSize: "1.4rem" }}>Images</div>
        <FlexDiv
          alignItemsCenter
          justifyContentSpaceBetween
          width="100%"
          style={{ marginTop: "20px" }}
        >
          <FlexDiv column style={{ gap: "10px" }}>
            <span>
              Add{" "}
              {selectedUser?.id === 1
                ? "Distributor"
                : selectedUser?.id === 2
                ? "Manufacturer"
                : "Service Center"}{" "}
              Banner Image
            </span>
            <ImgContainer onClick={handleImgContainerClick}>
              {bannerSelected ? (
                <img
                  src={bannerSelected}
                  alt="Selected"
                  style={{ width: "80px", height: "80px" }}
                />
              ) : (
                <AddAPhotoOutlinedIcon sx={{ fontSize: "2em" }} />
              )}
            </ImgContainer>
            <HiddenInput
              type="file"
              name="banners"
              ref={fileInputRef}
              onChange={({ target }) => onImagesSelect(target)}
            />
          </FlexDiv>
          <FlexDiv column style={{ gap: "10px" }}>
            <span>
              Add
              {selectedUser?.id === 1
                ? "Distributor"
                : selectedUser?.id === 2
                ? "Manufacturer"
                : "Service Center"}{" "}
              Brand Logo
            </span>
            <ImgContainer onClick={handleImgContainerClick2}>
              {brandLogoSelected ? (
                <img
                  src={brandLogoSelected}
                  alt="Selected"
                  style={{ width: "80px", height: "80px" }}
                />
              ) : (
                <AddAPhotoOutlinedIcon sx={{ fontSize: "2em" }} />
              )}
            </ImgContainer>
            <HiddenInput
              name="brand_logo"
              type="file"
              ref={fileInputRef2}
              onChange={({ target }) => onImagesSelect(target, "brandlogo")}
            />
          </FlexDiv>
          <FlexDiv column style={{ gap: "10px" }}>
            <span>Add Distributor Brand Icon</span>
            <ImgContainer onClick={handleImgContainerClick3}>
              {brandIconSelected ? (
                <img
                  src={brandIconSelected}
                  alt="Selected"
                  style={{ width: "80px", height: "80px" }}
                />
              ) : (
                <AddAPhotoOutlinedIcon sx={{ fontSize: "2em" }} />
              )}
            </ImgContainer>
            <HiddenInput
              name="icon"
              type="file"
              ref={fileInputRef3}
              onChange={({ target }) => onImagesSelect(target, "brandIcon")}
            />
          </FlexDiv>
        </FlexDiv>
        <FlexDiv style={{ marginTop: "20px" }}>
          <span style={{ color: "#939393" }}>
            364*227px ,below 50KB ,Transparent
          </span>
        </FlexDiv>
      </ProductWrapper>
      <ProductWrapper>
        <div style={{ fontSize: "1.4rem" }}>Description</div>
        <FlexDiv
          width="100%"
          justifyContentFlexStart
          style={{ paddingBottom: "20px", margin: "15px 0px" }}
        >
          <textarea
            name="description"
            placeholder={
              selectedUser?.id === 1
                ? " Enter Distributor description"
                : selectedUser?.id === 2
                ? " Enter Manufacturer description"
                : "Enter Service Center description"
            }
            onChange={(target: any) => handleDataChange(target)}
            value={formData.serviceCenterData.description}
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
      </ProductWrapper>
      <FlexDiv
        alignItemsCenter
        justifyContentCenter
        width="100%"
        style={{ marginTop: "20px" }}
      >
        <BackBtn onClick={goToNewManufacturerDashboard}>Back</BackBtn>
        <SubmitBtn onClick={onSubmit}>Submit</SubmitBtn>
      </FlexDiv>
    </div>
  );
};

export default AddBUForm;
