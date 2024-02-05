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

const TyreSummaryForm = (props) => {

    let history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var midate = "04/04/2022"
    var todayback = yyyy + "-" + mm + "-" + dd;

    const firstdate = Moment().startOf('month').format('YYYY-MM-DD');

    const [downloadTyre, setTyreDownload] = useState({
        tyre_from_date: firstdate,
        tyre_to_date: todayback,
        tyre_count: "",
        tyre_company:"",
        tyre_branch: "", 
        tyre_supplier: "",
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

    const [vendor, setVendor] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };    
  
      fetch(baseURL+'/web-fetch-vendors/Tyre/'+downloadTyre.tyre_branch, requestOptions)
      .then(response => response.json())
      .then(data => setVendor(data.vendor)); 
    }, [downloadTyre.tyre_branch]);

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
      if(e.name=="tyre_branch"){
        setTyreDownload({
          ...downloadTyre,
          tyre_branch: e.value,
        });
          
        
      }else if(e.name=="tyre_supplier"){
        setTyreDownload({
          ...downloadTyre,
          tyre_supplier: e.value,
        });
          
        
      }else if(e.target.name=="tyre_count"){
            if(validateOnlyNumber(e.target.value)){
                setTyreDownload({
                  ...downloadTyre,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setTyreDownload({
                ...downloadTyre,
                [e.target.name]: e.target.value,
            });
        }
    };


  const onSubmit = (e) => {
   e.preventDefault();
    let data = {
        tyre_from_date:downloadTyre.tyre_from_date,
        tyre_to_date:downloadTyre.tyre_to_date,
        tyre_supplier:downloadTyre.tyre_supplier,
        tyre_count:downloadTyre.tyre_count,
        tyre_company:downloadTyre.tyre_company,
        tyre_branch: downloadTyre.tyre_branch,
    };
   var v = document.getElementById('dowRecp').checkValidity();
   var v = document.getElementById('dowRecp').reportValidity();
   e.preventDefault();

if(v){
 setIsButtonDisabled(true)
   axios({
     url: baseURL+"/download-tyre-report",
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
    link.setAttribute('download', 'tyre.csv');
    document.body.appendChild(link);
    link.click();
     NotificationManager.success("Tyre Report is Downloaded Successfully");
       setIsButtonDisabled(false)
   }).catch((err) =>{
    NotificationManager.error("Tyre Report is Not Downloaded");
    setIsButtonDisabled(false)
  });
 }
 };

 const onDetailSubmit = (e) => {
  e.preventDefault();
   let data = {
       tyre_from_date:downloadTyre.tyre_from_date,
       tyre_to_date:downloadTyre.tyre_to_date,
       tyre_supplier:downloadTyre.tyre_supplier,
       tyre_count:downloadTyre.tyre_count,
       tyre_company:downloadTyre.tyre_company,
       tyre_branch: downloadTyre.tyre_branch,
   };
  var v = document.getElementById('dowRecp').checkValidity();
  var v = document.getElementById('dowRecp').reportValidity();
  e.preventDefault();

if(v){
setIsButtonDisabled(true)
  axios({
    url: baseURL+"/download-tyre-details-report",
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
   link.setAttribute('download', 'tyreDetails.csv');
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
  localStorage.setItem('tyre_from_date',downloadTyre.tyre_from_date);
  localStorage.setItem('tyre_to_date',downloadTyre.tyre_to_date);
  localStorage.setItem('tyre_supplier',downloadTyre.tyre_supplier);
  localStorage.setItem('tyre_count',downloadTyre.tyre_count);
  localStorage.setItem('tyre_company',downloadTyre.tyre_company);
  localStorage.setItem('tyre_branch',downloadTyre.tyre_branch);
  history.push("tyreReport");
  
}
  
const onDetailReportView = (e) => {
  e.preventDefault();
  localStorage.setItem('tyre_from_date',downloadTyre.tyre_from_date);
  localStorage.setItem('tyre_to_date',downloadTyre.tyre_to_date);
  localStorage.setItem('tyre_supplier',downloadTyre.tyre_supplier);
  localStorage.setItem('tyre_count',downloadTyre.tyre_count);
  localStorage.setItem('tyre_company',downloadTyre.tyre_company);
  localStorage.setItem('tyre_branch',downloadTyre.tyre_branch);
  history.push("tyreDetailReport");
}

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Tyre" match={props.match} />
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
                  name="tyre_from_date"
                  InputLabelProps={{ shrink: true }}
                  value={downloadTyre.tyre_from_date}
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
                  name="tyre_to_date"
                  InputLabelProps={{ shrink: true }}
                  value={downloadTyre.tyre_to_date}
                  onChange={(e) => onInputChange(e)}
                />
               </div>
             </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Company"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="tyre_company"
                    value={downloadTyre.tyre_company}
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
            <div className="col-sm-6 col-md-6 col-xl-4">
             <div className="form-group">
                <Select
                  
                  options={branch.map((option) => (
                  {
                    value: option.branch_name,
                    label: option.branch_name,
                    name: 'tyre_branch',
                  }))}
                  placeholder="Branch"
                  label="Branch"
                  name="tyre_branch"
                  required
                  alue={downloadTyre.tyre_branch}
                  onChange={(e) => onInputChange(e)}
                />
             </div>
           </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <Select
                  
                  options={vendor.map((option) => (
                  {
                    value: option.vendor_name,
                    label: option.vendor_name,
                    name: 'tyre_supplier',
                  }))}
                  placeholder="Supplier"
                  label="Supplier"
                  name="tyre_supplier"
                  required
                  alue={downloadTyre.tyre_supplier}
                  onChange={(e) => onInputChange(e)}
                />
                
              </div>
            </div>  
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="No of Tyres"
                 autoComplete="Name"
                  name="tyre_count"
                  value={downloadTyre.tyre_count}
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

export default TyreSummaryForm;
