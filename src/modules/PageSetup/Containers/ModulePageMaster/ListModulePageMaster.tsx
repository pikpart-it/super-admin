import { useEffect, useState } from "react";
import { config } from "../../../../config/config";
import { getAuthorized, putAuthorized } from "../../../../services";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../../style/styled";
import { H2Heading } from "../../../../components/styled";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import Header from "../../../../components/ListsHeader";
import { RoutesPath } from "../../../../config/routes.config";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalConfirmation from "../../../ProductManufacturer/OrderManagement/component/ModalConfirmation";

const headers = [
  "Id",
  "Module Name",
  "Page Name",
  "Page Description",
  "Route Key",
  "Route Path",
  "Is Active",
  "Actions",
];
export type modulePageMasterTypes = {
  pageName: string;
  pageDescription: string;
  id: number;
  isActive: boolean;
  moduleName: string;
  moduleId: number;
  routeKey: string;
  routePath: string;
  checked: boolean;
};
const ListModulePageMaster = ({ history }) => {
  const [modulePageMasterList, setModulePageMasterList] = useState<
    modulePageMasterTypes[]
  >([]);
  const [removeModal, setRemoveModal] = useState<any>({
    show: false,
    type: "confirm",
    id: "",
  });
  const getAppMasterList = async () => {
    let url = `${config.baseUrl}/superAdmin/modulePageMasters`;

    try {
      const { data } = await getAuthorized(url);
      setModulePageMasterList(data?.data);
    } catch (error) {}
  };

  const deleteItem = async (id: number) => {
    let url = `${config.baseUrl}/superAdmin/deactivateModulePageMaster`;

    try {
      const { data } = await putAuthorized(url, { id });
      getAppMasterList();
    } catch (error) {}
  };

  useEffect(() => {
    getAppMasterList();
  }, []);
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Module Page Master List</H2Heading>
      </FlexDiv>

      <FlexDiv
        width="100%"
        justifyContentCenter
        style={{ marginBottom: "20px" }}
      >
        <TableContainer sx={{ width: "fit-content" }} component={Paper}>
          <Table sx={{ minWidth: "fit-content" }} aria-label="vehicle models">
            <Header titles={headers} color="#000" />
            <TableBody>
              {modulePageMasterList.length
                ? modulePageMasterList.map((row) => {
                    return (
                      <StyledTableRow key={row?.id}>
                        <StyledTableCell align="center">
                          {row?.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.moduleName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.pageName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.pageDescription}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.routeKey}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.routePath}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.isActive ? "Yes" : "No"}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <FlexDiv justifyContentSpaceEvenly>
                            <IconButton
                              onClick={() =>
                                history?.push(
                                  RoutesPath.CreateModulePageMaster,
                                  row
                                )
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
        body="Are you sure to delete This Module Page Master?"
      />
    </>
  );
};

export default ListModulePageMaster;
