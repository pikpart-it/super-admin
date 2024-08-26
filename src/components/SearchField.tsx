import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { config } from "../config/config";
import { getAuthorized, postAuthorized } from "../services";
import { FlexDiv } from "../style/styled";

const SearchField = ({
  onChange,
  value,
  url,
  payload,
  query,
  fieldLabel,
}: {
  onChange: (value: any) => void;
  value: any;
  url: any;
  payload?: any;
  query?: any;
  fieldLabel;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<any[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const usedUrl = query ? `${url}?search=${searchKey}${query}` : url;
  const searchProducts = async () => {
    setLoading(true);

    try {
      let res;

      if (payload) {
        res = await postAuthorized(usedUrl, { ...payload, search: searchKey });
      } else {
        res = await getAuthorized(usedUrl);
      }

      setLoading(false);
      if (res?.data?.data) {
        setOptions(res?.data?.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const search = setTimeout(() => {
      if (searchKey?.length >= 3) searchProducts();
    }, 1000);

    return () => clearTimeout(search);
  }, [searchKey]);
  const returnOptionName = (option) => {
    if (option?.firstName) {
      return `${option?.firstName} ${option?.lastName || ""}`;
    } else {
      return `${option.name}(${option.productCode})${
        option?.totalQty ? `(Qty:${option.totalQty})` : ""
      }${
        option?.masterProduct?.productCompatibleModels[0]?.brand
          ? option.masterProduct?.productCompatibleModels[0]?.brand
          : ""
      }${
        option?.masterProduct?.productCompatibleModels[0]?.model
          ? option?.masterProduct?.productCompatibleModels[0]?.model
          : ""
      } `;
    }
  };
  return (
    <Autocomplete
      id="product-search"
      sx={{ width: "100%" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => returnOptionName(option)}
      options={options}
      onChange={(e, value) => {
        onChange(value);
      }}
      onInputChange={(e: any) => setSearchKey(e.target?.value)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          fullWidth
          label={fieldLabel}
          placeholder={""}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <FlexDiv column>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </FlexDiv>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchField;
