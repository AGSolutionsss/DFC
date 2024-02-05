import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import TeamSummaryForm from "./teamForm";
import TeamSummaryReport from './teamReport';
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

const TeamSummary = ({ match }) => (
    <div className="dashboard-wrapper">
        <Helmet>
            <title>DFC</title>
            <meta name="description" content="DFC" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/teamForm`} />
            <Route path={`${match.url}/teamForm`} component={TeamSummaryForm} />
            <Route path={`${match.url}/teamReport`} component={TeamSummaryReport} />
        </Switch>
  </div>
);

export default TeamSummary;