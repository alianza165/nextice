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
import { Box, Typography } from '@mui/material';

// Material Dashboard 2 React example components
import ComplexStatisticsCard from "./examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data

// Dashboard components
import API from '../utils/API';
import Projects from "./Projects";
import OrdersOverview from "./OrdersOverview";
import { useState, useEffect } from "react";



function Dashboard() {

  const [totalItems, setTotalItems] = useState(0);
  const [icecreamsRunningLow, setIcecreamsRunningLow] = useState(0);
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
  const [items, setItems] = useState([]);
  const [icecreams, setIcecreams] = useState([]);


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
    API.get("/icecream/")
      .then((res) => {
      const fetchedIcecreams = res.data;
      fetchIcecreamsTotal(fetchedIcecreams); // Pass the fetched items to the fetchItems function
      fetchIcecreamsRunningLow(fetchedIcecreams);
      setIcecreams(fetchedIcecreams); // Update the items state
      })
      .catch((error) => {
        console.error("Error fetching icecreams:", error);
      });
  };


  const fetchItems = (items) => {
  const runningLowWebstaurantItems = items.filter(
    (item) => item.company === "WEBSTAURANT" && item.running_low === true
  );
  setWebstaurantRunningLowCount(runningLowWebstaurantItems.length);

  const runningLowBjsItems = items.filter(
    (item) => item.company === "BJ'S" && item.running_low === true
  );
  setBjsRunningLowCount(runningLowBjsItems.length);

  const runningLowPrimizieItems = items.filter(
    (item) => item.company === "PRIMZIE" && item.running_low === true
  );
  setPrimizieRunningLowCount(runningLowPrimizieItems.length);

  const runningLowAmazonItems = items.filter(
    (item) => item.company === "AMAZON" && item.running_low === true
  );
  setAmazonRunningLowCount(runningLowAmazonItems.length);

  const runningLowCups = items.filter(
    (item) => item.company === "CUPS (ICECREAM)" && item.running_low === true
  );
  setCupsRunningLowCount(runningLowCups.length);

  const runningLowCoins = items.filter(
    (item) => item.product_type === "Coins" && item.running_low === true
  );
  setCoinsRunningLowCount(runningLowCoins.length);

  const runningLowFruits = items.filter(
    (item) => item.category === "Fruits" && item.running_low === true
  );
  setFruitsRunningLowCount(runningLowFruits.length);
};


  const fetchIcecreamsTotal = (icecreams) => {
      const totalQuantity = icecreams.reduce((total, iceCream) => total + iceCream.quantity, 0);
      setTotalIceCreams(totalQuantity);
      icecreams.forEach((item) => {
        uniqueIcecreamNames.add(item.icecream_name);
      });
      const uniqueIcecreamNamesArray = Array.from(uniqueIcecreamNames);
      setTotalIceCreamNames(uniqueIcecreamNamesArray.length); // Save the length in the state
};

const fetchIcecreamsRunningLow = (icecreams) => {
      // Create an object to hold the aggregated quantity for each ice cream name
      const aggregatedQuantities = {};

      // Iterate over the ice creams and aggregate the quantities by ice cream name
      icecreams.forEach((icecream) => {
        const { icecream_name, quantity } = icecream;
        if (!aggregatedQuantities.hasOwnProperty(icecream_name)) {
          aggregatedQuantities[icecream_name] = 0;
        }
        aggregatedQuantities[icecream_name] += quantity;
      });

      // Calculate the running low ice creams by checking the aggregated quantities
      const runningLowIcecreams = Object.entries(aggregatedQuantities).filter(
        ([, quantity]) => quantity < 0.5
      );

      setIcecreamsRunningLow(runningLowIcecreams.length);
};

 
  return (
    <Box py={3}>
      <Box py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="ICECREAM RUNNING LOW"
                count={icecreamsRunningLow}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="WEBSTRAURANT RUNNING LOW"
                count={webstaurantRunningLowCount}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="BJ'S RUNNING LOW"
                count={bjsRunningLowCount}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="icecream"
                title="REGISTER COINS RUNNING LOW"
                count={coinsRunningLowCount}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} py={2}>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="FRUITS RUNNING LOW"
                count='0'
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="PRIMIZIE RUNNING LOW"
                count={primizieRunningLowCount}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="CUPS (ICECREAM) RUNNING LOW"
                count='0'
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="icecream"
                title="AMAZON RUNNING LOW"
                count={amazonRunningLowCount}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </Box>
          </Grid>
        </Grid>
        
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
  );
}

export default Dashboard;
