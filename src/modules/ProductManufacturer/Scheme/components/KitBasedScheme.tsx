import styled from "styled-components";
import { FormInput, MyFormSelect } from "../../../../components/Forms/Form";
import { FlexDiv } from "../../../../style/styled";
import { category_type, giftItems, schemeType } from "../AddScheme";
import IndividualProductsSection from "./IndividualProductsSection";
import MasterCategorySelection from "./MasterCategorySelection";
import SubCategorySelection from "./SubCategorySelection";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { GiftsList } from "./GiftBasedScheme";
import { DashboardCard } from "./DiscountBasedScheme";
export const InputContainer = styled.div`
  width: 30%;
  margin: 5px;
`;

export const schemeShoppingType = [
  {
    name: "Flexible Shopping",
    value: "flexible_shopping",
  },
  {
    name: "One time Shopping",
    value: "one_time_shopping",
  },
];
export const schemeApplicationType = [
  {
    name: "All Products",
    value: "all_products",
  },
  {
    name: "Individual Product",
    value: "individual_product",
  },
  {
    name: "Master Category",
    value: "master_category",
  },
  {
    name: "Sub Category",
    value: "sub_category",
  },
];
const KitBasedScheme = ({
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
  giftsList,
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
  giftsList: giftItems[];
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
            <FlexDiv width="100%" margin="20px" wrap>
              <InputContainer>
                <FormInput
                  name="kit_total_amount"
                  label="Kit Total Amount"
                  type="number"
                  fieldErrors={{}}
                  // value={scheme?.kit_total_amount}
                  onChange={(target) => onChange(target)}
                  disabled={detailsId}
                  isFloat
                />
              </InputContainer>
              {scheme.scheme_type.value === "kit_based" && (
                <>
                  <InputContainer>
                    <FormInput
                      name="discount_percent"
                      label="Kit Discount Percent"
                      type="number"
                      fieldErrors={{}}
                      // value={scheme.discount_percent}
                      onChange={(target) => onChange(target)}
                      disabled={detailsId}
                      isFloat
                    />
                  </InputContainer>
                  <InputContainer>
                    <FormInput
                      name="kit_discount_amount"
                      label="Kit Discount Amount"
                      type="number"
                      fieldErrors={{}}
                      // value={scheme?.kit_discount_amount}
                      onChange={(target) => onChange(target)}
                      disabled
                    />
                  </InputContainer>
                </>
              )}
              {["kit_based", "kit_gift_based"].includes(
                scheme.scheme_type.value
              ) && (
                <InputContainer>
                  <FormInput
                    name="kit_adjusted_amount"
                    label="Kit Adjusted Amount"
                    type="number"
                    fieldErrors={{}}
                    // value={scheme?.kit_adjusted_amount}
                    onChange={(target) => onChange(target)}
                    disabled={detailsId}
                    isFloat
                  />
                </InputContainer>
              )}
              <InputContainer>
                <FormInput
                  name="kit_selling_price"
                  label="Kit Selling Price"
                  type="number"
                  fieldErrors={{}}
                  value={scheme?.kit_selling_price?.toFixed(2)}
                  onChange={(target) => onChange(target)}
                  disabled
                />
              </InputContainer>
              <InputContainer>
                <MyFormSelect
                  list={[]}
                  fieldErrors={{}}
                  name="scheme_shopping_type"
                  label="Shopping Type"
                  options={schemeShoppingType}
                  value={scheme.scheme_shopping_type?.name}
                  disabled={detailsId}
                  onChange={(target) => onChange(target)}
                  selectProps={{
                    renderValue: (val: any) => val,
                  }}
                />
              </InputContainer>
              {scheme.scheme_type.value === "kit_gift_based" && !detailsId && (
                <InputContainer>
                  <FormControl fullWidth>
                    <InputLabel>Select Gift Items </InputLabel>
                    <Select
                      multiple
                      name="scheme_gift_items"
                      value={scheme.scheme_gift_items}
                      onChange={({ target }) => onChange(target)}
                      label="Select Gift Items"
                      disabled={detailsId}
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

              <InputContainer>
                <MyFormSelect
                  list={[]}
                  fieldErrors={{}}
                  name="scheme_Applicable_on"
                  label="Applicable On"
                  options={schemeApplicationType}
                  value={scheme.scheme_Applicable_on?.name}
                  disabled={detailsId}
                  onChange={(target) => onChange(target)}
                  selectProps={{
                    renderValue: (val: any) => val,
                  }}
                />
              </InputContainer>
            </FlexDiv>
            {detailsId && scheme.scheme_gift_items?.length ? (
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

export default KitBasedScheme;
