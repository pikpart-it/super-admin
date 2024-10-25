import React, { useEffect, useState } from "react";
import {
  FlexDiv,
  StyledTableCell,
  StyledTableRow,
} from "../../../../style/styled";
import { H2Heading } from "../../../../components/styled";
import { appMasterTypes } from "../AppMaster/ListAppMaster";
import { appRoleMasterSetupTypes } from "../AppRoleMaster/AppRoleMasterSetupList";
import { config } from "../../../../config/config";
import { getAuthorized, putAuthorized } from "../../../../services";
import { Container } from "../RoleMaster/CreateRoleMaster";
import { Autocomplete, FormControl, FormLabel } from "@mui/joy";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import Header from "../../../../components/ListsHeader";
import MsgCard from "../../../../components/MsgCard";
import { Loader } from "../../../../components/Loader";
import ModalConfirmation from "../../../ProductManufacturer/OrderManagement/component/ModalConfirmation";
import { ProductWrapper } from "../../../ProductManufacturer/Businessunits/component/AddBUForm";

const headers = [
  "Module Name",
  "Page Name",
  // "Page Description",
  "Route Key",
  "Route Path",
  "Is Active",
  "Actions",
];

const ListMasterConfiguration = () => {
  const [masterConfigList, setMasterConfigList] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<appMasterTypes>();
  const [selectedRole, setSelectedRole] = useState<appRoleMasterSetupTypes>();
  const [appMasterList, setAppMasterList] = useState<appMasterTypes[]>([]);
  const [appRoleMasterList, setAppRoleMasterList] = useState<
    appRoleMasterSetupTypes[]
  >([]);
  const [loader, setloader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });
  const [removeModal, setRemoveModal] = useState<any>({
    show: false,
    type: "confirm",
    id: "",
  });
  const [selectedRankName, setSelectedRankName] = useState({ id: "", rankCode: "", rankDescription: "" })

  const getAppMasterList = async () => {
    let url = `${config.baseUrl}/superAdmin/appMasters`;

    try {
      const { data } = await getAuthorized(url);
      setAppMasterList(data?.data);
    } catch (error) { }
  };

  const getAppRoleMaster = async () => {
    let url = `${config.baseUrl}/superAdmin/appRoleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setAppRoleMasterList(data?.data);
    } catch (error) { }
  };

  const getConfigList = async () => {
    let url = `${config.baseUrl}/superAdmin/masterConfigurations?role_id=${selectedRole?.roleId}&rank_id=${selectedRankName?.id}`;

    try {
      const { data } = await getAuthorized(url);
      setMasterConfigList(data?.data);
    } catch (error) { }
  };

  const deleteItem = async (id: number) => {
    setloader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/superAdmin/deactivateMasterConfiguration`;

    try {
      const { data } = await putAuthorized(url, { id });
      setloader({
        ...loader,
        isLoading: false,
        error: data?.error,
        msg: data?.message,
      });
      setTimeout(() => {
        setloader({ ...loader, msg: "" });
      }, 2000);
      getConfigList();
    } catch (error) {
      setloader({
        ...loader,
        isLoading: false,
        error: true,
        msg: "Something Went Wrong",
      });
      setTimeout(() => {
        setloader({ ...loader, msg: "" });
      }, 5000);
    }
  };

  const returnData = appRoleMasterList
    ?.filter((i) => i?.appId === selectedApp?.id)

  const rankData = returnData?.filter((i) => {
    return i?.roleName === selectedRole?.roleName
  })

  useEffect(() => {
    if (selectedRole?.id || selectedRankName?.id) {
      getConfigList();
    }
  }, [selectedRole, selectedRankName]);

  useEffect(() => {
    getAppMasterList();
    getAppRoleMaster();
  }, []);

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <FlexDiv justifyContentCenter style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "1.3rem", color: "#f65000" }}>Master Configuration list</div>
      </FlexDiv>
      <ProductWrapper style={{ background: "#fbfbfb", padding: "20px" }}>
        <FlexDiv justifyContentCenter width="100%">
          <Container>
            <FormControl>
              <FormLabel>App Name*</FormLabel>
              <Autocomplete
                value={selectedApp?.appName}
                onChange={(e, value) => setSelectedApp(value)}
                options={appMasterList}
                getOptionLabel={(option: any) => option?.appName}
              />
            </FormControl>
          </Container>
          <Container>
            <FormControl>
              <FormLabel>Role Name*</FormLabel>
              <Autocomplete
                value={selectedRole?.roleName}
                onChange={(e, value) => setSelectedRole(value)}
                options={appRoleMasterList
                  ?.filter((i) => i?.appId === selectedApp?.id) // Filter by appId
                  ?.filter((value, index, self) => // Remove duplicate role names
                    index === self.findIndex((t) => t.roleName === value.roleName)
                  )}
                getOptionLabel={(option: any) => option?.roleName}
              />
            </FormControl>
          </Container>
          <Container>
            <FormControl>
              <FormLabel>Select Rank</FormLabel>
              <Autocomplete
                value={selectedRankName}
                onChange={(e, value) => setSelectedRankName(value)}
                options={rankData}
                getOptionLabel={(option: any) => option?.rankCode}
              />
            </FormControl>
          </Container>
        </FlexDiv>

      </ProductWrapper>


      {masterConfigList?.length > 0 ? (
        <FlexDiv width="100%" justifyContentCenter style={{ margin: "20px" }}>
          <TableContainer sx={{ width: "fit-content" }} component={Paper}>
            <Table sx={{ minWidth: "fit-content" }} aria-label="vehicle models">
              <Header titles={headers} color="#000" />
              <TableBody>
                {masterConfigList
                  ?.sort((a, b) => b?.id - a?.id)
                  ?.map((row) => {
                    return (
                      <StyledTableRow
                        key={row?.id}
                        style={{ background: "#fff" }}
                      >
                        <StyledTableCell align="center">
                          {row?.moduleName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.pageName}
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">
                          {row?.pageDescription}
                        </StyledTableCell> */}
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
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </FlexDiv>
      ) : (
        <FlexDiv justifyContentCenter>
          <h2>No Data Found</h2>
        </FlexDiv>
      )}
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
      <ModalConfirmation
        toggleModal={removeModal.show}
        setToggleModal={() => setRemoveModal({ ...removeModal, show: false })}
        modal={removeModal}
        onConfirm={() => deleteItem(removeModal.id)}
        onCancel={() => setRemoveModal({ ...removeModal, show: false })}
        header="Remove Item"
        body="Are you sure to delete This Configuration?"
      />
    </div>
  );
};

export default ListMasterConfiguration;
