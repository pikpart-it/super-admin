import { userRoles } from "../config/constants/userRoles";
import { RoutesPath } from "../config/routes.config";
import { NewLoginPage } from "../modules/Auth";
import Dashboard from "../modules/Dashboard";
import NewPmDashboard from "../modules/ProductManufacturer/NewPmDashboard/NewPmDashboard";

export const getDashboardRoute = (userRole: any, type: any) => {
  switch (userRole) {
    case userRoles.ProductManufacturer:
      return RoutesPath.Dashboard;
    case userRoles.MasterSeller:
      return RoutesPath.NewLoginPage;
    default:
      return RoutesPath.NewLoginPage;
  }
};

export const returnLandingPage = (role: any) => {
  switch (role) {
    case userRoles.ProductManufacturer:
      return NewPmDashboard;
    case userRoles.MasterSeller:
      return NewPmDashboard;
    case userRoles.SuperAdmin:
      return NewPmDashboard;

    default:
      return NewLoginPage;
  }
};
