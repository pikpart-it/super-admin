import React, { ChangeEvent, useRef, useState } from "react";
import { FlexDiv } from "../../../style/styled";
import { H2Heading } from "../../../components/styled";
import { FormInput } from "../../../components/Forms/Form";
import { InputContainer } from "./components/KitBasedScheme";
import { Button } from "@mui/material";
import { config } from "../../../config/config";
import { postAuthorizedUpload } from "../../../services";
import { Loader } from "../../../components/Loader";
import MsgCard from "../../../components/MsgCard";
import { DashboardCard } from "./components/DiscountBasedScheme";
import FileUploadButton from "../../../components/FileUploadButton";

type giftType = {
  name: string;
  amount: string;
  image: any;
  description: string;
  length: string;
  breadth: string;
  height: string;
  weight: string;
  vol_weight: string;
  sale_gst_rate: string;
  gift_code: string;
};

const AddGifts = () => {
  const [gift, setGift] = useState<giftType>({
    name: "",
    amount: "",
    image: "",
    description: "",
    length: "",
    breadth: "",
    height: "",
    weight: "",
    vol_weight: "",
    sale_gst_rate: "",
    gift_code: "",
  });
  const [loader, setLoader] = React.useState({
    error: false,
    msg: "",
    isLoading: false,
  });

  const onChange = (target) => {
    const { name, value }: any = target;

    if (name === "image") {
      setGift({ ...gift, [name]: target?.files[0] });
    } else {
      setGift({ ...gift, [name]: value });
    }
  };
  const isSubmitEnabled = () => {
    const { amount, image, name, description } = gift;

    if (!name || !amount || !image || !description) {
      return true;
    } else {
      return false;
    }
  };
  const onSubmit = async () => {
    setLoader({ ...loader, isLoading: true });

    let url = `${config.baseUrl}/admin/addGiftItem`;

    const payload = new FormData();

    const {
      amount,
      image,
      name,
      description,
      length,
      breadth,
      height,
      weight,
      vol_weight,
      sale_gst_rate,
      gift_code,
    } = gift

    payload.append("name", name);
    payload.append("amount", amount);
    payload.append("description", description);
    payload.append("giftItem", image);
    payload.append("length", length);
    payload.append("breadth", breadth);
    payload.append("height", height);
    payload.append("weight", weight);
    payload.append("vol_weight", vol_weight);
    payload.append("sale_gst_rate", sale_gst_rate);
    payload.append("gift_code", gift_code);
    
    try {
      const { data } = await postAuthorizedUpload(url, payload);
      setLoader({
        ...loader,
        isLoading: false,
        error: data?.error,
        msg: data?.message,
      });

      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 2000);
    } catch (error) {
      setLoader({ ...loader, isLoading: false, error: true, msg: "Error" });

      setTimeout(() => {
        setLoader({ ...loader, msg: "" });
      }, 2000);
    }
  };

  console.log({ gift });

  return (
    <>
      <FlexDiv justifyContentCenter>
        <H2Heading>Add Scheme Gifts</H2Heading>
      </FlexDiv>

      <FlexDiv justifyContentCenter>
        <DashboardCard style={{ width: "90%" }}>
          <FlexDiv column width="100%">
            <FlexDiv justifyContentSpaceEvenly width="100%" margin="15px">
              <InputContainer>
                <FormInput
                  type="text"
                  label="Gift Item Name *"
                  name="name"
                  value={gift.name}
                  onChange={(target) => onChange(target)}
                  fieldErrors={{}}
                />
              </InputContainer>
              <InputContainer>
                <FormInput
                  type="number"
                  label="Gift Item Amount *"
                  name="amount"
                  value={gift.amount}
                  onChange={(target) => onChange(target)}
                  fieldErrors={{}}
                />
              </InputContainer>
              <InputContainer>
                <FormInput
                  type="text"
                  label="Gift Code*"
                  name="gift_code"
                  value={gift.gift_code}
                  onChange={(target) => onChange(target)}
                  fieldErrors={{}}
                />
              </InputContainer>
            </FlexDiv>

            <FlexDiv justifyContentSpaceEvenly width="100%" margin="15px">
              <InputContainer>
                <FormInput
                  type="text"
                  label="length*"
                  name="length"
                  value={gift.length}
                  onChange={(target) => onChange(target)}
                  fieldErrors={{}}
                />
              </InputContainer>
              <InputContainer>
                <FormInput
                  type="text"
                  label="breadth*"
                  name="breadth"
                  value={gift.breadth}
                  onChange={(target) => onChange(target)}
                  fieldErrors={{}}
                />
              </InputContainer>
              <InputContainer>
                <FormInput
                  type="text"
                  label="height *"
                  name="height"
                  value={gift.height}
                  onChange={(target) => onChange(target)}
                  fieldErrors={{}}
                />
              </InputContainer>
            </FlexDiv>

            <FlexDiv justifyContentSpaceEvenly width="100%" margin="15px">
              <InputContainer>
                <FormInput
                  type="text"
                  label="Productweight(in Kg)*"
                  name="weight"
                  value={gift.weight}
                  onChange={(target) => onChange(target)}
                  fieldErrors={{}}
                />
              </InputContainer>
              <InputContainer>
                <FormInput
                  type="text"
                  label="Volumeweight*"
                  name="vol_weight"
                  value={gift.vol_weight}
                  onChange={(target) => onChange(target)}
                  fieldErrors={{}}
                />
              </InputContainer>
              <InputContainer>
                <FormInput
                  type="text"
                  label="Sale Gst rate*"
                  name="sale_gst_rate"
                  value={gift.sale_gst_rate}
                  onChange={(target) => onChange(target)}
                  fieldErrors={{}}
                />
              </InputContainer>
            </FlexDiv>

            <FlexDiv width="100%" margin="20px" justifyContentSpaceEvenly>
              <textarea
                name="description"
                value={gift.description}
                placeholder="Enter gift description"
                onChange={({ target }) => onChange(target)}
                style={{ width: "80%", padding: "20px" }}
              />
              <InputContainer style={{ margin: "auto 10px" }}>
                <FileUploadButton
                  onChange={onChange}
                  name="image"
                  value={gift.image}
                  buttonName=" Upload Gift Image *"
                />
              </InputContainer>
            </FlexDiv>
          </FlexDiv>
        </DashboardCard>
      </FlexDiv>
      <FlexDiv justifyContentFlexEnd width="90%" margin="30px 0px">
        <Button
          disabled={isSubmitEnabled()}
          color="success"
          variant="contained"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </FlexDiv>
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

export default AddGifts;
