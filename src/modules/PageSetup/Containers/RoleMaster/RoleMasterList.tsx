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
import ModalConfirmation from "../../../ProductManufacturer/OrderManagement/component/ModalConfirmation";
import { FaTrash } from "react-icons/fa";
const headers = ["Id", "Role Name", "Role Description", "Actions"];
export type roleTypes = {
  roleName: string;
  roleDescription: string;
  isActive: string;
  id: number;
};
const RoleMasterList = ({ history }) => {
  const [rolesList, setRolesList] = useState<roleTypes[]>([]);
  const [removeModal, setRemoveModal] = useState<any>({
    show: false,
    type: "confirm",
    id: "",
  });
  const getRolesList = async () => {
    let url = `${config.baseUrl}/superAdmin/roleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setRolesList(data?.data);
    } catch (error) {}
  };
  const deleteItem = async (id: number) => {
    let url = `${config.baseUrl}/superAdmin/deactivateRoleMaster`;

    try {
      const { data } = await putAuthorized(url, { id });
      getRolesList();
    } catch (error) {}
  };

  useEffect(() => {
    getRolesList();
  }, []);
  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Role Master List</H2Heading>
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
              {rolesList.length
                ? rolesList.map((row, index: number) => {
                    return (
                      <StyledTableRow key={row?.id}>
                        <StyledTableCell align="center">
                          {row?.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.roleName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.roleDescription}
                        </StyledTableCell>
                        <StyledTableCell align="center">
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
        body="Are you sure to delete This Role?"
      />
    </>
  );
};

export default RoleMasterList;
