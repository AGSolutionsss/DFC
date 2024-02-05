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

const ServicesSummaryForm = (props) => {

    let history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var midate = "04/04/2022"
    var todayback = yyyy + "-" + mm + "-" + dd;
    
    const firstdate = Moment().startOf('month').format('YYYY-MM-DD');

    const [downloadServices, setServicesDownload] = useState({
        service_date_from: firstdate,
        service_date_to: todayback,
        service_garage: "",
        service_company:"",
        service_branch: "", 
        service_truck_no:"",
        
        
  });

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const [agency, setAgency] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-agencies-short', requestOptions)
      .then(response => response.json())
      .then(data => setAgency(data.agenciesShort)); 
    }, []);

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

    const [vendor, setVendor] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vendors/Garage/'+downloadServices.service_branch, requestOptions)
      .then(response => response.json())
      .then(data => setVendor(data.vendor)); 
    }, [downloadServices.service_branch]);

    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vehicles-report', requestOptions)
      .then(response => response.json())
      .then(data => setVehicles(data.vehicles)); 
    }, []);

   useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
      
    });

    const validateOnlyNumber = (inputtxt) => {
        var phoneno = /^\d*\.?\d*$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
          return true;
        }else{
            return false;
        }
    }

    const onInputChange = (e) => {
      if(e.name=="service_branch"){
        setServicesDownload({
          ...downloadServices,
          service_branch: e.value,
        });
      }else if(e.name=="service_truck_no"){
        setServicesDownload({
          ...downloadServices,
          service_truck_no: e.value,
        });
      }else if(e.name=="service_garage"){
        setServicesDownload({
          ...downloadServices,
          service_garage: e.value,
        });
      }else{
        setServicesDownload({
          ...downloadServices,
          [e.target.name]: e.target.value,
        });
      }
    };


  const onSubmit = (e) => {
   e.preventDefault();
    let data = {
        service_date_from:downloadServices.service_date_from,
        service_date_to:downloadServices.service_date_to,
        service_garage:downloadServices.service_garage,
        service_truck_no: downloadServices.service_truck_no,
        service_company:downloadServices.service_company,
        service_branch: downloadServices.service_branch,
    };
   var v = document.getElementById('dowRecp').checkValidity();
   var v = document.getElementById('dowRecp').reportValidity();
   e.preventDefault();

if(v){
 setIsButtonDisabled(true)
   axios({
     url: baseURL+"/download-services-report",
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
    link.setAttribute('download', 'services.csv');
    document.body.appendChild(link);
    link.click();
     NotificationManager.success("Services Report is Downloaded Successfully");
       setIsButtonDisabled(false)
   }).catch((err) =>{
    NotificationManager.error("Services Report is Not Downloaded");
    setIsButtonDisabled(false)
  });
 }
 };

 const onDetailSubmit = (e) => {
  e.preventDefault();
   let data = {
       service_date_from:downloadServices.service_date_from,
       service_date_to:downloadServices.service_date_to,
       service_garage:downloadServices.service_garage,
       service_truck_no: downloadServices.service_truck_no,
       service_company:downloadServices.service_company,
       service_branch: downloadServices.service_branch,
   };
  var v = document.getElementById('dowRecp').checkValidity();
  var v = document.getElementById('dowRecp').reportValidity();
  e.preventDefault();

if(v){
setIsButtonDisabled(true)
  axios({
    url: baseURL+"/download-services-details-report",
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
   link.setAttribute('download', 'servicesDetails.csv');
   document.body.appendChild(link);
   link.click();
    NotificationManager.success("Report is Downloaded Successfully");
      setIsButtonDisabled(false)
  }).catch((err) =>{
   NotificationManager.error("Report is Not Downloaded");
   setIsButtonDisabled(false)
 });
}
};

const onReportView = (e) => {
  e.preventDefault();
  localStorage.setItem('service_date_from',downloadServices.service_date_from);
  localStorage.setItem('service_date_to',downloadServices.service_date_to);
  localStorage.setItem('service_garage',downloadServices.service_garage);
  localStorage.setItem('service_truck_no',downloadServices.service_truck_no);
  localStorage.setItem('service_company',downloadServices.service_company);
  localStorage.setItem('service_branch',downloadServices.service_branch);
  history.push("servicesReport");
  
}
  
const onDetailReportView = (e) => {
  e.preventDefault();
  localStorage.setItem('service_date_from',downloadServices.service_date_from);
  localStorage.setItem('service_date_to',downloadServices.service_date_to);
  localStorage.setItem('service_garage',downloadServices.service_garage);
  localStorage.setItem('service_company',downloadServices.service_company);
  localStorage.setItem('service_truck_no',downloadServices.service_truck_no);
  localStorage.setItem('service_branch',downloadServices.service_branch);
  history.push("servicesDetailReport");
}

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Services" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
        <div className="row">
            
             <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <Select
                  options={vehicles.map((option) => (
                  {
                    value: option.reg_no,
                    label: option.reg_no,
                    name: 'service_truck_no',
                  }))}
                  placeholder="Vehicle No"
                  label="Vehicle No"
                  name="service_truck_no"
                  required
                  alue={downloadServices.service_truck_no}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Company"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="service_company"
                    value={downloadServices.service_company}
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
        </div>
        <div className="row">
            
            <div className="col-sm-6 col-md-6 col-xl-6">
             <div className="form-group">
                <Select
                  
                  options={branch.map((option) => (
                  {
                    value: option.branch_name,
                    label: option.branch_name,
                    name: 'service_branch',
                  }))}
                  placeholder="Branch"
                  label="Branch"
                  name="service_branch"
                  required
                  alue={downloadServices.service_branch}
                  onChange={(e) => onInputChange(e)}
                />
             
             </div>
           </div>
           
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
              <Select
                  options={vendor.map((option) => (
                  {
                    value: option.vendor_name,
                    label: option.vendor_name,
                    name: 'service_garage',
                  }))}
                  placeholder="Garage"
                  label="Garage"
                  name="service_garage"
                  required
                  alue={downloadServices.service_garage}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>  
            
           <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Download
            </Button>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onReportView(e)}
              disabled={isButtonDisabled}
            >
              View
            </Button>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onDetailSubmit(e)}
              disabled={isButtonDisabled}
            >
              Details Download
            </Button>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onDetailReportView(e)}
              disabled={isButtonDisabled}
            >
              Details View
            </Button>
            </div>
          </div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default ServicesSummaryForm;
