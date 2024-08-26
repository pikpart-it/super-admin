import React, { useState } from "react";
import styled from "styled-components";
import { FlexDiv } from "../../../style/styled";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import filter from "../../../assets/aifffiii.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { RoutesPath } from "../../../config/routes.config";

export const Header = styled.div`
  font-weight: bold;
  font-size: 23px;
  color: #3a9efd;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  padding-left: 30px;
`;

export const MainDiv = styled.div`
  width: 100%;
  background-color: #eeeeee;
  border-top-left-radius: 100px;
  padding: 20px 30px;
`;

export const DropdownBox = styled.div`
  border-radius: 4px;
  background: #2796ff;
  background: #dbdbdb;
  color: #999999;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  padding: 2px 8px;
  &.active {
    background: #2796ff;
    color: #fff;
  }
  cursor: pointer;
`;
const ListBox = styled.div`
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease-out;
  margin-top: 10px;
  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 1024px) {
    margin-bottom: 10px;
  }
`;

const OrderWrapper = styled.div`
  background: #fff;
  margin-top: 1rem;
  padding: 20px 30px;
  border: 1px solid #e7e7e7;
`;
const OrderText = styled.div`
  color: #fff;
`;
const Ordervalue = styled.div`
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
`;
const AddWrapper = styled.div`
  background: #25a64c;
  margin-top: 10px;
  padding: 2px 20px;
  border-radius: 4px;
`;
const ProductWrapper = styled.div`
  background: #fff;
  padding: 20px;
`;

//New Styling
const Headline = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;
const ViewAllbutton = styled.div`
  width: 100px;
  text-align: center;
  color: #fff;
  background: #e04b24;
  padding: 4px 10px;
  border-radius: 2px;
  cursor: pointer;
`;
const ColText = styled.div`
  color: #727272;
  width: 15%;
`;

const ListBoxComponent = ({
  orders,
  value,
  bg,
}: {
  orders: string;
  value: number;
  bg: string;
}) => {
  return (
    <ListBox style={{ width: "22%", background: bg, height: "120px" }}>
      <FlexDiv>
        <div>
          <ShoppingCartIcon
            style={{
              color: "#fff",
            }}
          />
        </div>
        <OrderText>{orders}</OrderText>
      </FlexDiv>

      <Ordervalue>{value}</Ordervalue>
    </ListBox>
  );
};
const InventorylistCom = ({ name, count }: { name: string; count: number }) => {
  return (
    <div
      style={{
        width: "100%",
        boxShadow: " 0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        padding: "15px 0px",
        margin: "10px 0px",
      }}
    >
      <FlexDiv justifyContentSpaceEvenly>
        <div style={{ width: "40%" }}>{name}</div>
        <div style={{ border: "1.5px solid #E5E5E5" }}></div>
        <div
          style={{ color: "#E04B24", fontSize: "1.1rem", fontWeight: "bold" }}
        >
          {count}
        </div>
      </FlexDiv>
    </div>
  );
};
const BigListBoxComp = ({
  Bu,
  count,
  Icon,
  width,
}: {
  Bu: string;
  count: number;
  Icon?: JSX.Element;
  width: string;
}) => {
  return (
    <ListBox style={{ width: width, height: "90px" }}>
      <FlexDiv alignItemsCenter>
        <div style={{ color: "#E04B24" }}>{Icon}</div>
        <div
          style={{ color: "#313233", fontWeight: "bold", marginLeft: "5px" }}
        >
          {Bu}
        </div>
      </FlexDiv>
      <div style={{ color: "#E04B24", fontSize: "1.5rem", fontWeight: "bold" }}>
        {count}
      </div>
    </ListBox>
  );
};

function NewPmDashboard({ history }) {
  const [activeBox, setActiveBox] = useState("ecom");
  const HandleActiveBox = (Clicked) => {
    setActiveBox(Clicked);
  };

  return (
    <MainDiv>
      <FlexDiv alignItemsCenter justifyContentSpaceBetween>
        <Header>Dashboard</Header>
        <FlexDiv>
          <DropdownBox
            onClick={() => {
              HandleActiveBox("ecom");
            }}
            className={activeBox === "ecom" ? "active" : ""}
          >
            <DashboardIcon />
            <span>Ecom</span>
          </DropdownBox>
        </FlexDiv>
      </FlexDiv>
      <div style={{ marginTop: "1rem", border: "1px solid #d0d0d0" }}></div>
      <OrderWrapper>
        <Headline>Orders</Headline>
        <FlexDiv style={{ marginTop: "1rem" }} justifyContentSpaceBetween>
          {/* <FlexDiv align
          ItemsCenter style={{  width: "20%" }}>
            <div>
              <CalendarMonthIcon />
            </div>
            <div style={{ marginLeft: "10px" }}>Today</div>
          </FlexDiv> */}

          <FlexDiv
            style={{ width: "100%", flexWrap: "wrap" }}
            justifyContentSpaceBetween
          >
            <ListBoxComponent orders="B2C Order" value={220} bg="#F98700" />
            <ListBoxComponent orders="B2B Order" value={220} bg="#E04B24" />
            <ListBoxComponent
              orders="Completed orders"
              value={220}
              bg="#25A64C"
            />
            <ListBoxComponent orders="In Progress" value={220} bg="#0C54A0" />
          </FlexDiv>
        </FlexDiv>
      </OrderWrapper>

      <FlexDiv justifyContentSpaceBetween style={{ marginTop: "2rem" }}>
        <ProductWrapper style={{ width: "48%" }}>
          <div style={{ color: "#313233", fontWeight: "bold" }}>
            Total Sales
          </div>{" "}
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={500}
            height={300}
          />
        </ProductWrapper>
        <ProductWrapper style={{ width: "48%" }}>
          <div style={{ color: "#313233", fontWeight: "bold" }}>
            Mximum Sell Area
          </div>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A", color: "#E04B24" },
                  { id: 1, value: 15, label: "series B", color: "#0C54A0" },
                  { id: 2, value: 20, label: "series C", color: "#25A64C" },
                  { id: 3, value: 30, label: "series D", color: "#F98700" },
                ],
              },
            ]}
            width={500}
            height={300}
          />
        </ProductWrapper>
      </FlexDiv>

      <FlexDiv justifyContentSpaceBetween style={{ marginTop: "2rem" }}>
        <ProductWrapper style={{ width: "70%" }}>
          <div style={{ fontSize: "1.1rem" }}>Top Selling Products</div>

          <FlexDiv justifyContentSpaceEvenly style={{ marginTop: "1rem" }}>
            <ColText>Rank</ColText>
            <ColText>Image</ColText>
            <ColText>Name</ColText>
            <ColText>Model</ColText>
            <ColText>Qty Sold</ColText>
            <ColText>Amount</ColText>
          </FlexDiv>
          <div style={{ border: "1.5px solid #E7E7E7" }}></div>
          <FlexDiv justifyContentFlexEnd style={{ marginTop: "10px" }}>
            <ViewAllbutton>View All</ViewAllbutton>
          </FlexDiv>
        </ProductWrapper>
        <ProductWrapper style={{ width: "28%" }}>
          <div style={{ fontSize: "1.1rem" }}>Inventory</div>
          <InventorylistCom name="All Product" count={500} />
          <InventorylistCom name="Available" count={500} />
          <InventorylistCom name="Short" count={500} />
          <InventorylistCom name="Out of stock" count={500} />
          <FlexDiv justifyContentFlexEnd>
            <ViewAllbutton
            //   onClick={() => history.push(RoutesPath.ManufacturerInventoryList)}
            >
              View All
            </ViewAllbutton>
          </FlexDiv>
        </ProductWrapper>
      </FlexDiv>

      <FlexDiv
        style={{ marginTop: "2rem", flexWrap: "wrap" }}
        justifyContentSpaceEvenly
      >
        <BigListBoxComp
          Bu="My Distributor"
          Icon={<StorefrontIcon />}
          count={5}
          width="19%"
        />
        <BigListBoxComp
          Bu="My Retailer "
          count={5}
          Icon={<StorefrontIcon />}
          width="19%"
        />
        <BigListBoxComp
          Bu="Service Centre"
          count={5}
          Icon={<SettingsSuggestIcon />}
          width="19%"
        />
        <BigListBoxComp
          Bu="Vehicle dealer"
          count={5}
          Icon={<DeliveryDiningIcon />}
          width="19%"
        />
        <ListBox style={{ width: "250px" }}>
          <div style={{ color: "#313233", fontWeight: "bold" }}>
            Add Business Units
          </div>
          <AddWrapper>
            <FlexDiv style={{ color: "#fff" }} alignItemsCenter>
              <div>
                <AddIcon style={{ fontSize: "1.2rem" }} />
              </div>
              <div>Add</div>
            </FlexDiv>
          </AddWrapper>
        </ListBox>
      </FlexDiv>

      <FlexDiv justifyContentSpaceBetween>
        <div style={{ width: "70%" }}>
          <ProductWrapper
            style={{
              marginTop: "2rem",
              width: "100%",
            }}
          >
            <div style={{ fontSize: "1.1rem" }}>Scheme</div>
            <FlexDiv justifyContentSpaceBetween>
              <BigListBoxComp Bu="Running" count={5} width="23%" />
              <BigListBoxComp Bu="Expired" count={5} width="23%" />
              <BigListBoxComp Bu="Sold" count={5} width="23%" />
              <ListBox style={{ width: "200px" }}>
                <div style={{ color: "#313233", fontWeight: "bold" }}>
                  Add New Scheme
                </div>
                <AddWrapper>
                  <FlexDiv style={{ color: "#fff" }} alignItemsCenter>
                    <div>
                      <AddIcon style={{ fontSize: "1.2rem" }} />
                    </div>
                    <div>Add</div>
                  </FlexDiv>
                </AddWrapper>
              </ListBox>
            </FlexDiv>
          </ProductWrapper>
          <ProductWrapper style={{ marginTop: "1rem" }}>
            <div style={{ fontSize: "1.1rem" }}>
              Top Performing Business Units
            </div>
            <FlexDiv justifyContentSpaceEvenly style={{ marginTop: "1rem" }}>
              <ColText>Rank</ColText>
              <ColText>Namw</ColText>
              <ColText>Type</ColText>
              <ColText>Item Sold</ColText>
              <ColText>Sale</ColText>
              <ColText>Action</ColText>
            </FlexDiv>
            <div style={{ border: "1.5px solid #E7E7E7" }}></div>
            <FlexDiv justifyContentFlexEnd style={{ marginTop: "10px" }}>
              <ViewAllbutton>View All</ViewAllbutton>
            </FlexDiv>
          </ProductWrapper>
        </div>

        <ProductWrapper style={{ marginTop: "2rem", width: "28%" }}>
          <div style={{ fontSize: "1.1rem" }}>Invoices</div>
          <BigListBoxComp Bu="B2B Invoices" count={5} width="100%" />
          <BigListBoxComp Bu="B2C Invoices" count={5} width="100%" />
          <ListBox style={{ width: "100%", padding: "15px" }}>
            <div style={{ color: "#313233", fontWeight: "bold" }}>
              New Invoice
            </div>
            <AddWrapper
              style={{ background: "#25A64C" }}
            //   onClick={() => {
            //     history.push(RoutesPath.ManufacturerCreateInvoice);
            //   }}
            >
              <FlexDiv style={{ color: "#fff" }} alignItemsCenter>
                <div>Create</div>
              </FlexDiv>
            </AddWrapper>
          </ListBox>
          <FlexDiv justifyContentFlexEnd style={{ marginTop: "10px" }}>
            {/* <ViewAllbutton
              onClick={() => {
                history.push(RoutesPath.ManufacturerInvoicesList);
              }}
            >
              View All
            </ViewAllbutton> */}
          </FlexDiv>
        </ProductWrapper>
      </FlexDiv>
    </MainDiv>
  );
}

export default NewPmDashboard;
