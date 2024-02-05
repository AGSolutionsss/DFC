import React, { Component } from 'react';
import {baseURL} from '../../api';
import axios from "axios";
import dateyear from '../../routes/dateyear';
import Moment from 'moment';
import NumberFormat from 'react-number-format';

class RecentOrders extends Component {

	state = {
		recentOrders: null
	}

	componentDidMount() {
		this.getRecentOrders();
	}
	getRecentOrders() {

		axios({
			url: baseURL+"/fetch-dashboard-data-by/"+dateyear,
			method: "GET",
			headers: {
			  Authorization: `Bearer ${localStorage.getItem("login")}`,
			},
		  })
			.then((res) => {
			  this.setState({ recentOrders: res.data.tyre_purchase });
			})
			.catch((res) => {
			  
			  
			});
	}

	render() {
		const { recentOrders } = this.state;
		return (
			<div className="table-responsive">
				<table className="table table-hover mb-0">
					<thead>
						<tr>
							<th>Date</th>
							<th>Company</th>
							<th>Branch</th>
							<th>Supplier</th>
							<th>Bill Ref</th>
							<th>Amount</th>
							<th>No of Tyres</th>
						</tr>
					</thead>
					<tbody>
						{recentOrders && recentOrders.map((order, key) => (
							<tr key={key}>
								<td>{ Moment(order.tyre_date).format('DD-MM-YYYY')}</td>
								<td>{order.tyre_company}</td>
								<td>{order.tyre_branch}</td>
								<td>{order.tyre_supplier}</td>
								<td>{order.tyre_bill_ref}</td>
								<td>
									<NumberFormat 
										thousandSeparator={true} 
										thousandsGroupStyle="lakh"
										displayType={'text'}
										prefix={'₹ '} 
										value={order.tyre_bill_amount}
									/>
								</td>
								<td>{order.tyre_count}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default RecentOrders;
