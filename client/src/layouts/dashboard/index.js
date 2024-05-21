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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import { statsBox, weeklyBookings, weeklyUpcomingBookings, weeklySales } from "../../actions/StatsAction";
import { useState, useEffect } from "react";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';


function Dashboard(props) {
  const { sales, tasks } = reportsLineChartData;

  useEffect(() => {
    props.statsBox();
    props.weeklyBookings();
    props.weeklyUpcomingBookings();
    props.weeklySales();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Upcoming Bookings"
                count={props.stats_box && props.stats_box.upcoming_bookings ? props.stats_box.upcoming_bookings : 0}
                percentage={{
                  color: "success",
                  label: "Total number of upcoming bookings",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Total Bookings"
                count={props.stats_box && props.stats_box.total_bookings ? props.stats_box.total_bookings : 0}
                percentage={{
                  color: "success",
                  label: "Total number of bookings till date",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count={props.stats_box && props.stats_box.total_revenue ? props.stats_box.total_revenue : 0}
                percentage={{
                  color: "success",
                  label: "Success transaction",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Players"
                count={"+" + (props.stats_box && props.stats_box.total_players ? props.stats_box.total_players : 0)}
                percentage={{
                  color: "success",
                  label: "Total registered players",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Weekly Bookings"
                  description="Last 7 days bookings"
                  date="just updated"
                  chart={props.weekly_bookings ? props.weekly_bookings : reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Weekly sales"
                  description="Last 7 days sales"
                  date="updated 4 min ago"
                  chart={props.weekly_sales ? props.weekly_sales : sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Upcoming Bookings"
                  description="Weekly upcoming bookings"
                  date="just updated"
                  chart={props.weekly_upcoming_bookings ? props.weekly_upcoming_bookings : tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

function mapStateToProps(state) {
  const { stats, user } = state;

  return {
    stats_box: stats.stats_box,
    weekly_bookings: stats.weekly_bookings,
    weekly_upcoming_bookings: stats.weekly_upcoming_bookings,
    weekly_sales: stats.weekly_sales,
    user: user.user_details
  }
}

export default reduxForm({
  form: 'Dashboard',
})(connect(mapStateToProps, { statsBox, weeklyBookings, weeklyUpcomingBookings, weeklySales })(Dashboard));
