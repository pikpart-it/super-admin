import React from "react";
import { category_type, schemeType } from "../AddScheme";
import { MyFormSelect } from "../../../../components/Forms/Form";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../../style/styled";
import styled from "styled-components";
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

const SelectionBorderedDiv = styled.div`
  border: 1px solid rgb(180, 180, 180);
  padding: 15px;
  border-radius: 4px;
  //width: fit-content;
  min-width: 150px;
  text-align: center;
  margin: 10px;
`;
const SubCategorySelection = ({
  scheme,
  onChange,
  masterCategoryList,
  subCategory,
  addSubCategories,
  removeSubCategory,
  detailsId,
}: {
  scheme: schemeType;
  onChange: (target) => void;
  masterCategoryList: category_type[];
  subCategory: category_type[];
  addSubCategories: () => void;
  removeSubCategory: (index: number) => void;
  detailsId: boolean;
}) => {
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
            Sub Category
          </h3>
        )}

        {!detailsId && (
          <FlexDiv width="50%" margin="10px 20px">
            <FlexDiv width="40%" margin="10px">
              <MyFormSelect
                name="sub_category"
                label="Select Sub Category"
                list={[]}
                fieldErrors={{}}
                onChange={(target) => onChange(target)}
                value={scheme.sub_category}
                options={subCategory?.filter(
                  (i) => i?.vehicleType === (scheme.vehicle_type.name || "2W")
                )}
              />
            </FlexDiv>
          </FlexDiv>
        )}

        {!!scheme.sub_category?.id && (
          <>
            <FlexDiv
              justifyContentSpaceEvenly
              width="25%"
              style={{ margin: "20px " }}
            >
              <FlexDiv column alignItemsCenter>
                <p>Category Name</p>
                <SelectionBorderedDiv>
                  {scheme.sub_category?.name}
                </SelectionBorderedDiv>
              </FlexDiv>
              <FlexDiv column alignItemsCenter>
                <p>Vehicle Type </p>
                <SelectionBorderedDiv>
                  {scheme.sub_category?.vehicleType}
                </SelectionBorderedDiv>
              </FlexDiv>
            </FlexDiv>
            <FlexDiv justifyContentFlexStart style={{ margin: "15px 20px" }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={addSubCategories}
              >
                Add
              </Button>
            </FlexDiv>
          </>
        )}
        {!!scheme.selected_sub_category_list?.length && (
          <FlexDiv column alignItemsCenter>
            <h4>Sub Categories</h4>
            <SubCategoryList
              categoriesList={scheme.selected_sub_category_list}
              removeCategories={removeSubCategory}
              masterCategoryList={masterCategoryList}
              subCategory={subCategory}
              vehicleType={scheme.vehicle_type}
              deleteEnabled={detailsId}
            />
          </FlexDiv>
        )}
      </FlexDiv>
    </>
  );
};

export default SubCategorySelection;

const SubCategoryList = ({
  categoriesList,
  removeCategories,
  masterCategoryList,
  subCategory,
  vehicleType,
  deleteEnabled,
}: {
  categoriesList: category_type[];
  masterCategoryList: category_type[];
  removeCategories: (index: number) => void;
  subCategory: category_type[];
  vehicleType: { name: string };
  deleteEnabled: boolean;
}) => {
  const headers = [
    "Id",
    "Master Category",
    "Sub Category",
    "Vehicle Type",
    `${deleteEnabled ? "" : "Action"}`,
  ];

  return (
    <FlexDiv width="100%" justifyContentCenter style={{ marginBottom: "20px" }}>
      <TableContainer sx={{ width: "800px" }} component={Paper}>
        <Table sx={{ minWidth: "fit-content" }} aria-label="vehicle models">
          <Header titles={headers} color="#000" />
          <TableBody>
            {categoriesList.length
              ? categoriesList.map((row, index: number) => {
                  return (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align="center">
                        {row?.id || "--"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {
                          masterCategoryList?.find(
                            (i) => i.id === row.masterCategoryId
                          )?.name
                        }
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {subCategory?.find((i) => i?.id === row?.id)?.name ||
                          row?.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row?.vehicleType || vehicleType?.name || "--"}
                      </StyledTableCell>

                      {!deleteEnabled && (
                        <StyledTableCell align="center">
                          <IconButton onClick={() => removeCategories(index)}>
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
