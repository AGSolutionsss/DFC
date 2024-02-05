import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";
import Add from "./addVehicles";
import Edit from "./editVehicles";
import View from "./viewVehicles";
import Tyre from "./tyreVehicles";
import AddTyre from "./addTyre";
import Details from "./vehicleDetails";

import {
  AsyncEcommerceDashboardComponent,
  AsyncSaasDashboardComponent,
  AsyncAgencyDashboardComponent,
  AsyncNewsDashboardComponent,
} from "Components/AsyncComponent/AsyncComponent";

const NewListVehicles = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>DFC</title>
      <meta name="description" content="DFC" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/add`} component={Add} />
      <Route path={`${match.url}/edit`} component={Edit} />
      <Route path={`${match.url}/view`} component={View} />
      <Route path={`${match.url}/tyre`} component={Tyre} />
      <Route path={`${match.url}/add-tyre`} component={AddTyre} />
      <Route path={`${match.url}/details-tyre`} component={Details} />
    </Switch>
  </div>
);

export default NewListVehicles;