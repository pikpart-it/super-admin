import React, { Suspense } from "react";
import { Redirect } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import { RoutesPath } from "./config/routes.config";
import { FlexDiv, PortalDiv } from "./style/styled";
import { isAuthenticated } from "./utility/func";
import Footer from "./components/Footer";
import { constants } from "./config/constants";
import { CircularProgress } from "@mui/material";

const { header } = constants;

const Layout: any = (props: any) => {
  const { route, routesConfig, menuOpen, setMenuOpen } = props;
  const [minHeight, setMinHeight] = React.useState(250);

  React.useEffect(() => {
    function elheight(el: string) {
      return document.getElementById(el)?.offsetHeight || 0;
    }
    window.addEventListener("resize", () => {
      let headerNFooterHeight = elheight("footer") + elheight("header");
      setMinHeight(headerNFooterHeight);
    });
  }, []);

  const RouteComponent: any = route.component;
  if ((route.authenticated && isAuthenticated()) || !route.authenticated) {
    let headerHeight = route?.layout?.includes("header") ? header.height : 0;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateRows: `${header.height}px auto`,
          height: "100%",
        }}
      >
        {/* {props.location.pathname === RoutesPath.NewMobilefranchise ||
        props.location.pathname === RoutesPath.RegisterForm ? null : (
          <> */}
        {route?.layout?.includes("header") && (
          <Header
            menuOpen={menuOpen}
            routesConfig={routesConfig}
            setMenuOpen={() => setMenuOpen()}
            {...props}
          />
        )}
        {/* </>
        )} */}
        <FlexDiv
          style={{
            overflow: "hidden",
            position: "relative",
            height: `calc(100vh - ${headerHeight}px)`,
          }}
        >
          {route?.layout?.includes("sidebar") && (
            <SideBar
              routes={routesConfig}
              menuOpen={menuOpen}
              setMenuOpen={() => setMenuOpen()}
              paramsData={[]}
            />
          )}
          <PortalDiv
            id="routeLayout"
            hasSidebar={route?.layout?.includes("sidebar")}
            menuOpen={menuOpen}
            sidebar={route?.layout?.includes("sidebar")}
          >
            <Suspense
              fallback={
                <CircularProgress
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
              }
            >
              <div
                style={{
                  minHeight: `calc(100vh - ${minHeight}px)`,
                  // background: isAuthenticated() ? `url(${bg})` : `url(${bg})`,
                  backgroundSize: "150px 150px",
                }}
              >
                {RouteComponent && (
                  <RouteComponent
                    routePath={route.path}
                    routesConfig={routesConfig}
                    {...props}
                  />
                )}
              </div>
            </Suspense>
            {route?.layout?.includes("footer") && (
              <Footer menuOpen={menuOpen} {...props} />
            )}
          </PortalDiv>
        </FlexDiv>
      </div>
    );
  } else if (
    route.authenticated &&
    !isAuthenticated()
    // window.location.pathname !== RoutesPath.Login
  ) {
    return <Redirect to="/login" />;
  } else {
    return <div>404</div>;
  }
};

export default Layout;
