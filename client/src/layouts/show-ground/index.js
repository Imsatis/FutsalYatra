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

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/show-ground/components/Header";

import { getGround, bookGround, getBookingSlots, addReview, listReviews } from "../../actions/GroundAction";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TimeCalendar from "react-timecalendar";
import moment from 'moment-timezone';
import MDButton from "components/MDButton";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";
const CryptoJS = require('crypto-js');


function GroundDetail(props) {

  const { ground_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (ground_id) {
      props.getGround(ground_id);
      props.listReviews(ground_id);
      props.getBookingSlots(ground_id);
    }
  }, [ground_id]);

  const [timeRange, setTimeRange] = useState({
    startTime: "",
    endTime: "",
  });

  console.log(props.ground_details)

  const openHours = [
    [10, 22]
  ];

  const bookings = props.booking_slots ? props.booking_slots : [];

  const handleTimeClick = (time) => {
    if (timeRange.startTime === "") {
      setTimeRange({
        startTime: time,
        endTime: "",
      });
    } else if (
      !moment(timeRange.startTime).isSame(time, 'day') || // Use Moment.js method
      time < timeRange.startTime
    ) {
      setTimeRange({
        startTime: "",
        endTime: "",
      });
    } else {
      setTimeRange({
        ...timeRange,
        endTime: time,
      });
    }
  };

  const [rating, setRating] = useState(3);
  const img_base_url = "http://localhost:1337/images/";

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox mb={2} />
      <div id="dynamic-form"></div>
      <Header>
        <div>
          <TimeCalendar
            clickable
            disableHistory
            timeSlot={60}
            openHours={openHours}
            onTimeClick={handleTimeClick}
            bookings={bookings}
            startTime={timeRange.startTime}
            endTime={timeRange.endTime}
          />
        </div>
        <MDBox mt={4} mb={1}>
          <MDButton style={{ padding: "20px" }} onClick={() => {

            if (!timeRange.startTime) {
              return Swal.fire({
                title: 'Error!',
                text: "Please select the start time.",
                icon: 'error',
                confirmButtonText: 'Okay'
              });
            }

            if (!timeRange.endTime) {
              return Swal.fire({
                title: 'Error!',
                text: "Please select the end time.",
                icon: 'error',
                confirmButtonText: 'Okay'
              });
            }

            props.bookGround({
              ground_id,
              start_time: timeRange.startTime,
              end_time: timeRange.endTime
            }, (response) => {
              if (response.status === 'success') {

                if (response.data.transaction) {
                  let transaction = response.data.transaction;
                  const data = `total_amount=${transaction.amount},transaction_uuid=${transaction.id},product_code=EPAYTEST`;
                  const secretKey = "8gBm/:&EnhH.1/q";

                  const hash = CryptoJS.HmacSHA256(data, secretKey);
                  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

                  // Create form element
                  var form = document.createElement('form');
                  form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
                  form.method = "POST";

                  // Create input fields and set their attributes
                  var fields = [
                    { name: "amount", value: transaction.amount },
                    { name: "tax_amount", value: 0 },
                    { name: "total_amount", value: transaction.amount },
                    { name: "transaction_uuid", value: transaction.id },
                    { name: "product_code", value: "EPAYTEST" },
                    { name: "product_service_charge", value: "0" },
                    { name: "product_delivery_charge", value: "0" },
                    { name: "success_url", value: "http://localhost:1337/payment/success" },
                    { name: "failure_url", value: "http://localhost:1337/payment/failed" },
                    { name: "signed_field_names", value: "total_amount,transaction_uuid,product_code" },
                    { name: "signature", value: hashInBase64 }
                  ];

                  // Create input fields dynamically
                  fields.forEach(function (field) {
                    var input = document.createElement('input');
                    input.type = 'text';
                    input.name = field.name;
                    input.value = field.value;
                    input.required = true;
                    form.appendChild(input);
                  });

                  // Create submit button
                  var submitBtn = document.createElement('input');
                  submitBtn.type = 'submit';
                  submitBtn.value = 'Submit';
                  form.appendChild(submitBtn);

                  // Append the form to the document
                  document.getElementById('dynamic-form').appendChild(form);

                  // Submit the form
                  form.submit();
                }
                // Swal.fire({
                //   title: 'Success!',
                //   text: 'Ground booking confirmation is sent to your email.',
                //   icon: 'success',
                //   confirmButtonText: 'OK'
                // });

                // return navigate("/grounds")
              }
              if (response.status === 'error') {
                return Swal.fire({
                  title: 'Error!',
                  text: response.message,
                  icon: 'error',
                  confirmButtonText: 'Okay'
                })
              }
            });
          }} variant="gradient" color="success" fullWidth>
            Rs {props.ground_details && props.ground_details.price ? props.ground_details.price : 0} (Pay with eSewa)
          </MDButton>
        </MDBox>
        <Divider sx={{ margin: 2 }} light={true} />
        <MDBox pt={0} px={2} lineHeight={1.25}>
          <MDTypography variant="h2" fontWeight="medium">
            Review this ground
          </MDTypography>
          <MDBox mb={1}>
            <Rating
              style={{ maxWidth: 180 }}
              value={rating}
              onChange={setRating}
            />
            <MDTypography variant="button" color="text">
              Share your thoughts with other players
            </MDTypography>

            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <Field name="review" type="text" label="review" component={({ input, label, meta: { touched, error }, ...custom }) => {
                  return <MDInput label={label}
                    error={touched && error}
                    helperText={touched && error}
                    {...input}
                    {...custom}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined" />;
                }} />
              </MDBox>
              <MDBox mt={2} mb={1}>
                <MDButton onClick={props.handleSubmit(onSubmit)} variant="gradient" color="info">
                  Submit
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
        {props.list_reviews && props.list_reviews.map((reviews) => {
          return <>
            <Divider sx={{ margin: 2 }} light={true} />
            <Grid key={reviews._id} container spacing={3} alignItems="center">
              <Grid item>
                <MDAvatar src={`${img_base_url}dummy-profile-${reviews.rating ? reviews.rating : 1}.png`} alt="profile-image" size="xl" shadow="sm" />
              </Grid>
              <Grid item>
                <MDBox height="100%" mt={0.5} lineHeight={1}>
                  <MDTypography variant="h5" fontWeight="medium">
                    {reviews && reviews.user ? reviews.user.name : ""}
                  </MDTypography>
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={reviews.rating ? reviews.rating : 0}
                    readOnly
                  />
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    {reviews ? reviews.review : ""}
                  </MDTypography>
                </MDBox>
              </Grid>
            </Grid>
            <Divider sx={{ margin: 2 }} light={true} />
          </>
        })}

      </Header>
      <Footer />
    </DashboardLayout>
  );

  function onSubmit(values) {
    console.log(props)
    values.rating = rating;
    values.ground_id = ground_id;
    props.addReview(values, (response) => {
      if (response.status === 'success') {

        Swal.fire({
          title: 'Success!',
          text: 'Review added successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        props.listReviews(ground_id);
        window.scrollTo(0, document.body.scrollHeight);
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
  }
}

function mapStateToProps(state) {
  const { grounds, user } = state;

  return {
    ground_details: grounds.ground_details,
    booking_slots: grounds.booking_slots,
    list_reviews: grounds.list_reviews,
    user: user.user_details
  }
}

export default reduxForm({
  form: 'Header',
})(connect(mapStateToProps, { getGround, bookGround, getBookingSlots, addReview, listReviews })(GroundDetail));
