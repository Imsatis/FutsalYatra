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
import Card from "@mui/material/Card";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";


import { useState, useEffect } from "react";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { listBookings } from "../../actions/BookingAction";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import moment from 'moment-timezone';

function BookingTable(props) {

  const img_base_url = "http://localhost:1337/images/";
  
  useEffect(() => {
    props.listBookings();
  }, []);

  const columns = [
    { Header: "Name / Email", accessor: "email", align: "left" },
    { Header: "Ground Name / Location", accessor: "ground", align: "left" },
    { Header: "Slot start time", accessor: "start_slot_time", align: "left" },
    { Header: "Slot end time", accessor: "end_slot_time", align: "left" },
    { Header: "status", accessor: "status", align: "center" }
  ];

  if(!props.list_bookings) {
    return;
  }

  const rows = props.list_bookings && props.list_bookings.map((booking, index) => (
    {
      email: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDAvatar src={`${img_base_url}dummy-profile-${index % 5}.png`} name={booking.user.name} size="sm" />
          <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {booking.user.name}
            </MDTypography>
            <MDTypography variant="caption">{booking.user.email}</MDTypography>
          </MDBox>
        </MDBox>
      ),
      ground: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={`${img_base_url}${booking.ground.ground_image}`} name={booking.user.ground_image} size="sm" />
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {booking.ground.name}
          </MDTypography>
          <MDTypography variant="caption">{booking.ground.location}</MDTypography>
        </MDBox>
      </MDBox>
      ),
      start_slot_time: (
        <MDBox lineHeight={1} textAlign="left">
          <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
            {moment(booking.start_time).tz("Asia/Kathmandu").format("YYYY-MM-DD HH:mm:ss")}
          </MDTypography>
          <MDTypography variant="caption">{"Ground slot start time."}</MDTypography>
        </MDBox>
      ),
      end_slot_time: (
        <MDBox lineHeight={1} textAlign="left">
          <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
            {moment(booking.end_time).tz("Asia/Kathmandu").format("YYYY-MM-DD HH:mm:ss")}
          </MDTypography>
          <MDTypography variant="caption">{"Ground slot end time."}</MDTypography>
        </MDBox>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={booking.status} color={booking.status == "booked" ? "success" : "error"} variant="gradient" size="sm" />
        </MDBox>
      )
    }
  ));

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Bookings
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

function mapStateToProps(state) {
  const { bookings, user } = state;

  return {
    list_bookings: bookings.list_bookings,
    user: user.user_details
  }
}

export default reduxForm({
  form: 'BookingTable',
})(connect(mapStateToProps, { listBookings })(BookingTable));
