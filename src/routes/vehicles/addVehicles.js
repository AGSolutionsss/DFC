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

const Add = (props) => {

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
        no_of_gas_cylinder: "",
        vehicle_driver: "",
        vehicle_mileage: "",
        vehicle_open_km: "",
        vehicle_hsd_open: "",
        
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
      }else if(e.target.name=="vehicle_mileage"){
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
        }else if(e.target.name=="vehicle_hsd_open"){
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

    const [company, setCompany] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-company', requestOptions)
      .then(response => response.json())
      .then(data => setCompany(data.company)); 
    }, []);

    const [driver, setDriver] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-assigning-newdriver/'+ vehicles.vehicle_branch, requestOptions)
      .then(response => response.json())
      .then(data => setDriver(data.drivers)); 
    }, [vehicles.vehicle_branch]);

    const [branch, setBranch] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-branch', requestOptions)
      .then(response => response.json())
      .then(data => setBranch(data.branch)); 
    }, []);

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
            no_of_gas_cylinder: vehicles.no_of_gas_cylinder,
            vehicle_driver: vehicles.vehicle_driver,
            vehicle_mileage: vehicles.vehicle_mileage,
            vehicle_open_km: vehicles.vehicle_open_km,
            vehicle_hsd_open: vehicles.vehicle_hsd_open,
            
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-vehicles",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Vehicles is Created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Vehicles" match={props.match} />
      <form id="addIndiv" autoComplete="off">
      <RctCollapsibleCard>
        
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Register No"
                  autoComplete="Name"
                  name="reg_no"
                  value={vehicles.reg_no}
                  onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Company"
                  autoComplete="Name"
                  name="vehicle_company"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={vehicles.vehicle_company}
                  onChange={(e) => onInputChange(e)}
                  >
                  {company.map((option) => (
                    <MenuItem key={option.company_name} value={option.company_name}>
                      {option.company_name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                  <TextField
                    fullWidth
                    required
                    label="Vehicle Type"
                    autoComplete="Name"
                    name="vehicle_type"
                    select
                    SelectProps={{
                      MenuProps: {},
                    }}
                    value={vehicles.vehicle_type}
                    onChange={(e) => onInputChange(e)}
                    >
                    {vehicleType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    select
                    SelectProps={{
                      MenuProps: {},
                    }}
                    value={vehicles.vehicle_branch}
                    onChange={(e) => onInputChange(e)}
                    >
                      {branch.map((option) => (
                      <MenuItem key={option.branch_name} value={option.branch_name}>
                        {option.branch_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                  <Select
                    
                    options={driver.map((option) => (
                    {
                      value: option.full_name,
                      label: option.full_name,
                      name: 'vehicle_driver',
                    }))}
                    placeholder="Driver"
                    label="Driver"
                    name="vehicle_driver"
                    required
                    alue={vehicles.vehicle_driver}
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
                      label="Mileage"
                      autoComplete="Name"
                      name="vehicle_mileage"
                      value={vehicles.vehicle_mileage}
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
                        label="Permit Due"
                        autoComplete="Name"
                        name="permit_due"
                        value={vehicles.permit_due}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-2">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="FC Due"
                        autoComplete="Name"
                        name="fc_due"
                        value={vehicles.fc_due}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-2">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="Open HSD "
                        autoComplete="Name"
                        name="vehicle_hsd_open"
                        required
                        value={vehicles.vehicle_hsd_open}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-2">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="No of Gas Cylinder"
                        autoComplete="Name"
                        name="no_of_gas_cylinder"
                        value={vehicles.no_of_gas_cylinder}
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

export default Add;