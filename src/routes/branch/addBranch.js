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

const salaryType = [
  {
    value: "FIXED SALARY",
    label: "FIXED SALARY",
  },
  {
    value: "TRIP WISE",
    label: "TRIP WISE",
  },
  {
    value: "KM",
    label: "KM",
  },
  {
    value: "FIXED+KM",
    label: "FIXED+KM",
  },
];

const Add = (props) => {

    let history = useHistory();
    const [branch, setBranch] = useState({
        branch_name: "",
        branch_salary_type: "",
        branch_bata_for_km_6W: "",
        branch_bata_for_km_10W: "",
        branch_salary_6W: "",
        branch_salary_10W: "",
        branch_incentive_6W: "",
        branch_incentive_10W: "",
        branch_bata_for_trip_6W: "",
        branch_bata_for_trip_10W: "",
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
      if(e.target.name=="branch_bata_for_km_6W"){
        if(validateOnlyNumber(e.target.value)){
            setBranch({
              ...branch,
              [e.target.name]: e.target.value,
            });
        }
      }else if(e.target.name=="branch_bata_for_km_10W"){
        if(validateOnlyNumber(e.target.value)){
            setBranch({
              ...branch,
              [e.target.name]: e.target.value,
            });
        }
      }else if(e.target.name=="branch_salary_6W"){
        if(validateOnlyDigits(e.target.value)){
            setBranch({
              ...branch,
              [e.target.name]: e.target.value,
            });
        }
      }else if(e.target.name=="branch_salary_10W"){
        if(validateOnlyDigits(e.target.value)){
            setBranch({
              ...branch,
              [e.target.name]: e.target.value,
            });
        }
      }else if(e.target.name=="branch_incentive_6W"){
        if(validateOnlyNumber(e.target.value)){
            setBranch({
              ...branch,
              [e.target.name]: e.target.value,
            });
        }
      }else if(e.target.name=="branch_incentive_10W"){
        if(validateOnlyNumber(e.target.value)){
            setBranch({
              ...branch,
              [e.target.name]: e.target.value,
            });
        }
      }else if(e.target.name=="branch_bata_for_trip_6W"){
        if(validateOnlyNumber(e.target.value)){
            setBranch({
              ...branch,
              [e.target.name]: e.target.value,
            });
        }
      }else if(e.target.name=="branch_bata_for_trip_10W"){
        if(validateOnlyNumber(e.target.value)){
            setBranch({
              ...branch,
              [e.target.name]: e.target.value,
            });
        }
      }else{
        setBranch({
          ...branch,
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

    const onSubmit = (e) => {
      e.preventDefault();
        let data = {
            branch_name : branch.branch_name,
            branch_salary_type : branch.branch_salary_type,
            branch_bata_for_km_6W: branch.branch_bata_for_km_6W,
            branch_incentive_6W: branch.branch_incentive_6W,
            branch_incentive_10W: branch.branch_incentive_10W,
            branch_bata_for_km_10W: branch.branch_bata_for_km_10W,
            branch_salary_6W: branch.branch_salary_6W,
            branch_salary_10W: branch.branch_salary_10W,
            branch_bata_for_trip_6W: branch.branch_bata_for_trip_6W,
            branch_bata_for_trip_10W: branch.branch_bata_for_trip_10W,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-branch",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Branch is Created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Branch" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Branch Name"
                  autoComplete="Name"
                  name="branch_name"
                  value={branch.branch_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Salary Type"
                  autoComplete="Name"
                  name="branch_salary_type"
                  value={branch.branch_salary_type}
                  onChange={(e) => onInputChange(e)}
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  >
                  {salaryType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            </div>
            
            {branch.branch_salary_type == "FIXED+KM" || branch.branch_salary_type == "FIXED SALARY" ? 
            <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Salary 6W"
                  autoComplete="Name"
                  name="branch_salary_6W"
                  value={branch.branch_salary_6W}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Salary 10W"
                  autoComplete="Name"
                  name="branch_salary_10W"
                  value={branch.branch_salary_10W}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            </div>
            : ""}
            
            {branch.branch_salary_type == "KM" || branch.branch_salary_type == "FIXED+KM" ? 
            <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Bata for KM 6W"
                  autoComplete="Name"
                  name="branch_bata_for_km_6W"
                  value={branch.branch_bata_for_km_6W}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
            <div className="form-group">
              <TextField
                fullWidth
                label="Bata for KM 10W"
                autoComplete="Name"
                name="branch_bata_for_km_10W"
                value={branch.branch_bata_for_km_10W}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          </div>
            : ""}
            <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  
                  label="Incentive 6W"
                  autoComplete="Name"
                  name="branch_incentive_6W"
                  value={branch.branch_incentive_6W}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  
                  label="Incentive 10W"
                  autoComplete="Name"
                  name="branch_incentive_10W"
                  value={branch.branch_incentive_10W}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  
                  label="Bata for 6W day"
                  autoComplete="Name"
                  name="branch_bata_for_trip_6W"
                  value={branch.branch_bata_for_trip_6W}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  
                  label="Bata for 10W day"
                  autoComplete="Name"
                  name="branch_bata_for_trip_10W"
                  value={branch.branch_bata_for_trip_10W}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            </div>
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
          

          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Add;