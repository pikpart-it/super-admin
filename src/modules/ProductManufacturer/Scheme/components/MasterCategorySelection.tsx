import React from "react";
import { category_type, schemeType } from "../AddScheme";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../../style/styled";
import { MyFormSelect } from "../../../../components/Forms/Form";
import styled from "styled-components";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../../../components/ListsHeader";

const SelectionBorderedDiv = styled.div`
  border: 1px solid rgb(180, 180, 180);
  padding: 15px;
  border-radius: 4px;
  width: fit-content;
  //min-width: 150px;
  text-align: center;
`;
const MasterCategorySelection = ({
  scheme,
  onChange,
  masterCategoryList,
  addCategories,
  removeCategories,
  detailsId,
}: {
  scheme: schemeType;
  onChange: (target) => void;
  masterCategoryList: category_type[];
  addCategories: () => void;
  removeCategories: (index: number) => void;
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
            Master Category
          </h3>
        )}

        {!detailsId && (
          <FlexDiv justifyContentSpaceEvenly width="30%" margin="10px 20px">
            <MyFormSelect
              name="master_category"
              label="Select Master Category"
              list={[]}
              fieldErrors={{}}
              onChange={(target) => onChange(target)}
              value={scheme.master_category}
              options={masterCategoryList?.filter(
                (i) => i?.vehicleType === (scheme.vehicle_type.name || "2W")
              )}
            />
          </FlexDiv>
        )}

        {!!scheme.master_category?.id && (
          <>
            <FlexDiv
              justifyContentSpaceEvenly
              width="25%"
              style={{ margin: "10px 0px 20px 0px " }}
            >
              <FlexDiv column alignItemsCenter>
                <p>Category Name</p>
                <SelectionBorderedDiv>
                  {scheme.master_category?.name}
                </SelectionBorderedDiv>
              </FlexDiv>
              <FlexDiv column alignItemsCenter>
                <p>Vehicle Type </p>
                <SelectionBorderedDiv>
                  {scheme.master_category?.vehicleType}
                </SelectionBorderedDiv>
              </FlexDiv>
            </FlexDiv>
            <FlexDiv justifyContentFlexStart style={{ margin: "15px 20px" }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={addCategories}
              >
                Add
              </Button>
            </FlexDiv>
          </>
        )}
        {!!scheme.selected_categories_list?.length && (
          <FlexDiv column alignItemsCenter>
            <h4>Master Categories</h4>
            <CategoryList
              categoriesList={scheme.selected_categories_list}
              removeCategories={removeCategories}
              masterCategoryList={masterCategoryList}
              vehicleType={scheme?.vehicle_type}
              deleteEnabled={detailsId}
            />
          </FlexDiv>
        )}
      </FlexDiv>
    </>
  );
};

export default MasterCategorySelection;

const CategoryList = ({
  categoriesList,
  removeCategories,
  masterCategoryList,
  vehicleType,
  deleteEnabled,
}: {
  categoriesList: category_type[];
  masterCategoryList: category_type[];
  removeCategories: (index: number) => void;
  vehicleType: { name: string };
  deleteEnabled: boolean;
}) => {
  const headers = [
    "Id",
    "Master Category",
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
                        {masterCategoryList?.find((i) => i?.id === row?.id)
                          ?.name ||
                          row.name ||
                          "--"}
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
