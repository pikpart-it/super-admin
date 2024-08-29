import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../../../../components/ListsHeader";
import { H2Heading } from "../../../../components/styled";
import { config } from "../../../../config/config";
import { getAuthorized, putAuthorized } from "../../../../services";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../../style/styled";
import { RoutesPath } from "../../../../config/routes.config";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalConfirmation from "../../../ProductManufacturer/OrderManagement/component/ModalConfirmation";
const headers = [
  "Id",
  "Module Name",
  "Module Description",
  "Route Key",
  "Actions",
];
export type moduleMasterTypes = {
  moduleName: any;
  moduleDescription: string;
  moduleId: number;
  routeKey: string;
  id: number;
};
const ListModules = ({ history }) => {
  const [moduleMasterList, setModuleMasterList] = useState<moduleMasterTypes[]>(
    []
  );
  const [removeModal, setRemoveModal] = useState<any>({
    show: false,
    type: "confirm",
    id: "",
  });
  const getModuleMaster = async () => {
    let url = `${config.baseUrl}/superAdmin/moduleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setModuleMasterList(data?.data);
    } catch (error) {}
  };
  const deleteItem = async (id: number) => {
    let url = `${config.baseUrl}/superAdmin/deactivateModuleMaster`;

    try {
      const { data } = await putAuthorized(url, { id });
      getModuleMaster();
    } catch (error) {}
  };

  useEffect(() => {
    getModuleMaster();
  }, []);
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Module Master List</H2Heading>
      </FlexDiv>

      <FlexDiv
        width="100%"
        justifyContentCenter
        style={{ marginBottom: "20px" }}
      >
        <TableContainer sx={{ width: "800px" }} component={Paper}>
          <Table sx={{ minWidth: "fit-content" }} aria-label="vehicle models">
            <Header titles={headers} color="#000" />
            <TableBody>
              {moduleMasterList.length
                ? moduleMasterList.map((row, index: number) => {
                    return (
                      <StyledTableRow key={row?.id}>
                        <StyledTableCell align="center">
                          {row?.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.moduleName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.moduleDescription}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.routeKey}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <FlexDiv justifyContentSpaceEvenly>
                            <IconButton
                              onClick={() =>
                                history?.push(RoutesPath.CreateModule, row)
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
                              <FaTrash />
                            </IconButton>
                          </FlexDiv>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </FlexDiv>
      <ModalConfirmation
        toggleModal={removeModal.show}
        setToggleModal={() => setRemoveModal({ ...removeModal, show: false })}
        modal={removeModal}
        onConfirm={() => deleteItem(removeModal.id)}
        onCancel={() => setRemoveModal({ ...removeModal, show: false })}
        header="Remove Item"
        body="Are you sure to delete This Module Master?"
      />
    </>
  );
};

export default ListModules;
