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

const VType = [
    {
      value: "Trip",
      label: "Trip",
    },
    {
      value: "Garage",
      label: "Garage",
    },
    {
      value: "Tyre",
      label: "Tyre",
    },
    {
      value: "Truck",
      label: "Truck",
    },
    {
      value: "Oil",
      label: "Oil",
    },
    {
      value: "Diesel",
      label: "Diesel",
    },
    {
      value: "Spare Parts",
      label: "Spare Parts",
    },
];

const VendorSummaryForm = (props) => {
    let history = useHistory();
    const [downloadVendor, setVendorDownload] = useState({
        vendor_type:"",
        vendor_branch: "", 
  });

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  

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
      if(e.name=="vendor_branch"){
        setVendorDownload({
          ...downloadVendor,
          vendor_branch: e.value,
        });
          
        
      }else{
        setVendorDownload({
          ...downloadVendor,
          [e.target.name]: e.target.value,
        });
        
      }
        
    };


  const onSubmit = (e) => {
   e.preventDefault();
    let data = {
        vendor_type:downloadVendor.vendor_type,
        vendor_branch: downloadVendor.vendor_branch,
    };
   var v = document.getElementById('dowRecp').checkValidity();
   var v = document.getElementById('dowRecp').reportValidity();
   e.preventDefault();

if(v){
 setIsButtonDisabled(true)
   axios({
     url: baseURL+"/download-vendor-report",
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
    link.setAttribute('download', 'vendor.csv');
    document.body.appendChild(link);
    link.click();
     NotificationManager.success("Vendor Report is Downloaded Successfully");
       setIsButtonDisabled(false)
   }).catch((err) =>{
    NotificationManager.error("Vendor Report is Not Downloaded");
    setIsButtonDisabled(false)
  });
 }
 };

 const onReportView = (e) => {
  e.preventDefault();

  localStorage.setItem('vendor_type',downloadVendor.vendor_type);
  localStorage.setItem('vendor_branch',downloadVendor.vendor_branch);
  history.push("vendorReport");
  
}
  

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Vendor" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-6">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Vendor Type"
                    autoComplete="Name"
                    select
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="vendor_type"
                    value={downloadVendor.vendor_type}
                    onChange={(e) => onInputChange(e)}
                    >
                    {VType.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
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
                    name: 'vendor_branch',
                  }))}
                  placeholder="Branch"
                  label="Branch"
                  name="vendor_branch"
                  required
                  alue={downloadVendor.vendor_branch}
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

export default VendorSummaryForm;
