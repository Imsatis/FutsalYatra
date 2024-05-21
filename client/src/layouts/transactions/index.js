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
import { listTransactions } from "../../actions/BookingAction";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import moment from 'moment-timezone';

function TransactionTable(props) {

  const img_base_url = "http://localhost:1337/images/";

  useEffect(() => {
    props.listTransactions();
  }, []);

  const columns = [
    { Header: "Name / Email", accessor: "email", align: "left" },
    { Header: "Amount / ID", accessor: "amount", align: "left" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Created At", accessor: "createdAt", align: "left" }
  ];

  if (!props.list_transactions) {
    return;
  }

  const rows = props.list_transactions && props.list_transactions.map((transaction, index) => (
    {
      email: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDAvatar src={`${img_base_url}dummy-profile-${index % 5}.png`} name={transaction.user.name} size="sm" />
          <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {transaction.user.name}
            </MDTypography>
            <MDTypography variant="caption">{transaction.user.email}</MDTypography>
          </MDBox>
        </MDBox>
      ),
      amount: (
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {transaction.amount}
          </MDTypography>
          <MDTypography variant="caption">{transaction._id}</MDTypography>
        </MDBox>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={transaction.status} color={transaction.status == "success" ? "success" : "error"} variant="gradient" size="sm" />
        </MDBox>
      ),
      createdAt: (
        <MDBox lineHeight={1} textAlign="left">
          <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
            {moment(transaction.createdAt).tz("Asia/Kathmandu").format("YYYY-MM-DD HH:mm:ss")}
          </MDTypography>
          <MDTypography variant="caption">{"Transaction created at."}</MDTypography>
        </MDBox>
      ),
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
                  Transaction
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
    user: user.user_details,
    list_transactions: bookings.list_transactions
  }
}

export default reduxForm({
  form: 'TransactionTable',
})(connect(mapStateToProps, { listTransactions })(TransactionTable));
