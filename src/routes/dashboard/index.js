import React, { Component } from "react";
import { Helmet } from "react-helmet";
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {baseURL} from '../../api';
import dateyear from '.././dateyear';
import {
  TotalSalesWidget,
  NetProfitWidget,
	TaxStatsWidget,
	ExpensesWidget,
  RecentOrdersWidget,
} from "Components/Widgets";
import axios from "axios";
import Moment from 'moment';

const totalSales = {
  label: 'Driver',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const netProfit = {
  label: 'Agencies',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const taxStats = {
  label: 'Vehicles',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const expenses = {
  label: 'Branch',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

 export default class NewsDashboard extends Component {
   state = {
     results: [],
     recentInsu: [],
     recentFc: [],
     recentVI: [],
     currentTrip: [],
   };
   

   componentDidMount() {

    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      
      browserHistory.push("/logout");
      
    }else{

      
    }
     


     axios({
       url: baseURL+"/fetch-dashboard-data-by/"+dateyear,
       method: "GET",
       headers: {
         Authorization: `Bearer ${localStorage.getItem("login")}`,
       },
     })
       .then((res) => {
         this.setState({ results: res.data });
         this.setState({ recentInsu: res.data.vehicles_insurance })
         this.setState({ recentFc: res.data.vehicles_fc })
         this.setState({ recentVI: res.data.vehicles_ideal })
         this.setState({ currentTrip: res.data.current_trip })
         localStorage.setItem("driver_count",this.state.results.driver_count);
         localStorage.setItem("agencies_count",this.state.results.agencies_count);
         localStorage.setItem("vehicles_count",this.state.results.vehicles_count);
         localStorage.setItem("branch_count",this.state.results.branch_count);
       })
       .catch((res) => {
         
         
       });
   }

  render() {
    
     return (
       <div className="news-dashboard-wrapper">
         <Helmet>
           <title>DFC</title>
           <meta name="description" content="Onzone" />
         </Helmet>
         <div className="row">
            <div className="col-sm-3 col-md-3">
                <TotalSalesWidget
                  label={totalSales.label}
                  chartdata={totalSales.chartdata}
                  labels={totalSales.labels}
                  value = {this.state.results.driver_count}
                />
            </div>
            <div className="col-sm-3 col-md-3">
                <NetProfitWidget
                  label={netProfit.label}
                  chartdata={netProfit.chartdata}
                  labels={netProfit.labels}
                  value = {this.state.results.agencies_count}
                />
            </div>
            <div className="col-sm-3 col-md-3">
                <TaxStatsWidget
                  label={taxStats.label}
                  chartdata={taxStats.chartdata}
                  labels={taxStats.labels}
                  value = {this.state.results.vehicles_count}
                />
            </div>
            <div className="col-sm-3 col-md-3">
                <ExpensesWidget
                  label={expenses.label}
                  chartdata={expenses.chartdata}
                  labels={expenses.labels}
                  value = {this.state.results.branch_count}
                />
            </div>
          </div>
          <div className="row">
            <RctCollapsibleCard
              colClasses="col-sm-12 col-md-12 col-lg-12 w-xs-full"
              heading={<IntlMessages id="Recent Purchase Tyres" />}
              collapsible
              reloadable
              closeable
              fullBlock
            >
              <RecentOrdersWidget />
            </RctCollapsibleCard>
          </div>
          <div className="row">
          <RctCollapsibleCard
						colClasses="col-sm-12 col-md-12 col-lg-6 w-xs-full"
						heading={<IntlMessages id="Vehicles Insurance Due" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Reg No</th>
                    <th>Company</th>
                    <th>Branch</th>
                    <th>Insurance Due</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.recentInsu && this.state.recentInsu.map((order, key) => (
                    <tr key={key}>
                      <td>{order.reg_no}</td>
                      <td>{order.vehicle_company}</td>
                      <td>{order.vehicle_branch}</td>
                      <td>{ Moment(order.ins_due).format('DD-MM-YYYY')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
			      </div>
					</RctCollapsibleCard>
          <RctCollapsibleCard
						colClasses="col-sm-12 col-md-12 col-lg-6 w-xs-full"
						heading={<IntlMessages id="Vehicles FC Due" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Reg No</th>
                    <th>Company</th>
                    <th>Branch</th>
                    <th>FC Due</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.recentFc && this.state.recentFc.map((order, key) => (
                    <tr key={key}>
                      <td>{order.reg_no}</td>
                      <td>{order.vehicle_company}</td>
                      <td>{order.vehicle_branch}</td>
                      <td>{ Moment(order.fc_due).format('DD-MM-YYYY')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
			      </div>
					</RctCollapsibleCard>
          </div>
          <div className="row">
          <RctCollapsibleCard
						colClasses="col-sm-12 col-md-12 col-lg-6 w-xs-full"
						heading={<IntlMessages id="Ideal Vehicles" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Reg No</th>
                    <th>Company</th>
                    <th>Branch</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.recentVI && this.state.recentVI.map((order, key) => (
                    <tr key={key}>
                      <td>{order.reg_no}</td>
                      <td>{order.vehicle_company}</td>
                      <td>{order.vehicle_branch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
			      </div>
					</RctCollapsibleCard>
          <RctCollapsibleCard
						colClasses="col-sm-12 col-md-12 col-lg-6 w-xs-full"
						heading={<IntlMessages id="Current Trip" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Reg No</th>
                    <th>Branch</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.currentTrip && this.state.currentTrip.map((order, key) => (
                    <tr key={key}>
                      <td>{ Moment(order.trip_date).format('DD-MM-YYYY')}</td>
                      <td>{order.trip_vehicle}</td>
                      <td>{order.trip_branch}</td>
                      <td>{order.trip_status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
			      </div>
					</RctCollapsibleCard>
          </div>
        </div>
     );
   }
 }
 