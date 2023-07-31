import DashboardLayout from "../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../examples/Navbars/DashboardNavbar";
import { MaterialUIControllerProvider } from "../../utils/context";
import Dashboard from "../Dashboard";
import Items from "../Items";
import Icecream from "../Icecream";
import Sidenav from '../components/Sidenav';
import routes from "../../utils/routes";
import React, { useState } from 'react';


export default function Layout({ children }) {

	const [activePage, setActivePage] = useState('/dashboard'); // Set the default active page

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <>
    <MaterialUIControllerProvider>
      <DashboardLayout>
      <DashboardNavbar />
      <Sidenav
          routes={routes}
          brandName="Elios IceCream"
          activePage={activePage}
        />
      <main>{children}</main>
      </DashboardLayout>
      </MaterialUIControllerProvider>
    </>
  )
}
