import React from "react";
 import { Redirect, Route, Switch } from "react-router-dom";
 import { Helmet } from "react-helmet";
 
 // async components
 
 import VendorSummaryForm from "./vendorForm";
 import VendorSummaryReport from './vendorReport';
 
 
 import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

 const VendorSummary = ({ match }) => (
  <div className="dashboard-wrapper">
   <Helmet>
            <title>DFC</title>
            <meta name="description" content="DFC" />
        </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/vendorForm`} />
      <Route path={`${match.url}/vendorForm`} component={VendorSummaryForm} />
      <Route path={`${match.url}/vendorReport`} component={VendorSummaryReport} />
    </Switch>
  </div>
);

export default VendorSummary;