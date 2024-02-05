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

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};
export default class NewListVehicles extends React.Component {
  state = {
    loader: true,
    users: [],
    vehicleData: [],
    columnData: [
      {
        name: "#",
        options: {
          filter: false,
          print:false,
          download:false,
        }
      },
      "Register No",
      "Vehicle Type",
      "Company",
      {
        name: localStorage.getItem('user_type_id') == '2' ? "Branch" : ""
      },
      "Modal Year",
      "Insurance Due",
      "Permit Due",
      "FC Due",
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
                <Tooltip title="Full Details" placement="top">
                  <IconButton aria-label="Full Details">
                    <Link
                    style={{
                      display: this.state.usertype == 4 ? "none" : "",
                    }}
                      to={"details-tyre?id=" + value}
                    >
                      <i className="zmdi zmdi-truck"></i>
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
      url: baseURL+"/web-fetch-vehicles-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.vehicles;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              response[i]["reg_no"],
              response[i]["vehicle_type"],
              response[i]["vehicle_company"],
              (localStorage.getItem('user_type_id') == '2' ? response[i]["vehicle_branch"] : ""),
              response[i]["mfg_year"],
              (response[i]["ins_due"] == null ? "" : Moment(response[i]["ins_due"]).format('DD-MM-YYYY')),
              (response[i]["permit_due"] == null ? "" : Moment(response[i]["permit_due"]).format('DD-MM-YYYY')),
              (response[i]["fc_due"] == null ? "" : Moment(response[i]["fc_due"]).format('DD-MM-YYYY')),
              response[i]["vehicle_status"],
              response[i]["id"],
            ]);
          
        }
        this.setState({ vehicleData: tempRows, loader: false });
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
              title="Vehicles List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype == 2 ? "inline-block" : "none" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Vehicles
                </Button>
              </Link>
              <Link className="btn btn-outline-light" to="add-tyre">
                <Button
                  style={{ display: usertype == 2 ? "inline-block" : "none" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Tyre
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.vehicleData.length > 0 && (
                <MUIDataTable
                  title={"Vehicles List"}
                  data={this.state.vehicleData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.vehicleData.length <= 0 && (
                <MUIDataTable
                  title={"Vehicles List"}
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
