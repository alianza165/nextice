import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Icecream from './Icecream';
import Items from './Items';
import Dashboard from './Dashboard';
import Sidebar from './components/Sidebar';

import { withAuthenticator, Button } from "@aws-amplify/ui-react";
import Auth from '@aws-amplify/auth';

function Main(props) {
  const [activePage, setActivePage] = useState('icecream');

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex' }}>
      <Sidebar activePage={activePage} onPageChange={handlePageChange} />
      <div style={{ overflow: 'auto' }}>
        {activePage === 'icecream' && <Icecream />}
        {activePage === 'items' && <Items />}
        {activePage === 'dashboard' && <Dashboard />}
      </div>
    </Box>
  );
}

export default withAuthenticator(Main);
