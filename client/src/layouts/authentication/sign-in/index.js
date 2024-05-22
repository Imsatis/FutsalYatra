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

import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { signIn } from "../../../actions/SignAction";
import { verify } from "../../../actions/UserAction";
import Swal from 'sweetalert2';

function Basic(props) {
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    props.verify({}, (response) => {
      if (response.status === 'success') {
        window.location.href = "/dashboard";
      }
      if (response.status === 'error') {
  
      }
    });
}, []);


  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
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
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={props.handleSubmit(onSubmit)} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );

  function onSubmit(values) {
    props.signIn(values, (response) => {
      if (response.status === 'success') {
        if(response.data.role_type && (response.data.role_type === "admin" || response.data.role_type === "owner")) {
          window.location.href = "/dashboard";
        }else {
          window.location.href = "/grounds";
        }

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
  // const { email_address } = state;
  // const smtp_provider = selector(state, 'smtp_provider');
  return {
    // smtp_setting: email_address.smtp_setting,
    // smtp_provider
  }
}

function validate(values) {
  const errors = {};
  if (!values.from_email) {
    errors.from_email = "Enter From Email";
  }
  if (!values.username) {
    errors.username = "Enter Username";
  }
  if (!values.password) {
    errors.password = "Enter Password";
  }
  if (!values.host) {
    errors.host = "Enter Host";
  }
  if (!values.port) {
    errors.port = "Enter Port";
  }
  if (!values.encryption) {
    errors.encryption = "Select Encryption";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'SignIn',
})(connect(mapStateToProps, { signIn, verify })(Basic));

const selector = formValueSelector('SignIn') // <-- same as form name
