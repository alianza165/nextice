// Material Dashboard 2 React layouts
import Dashboard from "../pages/Dashboard";
import Icecream from "../pages/Icecream";
import Items from "../pages/Items";

// @mui icons
import Icon from "@mui/material/Icon";




const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Dashboard",
    component: <Dashboard />,
  },  
  {
    type: "collapse",
    name: "Items",
    key: "items",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Items",
    component: <Items />,
  },  
  {
    type: "collapse",
    name: "Ice Cream",
    key: "icecream",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Icecream",
    component: <Icecream />,
  },  
];

export default routes;
