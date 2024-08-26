import React from "react";
import styled from "styled-components";
import { FormInput, MyFormSelect } from "../../../../components/Forms/Form";
import { schemeApplicationType, schemeShoppingType } from "./KitBasedScheme";
import { category_type, schemeType } from "../AddScheme";
import IndividualProductsSection from "./IndividualProductsSection";
import MasterCategorySelection from "./MasterCategorySelection";
import SubCategorySelection from "./SubCategorySelection";
import { FlexDiv } from "../../../../style/styled";

const Card = styled(FlexDiv)`
  // padding: 2vmax;
  border-radius: 10px;
  box-shadow: 0px 3px 2px #aab2bd;
`;
export const DashboardCard = styled(Card)`
// margin-bottom: 30px;
// padding: 10px;
// border: 1px solid #ddd;
// box-shadow: rgb(204, 204, 204) 0 0 5px;
margin-top:20px;
backgroun:fff;
box-shadow: 0px 2px 2px 1px #bbb;

@media (max-width:900px) {
  margin: 10px 0px;
  text-align:center
  padding: 50px;
}
`;

const InputContainer = styled.div`
  width: 30%;
  margin: 5px;
`;

export const discountOptions = [
  { name: "Extra Discount", value: "extra_discount" },
  { name: "MRP Discount", value: "mrp_discount" },
];

const DiscountBasedScheme = ({
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
  detailsId: boolean;
  brands: any[];
  models: any[];
}) => {
  return (
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
                name="min_shopping_amount"
                label="Min Shopping Amount"
                type="number"
                fieldErrors={{}}
                // value={scheme?.min_shopping_amount}
                onChange={(target) => onChange(target)}
                disabled={detailsId}
                isFloat
              />
            </InputContainer>

            <InputContainer>
              <MyFormSelect
                name="discount_option"
                label="Discount Options"
                value={scheme.discount_option}
                onChange={(target) => onChange(target)}
                fieldErrors={{}}
                list={[]}
                options={discountOptions}
                disabled={detailsId}
              />
            </InputContainer>
            <InputContainer>
              <FormInput
                name="discount_percent"
                label="Discount Percent"
                type="number"
                fieldErrors={{}}
                // value={scheme?.discount_percent}
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
                value={scheme?.scheme_shopping_type?.name}
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
                value={scheme?.scheme_Applicable_on?.name}
                onChange={(target) => onChange(target)}
                disabled={detailsId}
                selectProps={{
                  renderValue: (val: any) => val,
                }}
              />
            </InputContainer>
          </FlexDiv>
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
  );
};

export default DiscountBasedScheme;
