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
 
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import {
  Box,
  Button,
  Modal,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

// Material Dashboard 2 React example components
import ComplexStatisticsCard from "./examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DashboardLayout from "./examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "./examples/Navbars/DashboardNavbar";
import { MaterialUIControllerProvider } from "../utils/context";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';





// Data

// Dashboard components
import API from '../utils/API';
import Projects from "./Projects";
import OrdersOverview from "./OrdersOverview";
import { useState, useEffect } from "react";



function Dashboard() {

  const [totalItems, setTotalItems] = useState(0);
  const [runningLowItemsCount, setRunningLowItemsCount] = useState(0);
  const [totalIceCreams, setTotalIceCreams] = useState(0);
  const [totalIceCreamNames, setTotalIceCreamNames] = useState(0);
  const uniqueIcecreamNames = new Set();

  const [webstaurantRunningLowCount, setWebstaurantRunningLowCount] = useState(0);
  const [bjsRunningLowCount, setBjsRunningLowCount] = useState(0);
  const [primizieRunningLowCount, setPrimizieRunningLowCount] = useState(0);
  const [amazonRunningLowCount, setAmazonRunningLowCount] = useState(0);
  const [coinsRunningLowCount, setCoinsRunningLowCount] = useState(0);
  const [fruitsRunningLowCount, setFruitsRunningLowCount] = useState(0);
  const [cupsRunningLowCount, setCupsRunningLowCount] = useState(0);
  const [icecreamsRunningLowCount, setIcecreamsRunningLowCount] = useState(0);

  const [items, setItems] = useState([]);
  const [icecreams, setIcecreams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItems, setModalItems] = useState([]);

  const [runningLowWebstaurantItems, setRunningLowWebstaurantItems] = useState([]);
  const [runningLowBjsItems, setRunningLowBjsItems] = useState([]);
  const [runningLowPrimizieItems, setRunningLowPrimizieItems] = useState([]);
  const [runningLowAmazonItems, setRunningLowAmazonItems] = useState([]);
  const [runningLowCups, setRunningLowCups] = useState([]);
  const [runningLowCoins, setRunningLowCoins] = useState([]);
  const [runningLowFruits, setRunningLowFruits] = useState([]);
  const [runningLowIcecreams, setRunningLowIcecreams] = useState([]);
  


  useEffect(() => {
    handleFetchItems();
    fetchIcecreams();
  }, []);

  const handleFetchItems = () => {
  API.get("/item/")
    .then((res) => {
      const fetchedItems = res.data;
      fetchItems(fetchedItems); // Pass the fetched items to the fetchItems function
      setItems(fetchedItems); // Update the items state
    })
    .catch((error) => {
      console.error("Error fetching items:", error);
    });
};

  const fetchIcecreams = () => {
    API.get("/frozengood/")
      .then((res) => {
      const fetchedIcecreams = res.data;
      fetchIcecreamsRunningLow(fetchedIcecreams);
      })
      .catch((error) => {
        console.error("Error fetching icecreams:", error);
      });
  };


  const fetchItems = (items) => {
  const runningLowWebstaurantItems = items.filter(
    (item) => item.company === "WEBSTAURANT" && item.running_low === true
  );
  setRunningLowWebstaurantItems(runningLowWebstaurantItems);
  setWebstaurantRunningLowCount(runningLowWebstaurantItems.length);

  const runningLowBjsItems = items.filter(
    (item) => item.company === "BJ'S" && item.running_low === true
  );
  setRunningLowBjsItems(runningLowBjsItems);
  setBjsRunningLowCount(runningLowBjsItems.length);

  const runningLowPrimizieItems = items.filter(
    (item) => item.company === "PRIMZIE" && item.running_low === true
  );
  setRunningLowPrimizieItems(runningLowPrimizieItems);
  setPrimizieRunningLowCount(runningLowPrimizieItems.length);

  const runningLowAmazonItems = items.filter(
    (item) => item.company === "AMAZON" && item.running_low === true
  );
  setRunningLowAmazonItems(runningLowAmazonItems);
  setAmazonRunningLowCount(runningLowAmazonItems.length);

  const runningLowCups = items.filter(
    (item) => item.company === "CUPS (ICECREAM)" && item.running_low === true
  );
  setRunningLowCups(runningLowCups);
  setCupsRunningLowCount(runningLowCups.length);

  const runningLowCoins = items.filter(
    (item) => item.product_type === "Coins" && item.running_low === true
  );
  setRunningLowCoins(runningLowCoins);
  setCoinsRunningLowCount(runningLowCoins.length);

  const runningLowFruits = items.filter(
    (item) => item.category === "Fruits" && item.running_low === true
  );
  setRunningLowFruits(runningLowFruits);
  setFruitsRunningLowCount(runningLowFruits.length);
};


  const fetchIcecreamsRunningLow = (icecreams) => {
    const quantitiesByIceCreamName = {};

    if (icecreams && icecreams.length > 0) {
      icecreams.forEach((item) => {
        if (item.frozengood.frozengood in quantitiesByIceCreamName) {
          quantitiesByIceCreamName[item.frozengood.frozengood] += item.quantity;
        } else {
          quantitiesByIceCreamName[item.frozengood.frozengood] = item.quantity;
        }
      });
    }

    // Sort ice creams by total quantity in ascending order
    const sortedIceCreams = Object.entries(quantitiesByIceCreamName).sort(
      (a, b) => a[1] - b[1]
    );

    // Filter and return only items with quantity less than 1
    const filteredIceCreams = sortedIceCreams.filter((iceCream) => iceCream[1] < 1);

    setRunningLowIcecreams(filteredIceCreams);
    setIcecreamsRunningLowCount(filteredIceCreams.length);
  };


  const renderStatisticsCard = (title, count, company, runningLowItems) => {
    return (
      <Grid item xs={12} md={6} lg={3} key={title}>
        <Box mb={1.5}>
          <ComplexStatisticsCard
            color="info"
            icon="AcUnitTwoToneIcon"
            title={title}
            count={count}
            percentage={{
              color: "success",
              amount: "+55%",
              label: "than last week",
            }}
          />
          <Button onClick={() => handleModalOpen(runningLowItems, )}>View Items</Button>
        </Box>
      </Grid>
    );
  };


  const handleModalOpen = (runningLowItems) => {
    setModalItems(runningLowItems);
    console.log(modalItems)
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

 
  return (
    <MaterialUIControllerProvider>
      <Box py={3}>
        <Box py={3}>
          <Grid container spacing={3}>
            {renderStatisticsCard(
              "ICECREAM RUNNING LOW",
              icecreamsRunningLowCount,
              "ICECREAM",
              runningLowIcecreams
            )}
            {renderStatisticsCard(
              "FRUITS RUNNING LOW",
              fruitsRunningLowCount,
              "FRUITS",
              runningLowFruits
            )}
            {renderStatisticsCard(
              "CUPS (ICECREAM) RUNNING LOW",
              cupsRunningLowCount,
              "CUPS (ICECREAM)",
              runningLowCups
            )}
            {renderStatisticsCard(
              "REGISTER COINS RUNNING LOW",
              coinsRunningLowCount,
              "REGISTER COINS",
              runningLowCoins
            )}
            {renderStatisticsCard(
              "WEBSTRAURANT RUNNING LOW",
              webstaurantRunningLowCount,
              "WEBSTRAURANT",
              runningLowWebstaurantItems
            )}
            {renderStatisticsCard(
              "PRIMIZIE RUNNING LOW",
              primizieRunningLowCount,
              "PRIMIZIE",
              runningLowPrimizieItems
            )}
            {renderStatisticsCard(
              "BJ'S RUNNING LOW",
              bjsRunningLowCount,
              "BJ'S",
              runningLowBjsItems
            )}
            {renderStatisticsCard(
              "AMAZON RUNNING LOW",
              amazonRunningLowCount,
              "AMAZON",
              runningLowAmazonItems
            )}
          </Grid>
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
                width: 400,
                height: 250, // Fixed height
                overflowY: "scroll", // Make it scrollable
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="running-low-items-title" variant="h6" component="h2">
                Running Low Items
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(modalItems) ? (
                      modalItems.map((item) => (
                        <TableRow key={item.id}>
                          {Array.isArray(item) ? (
                            <>
                              <TableCell>{item[0]}</TableCell>
                              <TableCell>{item[1]}</TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell>{item.item}</TableCell>
                              <TableCell>{item.quantity} {item.measuring_unit.measuring_unit}</TableCell>
                            </>
                          )}
                        </TableRow>
                      ))
                    ) : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Modal>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
              <Projects />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <OrdersOverview />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </MaterialUIControllerProvider>
  );
}

export default Dashboard;
