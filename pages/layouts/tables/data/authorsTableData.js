/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import { useState, useEffect } from "react";
import API from "API";

export default function data() {

  const movies1 = [
    {
        "id": 1,
        "category": 2,
        "item": "Croissant Container",
        "product_type": 14,
        "measuring_unit": null,
        "company": 3,
        "quantity": 3.25,
        "running_low": true,
        "threshold": null
    },
    {
        "id": 2,
        "category": 2,
        "item": "Paper Tray Lids",
        "product_type": 14,
        "measuring_unit": null,
        "company": null,
        "quantity": 4.0,
        "running_low": false,
        "threshold": 3.0
    },
    {
        "id": 3,
        "category": 1,
        "item": "Small Cups",
        "product_type": 1,
        "measuring_unit": null,
        "company": 1,
        "quantity": 1.0,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 4,
        "category": 1,
        "item": "Large Cups",
        "product_type": 2,
        "measuring_unit": null,
        "company": 2,
        "quantity": 1.5,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 5,
        "category": 1,
        "item": "Flat Lid with Straw Slot",
        "product_type": 3,
        "measuring_unit": 3,
        "company": null,
        "quantity": 0.75,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 6,
        "category": 3,
        "item": "Kit Kats",
        "product_type": 4,
        "measuring_unit": 1,
        "company": null,
        "quantity": 40.0,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 7,
        "category": 3,
        "item": "Lucky Charms Cereal",
        "product_type": 5,
        "measuring_unit": 1,
        "company": null,
        "quantity": 1.0,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 8,
        "category": 5,
        "item": "Stickers with Logo",
        "product_type": 6,
        "measuring_unit": 4,
        "company": null,
        "quantity": 1.0,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 9,
        "category": 5,
        "item": "Taster Spoon",
        "product_type": 7,
        "measuring_unit": 3,
        "company": null,
        "quantity": 0.9,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 10,
        "category": 5,
        "item": "Large cloves",
        "product_type": 8,
        "measuring_unit": 3,
        "company": null,
        "quantity": 6.0,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 11,
        "category": 5,
        "item": "#4 Paper Bag",
        "product_type": 9,
        "measuring_unit": 5,
        "company": null,
        "quantity": 4.5,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 12,
        "category": 5,
        "item": "Plastic Wrap (Medium)",
        "product_type": 10,
        "measuring_unit": 3,
        "company": null,
        "quantity": 1.75,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 13,
        "category": 4,
        "item": "Honey",
        "product_type": 11,
        "measuring_unit": 6,
        "company": null,
        "quantity": 1.3,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 14,
        "category": 4,
        "item": "Clear Glaze",
        "product_type": 13,
        "measuring_unit": 7,
        "company": null,
        "quantity": 2.0,
        "running_low": null,
        "threshold": null
    },
    {
        "id": 15,
        "category": 4,
        "item": "Vanilla Icing",
        "product_type": 12,
        "measuring_unit": 3,
        "company": null,
        "quantity": 1.25,
        "running_low": null,
        "threshold": null
    }
]
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [starring, setStarring] = useState("");
  const [movieId, setMovieId] = useState(null);
  const [movies, setMovies] = useState([]);

    useEffect(() => {
    refreshMovies();
  }, []);

  const refreshMovies = () => {
    API.get("/item/")
      .then((res) => {
        setMovies(res.data);
        console.log(movies)
        // setName(res[0].name)
        // setGenre(res[0].genre)
        // setStarring(res[0].starring)
        // setMovieId(res[0].id)
      })
      .catch(console.error);
  };

  const rows = movies.map((movie) => ({
    author: <h6>{movie.item}</h6>,
    function: <Job title={`${movie.category}`} description={`${movie.product_type}`} />,
    status: movie.running_low ? (
      <MDBox ml={-1}>
        <MDBadge badgeContent="running low" color="warning" variant="gradient" size="sm" />
      </MDBox>
    ) : (
      <MDBox ml={-1}>
        <MDBadge badgeContent="OK" color="success" variant="gradient" size="sm" />
      </MDBox>
    ),
    employed: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {movie.quantity}
      </MDTypography>
    ),
    action: (
    <MDTypography
      component="a"
      href="#"
      variant="caption"
      color="text"
      fontWeight="medium"
      onClick={() => handleEdit(movie)}
    >
      Edit
    </MDTypography>
  ),
  }));

  return {
    columns: [
      { Header: "Item", accessor: "author", width: "45%", align: "left" },
      { Header: "Category / Product Type", accessor: "function", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Quantity", accessor: "employed", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: rows,
  };

}


const handleEdit = (movie) => {


  return (
    <>
      <h1>hey</h1>
    </>
  );
};