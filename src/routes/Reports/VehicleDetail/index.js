import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import VehicleDetailForm from "./vehicleDetailForm";
import VehicleDetailReport from './vehicleDetailReport';
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

const VehicleDetail = ({ match }) => (
    <div className="dashboard-wrapper">
        <Helmet>
            <title>DFC</title>
            <meta name="description" content="DFC" />
        </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/vehicleForm`} />
      <Route path={`${match.url}/vehicleForm`} component={VehicleDetailForm} />
      <Route path={`${match.url}/vehicleReport`} component={VehicleDetailReport} />
    </Switch>
  </div>
);

export default VehicleDetail;