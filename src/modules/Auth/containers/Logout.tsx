import React from "react";
import { FlexDiv } from "../../../style/styled";
import { RoutesPath } from "../../../config/routes.config";

function Logout({ history }) {
  React.useEffect(() => {
    console.log("runnning");
    window.location.reload();
    // localStorage.clear();
    // sessionStorage.clear();
    // history.replace(RoutesPath.NewLoginPage);
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
