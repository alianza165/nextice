import React from 'react';
import { MaterialUIControllerProvider } from "../utils/context";
import { withAuthenticator } from "@aws-amplify/ui-react";
import App from './App';

function Main(props) {
  return (
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  );
}

export default withAuthenticator(Main);
