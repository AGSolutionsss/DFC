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

const status = [
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "Accept",
      label: "Accept",
    },
    {
        value: "Reached",
        label: "Reached",
    },
    {
        value: "Return",
        label: "Return",
    },
    {
        value: "Finish",
        label: "Finish",
    },
    {
      value: "Cancel",
      label: "Cancel",
    },
];

const Edit = (props) => {

    let history = useHistory();
    const [trip, setTrip] = useState({
        trip_date: "",
        trip_branch: "",
        trip_company: "",
        trip_vehicle: "",
        trip_reference: "",
        trip_driver_no: "",
        trip_agency: "",
        trip_km: "",
        trip_hsd: "",
        trip_advance: "",
        trip_hsd_supplied: "",
        trip_supplier: "",
        trip_remarks: "",
        trip_status: "",
        trip_driver: "",
        
    });

    const [vehicles, setVehicles] = useState([]);
    const [driver, setDriver] = useState([]);

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    useEffect(() => {
        
        axios({
          url: baseURL+"/web-fetch-trip-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
            setTrip(res.data.trip);
            setVehicles(res.data.vehicles);
            setDriver(res.data.drivers);
        });
      }, []);

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

    const onInputChange = (e) => {
        if(e.target.name=="trip_km"){
            if(validateOnlyNumber(e.target.value)){
                setTrip({
                  ...trip,
                  [e.target.name]: e.target.value,
                });
            }
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

    const [vendor, setVendor] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vendors/Diesel/'+trip.trip_branch, requestOptions)
      .then(response => response.json())
      .then(data => setVendor(data.vendor)); 
    }, [trip.trip_branch]);

    const [agency, setAgency] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-agencies/'+trip.trip_branch, requestOptions)
      .then(response => response.json())
      .then(data => setAgency(data.agencies)); 
    }, [trip.trip_branch]);

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
    

    const onUpdate = (e) => {
      e.preventDefault();
        let data = {
            trip_reference: trip.trip_reference,
            trip_driver_no: trip.trip_driver_no,
           
            trip_agency: trip.trip_agency,
            trip_km: trip.trip_km,
            trip_hsd: Math.round(agenciesRT.agency_rt_km/vehiclesOtherData.vehicle_mileage),
            trip_advance: trip.trip_advance,
            trip_hsd_supplied: trip.trip_hsd_supplied,
            trip_supplier: trip.trip_supplier,
            trip_remarks: trip.trip_remarks,
            trip_status: trip.trip_status,
            
            trip_vehicle: trip.trip_vehicle,
            trip_driver: trip.trip_driver,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-trip/" + id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Trip is Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Trip" match={props.match} />
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
                  disabled
                  name="trip_date"
                  value={trip.trip_date}
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
                    name="trip_company"
                    value={trip.trip_company}
                    onChange={(e) => onInputChange(e)}
                    />
                    
                </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
             <div className="form-group">
             <TextField
                  fullWidth
                  label="Branch"
                  required
                  autoComplete="Name"
                  name="trip_branch"
                  disabled
                  value={trip.trip_branch}
                  onChange={(e) => onInputChange(e)}
                  />
                  
             </div>
           </div>
           </div>
           <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    label="Vehicle No"
                    autoComplete="Name"
                    name="trip_vehicle"
                    value={trip.trip_vehicle}
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    onChange={(e) => onInputChange(e)}
                    >
                    {vehicles.map((option) => (
                        <MenuItem key={option.reg_no} value={option.reg_no}>
                        {option.reg_no}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="Driver"
                  required
                  autoComplete="Name"
                  name="trip_driver"
                  select
                    SelectProps={{
                      MenuProps: {},
                    }}
                  value={trip.trip_driver}
                  onChange={(e) => onInputChange(e)}
                >
                {driver.map((option) => (
                      <MenuItem key={option.full_name} value={option.full_name}>
                        {option.full_name}
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
                    label="Driver No"
                    autoComplete="Name"
                    name="trip_driver_no"
                    value={trip.trip_driver_no}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
            </div>
            
           </div>
           <div className="row">
            
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                    fullWidth
                    required
                    label="Agencies"
                    autoComplete="Name"
                    name="trip_agency"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    value={trip.trip_agency}
                    onChange={(e) => onInputChange(e)}
                    >
                    {agency.map((option) => (
                        <MenuItem key={option.agency_name} value={option.agency_name}>
                        {option.agency_name}
                        </MenuItem>
                    ))}
                    </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
              <TextField
                    fullWidth
                    required
                    label="Supplier"
                    autoComplete="Name"
                    name="trip_supplier"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    value={trip.trip_supplier}
                    onChange={(e) => onInputChange(e)}
                    >
                    {vendor.map((option) => (
                        <MenuItem key={option.vendor_name} value={option.vendor_name}>
                        {option.vendor_name}
                        </MenuItem>
                    ))}
                    </TextField>
              </div>
            </div>
            </div>
           
          
            <div className="row">
              <div className="col-sm-12 col-md-12 col-xl-2">
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
                <div className="col-sm-12 col-md-12 col-xl-2">
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
                <div className="col-sm-12 col-md-12 col-xl-2">
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
                <div className="col-sm-12 col-md-12 col-xl-9">
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
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="Status"
                        autoComplete="Name"
                        name="trip_status"
                        select
                        SelectProps={{
                            MenuProps: {},
                        }}
                        value={trip.trip_status}
                        onChange={(e) => onInputChange(e)}
                        >
                        {status.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
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

          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Edit;