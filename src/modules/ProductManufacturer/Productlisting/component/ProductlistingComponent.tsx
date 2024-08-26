import React from "react";
import { Header, MainDiv } from "../../Businessunits/component/AddBUHOC";
import { FlexDiv } from "../../../../style/styled";
import { ProductWrapper } from "../../Businessunits/component/AddBUForm";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Excel from "../../../../assets/PM/Excel.png";
import Download from "../../../../assets/PM/download.png";
import Upload from "../../../../assets/PM/Upload.png";
import { Input } from "@mui/joy";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";


export const ActiveCard = styled.div`
  width: 150px;
  border: 2px solid #e7e7e7;
  margin-left: 15px;
  padding: 15px 20px;
`;
const CSVCard = styled.div`
  width: 170px;
  border: 2px solid #e7e7e7;
  padding: 7.5px 10px;
`;
const CardCount = styled.div`
  font-size: 1.5rem;
  color: #e04b24;
  font-weight: bold;
  margin-top: 10px;
`;
const AddProduct = styled.div`
  display: flex;
  align-items: center;
  background: #25a64c;
  color: #fff;
  padding: 20px 10px;
  cursor: pointer;
`;
const ProductBox = ({ name, count }) => {
  return (
    <ActiveCard>
      <div>{name}</div>
      <CardCount>{count}</CardCount>
    </ActiveCard>
  );
};
const ProductlistingComponent = () => {
  return (
    <MainDiv>
      <FlexDiv column>
        <div style={{ width: "20%" }}>
          <Header>Product list</Header>
        </div>
        <div style={{ width: "100%", marginTop: "1rem" }}>
          <hr />
        </div>
      </FlexDiv>
      <ProductWrapper>
        <FlexDiv justifyContentSpaceBetween alignItemsCenter>
          <FlexDiv justifyContentCenter>
            <ProductBox name="All Products" count="200" />
            <ProductBox name="Not approved" count="20" />
            <ProductBox name="In Progress" count="2" />
            <ProductBox name="Approved" count="20" />
            <ProductBox name="Rejected" count="10" />
          </FlexDiv>
          <div>
            <CSVCard>
              <FlexDiv justifyContentSpaceBetween>
                <div style={{ fontSize: "0.9rem" }}>Upload CSV</div>
                <div>
                  <img src={Excel} />
                </div>
                <div>
                  <img src={Upload} />
                </div>
              </FlexDiv>
            </CSVCard>

            <CSVCard>
              <FlexDiv justifyContentSpaceBetween>
                <div style={{ fontSize: "0.9rem" }}>CSV Format</div>
                <div>
                  <img src={Excel} />
                </div>
                <div>
                  <img src={Download} />
                </div>
              </FlexDiv>
            </CSVCard>
          </div>

          <AddProduct>
            <div>
              <AddIcon style={{ fontSize: "2rem" }} />
            </div>
            <div>Add Product</div>
          </AddProduct>
        </FlexDiv>
      </ProductWrapper>

      <FlexDiv justifyContentFlexEnd style={{marginTop:'1rem'}}>
        <Input
          startDecorator={<SearchSharpIcon />}
          placeholder="Search Products"
        />
      </FlexDiv>
    </MainDiv>
  );
};

export default ProductlistingComponent;
