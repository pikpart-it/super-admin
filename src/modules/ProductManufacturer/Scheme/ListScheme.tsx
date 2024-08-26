import React, { useEffect, useState } from "react";
import { config } from "../../../config/config";
import { getAuthorized, putAuthorized } from "../../../services";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../style/styled";
import Header from "../../../components/ListsHeader";
import { H2Heading } from "../../../components/styled";
import { FaEdit, FaEye } from "react-icons/fa";
import { RoutesPath } from "../../../config/routes.config";
import Delete from "@mui/icons-material/Delete";
import { Loader } from "../../../components/Loader";
import MsgCard from "../../../components/MsgCard";
import ModalConfirmation from "../OrderManagement/component/ModalConfirmation";
const ListScheme = ({ history }) => {
  const [schemeList, setSchemeList] = useState<any[]>([]);
  const [loader, setLoader] = useState({
    error: false,
    msg: "",
    isLoading: false,
  });

  const [removeModal, setRemoveModal] = useState<any>({
    show: false,
    type: "confirm",
    id: "",
  });
  const getSchemeList = async () => {
    let url = `${config.baseUrl}/admin/listScheme`;

    try {
      const { data } = await getAuthorized(url);
      setSchemeList(data?.data);
    } catch (error) {}
  };

  const deleteScheme = async (id: number) => {
    setLoader({ ...loader, isLoading: true });

    let url = `${config.baseUrl}/admin/deleteScheme/${id}`;

    try {
      const { data } = await putAuthorized(url, {});
      setLoader({ ...loader, isLoading: false, error: false, msg: "Deleted" });
      getSchemeList();
      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 2000);
    } catch (error) {
      setLoader({ ...loader, isLoading: false, error: false, msg: "Error" });
      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 2000);
    }
  };

  useEffect(() => {
    getSchemeList();
  }, []);
  const headers = [
    "Id",
    "Name",
    "Scheme Type",
    "Vehicle Type",
    "Scheme Items Count",
    "Scheme Banner",
    "Actions",
  ];
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Scheme List</H2Heading>
      </FlexDiv>
      {schemeList?.length ? (
        <FlexDiv width="100%" justifyContentCenter>
          <TableContainer sx={{ width: "fit-content" }} component={Paper}>
            <Table sx={{ minWidth: "fit-content" }} aria-label="vehicle models">
              <Header titles={headers} />
              <TableBody>
                {schemeList
                  ?.sort((a, b) => b?.id - a?.id)
                  ?.map((row) => {
                    return (
                      <StyledTableRow key={row?.id}>
                        <StyledTableCell align="center">
                          {row?.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.name || "--"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.scheme_type || "--"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.vehicle_type || "--"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.schemeItemDetail?.length || 0}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <img
                            src={row?.image_url}
                            width="50px"
                            height="50px"
                            alt={row?.name}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton
                            onClick={() =>
                              history.push(RoutesPath.AddScheme, {
                                id: row?.id,
                                Edit: false,
                              })
                            }
                          >
                            <FaEye />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              history.push(RoutesPath.AddScheme, {
                                id: row?.id,
                                Edit: true,
                              })
                            }
                          >
                            <FaEdit />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              setRemoveModal({
                                ...removeModal,
                                show: true,
                                id: row.id,
                              })
                            }
                          >
                            <Delete />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </FlexDiv>
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
        onConfirm={() => deleteScheme(removeModal.id)}
        onCancel={() => setRemoveModal({ ...removeModal, show: false })}
        header="Remove Item"
        body="Are you sure to delete this Scheme?"
      />
      <Loader variant="m" isLoading={loader.isLoading} />
      <MsgCard
        style={{
          container: {
            width: "20%",
          },
        }}
        msg={loader?.msg}
        variant={loader?.error ? "danger" : "success"}
        ghost
        card
      />
    </>
  );
};

export default ListScheme;
