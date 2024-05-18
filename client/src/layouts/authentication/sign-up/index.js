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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { signUp } from "../../../actions/SignAction";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cover(props) {

  const [error, setError] = useState('');
  const navigate = useNavigate();

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Field name="name" type="text" label="Name" component={({ input, label, meta: { touched, error }, ...custom }) => {
                return <MDInput label={label}
                  error={touched && error}
                  helperText={touched && error}
                  {...input}
                  {...custom}
                  fullWidth />;
              }} />
            </MDBox>
            <MDBox mb={2}>
              <Field name="email" type="email" label="Email" component={({ input, label, meta: { touched, error }, ...custom }) => {
                return <MDInput label={label}
                  error={touched && error}
                  helperText={touched && error}
                  {...input}
                  {...custom}
                  fullWidth />;
              }} />
            </MDBox>
            <MDBox mb={2}>
              <Field name="password" type="password" label="Password" component={({ input, label, meta: { touched, error }, ...custom }) => {
                return <MDInput label={label}
                  error={touched && error}
                  helperText={touched && error}
                  {...input}
                  {...custom}
                  fullWidth />;
              }} />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDTypography
                variant="body2"
                fontWeight="regular"
                color="error"
                textAlign="center"
              >
                {error}
              </MDTypography>
            <MDBox mt={2} mb={1}>
              <MDButton onClick={props.handleSubmit(onSubmit)} variant="gradient" color="info" fullWidth>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );

  function onSubmit(values) {
    props.signUp(values, (response) => {
      if (response.status === 'success') {
        return navigate("/dashboard")
      }
      if (response.status === 'error') {
        setError(response.message);
      }
    });
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default reduxForm({
  form: 'Cover',
})(connect(mapStateToProps, { signUp })(Cover));

const selector = formValueSelector('Cover') // <-- same as form name
