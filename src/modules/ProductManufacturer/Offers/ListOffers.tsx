import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import FuzzySearch from "fuzzy-search";
import _ from "lodash";
import React from "react";
import { sendEmail } from "../../../logger/sendMail";
import { config } from "../../../config/config";
import { getAuthorized, putAuthorized } from "../../../services";
import { FlexDiv } from "../../../style/styled";
import { MyFormSelect } from "../../../components/Forms/Form";
import ModalConfirmation from "../OrderManagement/component/ModalConfirmation";
import Header from "../../../components/ListsHeader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,

    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ListOffers() {
  const [serviceCentersList, setServiceCentersList] = React.useState<
    Array<any>
  >([]);
  const [selectedServiceCenter, setSelectedServiceCenter] =
    React.useState<any>("");
  const [page, setPage] = React.useState(0);
  const [renderTrigger, setRenderTrigger] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [offersList, setOffersList] = React.useState<any>([]);
  const [search, setSearch] = React.useState<any>({
    values: {},
    errors: {},
  });
  const [removeModal, setRemoveModal] = React.useState({
    show: false,
    type: "confirm",
    id: "",
  });
  const getServiceCenters = async () => {
    try {
      let url = `${config.baseUrl}/admin/service-centres`;
      const response = await getAuthorized(url);
      if (response?.data?.error) {
        sendEmail({
          subject: `Logger: Unable to get service centers Data at Create Offers`,
          body: response,
        });
      } else {
        setServiceCentersList(response?.data?.data);
      }
    } catch (error) {
      sendEmail({
        subject: `Logger: Unable to get service centers Data at Create Offers`,
        body: error,
      });
    }
  };

  const getOffersList = async () => {
    try {
      let url = `${config.baseUrl}/admin/deals?id=${selectedServiceCenter?.id}`;
      const response = await getAuthorized(url);
      if (response?.data?.error) {
        sendEmail({
          subject: `Logger: Unable to get Offers`,
          body: response,
        });
      } else {
        setOffersList(response?.data?.data);
      }
    } catch (error) {
      sendEmail({
        subject: `Logger: Unable to get  Offers`,
        body: error,
      });
    }
  };

  const removeOffer = async (id) => {
    const data = {};
    try {
      let url = `${config.baseUrl}/admin/deals?id=${id}`;
      const response = await putAuthorized(url, data);
      if (response?.data?.error) {
        sendEmail({
          subject: `Logger: Unable to get Offers`,
          body: response,
        });
      } else {
        setRenderTrigger(renderTrigger + 1);
      }
    } catch (error) {
      sendEmail({
        subject: `Logger: Unable to get  Offers`,
        body: error,
      });
    }
  };

  React.useEffect(() => {
    if (selectedServiceCenter) {
      getOffersList();
    }
  }, [selectedServiceCenter, renderTrigger]);

  React.useEffect(() => {
    getServiceCenters();
  }, []);

  const handleRowPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  function onchange(target: any) {
    setSearch({
      ...search,
      values: { ...search.values, [target.name]: target.value },
    });
  }

  let sortData = _.reverse(_.sortBy(offersList, ["updatedAt"]));
  const searchDate = new FuzzySearch(sortData, [
    "id",
    "name",
    "dealCode",
    "itemType",
  ]);
  const data = searchDate.search(search.values.search);
  const headers = [
    "Name",
    "Deal Code",
    "Discount Percent",
    "Start Enigne Cc",
    "End Enigne Cc",
    "Minor/Major Service",
    "Actions",
  ];
  return (
    <>
      <FlexDiv justifyContentCenter>
        <div>ListOffers</div>
      </FlexDiv>
      <FlexDiv width="100%" justifyContentCenter>
        <FlexDiv width="30%">
          <MyFormSelect
            list={[]}
            name="service_centre_id"
            placeholder="Select Service Center"
            label="Service Center *"
            value={selectedServiceCenter}
            fieldErrors={{}}
            options={serviceCentersList}
            getOptionLabel={(op) => op.name}
            getOptionValue={(op) => op.id}
            onChange={(target: any) => setSelectedServiceCenter(target.value)}
          />
        </FlexDiv>
      </FlexDiv>

      <FlexDiv
        width="30%"
        justifyContentSpaceEvenly
        style={{ margin: "30px 0px 0px 30px " }}
      >
        <FlexDiv width="10%" style={{ marginTop: "20px" }} justifyContentCenter>
          <SearchIcon color="primary" />
        </FlexDiv>
        <FlexDiv width="90%">
          <TextField
            type="search"
            name="search"
            label="Search List"
            variant="standard"
            value={search.values["search"]}
            fullWidth
            onChange={({ target }: any) => onchange(target)}
          />
        </FlexDiv>
      </FlexDiv>

      {offersList.length ? (
        <>
          <TablePagination
            style={{ marginRight: "100px" }}
            rowsPerPageOptions={[50, 100, 200]}
            component="div"
            count={offersList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleRowPerPage}
          />
          <FlexDiv
            width="100%"
            justifyContentCenter
            style={{ marginBottom: "20px" }}
          >
            <TableContainer sx={{ width: "1050px" }} component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="Offers List">
                <Header titles={headers} />
                <TableBody>
                  {data.length
                    ? data.map((row: any, index: any) => {
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell
                              contentEditable={true}
                              align="center"
                            >
                              {row.name || "--"}
                            </StyledTableCell>
                            <StyledTableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {row.dealCode || "--"}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row?.discountPercent || "--"} %{" "}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              {row?.startEngineCc || "--"}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row?.endEngineCc || "--"}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row?.itemType || "--"}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <IconButton
                                onClick={() =>
                                  setRemoveModal({
                                    ...removeModal,
                                    show: true,
                                    id: row?.id,
                                  })
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </FlexDiv>
        </>
      ) : (
        <FlexDiv width="100%" justifyContentCenter>
          <FlexDiv>
            <h3>No matching data</h3>
          </FlexDiv>
        </FlexDiv>
      )}

      <ModalConfirmation
        toggleModal={removeModal.show}
        setToggleModal={() => setRemoveModal({ ...removeModal, show: false })}
        modal={removeModal}
        onConfirm={() => removeOffer(removeModal.id)}
        onCancel={() => setRemoveModal({ ...removeModal, show: false })}
        header="Remove Item"
        body="Are you sure youn want to delete this offer?"
      />
    </>
  );
}

export default ListOffers;
