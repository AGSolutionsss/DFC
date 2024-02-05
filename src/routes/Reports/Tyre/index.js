import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import TyreSummaryForm from "./tyreForm";
import TyreSummaryReport from './tyreReport';
import TyreDetailSummaryReport from './tyreDetailReport';
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

const TyreSummary = ({ match }) => (
    <div className="dashboard-wrapper">
        <Helmet>
            <title>DFC</title>
            <meta name="description" content="DFC" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/tyreForm`} />
            <Route path={`${match.url}/tyreForm`} component={TyreSummaryForm} />
            <Route path={`${match.url}/tyreReport`} component={TyreSummaryReport} />
            <Route path={`${match.url}/tyreDetailReport`} component={TyreDetailSummaryReport} />
        </Switch>
    </div>
);

export default TyreSummary;