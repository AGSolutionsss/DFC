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

const userType = [
    {
      value: "3",
      label: "Branch Manager",
    },
    {
      value: "4",
      label: "Branch User",
    },
];

const Edit = (props) => {

    let history = useHistory();
    const [team, setTeam] = useState({
        full_name: "",
        email: "",
        mobile: "",
        user_company: "",
        user_salary: "",
        user_address: "",
        user_type_id: "",
        user_status: "",
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
          url: baseURL+"/web-fetch-team-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setTeam(res.data.team);
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
                setTeam({
                  ...team,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="user_salary"){
            if(validateOnlyDigits(e.target.value)){
                setTeam({
                  ...team,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setTeam({
                ...team,
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
            full_name: team.full_name,
            email: team.email,
            mobile: team.mobile,
            user_company: team.user_company,
            user_salary: team.user_salary,
            user_type_id: team.user_type_id,
            user_address: team.user_address,
            user_status: team.user_status,
            user_branch: team.user_branch,
            user_insurance: team.user_insurance,
            user_insurance_no: team.user_insurance_no,
            user_bank:team.user_bank,
            user_bank_branch: team.user_bank_branch,
            user_account_no: team.user_account_no,
            user_ifsc_code: team.user_ifsc_code,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-team/" + id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Team is Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Team" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Full Name"
                  autoComplete="Name"
                  name="full_name"
                  disabled
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={team.full_name}
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
                  value={team.user_company}
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
                  value={team.user_branch}
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
                  value={team.user_address}
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
                  required
                  label="Mobile"
                  autoComplete="Name"
                  name="mobile"
                  inputProps={{ minLength: 10, maxLength: 10 } }
                  value={team.mobile}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Email"
                  type="email"
                  autoComplete="Name"
                  name="email"
                  value={team.email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="Salary"
                  autoComplete="Name"
                  name="user_salary"
                  value={team.user_salary}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="User Type"
                  autoComplete="Name"
                  name="user_type_id"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={team.user_type_id}
                  onChange={(e) => onInputChange(e)}
                  >
                  {userType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="Bank"
                        autoComplete="Name"
                        name="user_bank"
                        value={team.user_bank}
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
                        value={team.user_bank_branch}
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
                        value={team.user_ifsc_code}
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
                        value={team.user_account_no}
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
                        value={team.user_insurance}
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
                        value={team.user_insurance_no}
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
                  value={team.user_status}
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