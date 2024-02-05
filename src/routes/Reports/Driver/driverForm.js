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
import Select from 'react-select';

const DriverSummaryForm = (props) => {
    let history = useHistory();
    const [downloadDriver, setDriverDownload] = useState({
        user_company:"",
        user_branch: "", 
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

   useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
      
    });

    const onInputChange = (e) => {
      if(e.name=="user_branch"){
        setDriverDownload({
          ...downloadDriver,
          user_branch: e.value,
        });
          
        
      }else{
        setDriverDownload({
          ...downloadDriver,
          [e.target.name]: e.target.value,
        });
        
      }
        
    };


  const onSubmit = (e) => {
   e.preventDefault();
    let data = {
        user_company:downloadDriver.user_company,
        user_branch: downloadDriver.user_branch,
    };
   var v = document.getElementById('dowRecp').checkValidity();
   var v = document.getElementById('dowRecp').reportValidity();
   e.preventDefault();

if(v){
 setIsButtonDisabled(true)
   axios({
     url: baseURL+"/download-driver-report",
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
    link.setAttribute('download', 'driver.csv');
    document.body.appendChild(link);
    link.click();
     NotificationManager.success("Driver is Downloaded Successfully");
       setIsButtonDisabled(false)
   }).catch((err) =>{
    NotificationManager.error("Driver is Not Downloaded");
    setIsButtonDisabled(false)
  });
 }
 };

 const onReportView = (e) => {
  e.preventDefault();

  localStorage.setItem('user_company',downloadDriver.user_company);
  localStorage.setItem('user_branch',downloadDriver.user_branch);
  history.push("driverReport");
  
}
  

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Driver" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
        <div className="row">
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
                    name="user_company"
                    value={downloadDriver.user_company}
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
            <div className="col-sm-6 col-md-6 col-xl-6">
             <div className="form-group">
                <Select
                  options={branch.map((option) => (
                  {
                    value: option.branch_name,
                    label: option.branch_name,
                    name: 'user_branch',
                  }))}
                  placeholder="Branch"
                  label="Branch"
                  name="user_branch"
                  required
                  alue={downloadDriver.user_branch}
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
          </div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default DriverSummaryForm;
