import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";
import Add from "./addDriver";
import Edit from "./editDriver";
import View from "./viewDriver";
import {
  AsyncEcommerceDashboardComponent,
  AsyncSaasDashboardComponent,
  AsyncAgencyDashboardComponent,
  AsyncNewsDashboardComponent,
} from "Components/AsyncComponent/AsyncComponent";

const NewListDriver = ({ match }) => (
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
    </Switch>
  </div>
);

export default NewListDriver;