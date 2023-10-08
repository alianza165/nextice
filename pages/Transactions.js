import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useTable } from "react-table";
import API from '../utils/API';
import SkeletonLoader3 from "./components/SkeletonLoaders3";

function Transactions({ object }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [object]);

  const fetchTransactions = () => {
    let endpoint = object === "items" ? "/transaction/" : "/frozengoodtransaction/";

    API.get(endpoint)
      .then((res) => {
        setTransactions(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [isLoading, setIsLoading] = useState(true);
  const columns = React.useMemo(
    () =>
      object === "items"
        ? [
            {
              Header: "Item",
              accessor: "item",
            },
            {
              Header: "Quantity",
              accessor: "quantity",
            },
            {
              Header: "Time Stamp",
              accessor: "time_stamp",
            },
          ]
        : [
            {
              Header: "Frozen Good",
              accessor: "frozengood",
            },
            {
              Header: "Freezer Number",
              accessor: "freezer_number",
            },
            {
              Header: "Quantity",
              accessor: "quantity",
            },
            {
              Header: "Time Stamp",
              accessor: "time_stamp",
            },
          ],
    [object]
  );

  const data = React.useMemo(() => transactions, [transactions]);

  const table = useTable({
    columns,
    data,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = table;

  return (
    <Box py={3}>
      {isLoading ? (
          <SkeletonLoader3 />
        ) : (
        <table {...getTableProps()} style={{ width: "100%" }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      minWidth: "50px", // Set a minimum width for columns
                      textAlign: "left", // Align text to the left
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          minWidth: "150px", // Set a minimum width for cells
                          textAlign: "left", // Align text to the left
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Box>
  );
}

export default Transactions;
