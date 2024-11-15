import React, { useEffect, useState } from "react";
import { H2Heading } from "../../../../components/styled";
import { FlexDiv } from "../../../../style/styled";
import { Autocomplete, FormControl, FormLabel, Input } from "@mui/joy";
import { Button } from "@mui/material";
import { ProductWrapper } from "../../../ProductManufacturer/Businessunits/component/AddBUForm";
import { config } from "../../../../config/config";
import {
  getAuthorized,
  postAuthorized,
  putAuthorized,
} from "../../../../services";
import ListRank from "./ListRank";
import { Container } from "../RoleMaster/CreateRoleMaster";

const rankTypeList = [
  { name: "Admin", value: "admin" },
  { name: "Executive", value: "executive" },
];
const AddRankCreateAppMaster = () => {
  const [data, setData] = useState({
    rankCode: "",
    rankDescription: "",
    rankType: { name: "", value: "" },
  });
  const [rankData, setRankData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editedRankId, setEditedRankId] = useState("");
  const [loader, setloader] = useState({
    isLoading: false,
    error: false,
    msg: "",
  });

  const onSubmit = async () => {
    setloader({ ...loader, isLoading: true });
    let url = `${config.baseUrl}/superAdmin/addUserRank`;
    const body = {
      rank_code: data?.rankCode,
      rank_description: data?.rankDescription,
      rank_type: data?.rankType.value,
    };
    try {
      const resp = await postAuthorized(url, body);
      if (resp?.status === 200) {
        setloader({ ...loader, isLoading: false });
        setData({
          rankCode: "",
          rankDescription: "",
          rankType: { name: "", value: "" },
        });
        getRankData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRankData = async () => {
    let url = `${config.baseUrl}/superAdmin/userRanks`;
    try {
      const resp = await getAuthorized(url);
      setRankData(resp?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const editHandler = (data) => {
    setIsEdit(true);
    setData({
      rankCode: data?.rankCode,
      rankDescription: data?.rankDescription,
      rankType: rankTypeList?.find((i) => i?.value === data?.rankType)!,
    });
    setEditedRankId(data?.id);
  };

  const onEditRankCode = async () => {
    let url = `${config.baseUrl}/superAdmin/updateUserRank`;
    const body = {
      id: editedRankId,
      rank_code: data?.rankCode,
      rank_type: data.rankType?.value,
    };
    try {
      const resp = await putAuthorized(url, body);
      if (resp?.status === 200) {
        setloader({ ...loader, isLoading: false });
        setData({
          rankCode: "",
          rankDescription: "",
          rankType: { name: "", value: "" },
        });
        setIsEdit(false);
        getRankData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEditRankDescription = async () => {
    let url = `${config.baseUrl}/superAdmin/updateRankDesc`;
    const body = {
      id: editedRankId,
      rank_description: data?.rankDescription,
    };
    try {
      const resp = await putAuthorized(url, body);
      if (resp?.status === 200) {
        setloader({ ...loader, isLoading: false });
        setData({
          rankCode: "",
          rankDescription: "",
          rankType: { name: "", value: "" },
        });
        setIsEdit(false);
        getRankData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRank = async (id) => {
    let url = `${config.baseUrl}/superAdmin/deactivateUserRank`;
    const body = {
      id: id,
    };
    try {
      const resp = await putAuthorized(url, body);
      if (resp?.status === 200) {
        getRankData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onEdit = () => {
    onEditRankCode();
    // onEditRankDescription();
  };

  useEffect(() => {
    getRankData();
  }, []);
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <FlexDiv justifyContentCenter style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "1.3rem", color: "#f65000" }}>
          {isEdit ? "Edit" : "Add"} Rank
        </div>
      </FlexDiv>
      <ProductWrapper style={{ background: "#fbfbfb", padding: "20px" }}>
        <FlexDiv
          justifyContentSpaceBetween
          style={{ width: "60%", margin: "auto" }}
        >
          <Container>
            <FormControl>
              <FormLabel>Rank Code *</FormLabel>
              <Input
                placeholder="Rank Code"
                value={data?.rankCode}
                onChange={(e) => {
                  setData({
                    ...data,
                    rankCode: e?.target?.value,
                  });
                }}
              />
            </FormControl>
          </Container>
          <Container>
            <FormControl>
              <FormLabel>Rank Description *</FormLabel>
              <Input
                placeholder="Rank Description"
                value={data?.rankDescription}
                onChange={(e) => {
                  setData({
                    ...data,
                    rankDescription: e?.target?.value,
                  });
                }}
              />
            </FormControl>
          </Container>
          <Container>
            <FormControl>
              <FormLabel>Rank Type *</FormLabel>
              <Autocomplete
                value={data?.rankType}
                onChange={(e, value) =>
                  setData({
                    ...data,
                    rankType: value!,
                  })
                }
                options={rankTypeList}
                getOptionLabel={(option: any) => option?.name}
              />
            </FormControl>{" "}
          </Container>
          <Container style={{ margin: "30px 10px" }}>
            <Button
              variant="contained"
              color="success"
              onClick={isEdit ? onEdit : onSubmit}
            >
              {isEdit ? "Update" : "Submit"}
            </Button>
          </Container>
        </FlexDiv>
      </ProductWrapper>
      <ListRank edit={editHandler} data={rankData} deleteRank={deleteRank} />
    </div>
  );
};

export default AddRankCreateAppMaster;
