import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',  // Center horizontally
        alignItems: 'center',      // Center vertically
        height: '100vh',           // Make it cover the full viewport height
      }}
    >
      <CircularProgress size={80}/>
    </Box>
  );
}

export default Loader;