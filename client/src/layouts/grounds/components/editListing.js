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

import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Checkbox from "@mui/material/Checkbox";
import { editGround, getGround } from "../../../actions/GroundAction";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';


import Swal from 'sweetalert2';

var groundId = "";

const fetchFileFromUrl = async (url, fileName) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], fileName, { type: data.type });
};

function EditListing(props) {
    const { ground_id } = useParams();
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    useEffect(() => {
        console.log("File has been set.")
    }, [file]);

    useEffect(() => {
        if (ground_id) {
            props.getGround(ground_id);
            groundId = ground_id;
        }
    }, [ground_id]);

    useEffect(() => {
        if (props.ground_details) {
            props.initialize({
                name: props.ground_details.name,
                location: props.ground_details.location,
                price: props.ground_details.price,
                shower: props.ground_details.shower,
                changing_room: props.ground_details.changing_room,
                locker: props.ground_details.locker,
                description: props.ground_details.description,
            });
        }
    }, [props.ground_details]);

    useEffect(() => {
        const initializeFileInput = async () => {
            const img_base_url = "http://localhost:1337/images/";
            const file = await fetchFileFromUrl(`${img_base_url}${props.ground_details.ground_image}`, 'ground_img.png'); // Example file name
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.current.files = dataTransfer.files;
            // Trigger the change event to handle file change
            const event = new Event('change', { bubbles: true });
            fileInputRef.current.dispatchEvent(event);
        };

        if (props.ground_details && props.ground_details.ground_image) {
            initializeFileInput();
        }
    }, [props.ground_details]);

    if (!props.ground_details) {
        return;
    }

    return (
        <DashboardLayout>
            <MDBox mb={10} />
            <Header>
                <MDBox pt={2} px={2} lineHeight={1.25}>
                    <MDTypography variant="h6" fontWeight="medium">
                        Edit Ground
                    </MDTypography>
                    <MDBox mb={1}>
                        <MDTypography variant="button" color="text">
                            Edit ground list
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
                            <MDInput name="ground_img" type="file" onChange={_handleImageChange} inputRef={fileInputRef}
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
        const formData = new FormData();
        for (var key in values) {
            formData.append(key, values[key]);
        }
        formData.append('ground_image', file);
        props.editGround(groundId, formData, (response) => {
            if (response.status === 'success') {
                Swal.fire({
                    title: 'Success!',
                    text: 'Ground udpated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

               setTimeout(() => {
                navigate("/grounds")
               }, 4000);
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
}


function mapStateToProps(state) {
    const { grounds, user } = state;

    return {
        ground_details: grounds.ground_details,
        user: user.user_details
    }
}

export default reduxForm({
    form: 'EditListing',
})(connect(mapStateToProps, { getGround, editGround })(EditListing));