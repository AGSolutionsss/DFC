import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import SalarySummaryForm from "./salaryForm";
import SalarySummaryReport from './salaryReport';
import SalaryMultipleSummaryReport from './salaryMultipleReport';
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

const SalarySummary = ({ match }) => (
    <div className="dashboard-wrapper">
        <Helmet>
            <title>DFC</title>
            <meta name="description" content="DFC" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/salaryForm`} />
            <Route path={`${match.url}/salaryForm`} component={SalarySummaryForm} />
            <Route path={`${match.url}/salaryReport`} component={SalarySummaryReport} />
            <Route path={`${match.url}/salaryMultipleReport`} component={SalaryMultipleSummaryReport} />
        </Switch>
    </div>
);

export default SalarySummary;