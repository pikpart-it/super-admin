import { Button } from "@mui/material";
import { useRef } from "react";
import { FaUpload } from "react-icons/fa";

const FileUploadButton = ({
  onChange,
  value,
  name,
  buttonName,
}: {
  onChange: (target) => void;
  value: any;
  name: string;
  buttonName: string;
}) => {
  const InputRef: any = useRef();

  const openFileSelect = () => {
    InputRef?.current?.click();
  };

  return (
    <>
      <Button
        onClick={openFileSelect}
        variant="contained"
        style={{ width: "fit-content" }}
        startIcon={<FaUpload />}
      >
        {buttonName}
      </Button>
      <input
        type="file"
        name={name}
        value={value?.filename}
        ref={InputRef}
        style={{ display: "none" }}
        onChange={({ target }) => onChange(target)}
      />
    </>
  );
};

export default FileUploadButton;
