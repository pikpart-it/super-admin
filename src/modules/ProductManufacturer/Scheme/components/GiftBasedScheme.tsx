import React from "react";
import { category_type, giftItems, schemeType } from "../AddScheme";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../../style/styled";
import {
  InputContainer,
  schemeApplicationType,
  schemeShoppingType,
} from "./KitBasedScheme";
import { FormInput, MyFormSelect } from "../../../../components/Forms/Form";
import IndividualProductsSection from "./IndividualProductsSection";
import MasterCategorySelection from "./MasterCategorySelection";
import SubCategorySelection from "./SubCategorySelection";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import Header from "../../../../components/ListsHeader";
import { DashboardCard } from "./DiscountBasedScheme";

const GiftBasedScheme = ({
  scheme,
  onChange,
  productsList,
  onProductAdd,
  removeProducts,
  masterCategoryList,
  addCategories,
  removeCategories,
  subCategory,
  addSubCategories,
  removeSubCategory,
  giftsList,
  detailsId,
  brands,
  models,
}: {
  scheme: schemeType;
  onChange: (target) => void;
  productsList: any[];
  onProductAdd: () => void;
  removeProducts: (index: number) => void;
  masterCategoryList: category_type[];
  addCategories: () => void;
  removeCategories: (index: number) => void;
  subCategory: category_type[];
  addSubCategories: () => void;
  removeSubCategory: (index: number) => void;
  giftsList: giftItems[];
  detailsId: boolean;
  brands: any[];
  models: any[];
}) => {
  return (
    <>
      <FlexDiv justifyContentCenter>
        <DashboardCard style={{ width: "80%" }}>
          <FlexDiv column width="100%">
            <FlexDiv justifyContentFlexStart>
              <h2 style={{ color: "rgb(219, 89, 45)", margin: "20px" }}>
                Scheme Details
              </h2>
            </FlexDiv>
            <FlexDiv width="100%" margin="20px" wrap justifyContentFlexStart>
              <InputContainer>
                <FormInput
                  name="min_cart_value"
                  label="Minimum Cart Value"
                  type="number"
                  fieldErrors={{}}
                  // value={scheme.min_cart_value}
                  onChange={(target) => onChange(target)}
                  disabled={detailsId}
                  isFloat
                />
              </InputContainer>
              <InputContainer>
                <MyFormSelect
                  list={[]}
                  fieldErrors={{}}
                  name="scheme_shopping_type"
                  label="Shopping Type"
                  options={schemeShoppingType}
                  value={scheme.scheme_shopping_type.name}
                  onChange={(target) => onChange(target)}
                  disabled={detailsId}
                  selectProps={{
                    renderValue: (val: any) => val,
                  }}
                />
              </InputContainer>
              {scheme?.scheme_shopping_type?.value === "flexible_shopping" && (
                <InputContainer>
                  <FormInput
                    type="text"
                    fieldErrors={{}}
                    name="expiration_period"
                    label="Expiration Period (in days)"
                    value={scheme?.expiration_period}
                    onChange={(target) => onChange(target)}
                    disabled={detailsId}
                  />
                </InputContainer>
              )}
              <InputContainer>
                <MyFormSelect
                  list={[]}
                  fieldErrors={{}}
                  name="scheme_Applicable_on"
                  label="Applicable On"
                  options={schemeApplicationType}
                  value={scheme.scheme_Applicable_on?.name}
                  onChange={(target) => onChange(target)}
                  disabled={detailsId}
                  selectProps={{
                    renderValue: (val: any) => val,
                  }}
                />
              </InputContainer>
              {!detailsId && (
                <InputContainer>
                  <FormControl fullWidth>
                    <InputLabel>Select Gift Items </InputLabel>
                    <Select
                      multiple
                      name="scheme_gift_items"
                      value={scheme.scheme_gift_items}
                      onChange={({ target }) => onChange(target)}
                      label="Select Gift Items"
                    >
                      {giftsList?.map((i: any) => (
                        <MenuItem key={i?.id} value={i}>
                          {i?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </InputContainer>
              )}
            </FlexDiv>
            {detailsId ? (
              <FlexDiv column alignItemsCenter>
                <h4>Gift Items</h4>
                <GiftsList giftsList={scheme.scheme_gift_items} />
              </FlexDiv>
            ) : null}
            {scheme.scheme_Applicable_on?.value === "individual_product" && (
              <IndividualProductsSection
                scheme={scheme}
                onChange={onChange}
                productsList={productsList}
                onProductAdd={onProductAdd}
                removeProducts={removeProducts}
                detailsId={detailsId}
                brands={brands}
                models={models}
              />
            )}
            {scheme.scheme_Applicable_on?.value === "master_category" && (
              <MasterCategorySelection
                scheme={scheme}
                onChange={onChange}
                masterCategoryList={masterCategoryList}
                addCategories={addCategories}
                removeCategories={removeCategories}
                detailsId={detailsId}
              />
            )}
            {scheme.scheme_Applicable_on?.value === "sub_category" && (
              <SubCategorySelection
                scheme={scheme}
                onChange={onChange}
                masterCategoryList={masterCategoryList}
                subCategory={subCategory}
                addSubCategories={addSubCategories}
                removeSubCategory={removeSubCategory}
                detailsId={detailsId}
              />
            )}
          </FlexDiv>
        </DashboardCard>
      </FlexDiv>
    </>
  );
};

export default GiftBasedScheme;

export const GiftsList = ({ giftsList }: { giftsList: any[] }) => {
  const headers = ["Id", "Name", "Amount", "Image"];

  return (
    <FlexDiv width="100%" justifyContentCenter style={{ marginBottom: "20px" }}>
      <TableContainer sx={{ width: "800px" }} component={Paper}>
        <Table sx={{ minWidth: "fit-content" }} aria-label="Gifts List">
          <Header titles={headers} color="#000" />
          <TableBody>
            {giftsList.length
              ? giftsList.map((row) => {
                  return (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align="center">
                        {row?.id || "--"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row?.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row?.amount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <img src={row?.imageUrl} width="50px" height="50px" />
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </FlexDiv>
  );
};
