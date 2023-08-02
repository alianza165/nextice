import { useState, useEffect } from "react";
import API from '../utils/API';
import { useTable } from 'react-table';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Input, Box, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';
import { MaterialUIControllerProvider } from "../utils/context";
import MDBox from "./components/MDBox";
import MDTypography from "./components/MDTypography";
import MDBadge from "./components/MDBadge";
import Autocomplete from '@mui/material/Autocomplete';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const VISIBLE_FIELDS = [];


function Icecream() {
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [frozenGoodTypes, setFrozenGoodTypes] = useState([]);
  setFrozenGoodTypes

items
  // Create columns dynamically based on freezer numbers
   useEffect(() => {
    refreshItems();
  }, [searchQuery, selectedType]);


  const refreshItems = () => {
  setIsLoading(true);
  API.get("/frozengood/")
    .then((res) => {
      const sortedItems = res.data.sort((a, b) => a.id - b.id);
      setItems(sortedItems);

      const filteredItems = 
      selectedType === 'All' || !selectedType
      ? sortedItems.filter((item) => item.frozengood.toLowerCase().includes(searchQuery.toLowerCase()))
      : sortedItems.filter(
        (item) =>
          item.frozengood_type === selectedType && item.frozengood.toLowerCase().includes(searchQuery.toLowerCase())
        );


      const freezerNumbers = Array.from(new Set(filteredItems.map(item => item.freezer_number))).sort();
      const dynamicColumns = [
        {
          field: 'totalQuantity',
          headerName: (
      <MDTypography variant="caption" fontWeight="bold" ml={1} lineHeight={1}>
        TOTAL QUANTITY
      </MDTypography>
    ),
          width: 150,
          cellClassName: 'table-cell',
          renderCell: (params) => {
      const total = freezerNumbers.reduce((sum, freezerNumber) => {
        const quantity = params.row[`freezer_${freezerNumber}`] || 0;
        return sum + quantity;
      }, 0);
      return (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDTypography variant="body2" fontWeight="medium" ml={1} lineHeight={1}>
            {total}
          </MDTypography>
        </MDBox>
      );
    },
        },
          { 
            field: 'frozengood', 
            cellClassName: 'table-cell', 
            headerName: (
      <MDTypography variant="caption" fontWeight="bold" ml={1} lineHeight={1}>
        ICECREAM
      </MDTypography>
    ), 
            width: 310,
            renderCell: (params) => {
      return (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="body2" fontWeight="medium" ml={1} lineHeight={1}>
        {params.row.frozengood}
      </MDTypography>
    </MDBox>
      );
    }, 
          },
          ...freezerNumbers.map(freezerNumber => ({
            field: `freezer_${freezerNumber}`,
            headerName: (
      <MDTypography variant="caption" fontWeight="bold" ml={1} lineHeight={1}>
        FREEZER {freezerNumber}
      </MDTypography>
    ),
            width: 120,
            cellClassName: 'table-cell',
            renderCell: (params) => {
      return (
        <Button onClick={() => handleOpen(params.row, freezerNumber)}>
          {params.row[`freezer_${freezerNumber}`]}
        </Button>
      );
    },
          })),
      ];
        setColumns(dynamicColumns);

        const iceCreamMap = new Map();
        filteredItems.forEach(item => {
          if (iceCreamMap.has(item.frozengood)) {
            iceCreamMap.get(item.frozengood)[`freezer_${item.freezer_number}`] = item.quantity;
            iceCreamMap.get(item.frozengood)[`id_${item.freezer_number}`] = item.id;
          } else {
            const row = { id: item.frozengood, frozengood: item.frozengood };
            row[`freezer_${item.freezer_number}`] = item.quantity;
            row[`id_${item.freezer_number}`] = item.id;
            row.totalQuantity = item.quantity;
            iceCreamMap.set(item.frozengood, row);
          }
        });
        const dynamicRows = Array.from(iceCreamMap.values());
      setRows(dynamicRows);
      const uniqueTypes = Array.from(new Set(sortedItems.map(item => item.frozengood_type)));
        setFrozenGoodTypes(uniqueTypes);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };


  const handleOpen = (item, number) => {
    console.log(item[`id_${number}`])
    setSelectedItem(item[`id_${number}`]);
    setQuantity(item[`freezer_${number}`]); // Set initial quantity in the form
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedItem = { ...selectedItem, quantity: quantity };

    // Make API PUT request to update the item
    API.put(`/frozengood/${selectedItem}/`, updatedItem)
      .then(() => {
        console.log('Item updated successfully');
        refreshItems();
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      })
      .finally(() => {
        setOpen(false); // Close the dialog after submitting the form
      });
  };

  const handleInputChange = (event) => {
  const searchQuery = event.target.value;
  setSearchQuery(searchQuery);

  const filteredItems = items.filter(item =>
    item.frozengood.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const iceCreamMap = new Map();
  filteredItems.forEach(item => {
    if (iceCreamMap.has(item.frozengood)) {
      iceCreamMap.get(item.frozengood)[`freezer_${item.freezer_number}`] = item.quantity;
      iceCreamMap.get(item.frozengood)[`id_${item.freezer_number}`] = item.id;
    } else {
      const row = { id: item.frozengood, frozengood: item.frozengood };
      row[`freezer_${item.freezer_number}`] = item.quantity;
      row[`id_${item.freezer_number}`] = item.id;
      row.totalQuantity = item.quantity;
      iceCreamMap.set(item.frozengood, row);
    }
  });
  const dynamicRows = Array.from(iceCreamMap.values());
  setRows(dynamicRows);
};

const handleTabChange = (event, newValue) => {
    setSelectedType(newValue);
  };

  return (
      <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                IceCream
              </MDTypography>
            </MDBox>
            <MDBox pt={2} px={3}>
              <Tabs
                value={selectedType}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab label="All" value="All" />
                {frozenGoodTypes.map(type => (
                  <Tab key={type} label={type} value={type} />
                ))}
              </Tabs>
            </MDBox>
            <MDBox pt={2} px={3}>
              <TextField
                id="search"
                label="Search"
                value={searchQuery}
                onChange={handleInputChange}
              />
            </MDBox>
            <MDBox pt={3} px={3} height={600}>
              <DataGrid density="compact" columns={columns} rows={rows} disableSelectionOnClick components={{ Toolbar: GridToolbar }} />
              <Dialog open={open} onClose={handleClose}>
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
                        <Input
                          placeholder="Quantity"
                          type="number"
                          value={quantity}
                          onChange={handleQuantityChange}
                        />
                      </Box>
                    </label>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Close
                      </Button>
                      <Button type="submit" color="primary">
                        Save
                      </Button>
                    </DialogActions>
                  </form>
                </DialogContent>
              </Dialog>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Icecream;

