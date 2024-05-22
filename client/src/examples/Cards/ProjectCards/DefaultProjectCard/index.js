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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import { Rating } from '@smastrom/react-rating';
import Icon from "@mui/material/Icon";
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { deleteGround, listGrounds } from "../../../../actions/GroundAction";
import { useSelector } from 'react-redux';


function DefaultProjectCard({ image, label, title, description, action, authors, rating, id }) {

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipOpen(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipOpen(false);
  };

  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <MDAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  const user = useSelector(state => state.user.user_details);
  console.log(user)
  return (
    <Card
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      {isTooltipOpen && <MDBox ml="auto" lineHeight={0} color={"black"} style={{ position: "absolute", top: "5px", right: "10px", zIndex: "1111", display: "grid" }}>
       {user.role_type !== "player" ?  <>
          <Tooltip title="Edit Ground" placement="right" enterDelay={500} leaveDelay={200}>
            <Icon sx={{ cursor: "pointer" }} fontSize="small" onClick={() => {
              window.location.assign(`/edit-ground/${id}`);
            }}>
              edit
            </Icon>
          </Tooltip>

          <Tooltip title="Delete Ground" placement="right" enterDelay={500} leaveDelay={200}>
            <Icon sx={{ cursor: "pointer" }} fontSize="small" onClick={() => {
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
                  deleteGround(id, (response) => {
                    if (response.status === 'success') {
                      Swal.fire({
                        title: 'Success!',
                        text: 'Ground deleted successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                      });

                      listGrounds();
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
                }
              });
            }}>
              delete
            </Icon>
          </Tooltip>
        </>: ""}
      </MDBox>
      }
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </MDBox>
      <MDBox mt={1} mx={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
          {label}
        </MDTypography>
        <MDBox mb={1}>
          {action.type === "internal" ? (
            <MDTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          ) : (
            <MDTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          )}
          <Rating
            style={{ maxWidth: 110, display: "inline-flex", top: "2px", left: "2px" }}
            value={rating}
            readOnly
          />
        </MDBox>
        <MDBox mb={3} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          {action.type === "internal" ? (
            <MDButton
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </MDButton>
          ) : (
            <MDButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </MDButton>
          )}
          <MDBox display="flex">{renderAuthors}</MDBox>
        </MDBox>
      </MDBox>
    </Card >
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProjectCard;
