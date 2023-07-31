/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

// react-router-dom components
import { useRouter } from 'next/router'
import Linker from 'next/link';

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Material Dashboard 2 React example components
import SidenavCollapse from "./SidenavCollapse";

import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import IcecreamIcon from '@mui/icons-material/Icecream';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloseIcon from '@mui/icons-material/Close';

// Custom styles for the Sidenav
import SidenavRoot from "./SidenavRoot";
import sidenavLogoLabel from "./styles/sidenav";
import Auth from '@aws-amplify/auth';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "../../utils/context";

function Sidenav({ signOut, color, brand, brandName, routes, activePage, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useRouter();
  const collapseName = location.pathname.replace("/", "");

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, href, route }) => {
  let returnValue;

  if (type === "collapse") {
    returnValue = href ? (
      <a
        href={href}
        key={key}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none" }} // In case you need to apply custom styles
      >
        <SidenavCollapse
          name={name}
          icon={icon}
          active={key === collapseName}
          noCollapse={noCollapse}
        />
      </a>
    ) : (
    <h1>
      <li>
        <Linker href="/Dashboard">{name}</Linker>
      </li>
      </h1>
    );
  } else if (type === "title") {
    returnValue = (
      <Typography
        key={key}
        color={textColor}
        display="block"
        variant="caption"
        fontWeight="bold"
        textTransform="uppercase"
        pl={3}
        mt={2}
        mb={1}
        ml={1}
      >
        {title}
      </Typography>
    );
  } else if (type === "divider") {
    returnValue = (
      <Divider
        key={key}
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
    );
  }

  return returnValue;
});


  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <Box pt={3} pb={1} px={4} textAlign="center">
        <Box
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <Typography variant="h6" color="secondary">
            <CloseIcon />
          </Typography>
        </Box>
        <Box component={Link} to="/" display="flex" alignItems="center">
          {brand && <Box component="img" src={brand} alt="Brand" width="2rem" />}
          <Box
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <Typography component="h6" variant="button" fontWeight="medium">
              <p class="text-white text-xs">
              <AcUnitIcon fontSize="medium"/>
              <span> </span>
              {brandName}
              </p>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <p></p>
      <Typography
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
      <ul>
      <li className="pb-3">
        <Linker href="/Dashboard">
          <Button variation="link">
            <DashboardIcon fontSize="medium"/>
            <p class="px-2">Dashboard</p>
          </Button>
        </Linker>
        </li>
        <li className="pb-3">
        <Linker href="/Items">
          <Button variation="link">
            <CategoryIcon fontSize="medium"/>
            <p class="px-2">Items</p>
          </Button>
        </Linker>
        </li>
        <li className="pb-3">
        <Linker href="/Icecream" >
          <Button variation="link">
            <IcecreamIcon fontSize="medium"/>
            <p class="px-2">Icecream</p>
          </Button>
        </Linker>
        </li>
      <li class="pt-6 px-4"><Button onClick={signOut} style={{color: 'white', fontSize: 12}}>Sign Out</Button></li>
      </ul>
        </Typography>
      <Box p={2} mt="auto">
      </Box>
    </SidenavRoot>
  );
}


export default withAuthenticator(Sidenav);
