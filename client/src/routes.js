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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Bookings from "layouts/bookings";
import Transactions from "layouts/transactions";
import Users from "layouts/users";
import ShowGround from "layouts/show-ground";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Grounds from "layouts/grounds";
import AddListing from "layouts/grounds/components/addListing";
import EditListing from "layouts/grounds/components/editListing";
import EditProfile from "layouts/profile";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Grounds",
    key: "grounds",
    icon: <Icon fontSize="small">Grounds</Icon>,
    route: "/grounds",
    component: <Grounds />,
  },
  {
    type: "collapse",
    name: "Bookings",
    key: "bookings",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/bookings",
    component: <Bookings />,
  },
  {
    type: "collapse",
    name: "Transactions",
    key: "transactions",
    icon: <Icon fontSize="small">Transaction</Icon>,
    route: "/transactions",
    component: <Transactions />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">Profile</Icon>,
    route: "/profile",
    component: <EditProfile />,
    disabled: true
  },
  {
    type: "onlyRoute",
    name: "addListing",
    key: "add_listing",
    icon: <Icon fontSize="small">Add Listing</Icon>,
    route: "/add-listing",
    component: <AddListing />,
    disabled: true
  },
  {
    type: "onlyRoute",
    name: "editListing",
    key: "edit_listing",
    icon: <Icon fontSize="small">Edit Listing</Icon>,
    route: "/edit-ground/:ground_id",
    component: <EditListing />,
    disabled: true
  },
  {
    type: "onlyRoute",
    name: "Show Ground",
    key: "show-ground",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/show-ground/:ground_id",
    component: <ShowGround />
  },
  {
    type: "onlyRoute",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />
  },
  {
    type: "onlyRoute",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />
  },
];

export default routes;
