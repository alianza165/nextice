import React, { useState, useEffect } from "react";
import API from '../utils/API';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Input, Box, Typography, Badge, Modal } from '@mui/material';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MDBox from "./components/MDBox";
import MDTypography from "./components/MDTypography";
import MDBadge from "./components/MDBadge";
import Transactions from "./Transactions";
import SkeletonLoader3 from "./components/SkeletonLoaders3";

function Items() {

  const [units, setUnits] = useState([]);
  const [unitsDictionary, setUnitsDictionary] = useState({});
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [openUnit, setOpenUnit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [itemLocation, setItemLocation] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [unit, setUnit] = useState('');
  const [unitName, setUnitName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    refreshItems();
  }, []);

  const refreshItems = () => {
    API.get("/item/")
      .then((res) => {
        const sortedItems = res.data.sort((a, b) => a.id - b.id);
        setItems(sortedItems);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
    API.get("/measuring_unit/")
      .then((res) => {
        setUnits(res.data);
        const unitsDict = {};
        res.data.forEach(unit => {
          unitsDict[unit.id] = unit.measuring_unit;
        });
        setUnitsDictionary(unitsDict);
      })
      .catch(console.error);
  };


  const handleOpen = (item) => {
    setSelectedItem(item);
    setQuantity(item.quantity);
    setOpen(true);
  };

  const handleOpenUnit = (item) => {
    setSelectedItem(item);
    setUnitName(item.measuring_unit.measuring_unit);
    setOpenUnit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseUnit = () => {
    setOpenUnit(false);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleUnitChange = (event, value) => {
    const unitId =  value.id;
    setUnit(unitId)
};

  const handleFormSubmitUnit = (event) => {
    event.preventDefault();
    const updatedItem = { ...selectedItem, measuring_unit: unit, item_location: selectedItem.item_location.id };

    API.put(`/item/${selectedItem.id}/`, updatedItem)
      .then(() => {
        console.log('Item updated successfully');
        refreshItems();
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      })
      .finally(() => {
        setOpenUnit(false);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedItem = { ...selectedItem, quantity: quantity, measuring_unit: selectedItem.measuring_unit.id, item_location: selectedItem.item_location.id};

    API.put(`/item/${selectedItem.id}/`, updatedItem)
      .then(() => {
        console.log('Item updated successfully');
        refreshItems();
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      })
      .finally(() => {
        setOpen(false);
      });
  };

  const columns = [
    {
      field: 'status',
      headerName: (
        <MDTypography variant="caption" fontWeight="bold" ml={1} lineHeight={1}>
          STATUS
        </MDTypography>
      ),
      width: 80,
      cellClassName: 'table-cell',
      renderCell: (params) => (
        params.row.running_low ? (
          <MDBox>
            <MDBadge badgeContent="" color="error" variant="gradient" size="sm" />
          </MDBox>
        ) : (
          <MDBox>
            <MDBadge badgeContent="" color="success" variant="gradient" size="sm" />
          </MDBox>
        )
      ),
    },
    {
      field: 'item_location',
      cellClassName: 'table-cell',
      headerName: (
        <MDTypography variant="caption" fontWeight="bold" ml={1} lineHeight={1}>
          LOCATION
        </MDTypography>
      ),
      width: 120,
      renderCell: (params) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDTypography variant="body2" fontWeight="medium" ml={1} lineHeight={1}>
            {params.row.item_location.item_location}
          </MDTypography>
        </MDBox>
      ),
    },
    {
      field: 'item',
      cellClassName: 'table-cell',
      headerName: (
        <MDTypography variant="caption" fontWeight="bold" ml={1} lineHeight={1}>
          ITEM
        </MDTypography>
      ),
      width: 250,
      renderCell: (params) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDTypography variant="body2" fontWeight="medium" ml={1} lineHeight={1}>
            {params.row.item}
          </MDTypography>
        </MDBox>
      ),
    },
    {
      field: 'product_type',
      cellClassName: 'table-cell',
      headerName: (
        <MDTypography variant="caption" fontWeight="bold" ml={1} lineHeight={1}>
          PRODUCT TYPE
        </MDTypography>
      ),
      width: 220,
      renderCell: (params) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDTypography variant="button" fontWeight="Regular" ml={1} lineHeight={1}>
            {params.row.product_type}
          </MDTypography>
        </MDBox>
      ),
    },
    {
      field: 'action',
      headerName: (
        <MDTypography variant="caption" fontWeight="bold" ml={1} lineHeight={1}>
          QUANTITY
        </MDTypography>
      ),
      width: 120,
      cellClassName: 'table-cell',
      renderCell: (params) => (
        <Button onClick={() => handleOpen(params.row)} color="primary">
          {params.row.quantity}
        </Button>
      ),
    },
    {
      field: 'measuring_unit',
      cellClassName: 'table-cell',
      headerName: (
        <MDTypography variant="caption" fontWeight="bold" ml={1} lineHeight={1}>
          MEASURING UNIT
        </MDTypography>
      ),
      width: 180,
      renderCell: (params) => (
        <Button onClick={() => handleOpenUnit(params.row)} color="primary">
          {params.row.measuring_unit.measuring_unit}
        </Button>
      ),
    },
    {
      field: 'company',
      cellClassName: 'table-cell',
      headerName: (
        <MDTypography variant="caption" fontWeight="bold" ml={1} lineHeight={1}>
          COMPANY
        </MDTypography>
      ),
      width: 180,
      renderCell: (params) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDTypography variant="button" fontWeight="Regular" ml={1} lineHeight={1}>
            {params.row.company}
          </MDTypography>
        </MDBox>
      ),
    },
  ];

  const getUniqueCategories = () => {
    const categories = items.map((item) => item.category);
    const uniqueCategories = [...new Set(categories)];

    // Sort the unique categories alphabetically
    return uniqueCategories.sort();
  };

  const getUniqueItemLocations = () => {
    const item_locations = items.map((item) => item.item_location.item_location);
    return [...new Set(item_locations)];
  };

  const filteredItems =
  (selectedCategory === 'All' || !selectedCategory) &&
  (itemLocation === 'All' || !itemLocation)
    ? items.filter((item) =>
        item.item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items.filter(
        (item) =>
          (selectedCategory === 'All' || !selectedCategory || item.category === selectedCategory) &&
          (itemLocation === 'All' || !itemLocation ||
            item.item_location.item_location === itemLocation) &&
          item.item.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const uniqueCategories = getUniqueCategories();

  const uniqueItemLocations = getUniqueItemLocations();

  const handleTabChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleLocationChange = (event, newValue) => {
    setItemLocation(newValue);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleModalOpen = () => {
    <Transactions />
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
    <Button onClick={() => handleModalOpen()}>View Transactions</Button>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                <MDTypography variant="h6" color="white">
                  Items
                </MDTypography>
              </MDBox>
              <Grid container>
                <Grid item xs={12} md={3}>
                  <MDBox pt={2} px={3}>
                    <Autocomplete
                      disablePortal
                      id="item-location-combo-box"
                      options={uniqueItemLocations}
                      onChange={handleLocationChange} // Handle location change
                      sx={{ width: 200 }}
                      renderInput={(params) => <TextField {...params} label="Item Location" />}
                    />
                  </MDBox>
                  <MDBox pt={2} px={3}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={uniqueCategories}
                      onChange={handleTabChange}
                      sx={{ width: 200 }}
                      renderInput={(params) => <TextField {...params} label="Items" />}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDBox pt={3} px={3}>
                    <TextField id="search" label="Search" value={searchQuery} onChange={handleInputChange} />
                  </MDBox>
                </Grid>
              </Grid>
              <MDBox pt={2} px={3}>
              {isLoading ? (
                <SkeletonLoader3 />
                ) : (
                  <DataGrid density="compact" rows={filteredItems} columns={columns} components={{ Toolbar: GridToolbar }} />
              )}
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </MDBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <label>
              Quantity:
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <Input placeholder="Quantity" type="number" value={quantity} onChange={handleQuantityChange} />
              </Box>
            </label>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={openUnit} onClose={handleCloseUnit}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmitUnit}>
            <label>
              Measuring Unit:
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <Autocomplete
                  options={units}
                  getOptionLabel={(option) => option.measuring_unit}
                  renderInput={(params) => (
                    <TextField {...params} label="Unit" placeholder="Select a unit" />
                  )}
                  sx={{ width: 200 }}
                  onChange={handleUnitChange}
                />
              </Box>
            </label>
            <DialogActions>
              <Button onClick={handleCloseUnit}>Cancel</Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="running-low-items-title"
        aria-describedby="running-low-items-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%", // Set the width to 100% initially
            maxWidth: "1000px", // Set a maximum width for the modal
            height: "80%", // Fixed height
            overflowX: "scroll", // Make it horizontally scrollable
            overflowY: "scroll",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Transactions object='items' />
        </Box>
      </Modal>
      </div>
  );
}

export default Items;
