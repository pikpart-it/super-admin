import React, { useEffect, useState } from "react";
import { Header, MainDiv } from "../component/AddBUHOC";
import { FlexDiv } from "../../../../style/styled";
import styled from "styled-components";
import { Input } from "@mui/joy";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { config } from "../../../../config/config";
import { getAuthorized } from "../../../../services";
import FuzzySearch from "fuzzy-search";
import { ProductWrapper } from "../component/AddBUForm";
import DistributorList from "../component/DistributorList";
import RetailerList from "../component/RetailerList";

export type ListingType = {
  id: number;
  businessName: string;
  createdAt: string;
  email: string;
  phoneNumber: string;
  serveVehicleType?: string;
};
const BusinessAttributesBox = styled.div`
  width: 20%;
  box-shadow: 0px 1px 20px 6px #2796ff0f;
  padding: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Filter = styled.span`
  font-size: 1rem;
  width: fit-content;
  cursor: pointer;
  &.active {
    background: #b8ddff;
    font-weight: 900;
    padding: 5px;
    border-radius: 6px;
  }
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
const ListBusinessUnit = () => {
  const [activeState, setActiveState] = useState<string | any>(
    "ProductDistributor"
  );
  const [data, setData] = useState<ListingType[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const getBU = async () => {
    let url = `${config.baseUrl}/manufacturer/getBUs?loginId=${
      user?.id
    }&loginType=${user?.resourceType}${
      activeState === "ProductDistributor" || activeState === "BusinessCustomer"
        ? `&resourceType=${activeState}`
        : ""
    }`;
    try {
      const response = await getAuthorized(url);
      setData(response?.data?.data);
    } catch (error) {
      console.log("BAD API");
    }
  };
  useEffect(() => {
    if (activeState) {
      getBU();
    }
  }, [activeState]);
  return (
    <MainDiv>
      <FlexDiv column>
        <div style={{ width: "20%" }}>
          <Header>Business Unit List</Header>
        </div>
        <div style={{ width: "100%", marginTop: "1rem" }}>
          <hr />
        </div>
      </FlexDiv>
   
      <ProductWrapper style={{ padding: "10px" }}>
        <FlexDiv alignItemsCenter justifyContentSpaceBetween>
          <FlexDiv
            alignItemsCenter
            justifyContentSpaceBetween
            style={{ width: activeState !== "retailer" ? "20%" : "40%" }}
          >
            <Filter
              className={activeState === "ProductDistributor" ? "active" : ""}
              onClick={() => setActiveState("ProductDistributor")}
            >
              Distributor
            </Filter>
            <Filter
              className={activeState === "BusinessCustomer" ? "active" : ""}
              onClick={() => setActiveState("BusinessCustomer")}
            >
              Retailer
            </Filter>
            <Filter
              className={activeState === "Dealer" ? "active" : ""}
              onClick={() => setActiveState("Dealer")}
            >
              Dealer
            </Filter>
          </FlexDiv>
          <FlexDiv>
            <Input
              startDecorator={<SearchSharpIcon />}
              placeholder="Search Business Units"
            />
          </FlexDiv>
        </FlexDiv>
      </ProductWrapper>
      {activeState === "ProductDistributor" ? (
        <DistributorList data={data} />
      ) : (
        <RetailerList data={data} />
      )}
    </MainDiv>
  );
};

export default ListBusinessUnit;
