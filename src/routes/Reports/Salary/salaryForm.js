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

const SalarySummaryForm = (props) => {
    let history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var midate = "04/04/2022"
    var todayback = yyyy + "-" + mm + "-" + dd;

    const firstdate = Moment().startOf('month').format('YYYY-MM-DD');

    const [downloadSalary, setSalaryDownload] = useState({
        trip_date_from: firstdate,
        trip_date_to: todayback,
        trip_company:"",
        trip_branch: "", 
        trip_driver: "",  
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

    const [driver, setDriver] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-tripdriver/'+ downloadSalary.trip_branch, requestOptions)
      .then(response => response.json())
      .then(data => setDriver(data.drivers)); 
    }, [downloadSalary.trip_branch]);

   useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
      
    });

    const onInputChange = (e) => {
      if(e.name=="trip_driver"){
        setSalaryDownload({
          ...downloadSalary,
          trip_driver: e.value,
        });
      }else{
        setSalaryDownload({
          ...downloadSalary,
          [e.target.name]: e.target.value,
        });
      }
    };

    const onReportView = (e) => {
        e.preventDefault();
        localStorage.setItem('trip_date_from',downloadSalary.trip_date_from);
        localStorage.setItem('trip_date_to',downloadSalary.trip_date_to);
        localStorage.setItem('trip_company',downloadSalary.trip_company);
        localStorage.setItem('trip_branch',downloadSalary.trip_branch);
        localStorage.setItem('trip_driver',downloadSalary.trip_driver);
        history.push("salaryReport");
  
    }

    const onMultipleView = (e) => {
        e.preventDefault();
        localStorage.setItem('trip_date_from',downloadSalary.trip_date_from);
        localStorage.setItem('trip_date_to',downloadSalary.trip_date_to);
        localStorage.setItem('trip_company',downloadSalary.trip_company);
        localStorage.setItem('trip_branch',downloadSalary.trip_branch);
        localStorage.setItem('trip_driver',downloadSalary.trip_driver);
        history.push("salaryMultipleReport");
    }

    const onReportDownload = (e) => {
      e.preventDefault();
      let data = {
        trip_date_from: downloadSalary.trip_date_from,
        trip_date_to: downloadSalary.trip_date_to,
        trip_company:downloadSalary.trip_company,
        trip_branch: downloadSalary.trip_branch,
        trip_driver: downloadSalary.trip_driver,  
      };

      axios({
        url: baseURL+"/download-salary-report",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
          
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'salary.csv'); 
          document.body.appendChild(link);
          link.click();
          NotificationManager.success("Report is Downloaded Successfully");
          
        }).catch((err) =>{
          NotificationManager.error("Receipt is Not Downloaded");
          
        });

  }
  
  const onReportMultipleDownload = (e) => {
    e.preventDefault();
    let data = {
      trip_date_from: downloadSalary.trip_date_from,
      trip_date_to: downloadSalary.trip_date_to,
      trip_company:downloadSalary.trip_company,
      trip_branch: downloadSalary.trip_branch,
      trip_driver: downloadSalary.trip_driver,  
    };

    axios({
      url: baseURL+"/download-salary-multiple-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'salaryMultiple.csv'); 
        document.body.appendChild(link);
        link.click();
        NotificationManager.success("Report is Downloaded Successfully");
        
      }).catch((err) =>{
        NotificationManager.error("Receipt is Not Downloaded");
        
      });

}

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Salary" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
        <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="From Date"
                  required
                  type="date"
                  autoComplete="Name"
                  name="trip_date_from"
                  InputLabelProps={{ shrink: true }}
                  value={downloadSalary.trip_date_from}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
               <div className="form-group">
               <TextField
                  fullWidth
                  label="To Date"
                  type="date"
                  required
                  autoComplete="Name"
                  name="trip_date_to"
                  InputLabelProps={{ shrink: true }}
                  value={downloadSalary.trip_date_to}
                  onChange={(e) => onInputChange(e)}
                />
               </div>
            </div>
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
                    value={downloadSalary.trip_company}
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
             <TextField
                  fullWidth
                  label="Branch"
                  autoComplete="Name"
                  name="trip_branch"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={downloadSalary.trip_branch}
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
                  alue={downloadSalary.trip_driver}
                  onChange={(e) => onInputChange(e)}
                />
                
              </div>
            </div>
        </div>
        
        <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onReportView(e)}
              disabled={isButtonDisabled}
            >
              Single View
            </Button>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onReportDownload(e)}
              disabled={isButtonDisabled}
            >
              Single Download
            </Button>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onMultipleView(e)}
              disabled={isButtonDisabled}
            >
              Multiple View
            </Button>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onReportMultipleDownload(e)}
              disabled={isButtonDisabled}
            >
              Multiple Download
            </Button>
            </div>
          </div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default SalarySummaryForm;
