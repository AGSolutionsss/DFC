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
import "./comingsoon.css";

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};
export default class NewListComingSoon extends React.Component {
  componentDidMount() {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    
    
  }
  
  render() {
    
    return (
        <div className="data-table-wrapper" style={{display:'flex',justifyContent:'center',backgroundColor: '#dbdbdb'}}>
            <div className="comingsoon">
            </div>
        </div>
    );
  }
}
