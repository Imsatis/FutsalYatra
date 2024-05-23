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

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

import { Provider, useDispatch } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers/';
import callApi from './functions/callApi';
import { setUserData } from './actions/UserAction';
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const container = document.getElementById("app");
const root = createRoot(container);
const BASE_URL = "http://localhost:3000/";

(async function () {
  var url = window.location.pathname;
  if (url.indexOf('/logout') > 0) {
    window.location.assign(`${BASE_URL}authentication/sign-in`);
  } else {
    await VerifyUser();
  }

  setTimeout(() => {
    root.render(
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <Provider store={store} >
            <App />
          </Provider>
        </MaterialUIControllerProvider>
      </BrowserRouter>
    );
  }, 100);
})();

async function VerifyUser() {
  var url = window.location.pathname;
  var host = window.location.host;
  if (url.indexOf('/list-grounds') < 0) {
    await callApi('verify', 'GET', {}, (response) => {
      if (response.status === 'success') {
        if (url === '/') {
          window.location.assign('/app/');
        }
        else if (url.indexOf('signin') > 0 || url.indexOf('signup') > 0) {
          window.location.assign('/app/');
        }

        store.dispatch(setUserData(response.data));
      } else {
        //If not logged in and not on sign and signup page
        if (url.indexOf('/authentication/sign-in') < 0 &&
          url.indexOf('/authentication/sign-up') < 0) {
          window.location.assign(`${BASE_URL}authentication/sign-in`);
        }
      }
    });
  }
}
