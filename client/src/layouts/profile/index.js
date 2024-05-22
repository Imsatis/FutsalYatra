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


// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/grounds/components/Header";
import { connect, useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { updateUser, setUserData } from "../../actions/UserAction";
import React, { useEffect } from 'react';


import Swal from 'sweetalert2';

function EditProfile(props) {

  const dispatch = useDispatch();

  const { user } = props;

  useEffect(() => {
    if (user) {
      props.initialize({
        name: user.name,
        email: user.email
      });
    }
  }, [user]);

  return (
    <DashboardLayout>
      <MDBox mb={10} />
      <Header>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Profile
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Your profile details
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <Field name="name" type="text" label="Name" component={({ input, label, meta: { touched, error }, ...custom }) => {
                return <>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    Name
                  </MDTypography>
                  <MDInput label={label}
                    error={touched && error}
                    helperText={touched && error}
                    {...input}
                    {...custom}
                    fullWidth />
                </>
              }} />
            </MDBox>
            <MDBox mb={2}>
              <Field name="email" type="text" label="Email" component={({ input, label, meta: { touched, error }, ...custom }) => {
                return <>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    Email
                  </MDTypography>
                  <MDInput label={label}
                    error={touched && error}
                    helperText={touched && error}
                    {...input}
                    {...custom}
                    fullWidth />
                </>
              }} />
            </MDBox>
            <MDBox mb={2}>
              <Field name="old_password" type="password" label="Old Password" component={({ input, label, meta: { touched, error }, ...custom }) => {
                return <>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    Old Password
                  </MDTypography>
                  <MDInput label={label}
                    error={touched && error}
                    helperText={touched && error}
                    {...input}
                    {...custom}
                    fullWidth />
                </>
              }} />
            </MDBox>
            <MDBox mb={2}>
              <Field name="new_password" type="password" label="New Password" component={({ input, label, meta: { touched, error }, ...custom }) => {
                return <>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    New Password
                  </MDTypography>
                  <MDInput label={label}
                    error={touched && error}
                    helperText={touched && error}
                    {...input}
                    {...custom}
                    fullWidth />
                </>
              }} />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={props.handleSubmit(OnSubmit)} variant="gradient" color="info" fullWidth>
                Update
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );

  function OnSubmit(values) {
    props.updateUser(values, (response) => {
      if (response.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: 'Profile udpated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        dispatch(setUserData(response.data));
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
  const { user } = state;

  return {
    user: user.user_details
  }
}

export default reduxForm({
  form: 'EditProfile',
})(connect(mapStateToProps, { updateUser })(EditProfile));