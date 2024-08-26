import React from "react";
import { matchPath, withRouter } from "react-router-dom";
import {
  Anchor,
  MenuLevel,
  SideBarDiv,
  SideBarDivTransparent,
} from "../style/styled";
import { isDistributorOrCenter, userRole } from "../utility/func";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const matchPaths = (link: string, path: string) => {
  return matchPath(path, {
    path: link,
    exact: true,
    strict: true,
  });
};

function findActiveRouteusingLoc(routeGroup: any, path: string) {
  var x: any = undefined;
  routeGroup.forEach((route: any) => {
    if (matchPaths(route.link, path)) {
      x = route.bLabel;
    } else if (route.children && route.children.length) {
      const y = findActiveRouteusingLoc(route.children, path);
      x = y || x;
    }
  });
  if (x) {
    return x;
  }
}

function SideBar(props: any) {
  let { routes, menuOpen, history, location, setMenuOpen } = props;
  const [activeMenuItem, setActiveMenuItem] = React.useState(() => {
    return findActiveRouteusingLoc(routes, location.pathname) || " ";
  });

  function links(link: string) {
    if (link && !matchPaths(link, location.pathname)) {
      history.push(link);
    }
  }

  const menuLevel = (group: any, level: number) =>
    group.map((item: any, i: number) => {
      const Icon = item.icon;
      const linkClass = matchPaths(item.link, location.pathname)
        ? "active-child"
        : "";
      const activeParentLink = location.pathname.includes(item.link)
        ? "active"
        : "";
      const activeSubMenu =
        activeMenuItem === item.bLabel || location.pathname.includes(item.link)
          ? "active-sub-menu"
          : "";
      const isAnyChildActive = {
        marginRight: "-140px",
        paddingLeft: 25,
      };
      const settings = item.label === "Settings" ? { marginTop: "auto" } : {};
      let userRoleName = userRole();
      const showMenu =
        item.label !== "" &&
        (item.userAllowed?.includes(userRoleName) || !item.authenticated);
      return showMenu ? (
        <React.Fragment key={i}>
          <MenuLevel
            style={settings}
            className={activeMenuItem === item.bLabel ? "hover" : ""}
          >
            <Anchor
              className={item.children ? activeParentLink : linkClass}
              href={item.children ? "" : item.link}
              menuOpen={menuOpen}
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                links(!item.children && item.link);
                setActiveMenuItem(
                  activeMenuItem === item.bLabel ? "" : item.bLabel
                );
              }}
            >
              {Icon && <Icon className="icon" width="22px" height="22px" />}

              <span key={i}>{item.label}</span>
              {item.children && <KeyboardArrowDownIcon className="chevron" />}
            </Anchor>
            {item.children && (
              <div className={activeSubMenu} style={isAnyChildActive}>
                {menuLevel(item.children, level + 1)}
              </div>
            )}
          </MenuLevel>
        </React.Fragment>
      ) : null;
    });

  return (
    <>
      <SideBarDiv column menuOpen={menuOpen}>
        {menuLevel(routes, 1)}
      </SideBarDiv>
      <SideBarDivTransparent menuOpen={menuOpen} onClick={setMenuOpen} />
    </>
  );
}

export default withRouter(SideBar);
