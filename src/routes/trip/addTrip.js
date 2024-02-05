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
import Select from 'react-select';

const Add = (props) => {

    let history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var midate = "04/04/2022"
    var todayback = yyyy + "-" + mm + "-" + dd;
    
    var today1 = new Date();
    var dd1 = String(today1.getDate()-2).padStart(2, "0");
    var mm1 = String(today1.getMonth() + 1).padStart(2, "0");
    var yyyy1 = today1.getFullYear();
    today1 = mm1 + "/" + dd1 + "/" + yyyy1;
    var todayback1 = yyyy1 + "-" + mm1 + "-" + dd1;

    const [trip, setTrip] = useState({
        trip_date: todayback,
        trip_year: "2023-24",
        trip_branch: "",
        trip_company: "",
        trip_driver: "",
        vehicle_driver: "",
        trip_vehicle: "",
        trip_agency: "",
        trip_hsd: "",
        trip_advance: "",
        trip_mileage: "",
        trip_hsd_supplied: "",
        trip_supplier: "",
        trip_remarks: "",
        trip_km: "",
        
        
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const validateOnlyNumber = (inputtxt) => {
        var phoneno = /^\d*\.?\d*$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
          return true;
        }else{
            return false;
        }
    }

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
            return true;
        }else{
            return false;
        }
    }
    
    const onInputChange = (e) => {
      if(e.name=="trip_vehicle"){
        setTrip({
          ...trip,
          trip_vehicle: e.value,
        });
      }else if(e.name=="trip_agency"){
        setTrip({
          ...trip,
          trip_agency: e.value,
        });
      }else if(e.name=="trip_driver"){
        setTrip({
          ...trip,
          trip_driver: e.value,
        });
      }else if(e.name=="trip_supplier"){
        setTrip({
          ...trip,
          trip_supplier: e.value,
        });
      }else if(e.target.name=="trip_hsd"){
            if(validateOnlyDigits(e.target.value)){
                setTrip({
                  ...trip,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="trip_advance"){
            if(validateOnlyDigits(e.target.value)){
                setTrip({
                  ...trip,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setTrip({
                ...trip,
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

    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-remaing-trip-vehicle', requestOptions)
      .then(response => response.json())
      .then(data => setVehicles(data.vehicles)); 
    }, []);

    const [vehiclesOtherData, setvehiclesOtherData] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  

      fetch(baseURL+'/web-fetch-vehicles-other-data/'+trip.trip_vehicle, requestOptions)
      .then(response => response.json())
      .then(data => setvehiclesOtherData(data.vehiclesOtherData)); 
    }, [trip.trip_vehicle]);

    const [vendor, setVendor] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vendors/Diesel/'+vehiclesOtherData.vehicle_branch, requestOptions)
      .then(response => response.json())
      .then(data => setVendor(data.vendor)); 
    }, [vehiclesOtherData.vehicle_branch]);

    const [agency, setAgency] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-agencies/'+vehiclesOtherData.vehicle_branch, requestOptions)
      .then(response => response.json())
      .then(data => setAgency(data.agencies)); 
    }, [vehiclesOtherData.vehicle_branch]);

    
    const [agenciesRT, setAgenciesRT] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-agencies-sh-rt/'+trip.trip_agency, requestOptions)
      .then(response => response.json())
      .then( (data) => {
        
        setAgenciesRT(data.agenciesRT);
       })
    }, [trip.trip_agency]);

    
    const [driver, setDriver] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-assigning-tripdriver/'+ vehiclesOtherData.vehicle_branch, requestOptions)
      .then(response => response.json())
      .then(data => setDriver(data.drivers)); 
    }, [vehiclesOtherData.vehicle_branch]);

    const [vehiclesDriver, setvehiclesDriver] = useState([]);

    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vehicles-driver/'+ trip.trip_vehicle, requestOptions)
      .then(response => response.json())
      .then(data => setvehiclesDriver(data.vehiclesDriver)); 
    }, [trip.trip_vehicle]);

    const onSubmit = (e) => {
      e.preventDefault();
        let data = {
            trip_date: trip.trip_date,
            trip_year: "2023-24",
            trip_vehicle: trip.trip_vehicle,
            trip_agency: trip.trip_agency,
            trip_hsd: Math.round(agenciesRT.agency_rt_km/vehiclesOtherData.vehicle_mileage),
            trip_advance: trip.trip_advance,
            trip_hsd_supplied: trip.trip_hsd_supplied,
            trip_supplier: trip.trip_supplier,
            trip_remarks: trip.trip_remarks,
            trip_branch: vehiclesOtherData.vehicle_branch,
            trip_company: vehiclesOtherData.vehicle_company,
            trip_driver: trip.trip_driver,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-trip",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Trip is Created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Trip" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Date"
                  type="date"
                  autoComplete="Name"
                  name="trip_date"
                  value={trip.trip_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <Select
                  options={vehicles.map((option) => (
                  {
                    value: option.reg_no,
                    label: option.reg_no,
                    name: 'trip_vehicle',
                  }))}
                  placeholder="Vehicle No"
                  label="Vehicle No"
                  name="trip_vehicle"
                  required
                  alue={trip.trip_vehicle}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Company"
                    required
                    autoComplete="Name"
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="trip_company"
                    value={vehiclesOtherData.vehicle_company}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            
           </div>
           <div className="row">
           <div className="col-sm-6 col-md-6 col-xl-4">
             <div className="form-group">
             <TextField
                  fullWidth
                  label="Branch"
                  required
                  autoComplete="Name"
                  name="trip_branch"
                  disabled
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={vehiclesOtherData.vehicle_branch}
                  onChange={(e) => onInputChange(e)}
                  />
                  
             </div>
           </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                    fullWidth
                    label="Driver"
                    autoComplete="Name"
                    name="vehicle_driver"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                    value={vehiclesDriver.vehicle_driver}
                    onChange={(e) => onInputChange(e)}
                    />
                    
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <Select
                  options={driver.map((option) => (
                  {
                    value: option.full_name,
                    label: option.full_name,
                    name: 'trip_driver',
                  }))}
                  placeholder="Change Driver"
                  label="Change Driver"
                  name="trip_driver"
                  alue={trip.trip_driver}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
          </div>
           <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <Select
                  options={agency.map((option) => (
                  {
                    value: option.agency_name,
                    label: option.agency_name,
                    name: 'trip_agency',
                  }))}
                  placeholder="Agencies"
                  label="Agencies"
                  required
                  name="trip_agency"
                  alue={trip.trip_agency}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                    fullWidth
                    label="RT KM"
                    autoComplete="Name"
                    name="trip_km"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                    value={agenciesRT.agency_rt_km}
                    onChange={(e) => onInputChange(e)}
                    />
                    
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                    fullWidth
                    label="Mileage"
                    autoComplete="Name"
                    name="trip_mileage"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                    value={vehiclesOtherData.vehicle_mileage}
                    onChange={(e) => onInputChange(e)}
                    />
                    
              </div>
            </div>
            
            </div>
            
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                  <Select
                    options={vendor.map((option) => (
                    {
                      value: option.vendor_name,
                      label: option.vendor_name,
                      name: 'trip_supplier',
                    }))}
                    placeholder="Supplier"
                    label="Supplier"
                    required
                    name="trip_supplier"
                    alue={trip.trip_supplier}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="Fixed HSD"
                  autoComplete="Name"
                  name="trip_hsd"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  value={Math.round(agenciesRT.agency_rt_km/vehiclesOtherData.vehicle_mileage)}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="HSD Supplied"
                  autoComplete="Name"
                  name="trip_hsd_supplied"
                  value={trip.trip_hsd_supplied}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="Advance"
                  autoComplete="Name"
                  name="trip_advance"
                  value={trip.trip_advance}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            </div>
            <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="Remarks"
                  autoComplete="Name"
                  name="trip_remarks"
                  value={trip.trip_remarks}
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
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Add;