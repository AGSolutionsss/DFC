import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {  NotificationManager,} from "react-notifications";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';
import MenuItem from "@material-ui/core/MenuItem";
import InputMask from "react-input-mask";
import Select from 'react-select';

const vehicleType = [
    {
      value: "6W Truck",
      label: "6W Truck",
    },
    {
      value: "10W Truck",
      label: "10W Truck",
    },
    {
      value: "Other",
      label: "Other",
    },
];

const AddTyre = (props) => {

  let history = useHistory();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var midate = "04/04/2022"
  var todayback = yyyy + "-" + mm + "-" + dd;

    const [vehicles, setVehicles] = useState({
        reg_no: "",
        mfg_year: "",
        ins_due: "",
        permit_due: "",
        vehicle_branch: "",
        fc_due: "",
        vehicle_type: "",
        vehicle_company: "",
        bata_for_km: "",
        bata_for_trip: "",
        incentive_for_km: "",
        incentive_for_trip: "",
        no_of_gas_cylinder: "",
        vehicle_agency_short: "",
        vehicle_driver: "",
        vehicle_hsd: "",
        vehicle_open_km: "",
        tyre_assign_1_front_left_no: "",
        tyre_assign_1_front_left_date: todayback,
        tyre_assign_1_front_left_km: "",
        tyre_assign_2_front_right_no: "",
        tyre_assign_2_front_right_date: todayback,
        tyre_assign_2_front_right_km: "",
        tyre_assign_3_back_left_no: "",
        tyre_assign_3_back_left_date: todayback,
        tyre_assign_3_back_left_km: "",
        tyre_assign_4_back_left_no: "",
        tyre_assign_4_back_left_date: todayback,
        tyre_assign_4_back_left_km: "",
        tyre_assign_5_back_right_no: "",
        tyre_assign_5_back_right_date: todayback,
        tyre_assign_5_back_right_km: "",
        tyre_assign_6_back_right_no: "",
        tyre_assign_6_back_right_date: todayback,
        tyre_assign_6_back_right_km: "",
        tyre_assign_3_back_housing_left_no: "",
        tyre_assign_3_back_housing_left_date: todayback,
        tyre_assign_3_back_housing_left_km: "",
        tyre_assign_4_back_housing_left_no: "",
        tyre_assign_4_back_housing_left_date: todayback,
        tyre_assign_4_back_housing_left_km: "",
        tyre_assign_5_back_dummy_left_no: "",
        tyre_assign_5_back_dummy_left_date: todayback,
        tyre_assign_5_back_dummy_left_km: "",
        tyre_assign_6_back_dummy_left_no: "",
        tyre_assign_6_back_dummy_left_date: todayback,
        tyre_assign_6_back_dummy_left_km: "",
        tyre_assign_7_back_housing_right_no: "",
        tyre_assign_7_back_housing_right_date: todayback,
        tyre_assign_7_back_housing_right_km: "",
        tyre_assign_8_back_housing_right_no: "",
        tyre_assign_8_back_housing_right_date: todayback,
        tyre_assign_8_back_housing_right_km: "",
        tyre_assign_9_back_dummy_right_no: "",
        tyre_assign_9_back_dummy_right_date: todayback,
        tyre_assign_9_back_dummy_right_km: "",
        tyre_assign_10_back_dummy_right_no: "",
        tyre_assign_10_back_dummy_right_date: "",
        tyre_assign_10_back_dummy_right_km: "",
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

    const validateOnlyNumber = (inputtxt) => {
        var phoneno = /^\d*\.?\d*$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
          return true;
        }else{
            return false;
        }
    }

    const onChangeRegNumber = (e) => {
      setVehicles({ ...vehicles, reg_no: e.target.value });
    };
    
    const onInputChange = (e) => {
      if(e.name=="vehicle_driver"){
        setVehicles({
          ...vehicles,
          vehicle_driver: e.value,
        });
      }else if(e.name=="reg_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.name=="tyre_assign_1_front_left_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.name=="tyre_assign_2_front_right_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.name=="tyre_assign_3_back_left_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.name=="tyre_assign_4_back_left_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.name=="tyre_assign_5_back_right_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.name=="tyre_assign_6_back_right_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.name=="tyre_assign_3_back_housing_left_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.name=="tyre_assign_4_back_housing_left_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.name=="tyre_assign_5_back_dummy_left_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.name=="tyre_assign_6_back_dummy_left_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.name=="tyre_assign_7_back_housing_right_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.name=="tyre_assign_8_back_housing_right_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.name=="tyre_assign_9_back_dummy_right_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.name=="tyre_assign_10_back_dummy_right_no"){
        setVehicles({
          ...vehicles,
          [e.name]: e.value,
        });
      }else if(e.target.name=="bata_for_km"){
            if(validateOnlyNumber(e.target.value)){
                setVehicles({
                  ...vehicles,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="bata_for_trip"){
            if(validateOnlyNumber(e.target.value)){
                setVehicles({
                  ...vehicles,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="vehicle_hsd"){
          if(validateOnlyNumber(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="incentive_for_km"){
            if(validateOnlyNumber(e.target.value)){
                setVehicles({
                  ...vehicles,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="incentive_for_trip"){
            if(validateOnlyNumber(e.target.value)){
                setVehicles({
                  ...vehicles,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="no_of_gas_cylinder"){
            if(validateOnlyDigits(e.target.value)){
                setVehicles({
                  ...vehicles,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="vehicle_open_km"){
          if(validateOnlyDigits(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="tyre_assign_1_front_left_km"){
          if(validateOnlyDigits(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="tyre_assign_2_front_right_km"){
          if(validateOnlyDigits(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="tyre_assign_3_back_left_km"){
          if(validateOnlyDigits(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="tyre_assign_4_back_left_km"){
          if(validateOnlyDigits(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="tyre_assign_5_back_right_km"){
          if(validateOnlyDigits(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="tyre_assign_6_back_right_km"){
          if(validateOnlyDigits(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="tyre_assign_3_back_housing_left_km"){
          if(validateOnlyDigits(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="tyre_assign_4_back_housing_left_km"){
          if(validateOnlyDigits(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="tyre_assign_5_back_dummy_left_km"){
          if(validateOnlyDigits(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="tyre_assign_6_back_dummy_left_km"){
          if(validateOnlyDigits(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="tyre_assign_7_back_housing_right_km"){
          if(validateOnlyDigits(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="tyre_assign_8_back_housing_right_km"){
          if(validateOnlyDigits(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="tyre_assign_9_back_dummy_right_km"){
          if(validateOnlyDigits(e.target.value)){
              setVehicles({
                ...vehicles,
                [e.target.name]: e.target.value,
              });
          }
        }else if(e.target.name=="tyre_assign_10_back_dummy_right_km"){
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
        
    };

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }
        
    });

    const [vehiclesReg, setVehiclesReg] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
            
          const requestOptions = {
                method: 'GET', 
                headers: {
                   'Authorization': 'Bearer '+theLoginToken
                }             
          };     
    
    
        fetch(baseURL+'/web-fetch-vehicles-tyre-data', requestOptions)
        .then(response => response.json())
        .then(data => setVehiclesReg(data.vehiclesReg)); 
      }, []);

    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vehicles-data/'+vehicles.reg_no, requestOptions)
      .then(response => response.json())
      .then(data => setVehicles(data.vehiclesData)); 
    }, [vehicles.reg_no]);

    const [tyre, setTyre] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-tyre-by-branch/'+vehicles.vehicle_branch, requestOptions)
      .then(response => response.json())
      .then(data => setTyre(data.tyre)); 
    }, [vehicles.vehicle_branch]);

    const onSubmit = (e) => {
      e.preventDefault();
        let data = {
            reg_no: vehicles.reg_no,
            mfg_year: vehicles.mfg_year,
            ins_due: vehicles.ins_due,
            permit_due: vehicles.permit_due,
            fc_due: vehicles.fc_due,
            vehicle_type: vehicles.vehicle_type,
            vehicle_branch: vehicles.vehicle_branch,
            vehicle_company: vehicles.vehicle_company,
            bata_for_km: vehicles.bata_for_km,
            bata_for_trip: vehicles.bata_for_trip,
            incentive_for_km: vehicles.incentive_for_km,
            incentive_for_trip: vehicles.incentive_for_trip,
            no_of_gas_cylinder: vehicles.no_of_gas_cylinder,
            vehicle_agency_short: vehicles.vehicle_agency_short,
            vehicle_driver: vehicles.vehicle_driver,
            vehicle_hsd: vehicles.vehicle_hsd,
            vehicle_open_km: vehicles.vehicle_open_km,
            tyre_assign_1_front_left_no: vehicles.tyre_assign_1_front_left_no,
            tyre_assign_1_front_left_date: vehicles.tyre_assign_1_front_left_date,
            tyre_assign_1_front_left_km: vehicles.tyre_assign_1_front_left_km,
            tyre_assign_2_front_right_no: vehicles.tyre_assign_2_front_right_no,
            tyre_assign_2_front_right_date: vehicles.tyre_assign_2_front_right_date,
            tyre_assign_2_front_right_km: vehicles.tyre_assign_2_front_right_km,
            tyre_assign_3_back_left_no: vehicles.tyre_assign_3_back_left_no,
            tyre_assign_3_back_left_date: vehicles.tyre_assign_3_back_left_date,
            tyre_assign_3_back_left_km: vehicles.tyre_assign_3_back_left_km,
            tyre_assign_4_back_left_no: vehicles.tyre_assign_4_back_left_no,
            tyre_assign_4_back_left_date: vehicles.tyre_assign_4_back_left_date,
            tyre_assign_4_back_left_km: vehicles.tyre_assign_4_back_left_km,
            tyre_assign_5_back_right_no: vehicles.tyre_assign_5_back_right_no,
            tyre_assign_5_back_right_date: vehicles.tyre_assign_5_back_right_date,
            tyre_assign_5_back_right_km: vehicles.tyre_assign_5_back_right_km,
            tyre_assign_6_back_right_no: vehicles.tyre_assign_6_back_right_no,
            tyre_assign_6_back_right_date: vehicles.tyre_assign_6_back_right_date,
            tyre_assign_6_back_right_km: vehicles.tyre_assign_6_back_right_km,
            tyre_assign_3_back_housing_left_no: vehicles.tyre_assign_3_back_housing_left_no,
            tyre_assign_3_back_housing_left_date: vehicles.tyre_assign_3_back_housing_left_date,
            tyre_assign_3_back_housing_left_km: vehicles.tyre_assign_3_back_housing_left_km,
            tyre_assign_4_back_housing_left_no: vehicles.tyre_assign_4_back_housing_left_no,
            tyre_assign_4_back_housing_left_date: vehicles.tyre_assign_4_back_housing_left_date,
            tyre_assign_4_back_housing_left_km: vehicles.tyre_assign_4_back_housing_left_km,
            tyre_assign_5_back_dummy_left_no: vehicles.tyre_assign_5_back_dummy_left_no,
            tyre_assign_5_back_dummy_left_date: vehicles.tyre_assign_5_back_dummy_left_date,
            tyre_assign_5_back_dummy_left_km: vehicles.tyre_assign_5_back_dummy_left_km,
            tyre_assign_6_back_dummy_left_no: vehicles.tyre_assign_6_back_dummy_left_no,
            tyre_assign_6_back_dummy_left_date: vehicles.tyre_assign_6_back_dummy_left_date,
            tyre_assign_6_back_dummy_left_km: vehicles.tyre_assign_6_back_dummy_left_km,
            tyre_assign_7_back_housing_right_no: vehicles.tyre_assign_7_back_housing_right_no,
            tyre_assign_7_back_housing_right_date: vehicles.tyre_assign_7_back_housing_right_date,
            tyre_assign_7_back_housing_right_km: vehicles.tyre_assign_7_back_housing_right_km,
            tyre_assign_8_back_housing_right_no: vehicles.tyre_assign_8_back_housing_right_no,
            tyre_assign_8_back_housing_right_date: vehicles.tyre_assign_8_back_housing_right_date,
            tyre_assign_8_back_housing_right_km: vehicles.tyre_assign_8_back_housing_right_km,
            tyre_assign_9_back_dummy_right_no: vehicles.tyre_assign_9_back_dummy_right_no,
            tyre_assign_9_back_dummy_right_date: vehicles.tyre_assign_9_back_dummy_right_date,
            tyre_assign_9_back_dummy_right_km: vehicles.tyre_assign_9_back_dummy_right_km,
            tyre_assign_10_back_dummy_right_no: vehicles.tyre_assign_10_back_dummy_right_no,
            tyre_assign_10_back_dummy_right_date: vehicles.tyre_assign_10_back_dummy_right_date,
            tyre_assign_10_back_dummy_right_km: vehicles.tyre_assign_10_back_dummy_right_km,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-vehicles-tyre-assign",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Tyre Assign Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Assign Tyre" match={props.match} />
      <form id="addIndiv" autoComplete="off">
      <RctCollapsibleCard>
        
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <Select
                    
                    options={vehiclesReg.map((option) => (
                    {
                      value: option.reg_no,
                      label: option.reg_no,
                      name: 'reg_no',
                    }))}
                    placeholder="Register No"
                    label="Register No"
                    name="reg_no"
                    required
                    alue={vehicles.reg_no}
                    onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Company"
                  autoComplete="Name"
                  name="vehicle_company"
                  disabled
                  value={vehicles.vehicle_company}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Brand (HP/IOC)"
                  autoComplete="Name"
                  name="vehicle_agency_short"
                  disabled
                  value={vehicles.vehicle_agency_short}
                  onChange={(e) => onInputChange(e)}
                  />
                  
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                  <TextField
                    fullWidth
                    required
                    label="Vehicle Type"
                    autoComplete="Name"
                    name="vehicle_type"
                    disabled
                    value={vehicles.vehicle_type}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                  <TextField
                    fullWidth
                    required
                    label="Branch"
                    autoComplete="Name"
                    name="vehicle_branch"
                    disabled
                    value={vehicles.vehicle_branch}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                
                <TextField
                    fullWidth
                    label="Driver"
                    autoComplete="Name"
                    name="vehicle_driver"
                    disabled
                    value={vehicles.vehicle_driver}
                    onChange={(e) => onInputChange(e)}
                    />
                  
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-2">
                  <div className="form-group">
                      <TextField
                      fullWidth
                      required
                      label="Modal Year"
                      autoComplete="Name"
                      name="mfg_year"
                      disabled
                      value={vehicles.mfg_year}
                      onChange={(e) => onInputChange(e)}
                      />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-2">
                  <div className="form-group">
                      <TextField
                      fullWidth
                      required
                      label="Fixed HSD"
                      autoComplete="Name"
                      name="vehicle_hsd"
                      disabled
                      value={vehicles.vehicle_hsd}
                      onChange={(e) => onInputChange(e)}
                      />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-2">
                  <div className="form-group">
                      <TextField
                      fullWidth
                      required
                      label="Open KM"
                      autoComplete="Name"
                      name="vehicle_open_km"
                      disabled
                      value={vehicles.vehicle_open_km}
                      onChange={(e) => onInputChange(e)}
                      />
                  </div>
                </div>
            </div>
            <div className="row">
                
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        label="Insurance Due"
                        autoComplete="Name"
                        name="ins_due"
                        value={vehicles.ins_due}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        label="Permit Due"
                        autoComplete="Name"
                        name="permit_due"
                        value={vehicles.permit_due}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        label="FC Due"
                        autoComplete="Name"
                        name="fc_due"
                        value={vehicles.fc_due}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="No of Gas Cylinder"
                        disabled
                        autoComplete="Name"
                        name="no_of_gas_cylinder"
                        value={vehicles.no_of_gas_cylinder}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        hidden
                        fullWidth
                        label="Bata For KM"
                        autoComplete="Name"
                        name="bata_for_km"
                        value={vehicles.bata_for_km}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
              <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        hidden
                        fullWidth
                        label="Bata For Trip"
                        autoComplete="Name"
                        name="bata_for_trip"
                        value={vehicles.bata_for_trip}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        hidden
                        fullWidth
                        label="Incentive For KM"
                        autoComplete="Name"
                        name="incentive_for_km"
                        value={vehicles.incentive_for_km}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        hidden
                        fullWidth
                        label="Incentive For Trip"
                        autoComplete="Name"
                        name="incentive_for_trip"
                        value={vehicles.incentive_for_trip}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                
            </div>
       </RctCollapsibleCard>
      <RctCollapsibleCard>
      {vehicles.vehicle_type != "Other" ? 
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-4">
            <div className="form-group">
                <Select
                    
                    options={tyre.map((option) => (
                    {
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: 'tyre_assign_1_front_left_no',
                    }))}
                    placeholder="1. Front Left"
                    label="1. Front Left"
                    name="tyre_assign_1_front_left_no"
                    
                    alue={vehicles.tyre_assign_1_front_left_no}
                    onChange={(e) => onInputChange(e)}
                />
            </div>
          </div> 
          <div className="col-sm-12 col-md-12 col-xl-4">
            <div className="form-group">
                <TextField
                fullWidth
                
                label="Date"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="Name"
                type="Date"
                name="tyre_assign_1_front_left_date"
                value={vehicles.tyre_assign_1_front_left_date}
                onChange={(e) => onInputChange(e)}
                />
            </div>
          </div> 
          <div className="col-sm-12 col-md-12 col-xl-4">
            <div className="form-group">
                <TextField
                fullWidth
                
                label="KM"
                autoComplete="Name"
                name="tyre_assign_1_front_left_km"
                value={vehicles.tyre_assign_1_front_left_km}
                onChange={(e) => onInputChange(e)}
                />
            </div>
          </div>  
        </div>
        : ""}
        {vehicles.vehicle_type != "Other" ? 
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-4">
            <div className="form-group">
                <Select
                    
                    options={tyre.map((option) => (
                    {
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: 'tyre_assign_2_front_right_no',
                    }))}
                    placeholder="2. Front Right"
                    label="2. Front Right"
                    name="tyre_assign_2_front_right_no"
                    
                    alue={vehicles.tyre_assign_2_front_right_no}
                    onChange={(e) => onInputChange(e)}
                />
            </div>
          </div> 
          <div className="col-sm-12 col-md-12 col-xl-4">
            <div className="form-group">
                <TextField
                fullWidth
                
                label="Date"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="Name"
                type="Date"
                name="tyre_assign_2_front_right_date"
                value={vehicles.tyre_assign_2_front_right_date}
                onChange={(e) => onInputChange(e)}
                />
            </div>
          </div> 
          <div className="col-sm-12 col-md-12 col-xl-4">
            <div className="form-group">
                <TextField
                fullWidth
                
                label="KM"
                autoComplete="Name"
                name="tyre_assign_2_front_right_km"
                value={vehicles.tyre_assign_2_front_right_km}
                onChange={(e) => onInputChange(e)}
                />
            </div>
          </div>   
        </div>
        : ""}

          {vehicles.vehicle_type == "6W Truck" ? 
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <Select
                    
                    options={tyre.map((option) => (
                    {
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: 'tyre_assign_3_back_left_no',
                    }))}
                    placeholder="3. Back Left"
                    label="3. Back Left"
                    name="tyre_assign_3_back_left_no"
                    
                    alue={vehicles.tyre_assign_3_back_left_no}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="Name"
                  type="Date"
                  name="tyre_assign_3_back_left_date"
                  value={vehicles.tyre_assign_3_back_left_date}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="KM"
                  autoComplete="Name"
                  name="tyre_assign_3_back_left_km"
                  value={vehicles.tyre_assign_3_back_left_km}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            </div>   
          : ""}
          {vehicles.vehicle_type == "6W Truck" ? 
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <Select
                    
                    options={tyre.map((option) => (
                    {
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: 'tyre_assign_4_back_left_no',
                    }))}
                    placeholder="4. Back Left"
                    label="4. Back Left"
                    name="tyre_assign_4_back_left_no"
                    
                    alue={vehicles.tyre_assign_4_back_left_no}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="Name"
                  type="Date"
                  name="tyre_assign_4_back_left_date"
                  value={vehicles.tyre_assign_4_back_left_date}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="KM"
                  autoComplete="Name"
                  name="tyre_assign_4_back_left_km"
                  value={vehicles.tyre_assign_4_back_left_km}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            </div>   
          : ""}

          {vehicles.vehicle_type == "6W Truck" ? 
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <Select
                    
                    options={tyre.map((option) => (
                    {
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: 'tyre_assign_5_back_right_no',
                    }))}
                    placeholder="5. Back Right"
                    label="5. Back Right"
                    name="tyre_assign_5_back_right_no"
                    
                    alue={vehicles.tyre_assign_5_back_right_no}
                    onChange={(e) => onInputChange(e)}
                />
                  
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="Name"
                  type="Date"
                  name="tyre_assign_5_back_right_date"
                  value={vehicles.tyre_assign_5_back_right_date}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="KM"
                  autoComplete="Name"
                  name="tyre_assign_5_back_right_km"
                  value={vehicles.tyre_assign_5_back_right_km}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            </div>   
          : ""}

          {vehicles.vehicle_type == "6W Truck" ? 
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <Select
                    
                    options={tyre.map((option) => (
                    {
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: 'tyre_assign_6_back_right_no',
                    }))}
                    placeholder="6. Back Right"
                    label="6. Back Right"
                    name="tyre_assign_6_back_right_no"
                    
                    alue={vehicles.tyre_assign_6_back_right_no}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="Name"
                  type="Date"
                  name="tyre_assign_6_back_right_date"
                  value={vehicles.tyre_assign_6_back_right_date}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="KM"
                  autoComplete="Name"
                  name="tyre_assign_6_back_right_km"
                  value={vehicles.tyre_assign_6_back_right_km}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            </div>   
          : ""}

          {vehicles.vehicle_type == "10W Truck" ? 
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <Select
                    
                    options={tyre.map((option) => (
                    {
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: 'tyre_assign_3_back_housing_left_no',
                    }))}
                    placeholder="3. Back Housing Left"
                    label="3. Back Housing Left"
                    name="tyre_assign_3_back_housing_left_no"
                    
                    alue={vehicles.tyre_assign_3_back_housing_left_no}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="Name"
                  type="Date"
                  name="tyre_assign_3_back_housing_left_date"
                  value={vehicles.tyre_assign_3_back_housing_left_date}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="KM"
                  autoComplete="Name"
                  name="tyre_assign_3_back_housing_left_km"
                  value={vehicles.tyre_assign_3_back_housing_left_km}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            </div>   
          : ""}

          {vehicles.vehicle_type == "10W Truck" ? 
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <Select
                    
                    options={tyre.map((option) => (
                    {
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: 'tyre_assign_4_back_housing_left_no',
                    }))}
                    placeholder="4. Back Housing Left"
                    label="4. Back Housing Left"
                    name="tyre_assign_4_back_housing_left_no"
                    
                    alue={vehicles.tyre_assign_4_back_housing_left_no}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="Name"
                  type="Date"
                  name="tyre_assign_4_back_housing_left_date"
                  value={vehicles.tyre_assign_4_back_housing_left_date}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="KM"
                  autoComplete="Name"
                  name="tyre_assign_4_back_housing_left_km"
                  value={vehicles.tyre_assign_4_back_housing_left_km}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            </div>   
          : ""}

          {vehicles.vehicle_type == "10W Truck" ? 
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <Select
                    
                    options={tyre.map((option) => (
                    {
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: 'tyre_assign_5_back_dummy_left_no',
                    }))}
                    placeholder="5. Back Dummy Left"
                    label="5. Back Dummy Left"
                    name="tyre_assign_5_back_dummy_left_no"
                    
                    alue={vehicles.tyre_assign_5_back_dummy_left_no}
                    onChange={(e) => onInputChange(e)}
                />
                  
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="Name"
                  type="Date"
                  name="tyre_assign_5_back_dummy_left_date"
                  value={vehicles.tyre_assign_5_back_dummy_left_date}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="KM"
                  autoComplete="Name"
                  name="tyre_assign_5_back_dummy_left_km"
                  value={vehicles.tyre_assign_5_back_dummy_left_km}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            </div>   
          : ""}

          {vehicles.vehicle_type == "10W Truck" ? 
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <Select
                    
                    options={tyre.map((option) => (
                    {
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: 'tyre_assign_6_back_dummy_left_no',
                    }))}
                    placeholder="6. Back Dummy Left"
                    label="6. Back Dummy Left"
                    name="tyre_assign_6_back_dummy_left_no"
                    
                    alue={vehicles.tyre_assign_6_back_dummy_left_no}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="Name"
                  type="Date"
                  name="tyre_assign_6_back_dummy_left_date"
                  value={vehicles.tyre_assign_6_back_dummy_left_date}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="KM"
                  autoComplete="Name"
                  name="tyre_assign_6_back_dummy_left_km"
                  value={vehicles.tyre_assign_6_back_dummy_left_km}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            </div>   
          : ""}

          {vehicles.vehicle_type == "10W Truck" ? 
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <Select
                    
                    options={tyre.map((option) => (
                    {
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: 'tyre_assign_7_back_housing_right_no',
                    }))}
                    placeholder="7. Back Housing Right"
                    label="7. Back Housing Right"
                    name="tyre_assign_7_back_housing_right_no"
                    
                    alue={vehicles.tyre_assign_7_back_housing_right_no}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="Name"
                  type="Date"
                  name="tyre_assign_7_back_housing_right_date"
                  value={vehicles.tyre_assign_7_back_housing_right_date}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="KM"
                  autoComplete="Name"
                  name="tyre_assign_7_back_housing_right_km"
                  value={vehicles.tyre_assign_7_back_housing_right_km}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            </div>   
          : ""}

          {vehicles.vehicle_type == "10W Truck" ? 
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <Select
                    
                    options={tyre.map((option) => (
                    {
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: 'tyre_assign_8_back_housing_right_no',
                    }))}
                    placeholder="8. Back Housing Right"
                    label="8. Back Housing Right"
                    name="tyre_assign_8_back_housing_right_no"
                    
                    alue={vehicles.tyre_assign_8_back_housing_right_no}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="Name"
                  type="Date"
                  name="tyre_assign_8_back_housing_right_date"
                  value={vehicles.tyre_assign_8_back_housing_right_date}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="KM"
                  autoComplete="Name"
                  name="tyre_assign_8_back_housing_right_km"
                  value={vehicles.tyre_assign_8_back_housing_right_km}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            </div>   
          : ""}

          {vehicles.vehicle_type == "10W Truck" ? 
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <Select
                    
                    options={tyre.map((option) => (
                    {
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: 'tyre_assign_9_back_dummy_right_no',
                    }))}
                    placeholder="9. Back Dummy Right"
                    label="9. Back Dummy Right"
                    name="tyre_assign_9_back_dummy_right_no"
                    
                    alue={vehicles.tyre_assign_9_back_dummy_right_no}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="Name"
                  type="Date"
                  name="tyre_assign_9_back_dummy_right_date"
                  value={vehicles.tyre_assign_9_back_dummy_right_date}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="KM"
                  autoComplete="Name"
                  name="tyre_assign_9_back_dummy_right_km"
                  value={vehicles.tyre_assign_9_back_dummy_right_km}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            </div>   
          : ""}

          {vehicles.vehicle_type == "10W Truck" ? 
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <Select
                    
                    options={tyre.map((option) => (
                    {
                      value: option.tyre_sub_no,
                      label: option.tyre_sub_no,
                      name: 'tyre_assign_10_back_dummy_right_no',
                    }))}
                    placeholder="10. Back Dummy Right"
                    label="10. Back Dummy Right"
                    name="tyre_assign_10_back_dummy_right_no"
                    
                    alue={vehicles.tyre_assign_10_back_dummy_right_no}
                    onChange={(e) => onInputChange(e)}
                />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="Name"
                  type="Date"
                  name="tyre_assign_10_back_dummy_right_date"
                  value={vehicles.tyre_assign_10_back_dummy_right_date}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                  <TextField
                  fullWidth
                  
                  label="KM"
                  autoComplete="Name"
                  name="tyre_assign_10_back_dummy_right_km"
                  value={vehicles.tyre_assign_10_back_dummy_right_km}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div> 
            </div>   
          : ""}
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="receiptbuttons" style={{textAlign:'center'}}>
                    <Button
                    type="submit"
                    className="mr-10 mb-10"
                    color="primary"
                    onClick={(e) => onSubmit(e)}
                    disabled={isButtonDisabled}
                    >
                    Submit
                    </Button>
                    <Link to="listing">
                    <Button className="mr-10 mb-10" color="success">
                        Back
                    </Button>
                    </Link>
                </div>
            </div>
        </div>
            <div className="antifloat"></div>
      </RctCollapsibleCard>
      </form>
    </div>
  );
};

export default AddTyre;