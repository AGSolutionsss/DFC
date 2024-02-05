import React from "react";
 import { Redirect, Route, Switch } from "react-router-dom";
 import { Helmet } from "react-helmet";
 
 // async components
 
 import PaymentSummaryForm from "./paymentForm";
 import PaymentSummaryReport from './paymentReport';
 
 
 import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

 const PaymentSummary = ({ match }) => (
  <div className="dashboard-wrapper">
   <Helmet>
            <title>DFC</title>
            <meta name="description" content="DFC" />
        </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/paymentDetailsForm`} />
      <Route path={`${match.url}/paymentDetailsForm`} component={PaymentSummaryForm} />
      <Route path={`${match.url}/paymentDetailsReport`} component={PaymentSummaryReport} />
    </Switch>
  </div>
);

export default PaymentSummary;