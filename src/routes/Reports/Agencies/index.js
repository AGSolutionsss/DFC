import React from "react";
 import { Redirect, Route, Switch } from "react-router-dom";
 import { Helmet } from "react-helmet";
 
 // async components
 
 import AgenciesSummaryForm from "./agenciesForm";
 import AgenciesSummaryReport from './agenciesReport';
 
 
 import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

 const AgenciesSummary = ({ match }) => (
  <div className="dashboard-wrapper">
   <Helmet>
            <title>DFC</title>
            <meta name="description" content="DFC" />
        </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/agenciesForm`} />
      <Route path={`${match.url}/agenciesForm`} component={AgenciesSummaryForm} />
      <Route path={`${match.url}/agenciesReport`} component={AgenciesSummaryReport} />
    </Switch>
  </div>
);

export default AgenciesSummary;