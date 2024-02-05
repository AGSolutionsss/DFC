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
export default class NewListTyreInspection extends React.Component {
  state = {
    loader: true,
    users: [],
    tyreData: [],
    columnData: [
      "Tyre No",
      "Branch",
      "Tyre Type",
      "Tyre Make", 
      {
        name: "Actions",
        options:{
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) =>{
            return(
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                <Tooltip title="Select" placement="top">
                  <IconButton
                    aria-label="Select"
                  >
                    <a style={{color:'#5D92F4'}} onClick={(e) => this.updateData(e,value)} >
                      <EditIcon />
                    </a>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Tyre Dead" placement="top">
                  <IconButton
                    aria-label="Tyre Dead"
                  >
                    <a style={{color:'#5D92F4'}} onClick={(e) => this.updateTyreData(e,value)} >
                      <EditIcon />
                    </a>
                  </IconButton>
                </Tooltip>
              </div>
            );
          }
        },
      },
    ],
  };

  updateData = (e,value) => {
    e.preventDefault();
    axios({
      url: baseURL+"/web-update-tyre-inspection/"+value,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
      NotificationManager.success("Data Update Sucessfully");
      this.getData();
      this.setState({ tyreData: res.data.tyre, loader: false });
      
    })
  };

  updateTyreData = (e,value) => {
    e.preventDefault();
    axios({
      url: baseURL+"/web-update-tyre-inspection-dead/"+value,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
      NotificationManager.success("Data Update Sucessfully");
      this.getData();
      this.setState({ tyreData: res.data.tyre, loader: false });
      
    })
  };



  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/web-fetch-tyre-inspection-list",
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
              response[i]["tyre_sub_no"],
              response[i]["tyre_sub_branch"],
              response[i]["tyre_sub_type"],
              response[i]["tyre_sub_make"],
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
              title="Inspection Tyre List"
              match={this.props.match}
            />
            
            <RctCollapsibleCard fullBlock>
              {this.state.tyreData.length > 0 && (
                <MUIDataTable
                  title={"Inspection Tyre List"}
                  data={this.state.tyreData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.tyreData.length <= 0 && (
                <MUIDataTable
                  title={"Inspection Tyre List"}
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