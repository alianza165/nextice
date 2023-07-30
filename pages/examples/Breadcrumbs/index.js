import React from 'react';
import Link from 'next/link';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

const Breadcrumbs = ({ items }) => {
  return (
    <MuiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {items.map((item, index) => (
          <Typography variant="body1" color="text.primary">
            <HomeIcon /> <span>/</span> {item.label}
          </Typography>
      ))}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
