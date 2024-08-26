import React, { useEffect, useState } from "react";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../style/styled";
import { H2Heading } from "../../../components/styled";
import { config } from "../../../config/config";
import { deleteAuthorized, getAuthorized } from "../../../services";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import Header from "../../../components/ListsHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import { Loader } from "../../../components/Loader";
import MsgCard from "../../../components/MsgCard";
import ModalConfirmation from "../OrderManagement/component/ModalConfirmation";

const ListGifts = () => {
  const [giftsList, setGiftsList] = useState<any[]>([]);
  const [removeModal, setRemoveModal] = React.useState<any>({
    show: false,
    type: "confirm",
    id: "",
  });
  const [loader, setLoader] = React.useState({
    error: false,
    msg: "",
    isLoading: false,
  });

  const getGiftsList = async () => {
    let url = `${config.baseUrl}/admin/getGiftItems`;

    try {
      const { data } = await getAuthorized(url);

      setGiftsList(data?.data);
    } catch (error) {}
  };

  const deleteGiftItem = async (id: number) => {
    setLoader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/admin/deleteGiftItem?id=${id}`;
    try {
      const { data } = await deleteAuthorized(url);

      setLoader({
        ...loader,
        isLoading: false,
        msg: data?.message,
        error: data?.error,
      });
      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 2000);
      getGiftsList();
    } catch (error) {
      setLoader({ ...loader, isLoading: false, error: true, msg: "Error" });

      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 2000);
    }
  };

  useEffect(() => {
    getGiftsList();
  }, []);
  const headers = ["Name", "Amount", "Image", "Actions"];
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>List Scheme Gifts</H2Heading>
      </FlexDiv>

      {giftsList?.length ? (
        <FlexDiv width="100%" justifyContentCenter>
          <TableContainer sx={{ width: "800px" }} component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="vehicle models">
              <Header titles={headers} />
              <TableBody>
                {giftsList
                  .sort((a, b) => b?.id - a?.id)
                  .map((row) => {
                    return (
                      <StyledTableRow key={row?.id}>
                        <StyledTableCell align="center">
                          {row.name}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.amount || "--"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <img
                            src={row?.imageUrl}
                            width="50px"
                            height="50px"
                            alt={row?.name}
                          />
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            border: "none",
                            margin: "10px 0px",
                          }}
                        >
                          <IconButton
                            onClick={() =>
                              setRemoveModal({
                                ...removeModal,
                                show: true,
                                id: row.id,
                              })
                            }
                          >
                            <DeleteIcon />
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
        onConfirm={() => deleteGiftItem(removeModal.id)}
        onCancel={() => setRemoveModal({ ...removeModal, show: false })}
        header="Remove Item"
        body="Are you sure to delete Gift?"
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

export default ListGifts;
