import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import {baseURL} from '../../api';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import Moment from 'moment';
import NumberFormat from 'react-number-format';

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};
export default class NewListPaymentDetails extends React.Component {
  state = {
    loader: true,
    users: [],
    paymentData: [],
    columnData: [
      {
        name: "#",
        options: {
          filter: false,
          print:false,
          download:false,
        }
      },
      "Date",
      "Voucher Type",
      "Debit",
      "Credit",
      {
        name: "Amount",
        options: {
          filter: false,
        }
      },
      {
        name: "Actions",
        options: {
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    aria-label="Edit"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 1
                        ? "none" : "",
                    }}
                  >
                    <Link to={"edit?id=" + value}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
              </div>
            );
          },
        },
      },
    ],
  };
  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/web-fetch-payment-details-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.payment;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              Moment(response[i]["payment_details_date"]).format('DD-MM-YYYY'),
              response[i]["payment_details_voucher_type"],
              response[i]["payment_details_debit"],
              response[i]["payment_details_credit"],
              <NumberFormat 
                thousandSeparator={true} 
                thousandsGroupStyle="lakh"
                displayType={'text'}
                prefix={'₹ '} 
                value={response[i]["payment_details_amount"]}
            />,
              response[i]["id"],
            ]);
          
        }
        this.setState({ paymentData: tempRows, loader: false });
      })
      .catch((res) => {
        this.setState({ loader: false });
      });
  };
  componentDidMount() {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    
    this.getData();
  }
  
  render() {
    const { loader } = this.state;
    let usertype = localStorage.getItem("user_type_id");
    return (
      <div className="data-table-wrapper">
        {loader && (
          <CircularProgress
            disableShrink
            style={{
              marginLeft: "600px",
              marginTop: "300px",
              marginBottom: "300px",
            }}
            color="secondary"
          />
        )}
        {!loader && (
          <>
            <PageTitleBar
              title="Payment Details List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype == 2 ? "inline-block" : "none" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Payment
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.paymentData.length > 0 && (
                <MUIDataTable
                  title={"Payment Details List"}
                  data={this.state.paymentData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.paymentData.length <= 0 && (
                <MUIDataTable
                  title={"Payment Details List"}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
            </RctCollapsibleCard>
          </>
        )}
      </div>
    );
  }
}
