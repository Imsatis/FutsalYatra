/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023   (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { getAvgRating } from "../../../../actions/GroundAction";
import { Rating } from '@smastrom/react-rating'
import { useParams } from 'react-router-dom';


function Header({ children, ...props }) {

  const img_base_url = "http://localhost:1337/images/";
  const { ground_id } = useParams();

  useEffect(() => {
    if (ground_id) {
      props.getAvgRating(ground_id);
    }
  }, [ground_id]);



  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.0),
              rgba(gradients.info.state, 0.0)
            )}, url(${img_base_url + (props && props.ground_details ? props.ground_details.ground_image : "")})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar src={`${img_base_url + (props && props.ground_details ? props.ground_details.ground_image : "")}`} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {props && props.ground_details ? props.ground_details.name : ""}
                <Rating
                  style={{ maxWidth: 110, display: "inline-flex", top: "2px", left: "2px" }}
                  value={props.avg_rating && props.avg_rating.length > 0 ? props.avg_rating[0].average : 0}
                  readOnly
                />
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {props && props.ground_details ? props.ground_details.location : ""}
              </MDTypography>
              <br />
              <MDTypography variant="button" color="text" fontWeight="regular">
                {props && props.ground_details ? props.ground_details.description : ""}
              </MDTypography>
              <br />
              <MDTypography variant="button" color="text" fontWeight="regular">
                {props && props.ground_details ? `(Available Facilities) Shower: ${props.ground_details.shower ? 'Available' : 'NA'}, Changing Room: ${props.ground_details.changing_room ? 'Available' : 'NA'}, Locker: ${props.ground_details.locker ? 'Available' : 'NA'}` : ''}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

function mapStateToProps(state) {
  const { grounds, user } = state;

  return {
    ground_details: grounds.ground_details,
    avg_rating: grounds.avg_rating,
    user: user.user_details
  }
}

export default reduxForm({
  form: 'Header',
})(connect(mapStateToProps, { getAvgRating })(Header));
