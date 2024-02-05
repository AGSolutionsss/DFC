import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import {baseURL} from '../../../api';
import MenuItem from "@material-ui/core/MenuItem";
import Moment from 'moment';
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
];

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

const TripSummaryForm = (props) => {
    let history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var midate = "04/04/2022"
    var todayback = yyyy + "-" + mm + "-" + dd;

    const firstdate = Moment().startOf('month').format('YYYY-MM-DD');

    const [downloadTrip, setTripDownload] = useState({
        trip_date_from: firstdate,
        trip_date_to: todayback,
        trip_company:"",
        trip_branch: "", 
        trip_vehicle: "",
        trip_full_vehicle: "",
        trip_vehicle_type: "",
        trip_driver: "",
        trip_agency: "",
        trip_supplier: "",
        trip_status: "",
        
  });

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

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

    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-report-vehicle', requestOptions)
      .then(response => response.json())
      .then(data => setVehicles(data.vehicles)); 
    }, []);

    const [vehiclesNew, setVehiclesNew] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vehicles/'+downloadTrip.trip_company+'/'+downloadTrip.trip_branch, requestOptions)
      .then(response => response.json())
      .then(data => setVehiclesNew(data.vehicles)); 
    }, [downloadTrip.trip_company,downloadTrip.trip_branch]);

    const [agency, setAgency] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-agencies/'+downloadTrip.trip_branch, requestOptions)
      .then(response => response.json())
      .then(data => setAgency(data.agencies)); 
    }, [downloadTrip.trip_branch]);

    const [vendor, setVendor] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vendors/Diesel/'+downloadTrip.trip_branch, requestOptions)
      .then(response => response.json())
      .then(data => setVendor(data.vendor)); 
    }, [downloadTrip.trip_branch]);

    const [driver, setDriver] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-assigning-tripdriver/'+ downloadTrip.trip_branch, requestOptions)
      .then(response => response.json())
      .then(data => setDriver(data.drivers)); 
    }, [downloadTrip.trip_branch]);

   useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
      
    });

    const onInputChange = (e) => {
      if(e.name=="trip_branch"){
        setTripDownload({
          ...downloadTrip,
          trip_branch: e.value,
        });
      }else if(e.name=="trip_driver"){
        setTripDownload({
          ...downloadTrip,
          trip_driver: e.value,
        });
      }else if(e.name=="trip_vehicle"){
        setTripDownload({
          ...downloadTrip,
          trip_vehicle: e.value,
        });
      }else if(e.name=="trip_full_vehicle"){
        setTripDownload({
          ...downloadTrip,
          trip_vehicle: e.value,
        });
      }else if(e.name=="trip_agency"){
        setTripDownload({
          ...downloadTrip,
          trip_agency: e.value,
        });
      }else if(e.name=="trip_supplier"){
        setTripDownload({
          ...downloadTrip,
          trip_supplier: e.value,
        });
      }else{
        setTripDownload({
          ...downloadTrip,
          [e.target.name]: e.target.value,
        });
      }
    };


  const onSubmit = (e) => {
   e.preventDefault();
    let data = {
        trip_date_from: downloadTrip.trip_date_from,
        trip_date_to: downloadTrip.trip_date_to,
        trip_company:downloadTrip.trip_company,
        trip_branch: downloadTrip.trip_branch,
        trip_vehicle: downloadTrip.trip_vehicle,
        trip_full_vehicle: downloadTrip.trip_full_vehicle,
        trip_vehicle_type: downloadTrip.trip_vehicle_type,
        trip_driver: downloadTrip.trip_driver,
        trip_agency: downloadTrip.trip_agency,
        trip_supplier: downloadTrip.trip_supplier,
        trip_status: downloadTrip.trip_status,
    };
   var v = document.getElementById('dowRecp').checkValidity();
   var v = document.getElementById('dowRecp').reportValidity();
   e.preventDefault();

if(v){
 setIsButtonDisabled(true)
   axios({
     url: baseURL+"/download-trip-report",
     method: "POST",
     data,
     headers: {
       Authorization: `Bearer ${localStorage.getItem("login")}`,
     },
   }).then((res) => {
     console.log("data : ",res.data);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'trip.csv');
    document.body.appendChild(link);
    link.click();
     NotificationManager.success("Trip is Downloaded Successfully");
       setIsButtonDisabled(false)
   }).catch((err) =>{
    NotificationManager.error("Trip is Not Downloaded");
    setIsButtonDisabled(false)
  });
 }
 };

 const onSubmitMultiple = (e) => {
  e.preventDefault();
   let data = {
       trip_date_from: downloadTrip.trip_date_from,
       trip_date_to: downloadTrip.trip_date_to,
       trip_company:downloadTrip.trip_company,
       trip_branch: downloadTrip.trip_branch,
       trip_vehicle: downloadTrip.trip_vehicle,
       trip_vehicle_type: downloadTrip.trip_vehicle_type,
       trip_driver: downloadTrip.trip_driver,
       trip_agency: downloadTrip.trip_agency,
       trip_supplier: downloadTrip.trip_supplier,
       trip_status: downloadTrip.trip_status,
   };
  var v = document.getElementById('dowRecp').checkValidity();
  var v = document.getElementById('dowRecp').reportValidity();
  e.preventDefault();

if(v){
setIsButtonDisabled(true)
  axios({
    url: baseURL+"/download-trip-multiple-report",
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("login")}`,
    },
  }).then((res) => {
    console.log("data : ",res.data);
   const url = window.URL.createObjectURL(new Blob([res.data]));
   const link = document.createElement('a');
   link.href = url;
   link.setAttribute('download', 'tripmultiple.csv');
   document.body.appendChild(link);
   link.click();
    NotificationManager.success("Trip is Downloaded Successfully");
      setIsButtonDisabled(false)
  }).catch((err) =>{
   NotificationManager.error("Trip is Not Downloaded");
   setIsButtonDisabled(false)
 });
}
};

 const onReportView = (e) => {
  e.preventDefault();
  localStorage.setItem('trip_date_from',downloadTrip.trip_date_from);
  localStorage.setItem('trip_date_to',downloadTrip.trip_date_to);
  localStorage.setItem('trip_company',downloadTrip.trip_company);
  localStorage.setItem('trip_branch',downloadTrip.trip_branch);
  localStorage.setItem('trip_vehicle',downloadTrip.trip_vehicle);
  localStorage.setItem('trip_full_vehicle',downloadTrip.trip_full_vehicle);
  localStorage.setItem('trip_vehicle_type',downloadTrip.trip_vehicle_type);
  localStorage.setItem('trip_driver',downloadTrip.trip_driver);
  localStorage.setItem('trip_agency',downloadTrip.trip_agency);
  localStorage.setItem('trip_supplier',downloadTrip.trip_supplier);
  localStorage.setItem('trip_status',downloadTrip.trip_status);
  history.push("tripReport");
  
}

const onMultipleView = (e) => {
  e.preventDefault();
  localStorage.setItem('trip_date_from',downloadTrip.trip_date_from);
  localStorage.setItem('trip_date_to',downloadTrip.trip_date_to);
  localStorage.setItem('trip_company',downloadTrip.trip_company);
  localStorage.setItem('trip_branch',downloadTrip.trip_branch);
  localStorage.setItem('trip_vehicle',downloadTrip.trip_vehicle);
  localStorage.setItem('trip_full_vehicle',downloadTrip.trip_full_vehicle);
  localStorage.setItem('trip_vehicle_type',downloadTrip.trip_vehicle_type);
  localStorage.setItem('trip_driver',downloadTrip.trip_driver);
  localStorage.setItem('trip_agency',downloadTrip.trip_agency);
  localStorage.setItem('trip_supplier',downloadTrip.trip_supplier);
  localStorage.setItem('trip_status',downloadTrip.trip_status);
  history.push("tripMultipleReport");
  
}
  

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Trip" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
        <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="From Date"
                  required
                  type="date"
                  autoComplete="Name"
                  name="trip_date_from"
                  InputLabelProps={{ shrink: true }}
                  value={downloadTrip.trip_date_from}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
               <div className="form-group">
               <TextField
                  fullWidth
                  label="To Date"
                  type="date"
                  required
                  autoComplete="Name"
                  name="trip_date_to"
                  InputLabelProps={{ shrink: true }}
                  value={downloadTrip.trip_date_to}
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
                    name: 'trip_full_vehicle',
                  }))}
                  placeholder="Direct Vehicle No"
                  label="Vehicle No"
                  name="trip_full_vehicle"
                  alue={downloadTrip.trip_full_vehicle}
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
                    label="Company"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="trip_company"
                    value={downloadTrip.trip_company}
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
            <div className="col-sm-6 col-md-6 col-xl-3">
             <div className="form-group">
                <Select
                  options={branch.map((option) => (
                  {
                    value: option.branch_name,
                    label: option.branch_name,
                    name: 'trip_branch',
                  }))}
                  placeholder="Branch"
                  label="Branch"
                  name="trip_branch"
                  required
                  alue={downloadTrip.trip_branch}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
           </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <Select
                  options={vehiclesNew.map((option) => (
                  {
                    value: option.reg_no,
                    label: option.reg_no,
                    name: 'trip_vehicle',
                  }))}
                  placeholder="Vehicle No"
                  label="Vehicle No"
                  name="trip_vehicle"
                  required
                  alue={downloadTrip.trip_vehicle}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                  <TextField
                    fullWidth
                    label="Vehicle Type"
                    autoComplete="Name"
                    name="trip_vehicle_type"
                    select
                    SelectProps={{
                      MenuProps: {},
                    }}
                    value={downloadTrip.trip_vehicle_type}
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
              <Select
                  options={driver.map((option) => (
                  {
                    value: option.full_name,
                    label: option.full_name,
                    name: 'trip_driver',
                  }))}
                  placeholder="Driver"
                  label="Driver"
                  name="trip_driver"
                  required
                  alue={downloadTrip.trip_driver}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
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
                  name="trip_supplier"
                  required
                  alue={downloadTrip.trip_supplier}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
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
                  name="trip_agency"
                  required
                  alue={downloadTrip.trip_agency}
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
                    value={downloadTrip.trip_status}
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
           <div className="col-sm-3 col-md-3 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Download
            </Button>
            </div>
            <div className="col-sm-3 col-md-3 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onReportView(e)}
              disabled={isButtonDisabled}
            >
              View
            </Button>
            </div>
            <div className="col-sm-3 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmitMultiple(e)}
              disabled={isButtonDisabled}
            >
              Multiple Download
            </Button>
            </div>
            <div className="col-sm-3 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onMultipleView(e)}
              disabled={isButtonDisabled}
            >
              Multiple View
            </Button>
            </div>
          </div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default TripSummaryForm;
