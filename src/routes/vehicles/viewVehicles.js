import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RctCard } from "Components/RctCard/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../api';
import Moment from 'moment';
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";

const labelslabel = {
    
    fontSize: '16px',
    fontWeight: '400',
    paddingTop:'5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    height: '30px !important',
    margin: '0px !important',
    color: "rgb(0, 0, 0)",
};

const labelslabelSpan = {
    fontWeight: '500',
    fontSize: '16px',
    paddingTop:'5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
}

const labelTable1 = {
    width:'30%'
}

const labelTable2 = {
    width:'7%',
    textAlign: 'center',
    border: '1px solid black',
}

const labelTable3 = {
    width:'63%'
}

const labelBorder = {
    paddingTop:'5px',
    border:'1px solid #4d4b4b',
}

const tyrelabel = {
    border: '1px solid #4d4b4b',
    textAlign:'center',
}

const tyreValue = {
    border: '1px solid #4d4b4b',
}

const tyreValue1 = {
    border: '1px solid #4d4b4b',
    textAlign:'center',
}

export default function Invoice(props) {
  const componentRef = useRef();
  let history = useHistory();
  const [vehicle, setVehicle] = useState({});
  const [tyre, setTyre] = useState({});
  const [loader, setLoader]= useState(true);
  
    useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    axios({
      url: baseURL+"/web-fetch-vehicles-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setVehicle(res.data.vehicles);
      setLoader(false)
      
    });
  }, []);

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    axios({
      url: baseURL+"/web-fetch-vehicles-tyre-sub/" + vehicle.reg_no,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        setTyre(res.data.vehiceltyresub);
        setLoader(false)
      
    });
  }, [vehicle.reg_no]);

  const updateData = (e, value) => {
    e.preventDefault();
    console.log(value.includes('#') && value.substr(value.lastIndexOf('#') + 1).split(' ')[0]);
    localStorage.setItem('tyre_sub_id',value.substring(0, value.indexOf('#')));
    localStorage.setItem('tyre_position',value.includes('#') && value.substr(value.lastIndexOf('#') + 1).split(' ')[0]);
    localStorage.setItem('vehicle_no',vehicle.reg_no);
    localStorage.setItem('vehicle_branch',vehicle.vehicle_branch);
    history.push('tyre');
}
 
return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
        <div className="invoice-wrapper">
            <PageTitleBar title="View" match={props.match} />
            <div className="row">
                <div className="col-sm-12 col-md-12 col-xl-12 mx-auto" style={{width:'auto'}}>
                    <RctCard>
                        <div className="invoice-head text-right">
                            <ul className="list-inline">
                                <li>
                                    <ReactToPrint
                                    trigger={() => (
                                        <a>
                                        <i className="mr-10 ti-printer"></i> Print
                                        </a>
                                    )}
                                    content={() => componentRef.current}
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="p-10" ref={componentRef} style={{margin: '5px'}}>
                            <div className="d-flex pb-10 pl-30" style={{justifyContent:'flex-start'}}>
                                <div className="address text-center">
                                    <h1>{vehicle.reg_no}</h1>
                                </div>
                            </div>
                            <div className="table-responsive" style={{padding:'20px'}}>
                                <div className="row">
                                    <div className="col-md-6 col-6">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Branch</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vehicle.vehicle_branch}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Company</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vehicle.vehicle_company}
                                                    </span>
                                                </th>
                                            </tr> 
                                            
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Vehicle Type</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vehicle.vehicle_type}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Modal Year</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vehicle.mfg_year}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Open KM</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vehicle.vehicle_open_km}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Open HSD</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vehicle.vehicle_hsd_open}
                                                    </span>
                                                </th>
                                            </tr> 
                                        </table>    
                                    </div>
                                    <div className="col-md-6 col-6">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Insurance Due</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {(vehicle.ins_due == null ? "" : Moment(vehicle.ins_due).format('DD-MM-YYYY'))}
                                                    </span>
                                                </th>
                                            </tr>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Permit Due</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {(vehicle.permit_due == null ? "" : Moment(vehicle.permit_due).format('DD-MM-YYYY'))}
                                                    </span>
                                                </th>
                                            </tr>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>FC Due</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {(vehicle.fc_due == null ? "" : Moment(vehicle.fc_due).format('DD-MM-YYYY'))}
                                                    </span>
                                                </th>
                                            </tr>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Mileage</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                       {vehicle.vehicle_mileage}
                                                    </span>
                                                </th>
                                            </tr>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Driver</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                       {vehicle.vehicle_driver} {" - "} {vehicle.vehicle_driver_no}
                                                    </span>
                                                </th>
                                            </tr>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>No of Cylinder</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                       {vehicle.no_of_gas_cylinder}
                                                    </span>
                                                </th>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex pl-30" style={{justifyContent:'flex-start'}}>
                                <div className="address text-center">
                                    <h1>TYRE</h1>
                                </div>
                            </div>
                            {tyre != 0 && (
                            <div className="table-responsive" style={{padding:'20px'}}>
                                <div className="row">
                                    <div className="col-md-12 col-12">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={tyrelabel}>
                                                    <span style={labelslabel}>Tyre Position</span>    
                                                </th>    
                                                <th style={tyrelabel}>
                                                    <span style={labelslabel}>Tyre No</span>    
                                                </th>
                                                <th style={tyrelabel}>
                                                    <span style={labelslabel}>Date</span>    
                                                </th>
                                                <th style={tyrelabel}>
                                                    <span style={labelslabel}>KM</span>    
                                                </th>
                                                <th style={tyrelabel}>
                                                    <span style={labelslabel}>Status</span>    
                                                </th>
                                                <th style={tyrelabel}>
                                                    <span style={labelslabel}>Action</span>    
                                                </th>
                                            </tr> 
                                            {vehicle.vehicle_type != 'Other' && (
                                                <tr style={labelBorder}>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	1. Front Left
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_1_front_left_no}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{(tyre.tyre_assign_1_front_left_date == null ? "" : Moment(tyre.tyre_assign_1_front_left_date).format('DD-MM-YYYY'))}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_1_front_left_km}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_1_front_left_status}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue1}>
                                                        <span style={labelslabelSpan}>
                                                        	<Tooltip title="Change Tyre" placement="top">
                                                                <a style={{color:'#5D92F4'}} onClick={(e) => updateData(e,tyre.id+"#tyre_assign_1_front_left_no")} >
                                                                    <EditIcon />
                                                                </a>
                                                            </Tooltip>
                                                        </span>
                                                    </th>
                                                </tr>
                                            )}
                                            {vehicle.vehicle_type != 'Other' && (
                                                <tr style={labelBorder}>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            2. Front Right
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_2_front_right_no}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{(tyre.tyre_assign_2_front_right_date == null ? "" : Moment(tyre.tyre_assign_2_front_right_date).format('DD-MM-YYYY'))}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_2_front_right_km}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_2_front_right_status}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue1}>
                                                        <span style={labelslabelSpan}>
                                                        	<Tooltip title="Change Tyre" placement="top">
                                                                <a style={{color:'#5D92F4'}} onClick={(e) => updateData(e,tyre.id+"#tyre_assign_2_front_right_no")} >
                                                                    <EditIcon />
                                                                </a>
                                                            </Tooltip>
                                                        </span>
                                                    </th>
                                                </tr>
                                            )}
                                            {vehicle.vehicle_type == '6W Truck' && (
                                                <tr style={labelBorder}>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            3. Back Left
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_3_back_left_no}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{(tyre.tyre_assign_3_back_left_date == null ? "" : Moment(tyre.tyre_assign_3_back_left_date).format('DD-MM-YYYY'))}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_3_back_left_km}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_3_back_left_status}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue1}>
                                                        <span style={labelslabelSpan}>
                                                        	<Tooltip title="Change Tyre" placement="top">
                                                                <a style={{color:'#5D92F4'}} onClick={(e) => updateData(e,tyre.id+"#tyre_assign_3_back_left_no")} >
                                                                    <EditIcon />
                                                                </a>
                                                            </Tooltip>
                                                        </span>
                                                    </th>
                                                </tr>
                                            )}
                                            {vehicle.vehicle_type == '6W Truck' && (
                                                <tr style={labelBorder}>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            4. Back Left
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_4_back_left_no}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{(tyre.tyre_assign_4_back_left_date == null ? "" : Moment(tyre.tyre_assign_4_back_left_date).format('DD-MM-YYYY'))}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_4_back_left_km}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_4_back_left_status}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue1}>
                                                        <span style={labelslabelSpan}>
                                                        	<Tooltip title="Change Tyre" placement="top">
                                                                <a style={{color:'#5D92F4'}} onClick={(e) => updateData(e,tyre.id+"#tyre_assign_4_back_left_no")} >
                                                                    <EditIcon />
                                                                </a>
                                                            </Tooltip>
                                                        </span>
                                                    </th>
                                                </tr>
                                            )}
                                            {vehicle.vehicle_type == '6W Truck' && (
                                                <tr style={labelBorder}>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            5. Back Right
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_5_back_right_no}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{(tyre.tyre_assign_5_back_right_date == null ? "" : Moment(tyre.tyre_assign_5_back_right_date).format('DD-MM-YYYY'))}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_5_back_right_km}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_5_back_right_status}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue1}>
                                                        <span style={labelslabelSpan}>
                                                        	<Tooltip title="Change Tyre" placement="top">
                                                                <a style={{color:'#5D92F4'}} onClick={(e) => updateData(e,tyre.id+"#tyre_assign_5_back_right_no")} >
                                                                    <EditIcon />
                                                                </a>
                                                            </Tooltip>
                                                        </span>
                                                    </th>
                                                </tr>
                                            )}
                                            {vehicle.vehicle_type == '6W Truck' && (
                                                <tr style={labelBorder}>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            6. Back Right
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_6_back_right_no}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{(tyre.tyre_assign_6_back_right_date == null ? "" : Moment(tyre.tyre_assign_6_back_right_date).format('DD-MM-YYYY'))}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_6_back_right_km}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                        	{tyre.tyre_assign_6_back_right_status}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue1}>
                                                        <span style={labelslabelSpan}>
                                                        	<Tooltip title="Change Tyre" placement="top">
                                                                <a style={{color:'#5D92F4'}} onClick={(e) => updateData(e,tyre.id+"#tyre_assign_6_back_right_no")} >
                                                                    <EditIcon />
                                                                </a>
                                                            </Tooltip>
                                                        </span>
                                                    </th>
                                                </tr>
                                            )}
                                            {vehicle.vehicle_type == '10W Truck' && (
                                                <tr style={labelBorder}>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            3. Back Housing Left
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_3_back_housing_left_no}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {(tyre.tyre_assign_3_back_housing_left_date == null ? "" : Moment(tyre.tyre_assign_3_back_housing_left_date).format('DD-MM-YYYY'))}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_3_back_housing_left_km}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_3_back_housing_left_status}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue1}>
                                                        <span style={labelslabelSpan}>
                                                            <Tooltip title="Change Tyre" placement="top">
                                                                <a style={{color:'#5D92F4'}} onClick={(e) => updateData(e,tyre.id+"#tyre_assign_3_back_housing_left_no")} >
                                                                    <EditIcon />
                                                                </a>
                                                            </Tooltip>
                                                        </span>
                                                    </th>
                                                </tr>
                                            )}
                                            {vehicle.vehicle_type == '10W Truck' && (
                                                <tr style={labelBorder}>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            4. Back Housing Left
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_4_back_housing_left_no}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {(tyre.tyre_assign_4_back_housing_left_date == null ? "" : Moment(tyre.tyre_assign_4_back_housing_left_date).format('DD-MM-YYYY'))}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_4_back_housing_left_km}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_4_back_housing_left_status}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue1}>
                                                        <span style={labelslabelSpan}>
                                                            <Tooltip title="Change Tyre" placement="top">
                                                                <a style={{color:'#5D92F4'}} onClick={(e) => updateData(e,tyre.id+"#tyre_assign_4_back_housing_left_no")} >
                                                                    <EditIcon />
                                                                </a>
                                                            </Tooltip>
                                                        </span>
                                                    </th>
                                                </tr>
                                            )}
                                            {vehicle.vehicle_type == '10W Truck' && (
                                                <tr style={labelBorder}>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            5. Back Dummy Left
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_5_back_dummy_left_no}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {(tyre.tyre_assign_5_back_dummy_left_date == null ? "" : Moment(tyre.tyre_assign_5_back_dummy_left_date).format('DD-MM-YYYY'))}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_5_back_dummy_left_km}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_5_back_dummy_left_status}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue1}>
                                                        <span style={labelslabelSpan}>
                                                            <Tooltip title="Change Tyre" placement="top">
                                                                <a style={{color:'#5D92F4'}} onClick={(e) => updateData(e,tyre.id+"#tyre_assign_5_back_dummy_left_no")} >
                                                                    <EditIcon />
                                                                </a>
                                                            </Tooltip>
                                                        </span>
                                                    </th>
                                                </tr>
                                            )}
                                            {vehicle.vehicle_type == '10W Truck' && (
                                                <tr style={labelBorder}>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            6. Back Dummy Left
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_6_back_dummy_left_no}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {(tyre.tyre_assign_6_back_dummy_left_date == null ? "" : Moment(tyre.tyre_assign_6_back_dummy_left_date).format('DD-MM-YYYY'))}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_6_back_dummy_left_km}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_6_back_dummy_left_status}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue1}>
                                                        <span style={labelslabelSpan}>
                                                            <Tooltip title="Change Tyre" placement="top">
                                                                <a style={{color:'#5D92F4'}} onClick={(e) => updateData(e,tyre.id+"#tyre_assign_6_back_dummy_left_no")} >
                                                                    <EditIcon />
                                                                </a>
                                                            </Tooltip>
                                                        </span>
                                                    </th>
                                                </tr>
                                            )}
                                            {vehicle.vehicle_type == '10W Truck' && (
                                                <tr style={labelBorder}>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            7. Back Housing Right
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_7_back_housing_right_no}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {(tyre.tyre_assign_7_back_housing_right_date == null ? "" : Moment(tyre.tyre_assign_7_back_housing_right_date).format('DD-MM-YYYY'))}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_7_back_housing_right_km}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_7_back_housing_right_status}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue1}>
                                                        <span style={labelslabelSpan}>
                                                            <Tooltip title="Change Tyre" placement="top">
                                                                <a style={{color:'#5D92F4'}} onClick={(e) => updateData(e,tyre.id+"#tyre_assign_7_back_housing_right_no")} >
                                                                    <EditIcon />
                                                                </a>
                                                            </Tooltip>
                                                        </span>
                                                    </th>
                                                </tr>
                                            )}
                                            {vehicle.vehicle_type == '10W Truck' && (
                                                <tr style={labelBorder}>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            8. Back Housing Right
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_8_back_housing_right_no}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {(tyre.tyre_assign_8_back_housing_right_date == null ? "" : Moment(tyre.tyre_assign_8_back_housing_right_date).format('DD-MM-YYYY'))}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_8_back_housing_right_km}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_8_back_housing_right_status}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue1}>
                                                        <span style={labelslabelSpan}>
                                                            <Tooltip title="Change Tyre" placement="top">
                                                                <a style={{color:'#5D92F4'}} onClick={(e) => updateData(e,tyre.id+"#tyre_assign_8_back_housing_right_no")} >
                                                                    <EditIcon />
                                                                </a>
                                                            </Tooltip>
                                                        </span>
                                                    </th>
                                                </tr>
                                            )}
                                            {vehicle.vehicle_type == '10W Truck' && (
                                                <tr style={labelBorder}>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            9. Back Dummy Right
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_9_back_dummy_right_no}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {(tyre.tyre_assign_9_back_dummy_right_date == null ? "" : Moment(tyre.tyre_assign_9_back_dummy_right_date).format('DD-MM-YYYY'))}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_9_back_dummy_right_km}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_9_back_dummy_right_status}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue1}>
                                                        <span style={labelslabelSpan}>
                                                            <Tooltip title="Change Tyre" placement="top">
                                                                <a style={{color:'#5D92F4'}} onClick={(e) => updateData(e,tyre.id+"#tyre_assign_9_back_dummy_right_no")} >
                                                                    <EditIcon />
                                                                </a>
                                                            </Tooltip>
                                                        </span>
                                                    </th>
                                                </tr>
                                            )}
                                            {vehicle.vehicle_type == '10W Truck' && (
                                                <tr style={labelBorder}>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            10. Back Dummy Right
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_10_back_dummy_right_no}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {(tyre.tyre_assign_10_back_dummy_right_date == null ? "" : Moment(tyre.tyre_assign_10_back_dummy_right_date).format('DD-MM-YYYY'))}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_10_back_dummy_right_km}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue}>
                                                        <span style={labelslabelSpan}>
                                                            {tyre.tyre_assign_10_back_dummy_right_status}
                                                        </span>
                                                    </th>
                                                    <th style={tyreValue1}>
                                                        <span style={labelslabelSpan}>
                                                            <Tooltip title="Change Tyre" placement="top">
                                                                <a style={{color:'#5D92F4'}} onClick={(e) => updateData(e,tyre.id+"#tyre_assign_10_back_dummy_right_no")} >
                                                                    <EditIcon />
                                                                </a>
                                                            </Tooltip>
                                                        </span>
                                                    </th>
                                                </tr>
                                            )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                            )}
                            {tyre == 0 && (
                                <div className="d-flex pl-30" style={{justifyContent:'flex-start'}}>
                                    <div className="address text-center">
                                        <h1>No Data Available</h1>
                                    </div>
                                </div>
                            )}
                        </div>
                    </RctCard>
                </div>
            </div>
        </div>
      </>}
    </div>
  );
}
