import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import ServicesSummaryForm from "./servicesForm";
import ServicesSummaryReport from './servicesReport';
import ServicesDetailSummaryReport from './servicesDetailReport';
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

const ServicesSummary = ({ match }) => (
    <div className="dashboard-wrapper">
        <Helmet>
            <title>DFC</title>
            <meta name="description" content="DFC" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/servicesForm`} />
            <Route path={`${match.url}/servicesForm`} component={ServicesSummaryForm} />
            <Route path={`${match.url}/servicesReport`} component={ServicesSummaryReport} />
            <Route path={`${match.url}/servicesDetailReport`} component={ServicesDetailSummaryReport} />
        </Switch>
    </div>
);

export default ServicesSummary;