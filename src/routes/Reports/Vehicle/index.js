import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import VehicleSummaryForm from "./vehicleForm";
import VehicleSummaryReport from './vehicleReport';
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

const VehicleSummary = ({ match }) => (
    <div className="dashboard-wrapper">
        <Helmet>
            <title>DFC</title>
            <meta name="description" content="DFC" />
        </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/vehicleForm`} />
      <Route path={`${match.url}/vehicleForm`} component={VehicleSummaryForm} />
      <Route path={`${match.url}/vehicleReport`} component={VehicleSummaryReport} />
    </Switch>
  </div>
);

export default VehicleSummary;