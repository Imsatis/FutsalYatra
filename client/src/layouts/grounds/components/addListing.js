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
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { useNavigate } from 'react-router-dom';

import Grid from "@mui/material/Grid";

import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Checkbox from "@mui/material/Checkbox";
import { addGround } from "../../../actions/GroundAction";
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import { Input } from '@mui/material';


// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
function AddListing(props) {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("File has been set.")
    }, [file]);

    return (
        <DashboardLayout>
            <MDBox mb={10} />
            <Header>
                <MDBox pt={2} px={2} lineHeight={1.25}>
                    <MDTypography variant="h6" fontWeight="medium">
                        Add Ground
                    </MDTypography>
                    <MDBox mb={1}>
                        <MDTypography variant="button" color="text">
                            Add ground list
                        </MDTypography>
                    </MDBox>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <Field name="name" type="text" label="Name" component={({ input, label, meta: { touched, error }, ...custom }) => {
                                return <>
                                    <MDTypography display="block" variant="button" fontWeight="medium">
                                        Ground Name
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
                            <Field name="price" type="number" label="Price" min="0" component={({ input, label, meta: { touched, error }, ...custom }) => {
                                return <>
                                    <MDTypography display="block" variant="button" fontWeight="medium">
                                        Price
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
                            <Field name="location" type="text" label="Location" component={({ input, label, meta: { touched, error }, ...custom }) => {
                                return <>
                                    <MDTypography display="block" variant="button" fontWeight="medium">
                                        Location
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
                            <Field name="description" type="text" label="Description" component={({ input, label, meta: { touched, error }, ...custom }) => {
                                return <>
                                    <MDTypography display="block" variant="button" fontWeight="medium">
                                        Description
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
                            <MDTypography display="block" variant="button" fontWeight="medium">
                                Ground Image
                            </MDTypography>
                            <MDInput name="ground_img" type="file" onChange={_handleImageChange}
                                fullWidth />
                        </MDBox>

                        <MDBox mb={2}>
                            <Field name="shower" type="checkbox" label="Shower" component={({ input, label, meta: { touched, error }, ...custom }) => {
                                return <>
                                    <MDTypography display="inline-block" variant="button" fontWeight="medium">
                                        Shower
                                    </MDTypography>
                                    <Checkbox label={label}
                                        error={touched && error}
                                        helperText={touched && error}
                                        {...input}
                                        {...custom}
                                        fullWidth />
                                </>
                            }} />
                            <Field name="changing_room" type="checkbox" label="Changing Room" component={({ input, label, meta: { touched, error }, ...custom }) => {
                                return <>
                                    <MDTypography display="inline-block" variant="button" fontWeight="medium">
                                        Changing Room
                                    </MDTypography>
                                    <Checkbox label={label}
                                        error={touched && error}
                                        helperText={touched && error}
                                        {...input}
                                        {...custom}
                                        fullWidth />
                                </>
                            }} />
                            <Field name="locker" type="checkbox" label="Locker" component={({ input, label, meta: { touched, error }, ...custom }) => {
                                return <>
                                    <MDTypography display="inline-block" variant="button" fontWeight="medium">
                                        Locker
                                    </MDTypography>
                                    <Checkbox label={label}
                                        error={touched && error}
                                        helperText={touched && error}
                                        {...input}
                                        {...custom}
                                        fullWidth />
                                </>
                            }} />

                        </MDBox>
                        <MDBox mt={4} mb={1}>
                            <MDButton onClick={props.handleSubmit(onSubmit)} variant="gradient" color="info" fullWidth>
                                Add
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </Header>
            <Footer />
        </DashboardLayout>
    );


    function _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let image = e.target.files[0];

        if (!image) {
            return console.error("No file selected");;
        }

        if (image.size > 204800) {
            return 'Maximum size limit exceed';
        }

        reader.readAsDataURL(image);

        reader.onloadend = () => {
            setFile(image);
        }
    }

    function onSubmit(values) {
        const formData = new FormData();
        for (var key in values) {
            formData.append(key, values[key]);
        }
        formData.append('ground_image', file);
        props.addGround(formData, (response) => {
            if (response.status === 'success') {
                Swal.fire({
                    title: 'Success!',
                    text: 'Ground added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                navigate("/grounds")
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

export default reduxForm({
    form: 'AddListing',
})(connect(mapStateToProps, { addGround })(AddListing));

const selector = formValueSelector('AddListing') // <-- same as form name