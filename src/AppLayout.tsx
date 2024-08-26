import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { routesConfig } from "./config/routes.config";
import ErrorPages from "./ErrorPages";
import Layout from "./Layout";
import { userRole } from "./utility/func";
import { config } from "./config/config";
import { getAuthorized } from "./services";
import { userRoles } from "./config/constants/userRoles";

const pages = [
  "SuperAdminCreateRoleMaster",
  "SuperAdminRoleMasterList",
  "SuperAdminAppRoleMasterSetup",
  "SuperAdminAppRoleMasterSetupList",
  "SuperAdminAppMasterList",
  "SuperAdminCreateAppMaster",
];

function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);
  const [usableRoutes, setUsableRoutes] = useState<any>(routesConfig);

  const getRoles = async () => {
    let url = `${config.baseUrl}/admin/getAllowedPages`;

    try {
      const { data } = await getAuthorized(url);

      setRoles(data?.data);
    } catch (error) {}
  };
  const setPageAccess = (pagekey, newAccessRole) => {
    let modified: any[] = [];
    for (let i = 0; i < routesConfig?.length; i++) {
      let route = routesConfig[i];
      if (route?.authenticated && route?.component && !route?.children) {
        if (route?.key === pagekey) {
          route.userAllowed.push(newAccessRole);
        }
      } else if (route?.authenticated && !route?.component && route?.children) {
        for (let j = 0; j < route?.children?.length; j++) {
          let childRoute = route?.children[j];
          if (childRoute?.key === pagekey) {
            route.userAllowed.push(newAccessRole);

            childRoute?.userAllowed?.push(newAccessRole);
          }
        }
      }
      modified.push(route);
    }

    setUsableRoutes(modified);
  };

  const allRoutes: any[] = [];
  iterateRouteConfig(usableRoutes);
  function iterateRouteConfig(routes: any) {
    routes.map((route: any) => {
      if (route.children) {
        iterateRouteConfig(route.children);
      } else {
        allRoutes.push({
          path: route.path,
          icon: route.icon,
          component: route.component,
          // label: route?.label,
          exact: route.exact,
          key: route.key,
          layout: route.layout,
          pageId: route.pageId,
          authenticated: route.authenticated,
          userAllowed: route.userAllowed,
        });
      }
      return false;
    });
  }

  let userRoleName = userRole();

  let routes = allRoutes.filter(
    (item: any) =>
      item.userAllowed?.includes(userRoleName) || !item.authenticated
  );

  useEffect(() => {
    console.log("runninnnnngg");
    pages?.map((i) => {
      setPageAccess(i, userRoles.SuperAdmin);
    });
  }, [pages]);

  useEffect(() => {
    getRoles();
  }, []);
  return (
    <Switch>
      {routes?.map((route: any, i: number) => (
        <Route
          key={route?.key}
          render={(props: any) => (
            <Layout
              route={route}
              menuOpen={menuOpen}
              setMenuOpen={() => setMenuOpen(!menuOpen)}
              routesConfig={routesConfig}
              {...props}
            />
          )}
          path={route.path}
          exact={route.exact}
        />
      ))}
      <Route exact path="/" component={ErrorPages} />
    </Switch>
  );
}

export default withRouter(AppLayout);
