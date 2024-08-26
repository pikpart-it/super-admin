import styled from "styled-components";
import {
  FormInput,
  MyFormAsyncSelect,
  MyFormSelect,
} from "../../../../components/Forms/Form";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../../style/styled";
import { vehicleSearchLoad } from "../../../../utility/func";
import { schemeType, selected_products_type } from "../AddScheme";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import Header from "../../../../components/ListsHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchField from "../../../../components/SearchField";
import { config } from "../../../../config/config";

const InputContainer = styled.div`
  width: 25%;
  margin: 5px;
`;

const SelectionBorderedDiv = styled.div`
  border: 1px solid rgb(180, 180, 180);
  padding: 15px;
  border-radius: 4px;
  min-width: fit-content;
  text-align: center;
`;
const IndividualProductsSection = ({
  scheme,
  onChange,
  productsList,
  onProductAdd,
  removeProducts,
  detailsId,
  brands,
  models,
}: {
  scheme: schemeType;
  onChange: (target) => void;
  productsList: any[];
  onProductAdd: () => void;
  removeProducts: (index: number) => void;
  detailsId: boolean;
  brands: any[];
  models: any[];
}) => {
  const { selected_product, scheme_business_unit, scheme_business_unit_id } =
    scheme;

  const payload = {
    resourceType: scheme_business_unit?.value,
    vehicleId: selected_product.vehicle?.id,
    resourceId: scheme_business_unit_id?.id,
  };
  let url = `${config.baseUrl}/utilities/search-seller-products`;
  return (
    <>
      <FlexDiv column width="100%">
        {!detailsId && (
          <h3
            style={{
              margin: "20px",
              color: "rgb(219, 89, 45)",
            }}
          >
            Item
          </h3>
        )}
        {!detailsId && (
          <FlexDiv justifyContentSpaceEvenly>
            <InputContainer>
              <MyFormSelect
                name="vehicle_brand"
                label="Select Vehicle Brand"
                value={scheme.selected_product.vehicle_brand}
                onChange={(target: any) => onChange(target)}
                fieldErrors={{}}
                options={brands?.filter(
                  (i) => i?.vehicleType === scheme.vehicle_type.name
                )}
                list={[]}
                disabled={detailsId}
              />
            </InputContainer>
            <InputContainer>
              <MyFormSelect
                name="vehicle"
                label="Select Vehicle Model"
                value={scheme.selected_product.vehicle}
                onChange={(target: any) => onChange(target)}
                fieldErrors={{}}
                options={models}
                list={[]}
                disabled={detailsId}
              />
            </InputContainer>

            <InputContainer>
              <SearchField
                onChange={(value: any) =>
                  onChange({ name: "selected_product", value })
                }
                url={url}
                value={selected_product}
                fieldLabel={"Search Products"}
                query={`&resourceId=${payload.resourceId}&resourceType=${payload.resourceType}&vehicleId=${payload.vehicleId}`}
              />
            </InputContainer>
          </FlexDiv>
        )}
        {!!scheme.selected_product?.id && (
          <>
            <FlexDiv
              justifyContentSpaceEvenly
              width="60%"
              style={{ margin: "10px 0px 20px 0px " }}
            >
              {" "}
              <FlexDiv column alignItemsCenter>
                <p>Vehicle Brand</p>
                <SelectionBorderedDiv>
                  {scheme.selected_product.vehicle_brand?.name}
                </SelectionBorderedDiv>
              </FlexDiv>
              <FlexDiv column alignItemsCenter>
                <p>Vehicle Model</p>
                <SelectionBorderedDiv>
                  {scheme.selected_product.vehicle?.name}
                </SelectionBorderedDiv>
              </FlexDiv>
              <FlexDiv column alignItemsCenter>
                <p>Product Name </p>
                <SelectionBorderedDiv>
                  {scheme.selected_product?.name}
                </SelectionBorderedDiv>
              </FlexDiv>
              <FlexDiv column alignItemsCenter>
                <p>Product Code </p>
                <SelectionBorderedDiv>
                  {scheme.selected_product?.productCode}
                </SelectionBorderedDiv>
              </FlexDiv>
              <FlexDiv column alignItemsCenter>
                <p>MRP </p>
                <SelectionBorderedDiv>
                  {scheme.selected_product?.sellingPrice}
                </SelectionBorderedDiv>
              </FlexDiv>
              <FlexDiv column alignItemsCenter>
                <p>Min. Quantity </p>
                <input
                  style={{ padding: "15px 10px", width: "100px" }}
                  type="number"
                  name="selected_product_min_qty"
                  value={scheme.selected_product.selected_product_min_qty}
                  onChange={({ target }) => onChange(target)}
                />
              </FlexDiv>
            </FlexDiv>
            <FlexDiv justifyContentFlexStart style={{ margin: "15px 20px" }}>
              <Button variant="outlined" color="inherit" onClick={onProductAdd}>
                Add
              </Button>
            </FlexDiv>
          </>
        )}

        {!!scheme.selectedProductsList?.length && (
          <FlexDiv column alignItemsCenter>
            <h4>Products</h4>
            <ProductsList
              products={scheme.selectedProductsList}
              removeProducts={removeProducts}
              deleteEnabled={detailsId}
              shouldShowDiscount={
                scheme?.scheme_type?.value === "kit_gift_based"
              }
            />
          </FlexDiv>
        )}
      </FlexDiv>
    </>
  );
};

export default IndividualProductsSection;

const ProductsList = ({
  products,
  removeProducts,
  deleteEnabled,
  shouldShowDiscount,
}: {
  products: selected_products_type[];
  removeProducts: (index: number) => void;
  deleteEnabled: boolean;
  shouldShowDiscount?: boolean;
}) => {
  const headers = [
    "Vehicle Brand",
    "Vehicle Model",
    "Product Name",
    "Part code",
    "Min. Quantity",
    `${shouldShowDiscount ? "Discount %" : ""}`,
    "MRP",
    `${deleteEnabled ? "" : "Action"}`,
  ];

  return (
    <FlexDiv width="100%" justifyContentCenter style={{ marginBottom: "20px" }}>
      <TableContainer sx={{ width: "fit-content" }} component={Paper}>
        <Table sx={{ minWidth: "fit-content" }} aria-label="vehicle models">
          <Header titles={headers} color="#000" />
          <TableBody>
            {products.length
              ? products.map((row, index: number) => {
                  return (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align="center">
                        {row.vehicle_brand?.name || "--"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.vehicle?.name || "--"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.name || "--"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row?.productCode || "--"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row?.selected_product_min_qty || "--"}
                      </StyledTableCell>
                      {shouldShowDiscount && (
                        <StyledTableCell align="center">
                          {row?.discount_percent}
                        </StyledTableCell>
                      )}
                      <StyledTableCell align="center">
                        {row?.sellingPrice || "--"}
                      </StyledTableCell>

                      {!deleteEnabled && (
                        <StyledTableCell align="center">
                          <IconButton onClick={() => removeProducts(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </StyledTableCell>
                      )}
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
