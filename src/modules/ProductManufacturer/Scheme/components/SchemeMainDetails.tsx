import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";
import { FormInput, MyFormSelect } from "../../../../components/Forms/Form";
import SearchField from "../../../../components/SearchField";
import { config } from "../../../../config/config";
import { vehicleType } from "../../../../config/constants/addInventory";
import { FlexDiv } from "../../../../style/styled";
import { UseDistributorsList } from "../../../Hooks/UseDistributorsList";
import { UseManufacturersList } from "../../../Hooks/UseManufacturersList";
import { UseServiceCenterList } from "../../../Hooks/UseServiceCenterList";
import { schemeType } from "../AddScheme";
import { DashboardCard } from "./DiscountBasedScheme";
const InputContainer = styled.div`
  width: 30%;
  margin: 8px;
`;

export const schemeTypes = [
  { name: "Kit/Gift based", value: "kit_gift_based" },
  { name: "Kit based", value: "kit_based" },
  { name: "Discount based", value: "discount_based" },
  { name: "Gift based", value: "gift_based" },
];

export const schemeBUList = [
  { name: "Retailer", value: "BusinessCustomer" },
  { name: "Distributor", value: "ProductDistributor" },
  { name: "Manufacturer", value: "Manufacturer" },
  { name: "Garage", value: "ServiceCentre" },
];
export const schemeBuyerList = [
  { name: "Distributor", value: "ProductDistributor" },
  { name: "Garage", value: "ServiceCentre" },
  { name: "Retailer", value: "BusinessCustomer" },
  { name: "Mechanic", value: "BusinessCustomer" },
  { name: "New Shop Owner", value: "BusinessCustomer" },
];

export const SchemeMainDetails = ({
  scheme,
  onChange,
  detailsId,
  edit,
}: {
  scheme: schemeType;
  onChange: (target) => void;
  detailsId: boolean;
  edit: boolean;
}) => {
  const garagesList = UseServiceCenterList(500);
  const distributorsList = UseDistributorsList(700);
  const manufacturersList = UseManufacturersList(900);
  const url = `${config.baseUrl}/utilities/search-retailers`;

  const retrunBusinessUnitList = () => {
    if (scheme.scheme_business_unit?.value === "ProductDistributor") {
      return distributorsList;
    }
    if (scheme.scheme_business_unit?.value === "Manufacturer") {
      return manufacturersList;
    }
    if (scheme.scheme_business_unit?.value === "ServiceCentre") {
      return garagesList;
    }
  };
  return (
    <FlexDiv column alignItemsCenter>
      <DashboardCard style={{ width: "80%" }}>
        <FlexDiv width="100%" margin="20px" wrap justifyContentFlexStart>
          <InputContainer>
            <MyFormSelect
              name="scheme_business_unit"
              label="Scheme Business Unit *"
              list={[]}
              options={schemeBUList}
              fieldErrors={{}}
              value={scheme.scheme_business_unit?.name}
              onChange={(target) => onChange(target)}
              selectProps={{
                renderValue: (val: any) => val,
              }}
              disabled={detailsId}
            />
          </InputContainer>
          {scheme.scheme_business_unit?.value !== "BusinessCustomer" ? (
            <InputContainer>
              <MyFormSelect
                name="scheme_business_unit_id"
                label="Select Business Unit *"
                list={[]}
                options={retrunBusinessUnitList()}
                fieldErrors={{}}
                value={
                  retrunBusinessUnitList()?.find(
                    (i) => i?.id === scheme.scheme_business_unit_id?.id
                  ) || scheme.scheme_business_unit_id
                }
                onChange={(target) => onChange(target)}
                disabled={detailsId}
              />
            </InputContainer>
          ) : (
            <InputContainer>
              <SearchField
                onChange={(value: any) =>
                  onChange({ name: "scheme_business_unit_id", value })
                }
                url={url}
                value={scheme.scheme_business_unit_id}
                fieldLabel={"Search Retailers  *"}
              />
            </InputContainer>
          )}
          <InputContainer>
            <MyFormSelect
              name="scheme_buyer"
              label="Select Scheme Buyer *"
              list={[]}
              options={schemeBuyerList}
              fieldErrors={{}}
              value={scheme.scheme_buyer?.name}
              selectProps={{
                renderValue: (val: any) => val,
              }}
              onChange={(target) => onChange(target)}
              disabled={detailsId}
            />
          </InputContainer>
          <InputContainer>
            <FormInput
              name="name"
              label="Scheme Name *"
              type="text"
              fieldErrors={{}}
              value={scheme.name}
              onChange={(target) => onChange(target)}
              disabled={detailsId}
            />
          </InputContainer>
          <InputContainer>
            <FormInput
              name="scheme_code"
              label="Scheme Code *"
              type="text"
              fieldErrors={{}}
              value={scheme.scheme_code}
              onChange={(target) => onChange(target)}
              disabled={detailsId}
            />
          </InputContainer>
          <InputContainer>
            <MyFormSelect
              name="vehicle_type"
              label="Vehicle Type *"
              list={[]}
              options={vehicleType}
              fieldErrors={{}}
              value={scheme.vehicle_type.name}
              onChange={(target) => onChange(target)}
              selectProps={{
                renderValue: (val: any) => val,
              }}
              disabled={detailsId}
            />
          </InputContainer>

          <InputContainer>
            <FlexDiv column>
              <h3 style={{ margin: "-15px 0px 0px 0px", textAlign: "left" }}>
                Start Date *
              </h3>

              <input
                name="start_date"
                type="date"
                placeholder="Start Date "
                value={scheme.start_date}
                onChange={({ target }) => onChange(target)}
                style={{ margin: "5px", padding: "10px", width: "80%" }}
                disabled={detailsId}
              />
            </FlexDiv>
          </InputContainer>
          <InputContainer>
            <FlexDiv column>
              <h3 style={{ margin: "-15px 0px 0px 0px", textAlign: "left" }}>
                End Date *
              </h3>

              <input
                type="date"
                name="end_date"
                placeholder="01 Jan 2020"
                value={scheme.end_date}
                min={scheme.start_date}
                onChange={({ target }) => onChange(target)}
                style={{ margin: "5px", padding: "10px", width: "80%" }}
                disabled={detailsId && !edit}
              />
            </FlexDiv>
          </InputContainer>

          <InputContainer>
            <MyFormSelect
              name="scheme_type"
              label="Scheme Type  *"
              list={[]}
              options={schemeTypes}
              fieldErrors={{}}
              value={scheme.scheme_type.name}
              onChange={(target) => onChange(target)}
              selectProps={{
                renderValue: (val: any) => val,
              }}
              disabled={detailsId}
            />
          </InputContainer>
          <InputContainer>
            <FormInput
              name="shipping_percentage"
              label="Enter Shipping % *"
              type="number"
              isFloat
              fieldErrors={{}}
              value={scheme.shipping_percentage}
              onChange={(target) => onChange(target)}
              disabled={detailsId}
            />
          </InputContainer>
        </FlexDiv>
      </DashboardCard>
    </FlexDiv>
  );
};

export const SchemeBanner = ({
  scheme,
  onChange,
  detailsId,
  onTermsChange,
  addNewTerm,
  deleteTerm,
}: {
  scheme: schemeType;
  onChange: (target) => void;
  detailsId: boolean;
  onTermsChange: (target, key) => void;
  addNewTerm: () => void;
  deleteTerm: (key) => void;
}) => {
  return (
    <FlexDiv column alignItemsCenter style={{ marginBottom: "40px" }}>
      <DashboardCard style={{ width: "80%" }}>
        <FlexDiv column width="100%">
          {!detailsId && (
            <>
              <FlexDiv justifyContentFlexStart width="100%">
                <h3 style={{ margin: "20px", color: "rgb(219, 89, 45)" }}>
                  Scheme Banners *
                </h3>
                <input
                  type="file"
                  name="scheme_banner"
                  value={scheme.scheme_banner?.fileName}
                  onChange={({ target }) => onChange(target)}
                  style={{ margin: "auto 20px" }}
                  multiple
                />
              </FlexDiv>
              <FlexDiv justifyContentFlexStart width="100%">
                <h3 style={{ margin: "20px", color: "rgb(219, 89, 45)" }}>
                  Scheme Icons *
                </h3>
                <input
                  type="file"
                  name="scheme_icon"
                  value={scheme.scheme_icon?.fileName}
                  onChange={({ target }) => onChange(target)}
                  style={{ margin: "auto 20px" }}
                />
              </FlexDiv>
            </>
          )}
          <FlexDiv width="100%" column alignItemsFlexStart>
            <h3 style={{ margin: "10px 20px", color: "rgb(219, 89, 45)" }}>
              {`  Scheme Description ${!detailsId ? "(max 500)" : ""}*`}
            </h3>

            <textarea
              name="scheme_description"
              value={scheme.scheme_description}
              placeholder="Add Description"
              maxLength={500}
              onChange={({ target }) => onChange(target)}
              disabled={detailsId}
              style={{ width: "90%", margin: "10px 20px", padding: "20px" }}
            />
          </FlexDiv>
          <FlexDiv width="100%" column alignItemsFlexStart>
            <h3 style={{ margin: "10px 20px", color: "rgb(219, 89, 45)" }}>
              {` Scheme Summary ${!detailsId ? "(max 500)" : ""}*`}
            </h3>

            <textarea
              name="scheme_summary"
              value={scheme.scheme_summary}
              placeholder="Add Summary"
              onChange={({ target }) => onChange(target)}
              disabled={detailsId}
              maxLength={500}
              style={{ width: "90%", margin: "10px 20px", padding: "20px" }}
            />
          </FlexDiv>
          <FlexDiv width="100%" column margin="20px">
            <FlexDiv justifyContentSpaceBetween width="70%">
              <h3 style={{ margin: "10px 0px", color: "rgb(219, 89, 45)" }}>
                Scheme Terms *
              </h3>
              {!detailsId && (
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ textTransform: "none" }}
                  startIcon={<FaPlus />}
                  onClick={addNewTerm}
                >
                  Add New Term
                </Button>
              )}
            </FlexDiv>
            <FlexDiv wrap>
              {scheme?.scheme_terms?.map((i, index) => (
                <FlexDiv
                  justifyContentSpaceBetween
                  style={{ width: "30%", margin: "5px" }}
                  key={index}
                >
                  <FormInput
                    type="text"
                    fieldErrors={{}}
                    name="terms"
                    value={i?.terms}
                    label="Terms"
                    onChange={(target) => onTermsChange(target, index)}
                    disabled={detailsId}
                  />
                  {!detailsId && (
                    <p
                      style={{
                        marginTop: "-10px",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                      onClick={() => deleteTerm(index)}
                    >
                      x
                    </p>
                  )}
                </FlexDiv>
              ))}
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
      </DashboardCard>
    </FlexDiv>
  );
};
