import React from "react";
import { FlexDiv } from "../../../../style/styled";
import AddBUForm from "./AddBUForm";
import styled from "styled-components";

export const MainDiv = styled.div`
  width: 100%;
  background-color: #eeeeee;
  border-top-left-radius: 100px;
  padding: 20px 30px;
`;
export const Header = styled.div`
  font-weight: bold;
  font-size: 23px;
  color: #FF5C00;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  padding-left: 30px;
`;
const AddBUHOC = ({
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
  return (
    <MainDiv>
      <FlexDiv column>
        <div style={{ width: "20%" }}>
          <Header>Add Business Unit</Header>
        </div>
        <div style={{ width: "100%", marginTop: "2rem" }}>
          <hr />
        </div>
      </FlexDiv>
      <AddBUForm
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        handleBUTypeChange={handleBUTypeChange}
        serviceCenter={serviceCenter}
        handleNameChange={handleNameChange}
        onChange={onChange}
        handleServeVehicleTypeChange={handleServeVehicleTypeChange}
        handleBrandChange={handleBrandChange}
        brandsList={brandsList}
        handleTierChange={handleTierChange}
        handleOwnershipChange={handleOwnershipChange}
        handleAssociateType={handleAssociateType}
        onImagesSelect={onImagesSelect}
        bannerSelected={bannerSelected}
        brandLogoSelected={brandLogoSelected}
        brandIconSelected={brandIconSelected}
        goToNewManufacturerDashboard={goToNewManufacturerDashboard}
        onSubmit={onSubmit}
        handleCountryChange={handleCountryChange}
        handleIsSuperStockIst={handleIsSuperStockIst}
      />
    </MainDiv>
  );
};

export default AddBUHOC;
