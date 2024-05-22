/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/grounds/components/Header";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { listGrounds } from "../../actions/GroundAction";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Box,
  InputAdornment,
  MenuItem,
  Button,
  FormControl,
  InputLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getQueryParams = (obj) => {
  let query = new URLSearchParams(obj);

  return query.toString();
};


function ShowGrounds(props) {

  useEffect(() => {
    props.listGrounds();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [availFacilities, setAvailFacilities] = useState([]);
  const theme = useTheme();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAvailFacilities(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    let qObj = {
      search_ground: searchQuery,
      facilities: availFacilities,
      sort: sortOrder
    }

    let qParam = getQueryParams(qObj);

    props.listGrounds(qParam);

    console.log("qParam", qParam)
}, [searchQuery, availFacilities, sortOrder]);

  const img_base_url = "http://localhost:1337/images/";
  return (
    <DashboardLayout>
      <MDBox mb={10} />
      <Header>
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={"auto"}>
              <MDBox sx={{ lineHeight: "0.1" }} mb={1}>
                <MDTypography variant="h6" fontWeight="medium">
                  Grounds
                </MDTypography>
                <MDTypography variant="button" color="text">
                  List of Available grounds
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Box sx={{}}>
                <TextField
                  id="search-input"
                  label="Name / Location"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: 200 }}
                />

                <FormControl sx={{ m: 1, mt: 0, width: 200 }}>
                  <InputLabel id="demo-multiple-chip-label">Available Facilities</InputLabel>
                  <Select
                    sx={{ height: 45 }}
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={availFacilities}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Available Facilities" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {["Shower", "Changing Room", "Locker"].map((name) => (
                      <MenuItem
                        key={name}
                        value={name.replace(" ", "_").toLowerCase()}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ width: 200 }}>
                  <InputLabel id="sort-select-label">Sort By</InputLabel>
                  <Select
                    sx={{ height: 45 }}
                    labelId="sort-select-label"
                    id="sort-select"
                    value={sortOrder}
                    label="Sort By"
                    onChange={handleSortOrderChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                    <MenuItem value="rating-asc">Rating: Low to High</MenuItem>
                    <MenuItem value="rating-desc">Rating: High to Low</MenuItem>
                    <MenuItem value="newest">Newest</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid sx={{"padding-top": "4px !important"}} item xs={12} sm={6} md>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }} >
                <Button variant="contained" href="/add-listing" style={{ color: "#fff" }}>
                  Add Listing
                </Button>
              </Box>
              {/* <MDBox style={{ float: "right" }} mb={1}>
                <Button variant="contained" href="/add-listing" style={{ color: "#fff" }}>
                  Add Listing
                </Button>
              </MDBox> */}
            </Grid>
          </Grid>
        </Box>
        <MDBox p={2}>
          {props.ground_list ? <Grid container spacing={6}>
            {props.ground_list.map((ground) => (
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={img_base_url + ground.ground_image}
                  label={ground.location}
                  title={ground.name}
                  id={ground._id}
                  rating={ground.avg_rating}
                  description={`${ground.description}. (Available Facilities) Shower: ${ground.shower ? 'Available' : 'NA'}, Changing Room: ${ground.changing_room ? 'Available' : 'NA'}, Locker: ${ground.locker ? 'Available' : 'NA'}`}
                  action={{
                    type: "new",
                    route: "/show-ground/" + ground._id,
                    color: "info",
                    label: "Book Slots",
                  }}
                  authors={[
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                  ]}
                />
              </Grid>
            ))}
          </Grid> : <MDBox pt={2} px={2} lineHeight={1.25}>
            <MDTypography variant="h6" fontWeight="medium">
              No Ground Found
            </MDTypography>
          </MDBox>}

        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

function mapStateToProps(state) {
  const { grounds, user } = state;

  return {
    ground_list: grounds.ground_list,
    user: user.user_details
  }
}

export default reduxForm({
  form: 'ShowGrounds',
})(connect(mapStateToProps, { listGrounds })(ShowGrounds));
