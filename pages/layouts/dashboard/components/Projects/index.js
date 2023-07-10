import React, { useState, useEffect, useRef } from "react";
import { Card, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField } from "@mui/material";
import { useGatsbyListItemStyles } from "@mui-treasury/styles/listItem/gatsby";
import Pagination from "@mui/material/Pagination";
import API from "API";
import MDTypography from "components/MDTypography";
import TableSortLabel from "@mui/material/TableSortLabel";

function Projects() {
  const [selectedOption, setSelectedOption] = useState("");
  const [allItems, setAllItems] = useState(0);
  const [allItemsData, setAllItemsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 9;
  const searchInputRef = useRef();

  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = () => {
    API.get("/item/")
      .then((res) => {
        setAllItemsData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const GatsbyListItemsStyle = () => {
    const classes = useGatsbyListItemStyles();
    const items = allItemsData;

    const handleSort = () => {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
    };

    const filteredItems = items.filter((item) =>
      item.item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedItems = filteredItems.sort((a, b) => {
      const first = a.item.toLowerCase();
      const second = b.item.toLowerCase();
      return sortOrder === "asc" ? first.localeCompare(second) : second.localeCompare(first);
    });

    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedItems = sortedItems.slice(startIndex, endIndex);

    return (
      <Box minWidth={240}>
        <MDTypography variant="h6" gutterBottom>
          Items
        </MDTypography>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          margin="dense"
          inputRef={searchInputRef} // Set ref for the search input element
        />
        <TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell style={{ fontWeight: "bold", textAlign: "left" }}>
          <TableSortLabel
            active
            direction={sortOrder}
            onClick={handleSort}
          >
            Item Name
          </TableSortLabel>
        </TableCell>
        <TableCell style={{ fontWeight: "light", textAlign: "center" }}>Quantity</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {paginatedItems.map((item) => (
        <TableRow key={item.id}>
          <TableCell style={{ textAlign: "left" }}>{item.item}</TableCell>
          <TableCell style={{ textAlign: "center" }}>{item.quantity}</TableCell>
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
    searchInputRef.current.focus();
  }, [searchQuery]);

  return (
    <Card sx={{ height: "100%" }}>
      <MDTypography variant="button" fontWeight="regular" color="text"></MDTypography>

      <Box pt={3} px={3}>
        <GatsbyListItemsStyle />
      </Box>
    </Card>
  );
}

export default Projects;