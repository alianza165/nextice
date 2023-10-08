import React, { useState, useEffect, useRef } from "react";
import { Card, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import API from '../utils/API';
import TableSortLabel from "@mui/material/TableSortLabel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { SkeletonLoader1 } from "./components/SkeletonLoaders";


function Projects() {
  const [selectedOption, setSelectedOption] = useState("");
  const [allItems, setAllItems] = useState(0);
  const [allItemsData, setAllItemsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [adjustmentType, setAdjustmentType] = useState("in"); // or "out"
  const searchInputRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 9;

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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditQuantity = (item, action) => {
    setSelectedItem(item);
    setQuantity(0); // Reset the quantity value when opening the dialog
    setAdjustmentType(action);
    setOpen(true);
  };

const updateItemQuantity = (itemId, newQuantity) => {
    setAllItemsData((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };


  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const adjustmentValue = adjustmentType === "in" ? quantity : -quantity;
    const updatedItem = { ...selectedItem, quantity: selectedItem.quantity + adjustmentValue };

    API.put(`/item/${selectedItem.id}/`, updatedItem)
      .then(() => {
        console.log('Item updated successfully');
        updateItemQuantity(selectedItem.id, updatedItem.quantity); // Update the item's quantity in the state
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      })
      .finally(() => {
        setOpen(false);
      });
  };

const handleClose = () => {
  setOpen(false);
};

const [open, setOpen] = useState(false);


  const GatsbyListItemsStyle = () => {
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
      <div className="px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Items</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border rounded px-2 py-1 w-60"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={searchInputRef}
        />
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="font-bold text-left">
              <button onClick={handleSort}>
                Item Name
                {sortOrder === 'asc' ? (
                  <span>&#9650;</span>
                ) : (
                  <span>&#9660;</span>
                )}
              </button>
            </th>
            <th className="font-light text-center">Quantity</th>
            <th className="font-light text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item) => (
            <tr key={item.id}>
              <td class="text-sm">{item.item}</td>
              <td className="text-center">{item.quantity}</td>
              <td className="text-center">
                <IconButton onClick={() => handleEditQuantity(item, "in")} color="primary">
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => handleEditQuantity(item, "out")} color="secondary">
                  <RemoveIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-4">
        <div>Page {currentPage} of {totalPages}</div>
        <div>
          <button
            className="px-2 py-1 rounded mr-2 bg-blue-500 text-white"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className="px-2 py-1 rounded bg-blue-500 text-white"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
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
          <GatsbyListItemsStyle />
        )}
      </Box>
      <Dialog open={open} onClose={handleClose}>
  <DialogTitle>Edit Quantity</DialogTitle>
  <DialogContent>
    <form onSubmit={handleFormSubmit}>
      <TextField
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        type="number"
        inputProps={{ min: 0 }}
        fullWidth
      />
    </form>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleFormSubmit} color="primary">Submit</Button>
  </DialogActions>
</Dialog>
    </Card>
  );
}

export default Projects;
