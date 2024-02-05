import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import TripSummaryForm from "./tripForm";
import TripSummaryReport from './tripReport';
import TripMultipleSummaryReport from './tripMultipleReport';
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

const TripSummary = ({ match }) => (
    <div className="dashboard-wrapper">
        <Helmet>
            <title>DFC</title>
            <meta name="description" content="DFC" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/tripForm`} />
            <Route path={`${match.url}/tripForm`} component={TripSummaryForm} />
            <Route path={`${match.url}/tripReport`} component={TripSummaryReport} />
            <Route path={`${match.url}/tripMultipleReport`} component={TripMultipleSummaryReport} />
        </Switch>
    </div>
);

export default TripSummary;