import React from "react";
import { FlexDiv } from "../../../style/styled";

function Logout() {
  React.useEffect(() => {
    localStorage.clear();
    window.location.href = "/";
  }, []);
  return (
    <FlexDiv
      alignItemsCenter
      justifyContentCenter
      width="100%"
      style={{ height: "100vh" }}
    >
      <h3>You have been logged out successfully.</h3>
    </FlexDiv>
  );
}

export default Logout;
