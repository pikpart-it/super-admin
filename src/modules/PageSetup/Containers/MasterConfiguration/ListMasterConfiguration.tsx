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
import {
  getAuthorized,
  postAuthorized,
  putAuthorized,
} from "../../../../services";
import { Container } from "../RoleMaster/CreateRoleMaster";
import { Autocomplete, FormControl, FormLabel } from "@mui/joy";
import { FaArrowRight, FaRemoveFormat, FaTrash } from "react-icons/fa";
import {
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import Header from "../../../../components/ListsHeader";
import MsgCard from "../../../../components/MsgCard";
import { Loader } from "../../../../components/Loader";
import ModalConfirmation from "../../../ProductManufacturer/OrderManagement/component/ModalConfirmation";
import { ProductWrapper } from "../../../ProductManufacturer/Businessunits/component/AddBUForm";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { moduleMasterTypes } from "../ModuleMaster/ListModules";
import Input from '@mui/joy/Input';
import EditIcon from '@mui/icons-material/Edit';
import { RoutesPath } from "../../../../config/routes.config";
import { useHistory } from "react-router-dom";

const headers = [
  "Module Name",
  "Page Name",
  "RoleName",
  "Rank",
  "Display Sequence",
  "Route Key",
  "Route Path",
  "Is Active",
  "Action"
];

const ListMasterConfiguration = () => {
  const history = useHistory()
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
  const [moduleMasterList, setModuleMasterList] = useState<moduleMasterTypes[]>(
    []
  );
  const [filterSelectedModule, setFilterSelectedModule] = useState<number>()
  const [removeModal, setRemoveModal] = useState<any>({
    show: false,
    type: "confirm",
    id: "",
  });
  const [selectedRankName, setSelectedRankName] = useState({
    rankId: "",
    rankCode: "",
  });

  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: number | null,
  ) => {
    setFilterSelectedModule(newValue || 0)
  };

  const getModuleMasterList = async () => {
    let url = `${config.baseUrl}/superAdmin/moduleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setModuleMasterList(data?.data);
    } catch (error) { }
  };

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
    let url = `${config.baseUrl}/superAdmin/masterConfigurations?${filterSelectedModule ? `module_id=${filterSelectedModule}` : ""}${selectedRole?.id ? `&role_id=${selectedRole?.roleId}` : ""}${selectedRankName?.rankId ? `&rank_id=${selectedRankName?.rankId}` : ""}`;
    try {
      const { data } = await getAuthorized(url);
      setMasterConfigList(data?.data);
    } catch (error) { }
  };
  const hardDelete = async (id: number) => {
    setloader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/superAdmin/deleteMasterConfiguration`;

    try {
      const { data } = await postAuthorized(url, { id });

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
  const deleteItem = async (id: number, flag: boolean) => {
    setloader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/superAdmin/toggleActiveFlag`;

    try {
      const { data } = await putAuthorized(url, { id, is_active: flag });
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

  const returnData = appRoleMasterList?.filter(
    (i) => i?.appId === selectedApp?.id
  );

  const rankData = returnData?.filter((i) => {
    return i?.roleName === selectedRole?.roleName;
  });

  useEffect(() => {
    if (selectedRole?.id || filterSelectedModule || selectedRole?.id) {
      getConfigList();
    }
  }, [selectedRole, selectedRankName, filterSelectedModule]);

  useEffect(() => {
    getAppMasterList();
    getAppRoleMaster();
    getModuleMasterList()
  }, []);

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <FlexDiv justifyContentCenter style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "1.3rem", color: "#f65000" }}>
          Master Configuration list
        </div>
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
              <FormLabel>Module Name</FormLabel>
              <Select
                indicator={<KeyboardArrowDown />}
                sx={{
                  width: 240,
                  [`& .${selectClasses.indicator}`]: {
                    transition: '0.2s',
                    [`&.${selectClasses.expanded}`]: {
                      transform: 'rotate(-180deg)',
                    },
                  },
                }}
                value={filterSelectedModule}
                onChange={handleChange}
              >
                {
                  moduleMasterList?.map((i, index) => {
                    return (
                      <Option key={index} value={i?.id}>{i?.moduleName}</Option>
                    )
                  })
                }
              </Select>
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
                  ?.filter(
                    (
                      value,
                      index,
                      self // Remove duplicate role names
                    ) =>
                      index ===
                      self.findIndex((t) => t.roleName === value.roleName)
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
                        <StyledTableCell align="center">{row?.roleName}</StyledTableCell>
                        <StyledTableCell align="center">{row?.rankCode}</StyledTableCell>
                        <StyledTableCell align="center">{row?.prioritySeq}</StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.routeKey}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row?.routePath}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Switch
                            checked={row?.isActive}
                            onChange={(e) =>
                              deleteItem(row?.id, e.target.checked)
                            }
                          />

                          {/* <DeleteForeverIcon
                            style={{ margin: "10px", cursor: "pointer" }}
                            onClick={() => hardDelete(row?.id)}
                          /> */}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            history.push(RoutesPath?.UpdateMasterConfigurationList, row)
                          }}><EditIcon /></StyledTableCell>
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
      {/* <ModalConfirmation
        toggleModal={removeModal.show}
        setToggleModal={() => setRemoveModal({ ...removeModal, show: false })}
        modal={removeModal}
        onConfirm={() => deleteItem(removeModal.id)}
        onCancel={() => setRemoveModal({ ...removeModal, show: false })}
        header="Remove Item"
        body="Are you sure to delete This Configuration?"
      /> */}
    </div>
  );
};

export default ListMasterConfiguration;
