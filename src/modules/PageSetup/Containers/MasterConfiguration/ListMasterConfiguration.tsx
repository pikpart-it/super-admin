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
import UpdateMasterConfigurationList from "./UpdateMasterConfigurationList";

const headers = [
  "Module Name",
  "Page Name",
  "RoleName",
  "Rank",
  "Home Tile Order",
  "Bottom Menu Oder",
  "Menu Order",
  "Home Tile",
  "Bottom",
  "Menu",
  "Home Tile Name",
  "Bottom Tile Name",
  "Menu Name",
  "Is Active",
  "Action",
  "Route Key",
  "Route Path",
];

const ListMasterConfiguration = () => {
  const history = useHistory()
  const [masterConfigList, setMasterConfigList] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<appMasterTypes>();
  const [selectedRole, setSelectedRole] = useState<appRoleMasterSetupTypes>();
  const [selectedModule, setSelectedModule] = useState<moduleMasterTypes>()
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
  const [removeModal, setRemoveModal] = useState<any>({
    show: false,
    type: "confirm",
    id: "",
  });
  const [selectedRankName, setSelectedRankName] = useState({
    rankId: "",
    rankCode: "",
  });
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editedData, setEditedData] = useState([])
  const [isHomeTile, setIsHomeTile] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [isBottomMenu, setIsBottomMenu] = useState(false);
  const handleHomeTileChange = (e) => setIsHomeTile(e.target.checked);
  const handleMenuChange = (e) => setIsMenu(e.target.checked);
  const handleBottomMenuChange = (e) => setIsBottomMenu(e.target.checked);

  const handleEditModalOpen = (data) => {
    setEditedData(data)
    setEditModalOpen(true)
  }

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
    let url = `${config.baseUrl}/superAdmin/masterConfigurations?${selectedModule ? `module_id=${selectedModule?.id}` : ""}${selectedRole?.id ? `&role_id=${selectedRole?.roleId}` : ""}${selectedRankName?.rankId ? `&rank_id=${selectedRankName?.rankId}` : ""}`;
    try {
      const { data } = await getAuthorized(url);
      setMasterConfigList(data?.data);
    } catch (error) { }
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

  // Apply filtering logic based on switch states
  const filteredData = masterConfigList?.filter((item) => {
    return (
      (!isHomeTile || item.isHomeTile) &&  // Show if the switch is on and matches the item
      (!isMenu || item.isMenu) &&
      (!isBottomMenu || item.isBottomMenu)
    );
  });


  useEffect(() => {
    if (selectedApp?.appName || selectedRole?.id || selectedModule?.id || selectedRole?.id) {
      getConfigList();
    }
  }, [selectedRole, selectedRankName, selectedModule, selectedApp]);

  useEffect(() => {
    getAppMasterList();
    getAppRoleMaster();
    getModuleMasterList()
  }, []);

  return (
    <div style={{ width: "95%", margin: "auto" }}>
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
              <Autocomplete
                value={selectedModule?.moduleName}
                options={moduleMasterList}
                onChange={(e, value) => setSelectedModule(value)}
                getOptionLabel={(Option: any) => Option.moduleName}
              />
              {/* <Select
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
              </Select> */}
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
        <FlexDiv alignItemsCenter>
          <FlexDiv column>
            <div>Is Home Tile</div>
            <Switch checked={isHomeTile} onChange={handleHomeTileChange} />
          </FlexDiv>
          <FlexDiv column style={{ margin: "10px 50px" }}>
            <div>Is Menu</div>
            <Switch checked={isMenu} onChange={handleMenuChange} />
          </FlexDiv>
          <FlexDiv column>
            <div>Is Bottom Menu</div>
            <Switch checked={isBottomMenu} onChange={handleBottomMenuChange} />
          </FlexDiv>
        </FlexDiv>
      </ProductWrapper>

      {filteredData?.length > 0 ? (
        <FlexDiv width="100%" justifyContentCenter style={{ marginTop: "1rem" }}>
          <TableContainer>
            <Table>
              <Header titles={headers} color="#000" width="8%" />
              <TableBody>
                {filteredData
                  ?.map((row) => {
                    return (
                      <StyledTableRow
                        key={row?.id}
                        style={{ background: "#fff" }}
                      >
                        <StyledTableCell align="center" style={{ width: "8%" }}>
                          {row?.moduleName}
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>
                          {row?.pageName}
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>{row?.roleName}</StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>{row?.rankCode}</StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>{row?.prioritySeq}</StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>{row?.bottomNo}</StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>{row?.menuNo}</StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>{row?.isHomeTile ? "true" : "false"}</StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>{row?.isBottomMenu ? "true" : "false"}</StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>{row?.isMenu ? "true" : "false"}</StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>{row?.homeTileName}</StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>{row?.bottomMenuName}</StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>{row?.menuName}</StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>
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
                          style={{ cursor: "pointer", width: "8%" }}
                          // onClick={() => {
                          //   history.push(RoutesPath?.UpdateMasterConfigurationList, row)
                          // }}
                          onClick={() => {
                            handleEditModalOpen(row)
                          }}
                        ><EditIcon /></StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>
                          {row?.routeKey}
                        </StyledTableCell>
                        <StyledTableCell align="center" style={{ width: "8%" }}>
                          {row?.routePath}
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
      {
        editModalOpen && (
          <UpdateMasterConfigurationList data={editedData} open={editModalOpen} setEditModalOpen={setEditModalOpen} getConfigList={getConfigList} />
        )
      }
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
