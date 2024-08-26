import React from "react";
import styled, { keyframes } from "styled-components";
import AsyncSelect from "react-select/async";
import "../../App.css";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { MenuItem, Select, TextField } from "@mui/material";
import { FlexDiv } from "../../style/styled";
import { Span } from "../styled";
const MyAsyncSelect = styled(AsyncSelect)`
  width: 100%;
  div:first-child div:first-child {
    height: 35px;
    overflow: auto;
  }
`;

export const Form = styled(FlexDiv)<{ variant? }>`
  position: relative;
  flex-direction: ${(props: any) =>
    ["row", "rowToColumn"].includes(props.variant)
      ? "row"
      : ["column", "columnToRow"].includes(props.variant)
      ? "column"
      : "column"};
  align-items: ${(props: any) =>
    ["row", "rowToColumn"].includes(props.variant)
      ? "center"
      : ["column", "columnToRow"].includes(props.variant)
      ? "flex-start"
      : "flex-start"};

  justify-content: ${(props: any) =>
    ["row", "rowToColumn"].includes(props.variant)
      ? "space-between"
      : ["column", "columnToRow"].includes(props.variant)
      ? "flex-start"
      : "flex-start"};

  @media screen and (max-width: 540px) {
    flex-direction: ${(props: any) =>
      ["rowToColumn"].includes(props.variant)
        ? "column"
        : ["columnToRow"].includes(props.variant)
        ? "row"
        : "column"};
    align-items: ${(props: any) =>
      ["row", "rowToColumn"].includes(props.variant)
        ? "flex-start"
        : ["column", "columnToRow"].includes(props.variant)
        ? "center"
        : "flex-start"};

    justify-content: ${(props: any) =>
      ["row", "rowToColumn"].includes(props.variant)
        ? "flex-start"
        : ["column", "columnToRow"].includes(props.variant)
        ? "space-between"
        : "flex-start"};
  }
`;

const pulse = keyframes`
  from {
    height: 2px;
    width: 2px;
    border: 1px solid rgba(0, 0, 0, 0.6);
  }
  to {
    top: 5px;
    right: 5px;
    height: 6px;
    width: 6px;
    border: 4px solid rgba(0, 0, 0, 0.2);
  }
`;

export const LoaderForm = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.4);
  &:before,
  &:after {
    content: "";
    position: absolute;
    display: block;
    border-radius: 50%;
    height: 2px;
    width: 2px;
    right: 10px;
    top: 10px;
    animation-name: ${pulse};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
    border: 1px solid rgba(0, 0, 0, 0.6);
  }
  &:after {
    animation-delay: 0.5s;
  }
`;

interface IForm {
  name: string;
  label?: string;
  className?: string;
  isLoading?: boolean;
  style?: {
    container?: React.CSSProperties;
    label?: React.CSSProperties;
    formElement?: React.CSSProperties;
  };
  variant?: "row" | "column" | "rowToColumn" | "columnToRow";
  inputVariant?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
  onChange?: (item: any) => void;
  onBlur?: (item: any) => void;
  placeholder?: string;
  fieldErrors?: any;
  disabled?: boolean;
  value?: string | undefined;
  maxLength?: number | undefined;
  isMulti?: boolean;
}

interface IFormInput extends IForm {
  type: string;
  checked?: boolean;
  isFloat?: boolean;
  focused?: boolean;
}

interface IFormSelect extends IForm {
  list?: any[];
  value?: any;
  options?: any[];
  isMulti?: boolean;
  isDisabled?: boolean;
  getOptionLabel?: any;
  getOptionValue?: any;
  styles?: any;
  selectProps?: any;
}

export function FormInput({
  type,
  isFloat = false,
  name,
  label,
  style = {},
  value,
  onBlur,
  variant,
  inputVariant,
  checked,
  onChange,
  disabled,
  isLoading,
  placeholder,
  fieldErrors,
  maxLength,
  focused,
  isMulti,
}: IFormInput) {
  const styles = {
    ...style.container,
    ...(["checkbox", "radio"].includes(type) ? {} : { flexGrow: 1 }),
  };
  return (
    <Form
      variant={variant}
      alignItemsFlexStart
      style={{ ...styles, margin: "5px 0px" }}
    >
      <TextField
        type={type}
        name={name}
        label={label || undefined}
        onBlur={onBlur}
        className="inputStyle"
        fullWidth
        focused={type === "file" ? true : focused}
        sx={{
          "& .MuiInputBase-input": {
            padding: "15px 10px 15px 10px",
            ...style.formElement,
          },
        }}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        inputProps={{ maxLength }}
        onChange={(e: any) => {
          if (type === "number") {
            e.target.value = isFloat
              ? e.target.value
              : parseInt(e.target.value);
          }
          if (e.target.maxLength > 0) {
            if (e.target.value > e.target.maxLength) {
              e.target.value = e.target.value.slice(0, e.target.maxLength);
            }
          }
          onChange && onChange(e.target);
        }}
      />
      {isLoading ? <LoaderForm /> : null}

      {fieldErrors[name] ? (
        <Span
          style={{
            color: "rgba(226, 21, 21, 0.83)",
            height: "15px",
            fontWeight: 500,
            fontSize: "15px",
          }}
          variant="secondary"
        >
          {fieldErrors[name]}
        </Span>
      ) : null}
    </Form>
  );
}

export function FormInputMulti({
  type,
  isFloat = false,
  name,
  label,
  isMulti,
  style = {},
  value,
  onBlur,
  variant,
  inputVariant,
  checked,
  onChange,
  disabled,
  isLoading,
  placeholder,
  fieldErrors,
  maxLength,
}: IFormInput) {
  const styles = {
    ...style.container,
    ...(["checkbox", "radio"].includes(type) ? {} : { flexGrow: 1 }),
  };
  return (
    <Form
      variant={variant}
      alignItemsFlexStart
      style={{ ...styles, margin: "5px 0px" }}
    >
      {label && (
        <Span
          color={`#525252`}
          variant="secondary"
          style={{
            ...style.label,
            // paddingBottom: 2,
            fontSize: 15,
            paddingLeft: 10,
            fontWeight: 400,
          }}
        >
          {label}
        </Span>
      )}
      <TextField
        type={type}
        name={name}
        // multiple={isMulti}
        onBlur={onBlur}
        className="inputStyle"
        style={{
          width: "100%",
          padding: "6px 11px",
          border: "1px solid green ",

          borderRadius: "6px",
          background: "rgba(244, 244, 244, 0.62)",
          cursor: "pointer",
          ...style.formElement,
        }}
        value={value}
        //accept="image/*"
        fullWidth
        disabled={disabled}
        // checked={checked}
        //  variant={inputVariant}
        placeholder={placeholder}
        //maxLength={maxLength}
        onChange={(e: any) => {
          if (type === "number") {
            e.target.value = isFloat
              ? e.target.value
              : parseInt(e.target.value);
          }
          if (e.target.maxLength > 0) {
            if (e.target.files.length > e.target.maxLength) {
              alert("maximum 5 banners are allowed!");
            }
          }
          onChange && onChange(e.target);
        }}
      />
      {isLoading ? <LoaderForm /> : null}

      {fieldErrors[name] ? (
        <Span
          style={{
            color: "rgba(226, 21, 21, 0.83)",
            height: "15px",
            fontWeight: 500,
            fontSize: "15px",
          }}
          variant="secondary"
        >
          {fieldErrors[name]}
        </Span>
      ) : null}
    </Form>
  );
}

export function FormSelect({
  list,
  name,
  label,
  style = {},
  value,
  onBlur,
  variant,
  disabled,
  onChange,
  className,
  placeholder,
  fieldErrors,
}: IFormSelect) {
  return (
    <Form
      variant={variant}
      style={{ flexGrow: 1, margin: "5px 0px", ...style.container }}
    >
      {label && (
        <Span
          color={`#000`}
          variant="secondary"
          style={{ ...style.label, paddingBottom: 5, fontSize: 15 }}
        >
          {label}
        </Span>
      )}
      <select
        name={name}
        value={value}
        className={className}
        style={{
          ...style.formElement,
          padding: "6px 11px",
          cursor: "pointer",
        }}
        disabled={disabled}
        onBlur={onBlur}
        onChange={(e: any) => onChange && onChange(e.target)}
      >
        <option value={""}>{placeholder}</option>
        {list?.map((item: any, i: number) => (
          <option value={item.value || item.id} key={i}>
            {item.label || item.name}
          </option>
        ))}
      </select>
      {fieldErrors[name] && (
        <Span style={{ color: "#e21515", height: "15px" }} variant="secondary">
          {"*" + fieldErrors[name]}
        </Span>
      )}
    </Form>
  );
}
export function MyFormSelect({
  name,
  label,
  style = {},
  value,
  onBlur,
  isMulti,
  options,
  variant,
  disabled,
  isDisabled,
  onChange,
  className,
  placeholder,
  fieldErrors,
  selectProps,
  ...rest
}: IFormSelect) {
  return (
    <Form
      variant={variant}
      style={{ flexGrow: 1, margin: "5px 0px", ...style.container }}
    >
      <TextField
        name={name}
        select
        value={value}
        disabled={isDisabled}
        className="inputStyle"
        label={label}
        SelectProps={selectProps}
        sx={{
          "& .MuiInputBase-input": {
            padding: "15px",
            ...style.formElement,
          },
        }}
        onChange={({ target }: any) => {
          onChange && onChange(target);
        }}
        placeholder={placeholder}
        fullWidth
        {...rest}
      >
        {options?.map((i, index) => (
          <MenuItem key={index} value={i}>
            {i?.tierType
              ? `${i?.name},(${i?.tierType})`
              : i?.vehicleType
              ? `${i?.name},(${i?.vehicleType})`
              : i?.setupName
              ? `${i?.setupName},(${i?.setupKey})`
              : i?.name ||
                i.supplierName ||
                i.label ||
                i?.appName ||
                i?.roleName ||
                i.engineCapacity ||
                i.year ||
                i.value ||
                `${i?.addressLine_1}, ${i?.addressLine_2}`}
          </MenuItem>
        ))}
      </TextField>
      {fieldErrors[name] && (
        <Span style={{ color: "#e21515", height: "15px" }} variant="secondary">
          {fieldErrors[name] && "*" + fieldErrors[name]}
        </Span>
      )}
    </Form>
  );
}
export function MyProductSelect({
  name,
  label,
  style = {},
  value,
  onBlur,
  isMulti,
  options,
  variant,
  disabled,
  isDisabled,
  onChange,
  className,
  placeholder,
  fieldErrors,
  selectProps,
  ...rest
}: IFormSelect) {
  return (
    <Form
      variant={variant}
      style={{ flexGrow: 1, margin: "5px 0px", ...style.container }}
    >
      <TextField
        name={name}
        select
        value={value}
        disabled={isDisabled}
        className="inputStyle"
        label={label}
        SelectProps={selectProps}
        sx={{
          "& .MuiInputBase-input": {
            padding: "15px",
            ...style.formElement,
          },
        }}
        onChange={({ target }: any) => {
          onChange && onChange(target);
        }}
        placeholder={placeholder}
        fullWidth
        {...rest}
      >
        {options?.map((i, index) => (
          <MenuItem key={index} value={i}>
            {i?.tierType
              ? `${i?.name},(${i?.tierType})`
              : i?.vehicleType
              ? `${i?.name},(${i?.vehicleType})`
              : i?.setupName
              ? `${i?.setupName},(${i?.setupKey})`
              : `${i?.name} (₹${i?.sellingPrice}) (Total Qty:${i?.totalQty}) (Online Qty:${i?.onlineQty}) (${i?.masterProduct?.productCompatibleModels[0]?.model})` ||
                i.supplierName ||
                i.label ||
                i.engineCapacity ||
                i.year ||
                i.value ||
                `${i?.addressLine_1}, ${i?.addressLine_2}`}
          </MenuItem>
        ))}
      </TextField>
      {fieldErrors[name] && (
        <Span style={{ color: "#e21515", height: "15px" }} variant="secondary">
          {fieldErrors[name] && "*" + fieldErrors[name]}
        </Span>
      )}
    </Form>
  );
}

export function MyStyledFormSelect({
  name,
  label,
  style = {},
  styles = {},
  value,
  onBlur,
  isMulti,
  options,
  variant,
  disabled,
  onChange,
  className,
  placeholder,
  fieldErrors,
  ...rest
}: IFormSelect) {
  return (
    <Form
      variant={variant}
      style={{ flexGrow: 1, margin: "5px 0px", ...style.container }}
    >
      {label && (
        <Span
          color={`#000`}
          variant="secondary"
          style={{ ...style.label, paddingBottom: 5, fontSize: 15 }}
        >
          {label}
        </Span>
      )}
      <Select
        // options={options}
        value={value}
        onChange={(value: any) => {
          onChange && onChange({ name, value });
        }}
        placeholder={placeholder}
        //isMulti={isMulti}
        //  styles={styles}
        // style={{
        //   container: {
        //     width: '100%',
        //   },
        // }}
        {...rest}
      />
      {fieldErrors[name] && (
        <Span style={{ color: "#e21515", height: "15px" }} variant="secondary">
          {fieldErrors[name] && "*" + fieldErrors[name]}
        </Span>
      )}
    </Form>
  );
}

interface AsyncSelectTypes extends IFormSelect {
  defaultOptions?: Boolean;
  loadOptions: (inputValue: any, callback: any) => void;
}

export function MyFormAsyncSelect({
  name,
  label,
  style = {},
  value,
  onBlur,
  isMulti,
  options,
  variant,
  disabled,
  onChange,
  className,
  placeholder,
  fieldErrors,
  defaultOptions,
  loadOptions,
  ...rest
}: AsyncSelectTypes) {
  return (
    <Form
      variant={variant}
      style={{ flexGrow: 1, margin: "5px 0px", ...style.container }}
    >
      {label && (
        <Span
          color={`#000`}
          variant="secondary"
          style={{ ...style.label, paddingBottom: 5, fontSize: 15 }}
        >
          {label}
        </Span>
      )}

      <MyAsyncSelect
        name={name}
        styles={style?.formElement}
        placeholder={placeholder}
        loadOptions={loadOptions}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        isMulti={isMulti}
        {...rest}
      />

      {fieldErrors[name] && (
        <Span style={{ color: "#e21515", height: "15px" }} variant="secondary">
          {fieldErrors[name] && "*" + fieldErrors[name]}
        </Span>
      )}
    </Form>
  );
}

interface Validateor {
  startCapacity: string;
  endCapacity: string;
}

export function ValidateCapacity(startCapacity, endCapacity) {
  const start = parseInt(startCapacity);
  const end = parseInt(endCapacity);
  if (end < start) {
    return false;
  } else {
    return true;
  }
}

export function TablePaginationActions(handleChangePage, page) {
  const handleFirstPageButtonClick = (event) => {
    handleChangePage(event, 1);
  };
  const handleBackButtonClick = (event) => {
    handleChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    handleChangePage(event, page + 1);
  };
  return (
    <>
      <IconButton
        disabled={page === 1 ? true : false}
        onClick={handleFirstPageButtonClick}
        title="First page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        disabled={page === 1 ? true : false}
        onClick={handleBackButtonClick}
        title="Previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton onClick={handleNextButtonClick} title="Next Page">
        <KeyboardArrowRight />
      </IconButton>
    </>
  );
}

export default TablePaginationActions;
