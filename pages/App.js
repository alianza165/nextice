import React, { useState } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Sidenav from './components/Sidenav';
import routes from "./components/routes";
import Dashboard from "./Dashboard";
import Items from "./Items";
import Icecream from "./Icecream";

import theme from "./assets/theme";

// Material Dashboard 2 React Dark Mode themes

function App() {


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
      <Dashboard />

      </div>
    </ThemeProvider>
  );
}

export default withAuthenticator(App);
