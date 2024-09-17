import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/images/Final-Logo-white-pikpaprt.png";
import { RoutesPath } from "../config/routes.config";
import { AppIcon, DarkButton, FlexDiv, HeaderDiv } from "../style/styled";
import { Span, UserMenuLink, UserProfileMenu } from "./styled";
import { Logout } from "../modules/Auth/service";
const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  color: rgb(24, 144, 255);
`;

function Header(props: any) {
  const [menuToggle, setMenuToggle] = React.useState(false);
  const storage = localStorage.getItem("AuthToken");
  const user = JSON.parse(
    localStorage.getItem("user") || '{"firstName": "Guest"}'
  );
  const isLoggedin = storage && storage;

  // const dashboardLink = RoutesPath.AdminDashboard;
  const LoggedInMenu = () => {
    return (
      <UserMenuLink>
        <Span
          onClick={(e: any) => {
            e.preventDefault();
            setMenuToggle(!menuToggle);
          }}
        >
          <AccountCircleIcon style={{ color: "white", marginRight: 10 }} />
          <FlexDiv
            style={{
              maxWidth: 100,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <p style={{ color: "#fff", fontSize: "12px" }}>
              Hi {user.firstName || user?.businessName || user.name || "Guest"}
            </p>
          </FlexDiv>
        </Span>
        {menuToggle ? (
          <UserProfileMenu>
            {/* <StyledLink to={dashboardLink}>Dashboard</StyledLink>

            <StyledLink to={RoutesPath.PrivacyPolicy}>Policies</StyledLink> */}
            <StyledLink onClick={Logout}>Log Out</StyledLink>
          </UserProfileMenu>
        ) : null}
      </UserMenuLink>
    );
  };

  return (
    <HeaderDiv
      justifyContentSpaceBetween
      id="header"
      style={{ height: "50px", width: "100%" }}
    >
      <FlexDiv alignItemsCenter>
        <Link to="/" style={{ paddingLeft: "0px", textDecoration: "none" }}>
          <AppIcon src={Logo} alt="logo" width={120} height={60} />
        </Link>
      </FlexDiv>

      <FlexDiv alignItemsCenter>
        <FlexDiv style={{ marginRight: "10px" }} className="headerLink">
          <DarkButton
            style={{ border: "0", fontSize: "15px" }}
            onClick={() => props?.history?.push("/")}
            title={"Home"}
          >
            Home
          </DarkButton>

          {isLoggedin && (
            <DarkButton
              style={{ border: "0", fontSize: "15px" }}
              onClick={() => props?.history?.push(RoutesPath.NewPmDashboard)}
              title={"Dashboard"}
            >
              Dashboard
            </DarkButton>
          )}
        </FlexDiv>
        {isLoggedin ? (
          <LoggedInMenu />
        ) : (
          <DarkButton
            onClick={() => props?.history?.push(RoutesPath.NewLoginPage)}
            title={"Login"}
          >
            LOG IN
          </DarkButton>
        )}
      </FlexDiv>
    </HeaderDiv>
  );
}
export default Header;
