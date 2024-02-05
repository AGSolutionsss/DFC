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
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import Select from 'react-select';

const TMake = [
    {
      value: "Nylon",
      label: "Nylon",
    },
    {
      value: "Radial",
      label: "Radial",
    },
];

const Add = (props) => {

    let history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var midate = "04/04/2022"
    var todayback = yyyy + "-" + mm + "-" + dd;

    var d = document.getElementById("fabric_inward_lr_date");
    
    var today1 = new Date();
    var dd1 = String(today1.getDate()-2).padStart(2, "0");
    var mm1 = String(today1.getMonth() + 1).padStart(2, "0");
    var yyyy1 = today1.getFullYear();
    today1 = mm1 + "/" + dd1 + "/" + yyyy1;
    var todayback1 = yyyy1 + "-" + mm1 + "-" + dd1;

    const [tyre, setTyre] = useState({
        tyre_date: todayback,
        tyre_year: "2023-24",
        tyre_supplier: "",
        tyre_company: "",
        tyre_branch: "",
        tyre_bill_ref: "",
        tyre_bill_amount: "",
        tyre_remarks: "",
        tyre_count: "",
        tyre_sub_data: "",
    });

    const [fabric_inward_count, setCount] = useState(1);

    const useTemplate = {tyre_sub_no:"", tyre_sub_type:"", tyre_sub_make:""};

    const [users, setUsers] = useState([useTemplate]);

    const addItem = () => {
        setUsers([...users,useTemplate]);
        setCount(fabric_inward_count + 1);
    }

    const onChange = (e, index) =>{
        const updatedUsers = users.map((user, i) => 
        index == i 
        ? Object.assign(user,{[e.target.name]: e.target.value}) 
        : user );
        setUsers(updatedUsers);
    };

    const removeUser = (index) => {
        const filteredUsers = [...users];
        filteredUsers.splice(index, 1);
        setUsers(filteredUsers);
        setCount(fabric_inward_count - 1);
    }

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const validateOnlyNumber = (inputtxt) => {
        var phoneno = /^\d*\.?\d*$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
          return true;
        }else{
            return false;
        }
    }
    
    const onInputChange = (e) => {
      if(e.name=="tyre_supplier"){
        setTyre({
          ...tyre,
          tyre_supplier: e.value,
        });
      }else if(e.target.name=="tyre_bill_amount"){
            if(validateOnlyNumber(e.target.value)){
                setTyre({
                  ...tyre,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setTyre({
                ...tyre,
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

    const [vendor, setVendor] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vendors/Tyre/'+tyre.tyre_branch, requestOptions)
      .then(response => response.json())
      .then(data => setVendor(data.vendor)); 
    }, [tyre.tyre_branch]);

    const [tyreMake, setTyreMake] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-tyre-make', requestOptions)
      .then(response => response.json())
      .then(data => setTyreMake(data.tyreMake)); 
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

    const onSubmit = (e) => {
      e.preventDefault();
        let data = {
            tyre_date : tyre.tyre_date,
            tyre_year : "2023-24",
            tyre_supplier : tyre.tyre_supplier,
            tyre_company : tyre.tyre_company,
            tyre_branch: tyre.tyre_branch,
            tyre_bill_ref : tyre.tyre_bill_ref,
            tyre_bill_amount : tyre.tyre_bill_amount,
            tyre_remarks : tyre.tyre_remarks,
            tyre_count : fabric_inward_count,
            tyre_sub_data : users,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-tyre",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Tyre is Created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Purchase Tyre" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Date"
                  type="date"
                  autoComplete="Name"
                  name="tyre_date"
                  value={tyre.tyre_date}
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
                  name="tyre_company"
                  value={tyre.tyre_company}
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
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
                  name="tyre_branch"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={tyre.tyre_branch}
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
                  alue={tyre.tyre_supplier}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Bill Reference"
                 autoComplete="Name"
                  name="tyre_bill_ref"
                  value={tyre.tyre_bill_ref}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Bill Amount"
                 autoComplete="Name"
                  name="tyre_bill_amount"
                  value={tyre.tyre_bill_amount}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-12">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Remarks"
                 autoComplete="Name"
                  name="tyre_remarks"
                  value={tyre.tyre_remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            </div>
            <hr/>
            {
                users.map((user, index)=>(
                    <div className="row" key={index}>
                        <div className="col-sm-12 col-md-12 col-xl-4">
                            <div className="form-group">
                            <TextField
                                fullWidth
                                label="Tyre No"
                                required
                                autoComplete="Name"
                                name="tyre_sub_no"
                                value={user.tyre_sub_no}
                                onChange={e => onChange(e, index)}
                            />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-3">
                            <div className="form-group">
                            <TextField
                                fullWidth
                                label="Tyre Type"
                                required
                                autoComplete="Name"
                                name="tyre_sub_type"
                                select
                                SelectProps={{
                                    MenuProps: {},
                                }}
                                value={user.tyre_sub_type}
                                onChange={e => onChange(e, index)}
                                >
                                {TMake.map((option) => (
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
                                label="Tyre Make"
                                required
                                autoComplete="Name"
                                name="tyre_sub_make"
                                select
                                SelectProps={{
                                    MenuProps: {},
                                }}
                                value={user.tyre_sub_make}
                                onChange={e => onChange(e, index)}
                                >
                                {tyreMake.map((option) => (
                                  <MenuItem key={option.tyre_make} value={option.tyre_make}>
                                    {option.tyre_make}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-1">
                          <IconButton onClick={() => removeUser(index)}>
                          <DeleteIcon/>
                          </IconButton>
                        </div>
                    </div> 
                ))
            }
            <div className="row mt-4">
              <div className="col-sm-12 col-md-12 col-xl-12">
                <Button className="mr-10 mb-10" color="primary" style={{width:"100px"}} variant="contained" onClick={(e) => addItem(e)}>
                  Add More</Button>
              </div>
            </div>
            <div className="row">
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
          </div>

          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Add;