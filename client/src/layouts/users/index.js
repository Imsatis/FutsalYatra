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

// Data
import projectsTableData from "layouts/bookings/data/projectsTableData";

import { useState, useEffect } from "react";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { listUsers, changeRole } from "../../actions/UserAction";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import moment from 'moment-timezone';
import Switch from '@mui/material/Switch';
import Swal from 'sweetalert2';

function UserTable(props) {

  const img_base_url = "http://localhost:1337/images/";

  useEffect(() => {
    props.listUsers();
  }, []);

  const columns = [
    { Header: "Name / Email", accessor: "email", align: "left" },
    { Header: "Role Type", accessor: "role", align: "left" },
    { Header: "Verified", accessor: "verified", align: "center" },
    { Header: "Created At", accessor: "createdAt", align: "left" },
    { Header: "Make owner", accessor: "makeOwner", align: "left" }
  ];

  if (!props.list_users) {
    return;
  }

  const rows = props.list_users && props.list_users.map((user, index) => (
    {
      email: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDAvatar src={`${img_base_url}dummy-profile-${index % 5}.png`} name={user.name} size="sm" />
          <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {user.name}
            </MDTypography>
            <MDTypography variant="caption">{user.email}</MDTypography>
          </MDBox>
        </MDBox>
      ),
      role: (
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {user.role_type}
          </MDTypography>
          <MDTypography variant="caption">Role of the User</MDTypography>
        </MDBox>
      ),
      verified: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={user.is_verfied ? "Yes" : "No"} color={user.is_verfied == true ? "success" : "error"} variant="gradient" size="sm" />
        </MDBox>
      ),
      createdAt: (
        <MDBox lineHeight={1} textAlign="left">
          <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
            {moment(user.createdAt).tz("Asia/Kathmandu").format("YYYY-MM-DD HH:mm:ss")}
          </MDTypography>
          <MDTypography variant="caption">{"User account created at."}</MDTypography>
        </MDBox>
      ),
      makeOwner: (
        <MDBox lineHeight={1} textAlign="center">
          <Switch
          key={Math.random()}
            onChange={(e) => {
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, do it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  props.changeRole(user._id, (response) => {
                    if (response.status === 'success') {
                      Swal.fire({
                        title: 'Success!',
                        text: 'Ground deleted successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      });

                      props.listUsers();
                    }
                    if (response.status === 'error') {
                      Swal.fire({
                        title: 'Error!',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'Okay'
                      })
                    }
                  });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  // Optionally, handle the cancel case
                  Swal.fire(
                    'Cancelled',
                    'Your action has been cancelled.',
                    'error'
                  );

                  setTimeout(() => {
                    props.listUsers();
                  }, 0);
                }
              });
            }}
            aria-label='Make owner' disabled={user.role_type !== "player"} defaultChecked={user.role_type !== "player"} />
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
                  Users
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
  const { user } = state;

  return {
    user: user.user_details,
    list_users: user.list_users
  }
}

export default reduxForm({
  form: 'UserTable',
})(connect(mapStateToProps, { listUsers, changeRole })(UserTable));
