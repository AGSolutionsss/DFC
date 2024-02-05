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

const Edit = (props) => {

    let history = useHistory();
    const [agency, setAgency] = useState({
      agency_short: "",
      agency_name: "",
      agency_contact_person: "",
      agency_mobile: "",
      agency_email: "",
      agency_rt_km: "",
      agency_city: "",
      agency_state: "",
      agency_status: "",
      agency_branch: "",
      agency_bata_for_trip_6W: "",
      agency_bata_for_trip_10W: "",
      agency_hmali: "",
      agency_hmali_10W: "",
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
          url: baseURL+"/web-fetch-agencies-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setAgency(res.data.agencies);
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
      if(e.target.name=="agency_mobile"){
        if(validateOnlyDigits(e.target.value)){
          setAgency({
              ...agency,
              [e.target.name]: e.target.value,
            });
        }
      }else if(e.target.name=="agency_hmali"){
        if(validateOnlyDigits(e.target.value)){
          setAgency({
              ...agency,
              [e.target.name]: e.target.value,
            });
        }
      }else if(e.target.name=="agency_hmali_10W"){
        if(validateOnlyDigits(e.target.value)){
          setAgency({
              ...agency,
              [e.target.name]: e.target.value,
            });
        }
      }else if(e.target.name=="agency_bata_for_trip_6W"){
        if(validateOnlyNumber(e.target.value)){
          setAgency({
              ...agency,
              [e.target.name]: e.target.value,
            });
        }
      }else if(e.target.name=="agency_bata_for_trip_10W"){
        if(validateOnlyNumber(e.target.value)){
          setAgency({
              ...agency,
              [e.target.name]: e.target.value,
            });
        }
      }else if(e.target.name=="agency_rt_km"){
        if(validateOnlyDigits(e.target.value)){
          setAgency({
              ...agency,
              [e.target.name]: e.target.value,
            });
        }
      }else{
        setAgency({
          ...agency,
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

    const [state, setState] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-state', requestOptions)
      .then(response => response.json())
      .then(data => setState(data.state)); 
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
          agency_short: agency.agency_short,
          agency_name : agency.agency_name,
          agency_contact_person : agency.agency_contact_person,
          agency_mobile : agency.agency_mobile,
          agency_email : agency.agency_email,
          agency_rt_km : agency.agency_rt_km,
          agency_city : agency.agency_city,
          agency_state : agency.agency_state,
          agency_status : agency.agency_status,
          agency_branch : agency.agency_branch,
          agency_bata_for_trip_6W: agency.agency_bata_for_trip_6W,
          agency_bata_for_trip_10W: agency.agency_bata_for_trip_10W,
          agency_hmali: agency.agency_hmali,
          agency_hmali_10W: agency.agency_hmali_10W,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-agencies/" + id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Agency is Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Agency" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Brand ( HP/IOC )"
                  autoComplete="Name"
                  name="agency_short"
                  value={agency.agency_short}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-9">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Agency Name"
                  autoComplete="Name"
                  name="agency_name"
                  disabled
                  value={agency.agency_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Contact Name"
                  autoComplete="Name"
                  name="agency_contact_person"
                  value={agency.agency_contact_person}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Contact Mobile"
                  autoComplete="Name"
                  name="agency_mobile"
                  inputProps={{ minLength: 10, maxLength: 10 } }
                  value={agency.agency_mobile}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="email"
                  label="Contact Email"
                  autoComplete="Name"
                  name="agency_email"
                  value={agency.agency_email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Branch"
                  autoComplete="Name"
                  name="agency_branch"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={agency.agency_branch}
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
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="RT KM"
                  autoComplete="Name"
                  name="agency_rt_km"
                  value={agency.agency_rt_km}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Bata for Trip 6W"
                  autoComplete="Name"
                  name="agency_bata_for_trip_6W"
                  value={agency.agency_bata_for_trip_6W}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Bata for Trip 10W"
                  autoComplete="Name"
                  name="agency_bata_for_trip_10W"
                  value={agency.agency_bata_for_trip_10W}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Hamali for 6W"
                  autoComplete="Name"
                  name="agency_hmali"
                  value={agency.agency_hmali}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Hamali for 10W"
                  autoComplete="Name"
                  name="agency_hmali_10W"
                  value={agency.agency_hmali_10W}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="City"
                  autoComplete="Name"
                  name="agency_city"
                  value={agency.agency_city}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="State"
                  autoComplete="Name"
                  name="agency_state"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={agency.agency_state}
                  onChange={(e) => onInputChange(e)}
                >
                  {state.map((option) => (
                    <MenuItem key={option.state} value={option.state}>
                      {option.state}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Status"
                  autoComplete="Name"
                  name="agency_status"
                  value={agency.agency_status}
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
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