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
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
];

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

const Edit = (props) => {

    let history = useHistory();
    const [driver, setDriver] = useState({
      full_name: "",
        email: "",
        mobile: "",
        user_company: "",
        vehicle_type: "",
        user_address: "",
        dl_no: "",
        dl_expiry: "",
        hazard_lice_no: "",
        user_status: "",
        user_branch: "",
        user_branch: "",
        user_insurance: "",
        user_insurance_no: "",
        user_bank:"",
        user_bank_branch: "",
        user_account_no: "",
        user_ifsc_code: "",
        
    });

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      axios({
          url: baseURL+"/web-fetch-driver-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setDriver(res.data.driver);
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
    
    const onInputChange = (e) => {
        if(e.target.name=="mobile"){
            if(validateOnlyDigits(e.target.value)){
                setDriver({
                  ...driver,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setDriver({
                ...driver,
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

    const onUpdate = (e) => {
      e.preventDefault();
        let data = {
            full_name: driver.full_name,
            email: driver.email,
            mobile: driver.mobile,
            user_company: driver.user_company,
            vehicle_type: driver.vehicle_type,
            user_address: driver.user_address,
            dl_no: driver.dl_no,
            dl_expiry: driver.dl_expiry,
            hazard_lice_no: driver.hazard_lice_no,
            hazard_lice_expiry: driver.hazard_lice_expiry,
            user_status: driver.user_status,
            user_branch: driver.user_branch,
            user_insurance: driver.user_insurance,
            user_insurance_no: driver.user_insurance_no,
            user_bank:driver.user_bank,
            user_bank_branch: driver.user_bank_branch,
            user_account_no: driver.user_account_no,
            user_ifsc_code: driver.user_ifsc_code,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-driver/" + id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Driver is Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Driver" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Driver Name"
                  autoComplete="Name"
                  name="full_name"
                  disabled
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={driver.full_name}
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
                  name="user_company"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={driver.user_company}
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
                  label="Branch"
                  autoComplete="Name"
                  name="user_branch"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={driver.user_branch}
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
            <div className="col-sm-12 col-md-12 col-xl-12">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Address"
                  autoComplete="Name"
                  name="user_address"
                  value={driver.user_address}
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
                  label="Mobile"
                  autoComplete="Name"
                  name="mobile"
                  inputProps={{ minLength: 10, maxLength: 10 } }
                  value={driver.mobile}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  autoComplete="Name"
                  name="email"
                  value={driver.email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Vehicle"
                  autoComplete="Name"
                  name="vehicle_type"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={driver.vehicle_type}
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
            <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        required
                        label="DL No"
                        autoComplete="Name"
                        name="dl_no"
                        value={driver.dl_no}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        required
                        label="DL Expiry"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoComplete="Name"
                        name="dl_expiry"
                        value={driver.dl_expiry}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="Hazard Lice No"
                        autoComplete="Name"
                        name="hazard_lice_no"
                        value={driver.hazard_lice_no}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="Hazard Lice Expiry"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoComplete="Name"
                        name="hazard_lice_expiry"
                        value={driver.hazard_lice_expiry}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="Bank"
                        autoComplete="Name"
                        name="user_bank"
                        value={driver.user_bank}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="Bank Branch"
                        autoComplete="Name"
                        name="user_bank_branch"
                        value={driver.user_bank_branch}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="Bank IFSC"
                        autoComplete="Name"
                        name="user_ifsc_code"
                        value={driver.user_ifsc_code}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="Account No"
                        autoComplete="Name"
                        name="user_account_no"
                        value={driver.user_account_no}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-4">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="Insurance"
                        autoComplete="Name"
                        name="user_insurance"
                        value={driver.user_insurance}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-4">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="Insurance No"
                        autoComplete="Name"
                        name="user_insurance_no"
                        value={driver.user_insurance_no}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Status"
                  autoComplete="Name"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="user_status"
                  value={driver.user_status}
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