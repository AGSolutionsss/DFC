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
import NumberFormat from 'react-number-format';

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};
export default class NewListBranch extends React.Component {
  state = {
    loader: true,
    users: [],
    branchData: [],
    columnData: [
      {
        name: "#",
        options: {
          filter: false,
          print:false,
          download:false,
        }
      },
      "Branch",
      "Salary Type",
      {
        name: "Bata for 6W KM",
        options: {
          filter: false,
        }
      },
      
      {
        name: "Bata for 10W KM",
        options: {
          filter: false,
        }
      },
      
      {
        name: "Salary for 6W",
        options: {
          filter: false,
        }
      },
      {
        name: "Salary for 10W",
        options: {
          filter: false,
        }
      },
      {
        name: "Incentive for 6W",
        options: {
          filter: false,
        }
      },
      {
        name: "Incentive for 10W",
        options: {
          filter: false,
        }
      },
      {
        name: "Bata for 6W Day",
        options: {
          filter: false,
        }
      },
      {
        name: "Bata for 10W Day",
        options: {
          filter: false,
        }
      },
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
      url: baseURL+"/web-fetch-branch-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.branch;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              response[i]["branch_name"],
              response[i]["branch_salary_type"],
              <NumberFormat 
                thousandSeparator={true} 
                thousandsGroupStyle="lakh"
                displayType={'text'}
                prefix={'₹ '} 
                value={response[i]["branch_bata_for_km_6W"]}
            />,
            
            <NumberFormat 
                thousandSeparator={true} 
                thousandsGroupStyle="lakh"
                displayType={'text'}
                prefix={'₹ '} 
                value={response[i]["branch_bata_for_km_10W"]}
            />,
            
            <NumberFormat 
                thousandSeparator={true} 
                thousandsGroupStyle="lakh"
                displayType={'text'}
                prefix={'₹ '} 
                value={response[i]["branch_salary_6W"]}
            />,
            <NumberFormat 
                thousandSeparator={true} 
                thousandsGroupStyle="lakh"
                displayType={'text'}
                prefix={'₹ '} 
                value={response[i]["branch_salary_10W"]}
            />,
            <NumberFormat 
                thousandSeparator={true} 
                thousandsGroupStyle="lakh"
                displayType={'text'}
                prefix={'₹ '} 
                value={response[i]["branch_incentive_6W"]}
            />,
            <NumberFormat 
                thousandSeparator={true} 
                thousandsGroupStyle="lakh"
                displayType={'text'}
                prefix={'₹ '} 
                value={response[i]["branch_incentive_10W"]}
            />,
            <NumberFormat 
                thousandSeparator={true} 
                thousandsGroupStyle="lakh"
                displayType={'text'}
                prefix={'₹ '} 
                value={response[i]["branch_bata_for_trip_6W"]}
            />,
            <NumberFormat 
                thousandSeparator={true} 
                thousandsGroupStyle="lakh"
                displayType={'text'}
                prefix={'₹ '} 
                value={response[i]["branch_bata_for_trip_10W"]}
            />,
              response[i]["branch_status"],
              response[i]["id"],
            ]);
          
        }
        this.setState({ branchData: tempRows, loader: false });
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
              title="Branch List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype == 2 ? "inline-block" : "none" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Branch
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.branchData.length > 0 && (
                <MUIDataTable
                  title={"Branch List"}
                  data={this.state.branchData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.branchData.length <= 0 && (
                <MUIDataTable
                  title={"Branch List"}
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
