import React, { useState, useEffect, useRef } from "react";
import { Card, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import API from '../utils/API';
import TableSortLabel from "@mui/material/TableSortLabel";
import { SkeletonLoader1 } from "./components/SkeletonLoaders";


function OrdersOverview() {
  const [selectedOption, setSelectedOption] = useState("");
  const [allItems, setAllItems] = useState(0);
  const [allIcecreams, setAllIcecreams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 9;
  const searchInputRef = useRef(); // Move this ref here
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllIcecreams();
  }, []);

  const fetchAllIcecreams = () => {
    setIsLoading(true);

    API.get("/frozengood/")
      .then((res) => {
        setAllIcecreams(res.data);
      })
      .catch((error) => {
        console.error("Error fetching total items:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const getTotalQuantitiesByIceCreamName = () => {
    const quantitiesByIceCreamName = {};
    if (allIcecreams && allIcecreams.length > 0) {
      allIcecreams.forEach((item) => {
        if (item.frozengood.frozengood in quantitiesByIceCreamName) {
          quantitiesByIceCreamName[item.frozengood.frozengood] += item.quantity;
        } else {
          quantitiesByIceCreamName[item.frozengood.frozengood] = item.quantity;
        }
      });
    }
    const sortedIceCreams = Object.entries(quantitiesByIceCreamName).sort(
      (a, b) => a[1] - b[1]
    );
    return sortedIceCreams;
  };

  const GatsbyListIcecreamStyle = () => {
    const iceCreams = getTotalQuantitiesByIceCreamName();

    const handleSort = () => {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
    };

    const filteredIceCreams = iceCreams.filter(([iceCreamName]) =>
      iceCreamName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedIceCreams = filteredIceCreams.sort((a, b) => {
      const first = a[0].toLowerCase();
      const second = b[0].toLowerCase();
      return sortOrder === "asc" ? first.localeCompare(second) : second.localeCompare(first);
    });

    const totalPages = Math.ceil(sortedIceCreams.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedIceCreams = sortedIceCreams.slice(startIndex, endIndex);

    return (
      <Box minWidth={240}>
        <Typography variant="h6" gutterBottom>
          Ice Cream - Boxes
        </Typography>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          margin="dense"
          inputRef={searchInputRef} // Keep the ref here
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={sortOrder}
                    onClick={handleSort}
                  >
                    Ice Cream
                  </TableSortLabel>
                </TableCell>
                <TableCell ml={2}>Total Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedIceCreams.map(([iceCreamName, totalQuantity]) => (
                <TableRow key={iceCreamName}>
                  <TableCell>{iceCreamName}</TableCell>
                  <TableCell>{totalQuantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
          />
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    // Focus the search input element when the page is loaded or the searchQuery changes
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchQuery]);

  return (
    <Card sx={{ height: "100%" }}>
      <Typography variant="button" fontWeight="regular" color="text"></Typography>

      <Box pt={3} px={3}>
        {isLoading ? (
          <SkeletonLoader1 />
        ) : (
          <GatsbyListIcecreamStyle />
        )}
      </Box>
    </Card>
  );
}

export default OrdersOverview;
