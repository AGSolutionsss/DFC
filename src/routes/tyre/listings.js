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
import VisibilityIcon from "@material-ui/icons/Visibility";
import NumberFormat from 'react-number-format';

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};
export default class NewListTyre extends React.Component {
  state = {
    loader: true,
    users: [],
    tyreData: [],
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
      "Company",
      "Branch",
      "Supplier",
      "Bill Ref",
      {
        name: "Amount",
        options: {
          filter: false,
        }
      },
      "No of Tyres",
      "Status",
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
                <Tooltip title="View" placement="top">
                  <IconButton aria-label="View">
                    <Link
                    style={{
                      display: this.state.usertype == 4 ? "none" : "",
                    }}
                      to={"view?id=" + value}
                    >
                      <VisibilityIcon />
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
      url: baseURL+"/web-fetch-tyre-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.tyre;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              Moment(response[i]["tyre_date"]).format('DD-MM-YYYY'),
              response[i]["tyre_company"],
              response[i]["tyre_branch"],
              response[i]["tyre_supplier"],
              response[i]["tyre_bill_ref"],
              <NumberFormat 
                thousandSeparator={true} 
                thousandsGroupStyle="lakh"
                displayType={'text'}
                prefix={'₹ '} 
                value={response[i]["tyre_bill_amount"]}
            />,
              response[i]["tyre_count"],
              response[i]["tyre_status"],
              response[i]["id"],
            ]);
          
        }
        this.setState({ tyreData: tempRows, loader: false });
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
              title="Purchase Tyre List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype == 2 ? "inline-block" : "none" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Purchase Tyre
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.tyreData.length > 0 && (
                <MUIDataTable
                  title={"Purchase Tyre List"}
                  data={this.state.tyreData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.tyreData.length <= 0 && (
                <MUIDataTable
                  title={"Purchase Tyre List"}
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
