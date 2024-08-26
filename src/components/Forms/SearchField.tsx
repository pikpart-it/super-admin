import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { config } from "../../config/config";
import { getAuthorized } from "../../services";
import { FlexDiv } from "../../style/styled";
import { isDistributorOrCenter } from "../../utility/func";

const SearchField = ({
  userId,
  onChange,
  value,
  disabled,
}: {
  userId: number;
  onChange: (value: any) => void;
  value: any;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<any[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const searchProducts = async () => {
    setLoading(true);
    let url = `${config.baseUrl}/utilities/${
      isDistributorOrCenter() === "distributor"
        ? "search-distributor-products?productDistributorId"
        : "search-manufacturer-products?manufacturerId"
    }=${userId}&search=${searchKey}`;

    try {
      const { data } = await getAuthorized(url);
      setLoading(false);
      if (data?.data) {
        setOptions(data?.data);
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

  return (
    <Autocomplete
      id="product-search"
      sx={{ width: 300 }}
      open={open}
      disabled={disabled}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) =>
        `${option?.name}(${option?.productCode})${
          (option?.masterProduct?.productCompatibleModels?.length &&
            option?.masterProduct?.productCompatibleModels[0]?.brand) ||
          ""
        }${
          (option?.masterProduct?.productCompatibleModels?.length &&
            option?.masterProduct?.productCompatibleModels[0]?.model) ||
          ""
        } `
      }
      options={options}
      onChange={(e, value) => {
        onChange(value);
      }}
      onInputChange={(e: any) => setSearchKey(e.target?.value)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder={value}
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
