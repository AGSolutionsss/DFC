import React from "react";
 import { Redirect, Route, Switch } from "react-router-dom";
 import { Helmet } from "react-helmet";
 
 // async components
 
 import DriverSummaryForm from "./driverForm";
 import DriverSummaryReport from './driverReport';
 
 
 import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

 const DriverSummary = ({ match }) => (
  <div className="dashboard-wrapper">
   <Helmet>
            <title>DFC</title>
            <meta name="description" content="DFC" />
        </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/driverForm`} />
      <Route path={`${match.url}/driverForm`} component={DriverSummaryForm} />
      <Route path={`${match.url}/driverReport`} component={DriverSummaryReport} />
    </Switch>
  </div>
);

export default DriverSummary;