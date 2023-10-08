import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Sidenav from './components/Sidenav';
import Dashboard from "./Dashboard";
import Items from "./Items";
import Icecream from "./Icecream";
import Loader from './components/Loader';
import theme from "../assets/theme";

// Material Dashboard 2 React Dark Mode themes

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (you can replace this with your actual data loading logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay as needed
  }, []);

  return (
    <div>
    {isLoading ? (
        // Display a loader while loading
        <Loader />
      ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <div>
      <Dashboard />

      </div>
      
    </ThemeProvider>
    )}
      </div>
  );
}

export default withAuthenticator(App);
