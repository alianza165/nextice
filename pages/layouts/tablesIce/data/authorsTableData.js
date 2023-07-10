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
    API.get("/icecream/")
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


function getTableData() {
  const rows = movies.map((movie) => ({
    author: <h6>{movie.icecream_name}</h6>,
    function: <Job title={`Freezer # ${movie.freezer_number}`} description={`${movie.product_type}`} />,
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
      { Header: "IceCream", accessor: "author", width: "45%", align: "left" },
      { Header: "Freezer Number", accessor: "function", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Quantity", accessor: "employed", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: rows,
  };
}

return getTableData()

}


const handleEdit = (movie) => {


  return (
    <>
      <h1>hey</h1>
    </>
  );
};