import React, { useEffect, useState, useRef } from "react";
import { Button } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import axios from "axios";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RctCard } from "Components/RctCard/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../api';
import Moment from 'moment';
import Select from 'react-select';

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

const labelBorder = {
    paddingTop:'5px',
    border:'1px solid #4d4b4b',
}

const tyrelabel = {
    border: '1px solid #4d4b4b',
    textAlign:'center',
}

const labelslabelSpan = {
    fontWeight: '500',
    fontSize: '16px',
    paddingTop:'5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
}

const tyreValue = {
    border: '1px solid #4d4b4b',
}

export default function Invoice(props) {
    const componentRef = useRef();
    const [tyre, setTyre] = useState({});
    const [tyrePosition, setTyrePosition] = useState("");
    const [loader, setLoader]= useState(true);

    const [vehicles, setVehicles] = useState({
        tyre_assign_position: localStorage.getItem('tyre_position'),
        tyre_assign_no: "",
        tyre_assign_date: "",
        tyre_assign_km: "",
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
            return true;
        }else{
            return false;
        }
    }

    const onInputChange = (e) =>{
        if(e.name=="tyre_assign_no"){
            setVehicles({
              ...vehicles,
              [e.name]: e.value,
            });
        }else if(e.target.name=="tyre_assign_km"){
            if(validateOnlyDigits(e.target.value)){
                setVehicles({
                  ...vehicles,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
            });
        }
    }
  
    useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    axios({
      url: baseURL+"/web-fetch-vehicles-tyre-sub-by-id/" + localStorage.getItem('tyre_sub_id'),
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setTyre(res.data.vehiceltyresub);
      setTyrePosition(localStorage.getItem('tyre_position'));
      setLoader(false)
      
    });
  }, []);

  const [tyres, setTyres] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-tyre-by-branch/'+localStorage.getItem("vehicle_branch"), requestOptions)
      .then(response => response.json())
      .then(data => setTyres(data.tyre)); 
    }, [localStorage.getItem("vehicle_branch")]);

    const onUpdate = (e) => {
        e.preventDefault();
        let data = {
            tyre_assign_position: localStorage.getItem('tyre_position'),
            tyre_assign_no: vehicles.tyre_assign_no,
            tyre_assign_date: vehicles.tyre_assign_date,
            tyre_assign_km: vehicles.bata_for_km,
        };
          
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
  
        if (v) {
          setIsButtonDisabled(true)
          axios({
              url: baseURL+"/web-update-vehicle-tyre/" + localStorage.getItem("tyre_sub_id"),
              method: "PUT",
              data,
              headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
              },
          }).then((res) => {
              if(res.data.code == '200'){
                  NotificationManager.success("Tyre is Updated Sucessfully");
                  history.push("listing");
              }else{
                  NotificationManager.error("Duplicate Entry");
              }
              
          });
          }
      };

return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
        <div className="invoice-wrapper">
            <PageTitleBar title="Change Tyre" match={props.match} />
            <div className="row">
                <div className="col-sm-12 col-md-12 col-xl-12 mx-auto" style={{width:'auto'}}>
                    <RctCard>
                        <div className="p-10" ref={componentRef} style={{margin: '5px'}}>
                            <div className="d-flex pb-10 pl-30" style={{justifyContent:'flex-start'}}>
                                <div className="address text-center">
                                    <h1>{localStorage.getItem("vehicle_no")}</h1>
                                </div>
                            </div>
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
                                            </tr> 
                                            {tyrePosition == 'tyre_assign_1_front_left_no' && (
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
                                                </tr>
                                            )}
                                            {tyrePosition == 'tyre_assign_2_front_right_no' && (
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
                                                </tr>
                                            )}
                                            {tyrePosition == 'tyre_assign_3_back_left_no' && (
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
                                                </tr>
                                            )}
                                            {tyrePosition == 'tyre_assign_4_back_left_no' && (
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
                                                </tr>
                                            )}
                                            {tyrePosition == 'tyre_assign_5_back_right_no' && (
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
                                                </tr>
                                            )}
                                            {tyrePosition == 'tyre_assign_6_back_right_no' && (
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
                                                </tr>
                                            )}
                                            {tyrePosition == 'tyre_assign_3_back_housing_left_no' && (
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
                                                </tr>
                                            )}
                                            {tyrePosition == 'tyre_assign_4_back_housing_left_no' && (
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
                                                </tr>
                                            )}
                                            {tyrePosition == 'tyre_assign_5_back_dummy_left_no' && (
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
                                                </tr>
                                            )}
                                            {tyrePosition == 'tyre_assign_6_back_dummy_left_no' && (
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
                                                </tr>
                                            )}
                                            {tyrePosition == 'tyre_assign_7_back_housing_right_no' && (
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
                                                </tr>
                                            )}
                                            {tyrePosition == 'tyre_assign_8_back_housing_right_no' && (
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
                                                </tr>
                                            )}
                                            {tyrePosition == 'tyre_assign_9_back_dummy_right_no' && (
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
                                                </tr>
                                            )}
                                            {tyrePosition == 'tyre_assign_10_back_dummy_right_no' && (
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
                                                </tr>
                                            )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <form id="addIndiv" autoComplete="off">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <Select
                                                
                                                options={tyres.map((option) => (
                                                {
                                                value: option.tyre_sub_no,
                                                label: option.tyre_sub_no,
                                                name: 'tyre_assign_no',
                                                }))}
                                                placeholder="Tyre No"
                                                label="Tyre No"
                                                name="tyre_assign_no"
                                                required
                                                alue={vehicles.tyre_assign_no}
                                                onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div> 
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Date"
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                            autoComplete="Name"
                                            type="date"
                                            name="tyre_assign_date"
                                            value={vehicles.tyre_assign_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div> 
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="KM"
                                            autoComplete="Name"
                                            name="tyre_assign_km"
                                            value={vehicles.tyre_assign_km}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>  
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-12">
                                        <div className="receiptbuttons" style={{textAlign:'center'}}>
                                            <Button
                                            type="submit"
                                            className="mr-10 mb-10"
                                            color="primary"
                                            onClick={(e) => onUpdate(e)}
                                            disabled={isButtonDisabled}
                                            >
                                            Update
                                            </Button>
                                            <Link to="listing">
                                            <Button className="mr-10 mb-10" color="success">
                                                Back
                                            </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </RctCard>
                </div>
            </div>
        </div>
      </>}
    </div>
  );
}