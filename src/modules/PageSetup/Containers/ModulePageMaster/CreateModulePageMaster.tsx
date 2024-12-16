import { Autocomplete, FormControl, FormLabel, Input } from "@mui/joy";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Loader } from "../../../../components/Loader";
import MsgCard from "../../../../components/MsgCard";
import { H2Heading } from "../../../../components/styled";
import { config } from "../../../../config/config";
import {
  getAuthorized,
  postAuthorized,
  putAuthorized,
} from "../../../../services";
import { FlexDiv } from "../../../../style/styled";
import { moduleMasterTypes } from "../ModuleMaster/ListModules";
import { Container } from "../RoleMaster/CreateRoleMaster";
import ListModulePageMaster, {
  modulePageMasterTypes,
} from "./ListModulePageMaster";
import { ProductWrapper } from "../../../ProductManufacturer/Businessunits/component/AddBUForm";
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

const CreateModulePageMaster = () => {
  const [moduleMasterList, setModuleMasterList] = useState<moduleMasterTypes[]>(
    []
  );
  const [modulePageMasterList, setModulePageMasterList] = useState<
    modulePageMasterTypes[]
  >([]);
  const [FiltermodulePageMasterList, setFilterModulePageMasterList] = useState<
    modulePageMasterTypes[]
  >([]);
  const [isFilterApply, setIsFilterApply] = useState(false)
  const [loader, setloader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });
  const [modulePageMaster, setModulePageMaster] = useState({
    page_name: "",
    page_description: "",
    module_name: { moduleName: "", id: 0, routeKey: "" },
    route_key: "",
    route_path: "",
    id: 0,
  });
  const [filterSelectedModule, setFilterSelectedModule] = useState<number>()

  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: number | null,
  ) => {
    if (newValue) {
      const updatedModulePageMasterList = modulePageMasterList?.filter((i) => i?.moduleId === newValue)
      setFilterModulePageMasterList(updatedModulePageMasterList)
    }
    setIsFilterApply(true)
    setFilterSelectedModule(newValue || 0)
  };

  const getModulePageMasterList = async () => {
    let url = `${config.baseUrl}/superAdmin/modulePageMasters`;

    try {
      const { data } = await getAuthorized(url);
      setModulePageMasterList(data?.data);
    } catch (error) { }
  };

  const deleteItem = async (id: number) => {
    setloader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/superAdmin/deactivateModulePageMaster`;

    try {
      const { data } = await putAuthorized(url, { id });
      getModulePageMasterList();
      reset();

      setloader({
        ...loader,
        isLoading: false,
        error: data?.error,
        msg: data?.message,
      });
      setTimeout(() => {
        setloader({ ...loader, msg: "" });
      }, 5000);
    } catch (error) {
      setloader({
        ...loader,
        isLoading: false,
        error: true,
        msg: "Something Went Wrong!",
      });
      setTimeout(() => {
        setloader({ ...loader, msg: "" });
      }, 5000);
    }
  };

  const getModuleMasterList = async () => {
    let url = `${config.baseUrl}/superAdmin/moduleMasters`;

    try {
      const { data } = await getAuthorized(url);
      setModuleMasterList(data?.data);
    } catch (error) { }
  };
  const onChange = (target) => {
    const { name, value } = target;
    if (name === "app_name") {
      setModulePageMaster({
        ...modulePageMaster,
        [name]: value,
      });
    } else {
      setModulePageMaster({ ...modulePageMaster, [name]: value });
    }
  };

  const onSubmit = async () => {
    setloader({ ...loader, isLoading: true });
    const { moduleName, routeKey } = modulePageMaster?.module_name;
    const payload = {
      ...modulePageMaster,
      module_name: modulePageMaster?.module_name?.moduleName,
      module_id: modulePageMaster?.module_name?.id,
      route_key: `${moduleName}${routeKey}${modulePageMaster?.page_name?.trimEnd()}`,
      route_path: `/${moduleName}/${modulePageMaster?.page_name?.trimEnd()}`,
      id: modulePageMaster?.id || undefined,
    };
    try {
      let res;
      let url;

      if (modulePageMaster?.id) {
        url = `${config.baseUrl}/superAdmin/updateModulePageMaster`;
        res = await putAuthorized(url, payload);
      } else {
        url = `${config.baseUrl}/superAdmin/addModulePageMaster`;
        res = await postAuthorized(url, payload);
      }

      setloader({
        ...loader,
        isLoading: false,
        error: res?.data?.error,
        msg: res?.data?.message,
      });
      setTimeout(() => {
        setloader({ ...loader, msg: "" });
      }, 5000);
      getModulePageMasterList();
    } catch (error) {
      setloader({
        ...loader,
        isLoading: false,
        error: true,
        msg: "Something Went Wrong!",
      });
      setTimeout(() => {
        setloader({ ...loader, msg: "" });
      }, 5000);
    }
  };
  const reset = () => {
    setModulePageMaster({
      ...modulePageMaster,
      id: 0,
      module_name: { moduleName: "", id: 0, routeKey: "" },
      page_description: "",
      page_name: "",
      route_key: "",
      route_path: "",
    });
  };

  const edit = (dataForEdit: modulePageMasterTypes) => {
    setModulePageMaster({
      ...modulePageMaster,
      id: dataForEdit?.id,
      module_name: moduleMasterList?.find(
        (i) => i?.id === dataForEdit?.moduleId
      )!,
      route_key: dataForEdit?.routeKey,
      page_name: dataForEdit?.pageName,
      page_description: dataForEdit?.pageDescription,
      route_path: dataForEdit?.routePath,
    });
  };

  const submitEnabled = () => {
    const { module_name, page_name, page_description } = modulePageMaster;

    if (!module_name?.moduleName || !page_name || !page_description) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getModulePageMasterList();
    getModuleMasterList();
  }, []);
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <FlexDiv justifyContentCenter style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "1.3rem", color: "#f65000" }}>Module Page Master</div>
      </FlexDiv>
      <ProductWrapper style={{ background: "#fbfbfb", padding: "20px" }}>
        <FlexDiv justifyContentSpaceEvenly>
          <Container>
            <FormControl>
              <FormLabel>Module Name*</FormLabel>
              <Autocomplete
                value={modulePageMaster?.module_name}
                onChange={(e, value) =>
                  onChange({ name: "module_name", value })
                }
                options={moduleMasterList}
                getOptionLabel={(option: any) => option?.moduleName}
              />
            </FormControl>
          </Container>

          <Container>
            <FormControl>
              <FormLabel>Page Name*</FormLabel>
            </FormControl>
            <Autocomplete
              inputValue={modulePageMaster?.page_name}
              options={modulePageMasterList}
              getOptionLabel={(option: any) => option?.pageName}
              freeSolo={true}
              onInputChange={(e, value) =>
                onChange({ name: "page_name", value })
              }
            />
          </Container>
          <Container>
            <FormControl>
              <FormLabel>Page Description*</FormLabel>
            </FormControl>
            <Input
              type="text"
              name="page_description"
              value={modulePageMaster?.page_description}
              onChange={({ target }) => onChange(target)}
              placeholder="Page Description"
            />
          </Container>
          <Container style={{ margin: "30px 10px" }}>
            <Button
              variant="contained"
              color="success"
              onClick={onSubmit}
              disabled={submitEnabled()}
            >
              Submit
            </Button>
          </Container>
        </FlexDiv>
        <FlexDiv justifyContentFlexEnd>
          <div>Filter on Module</div>
          <Container>
            <Select
              placeholder="Apply filter on list"
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
            {/* <FormControl>
              <Autocomplete
                value={modulePageMaster?.module_name}
                onChange={(e, value) =>
                  onChange({ name: "module_name", value })
                }
                options={moduleMasterList}
                getOptionLabel={(option: any) => option?.moduleName}
              />
            </FormControl> */}
          </Container>
        </FlexDiv>
      </ProductWrapper>
      <ListModulePageMaster
        deleteItem={deleteItem}
        edit={edit}
        modulePageMasterList={isFilterApply ? FiltermodulePageMasterList : modulePageMasterList}
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
    </div>
  );
};

export default CreateModulePageMaster;
