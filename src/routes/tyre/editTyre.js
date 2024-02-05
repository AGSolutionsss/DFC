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

const Edit = (props) => {

    let history = useHistory();
    const [tyre, setTyre] = useState({
        tyre_date: "",
        tyre_reference: "",
        tyre_supplier: "",
        tyre_company: "",
        tyre_bill_ref: "",
        tyre_bill_amount: "",
        tyre_remarks: "",
        tyre_count: "",
        tyre_sub_data: "",
        tyre_branch: "",
    });

    const useTemplate = {tyre_sub_no:"", tyre_sub_type:"", tyre_sub_make:"", id:""};

    const [users, setUsers] = useState([useTemplate]);

    const onChange = (e, index) =>{
        const updatedUsers = users.map((user, i) => 
        index == i 
        ? Object.assign(user,{[e.target.name]: e.target.value}) 
        : user );
        setUsers(updatedUsers);
    };

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    useEffect(() => {
        
        axios({
          url: baseURL+"/web-fetch-tyre-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setTyre(res.data.tyre);
          setUsers(res.data.tyreSub);
        });
      }, []);

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
        if(e.target.name=="tyre_bill_amount"){
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

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }
        
    });

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
          tyre_date: tyre.tyre_date,
            tyre_reference: tyre.tyre_reference,
            tyre_supplier : tyre.tyre_supplier,
            tyre_company : tyre.tyre_company,
            tyre_branch: tyre.tyre_branch,
            tyre_bill_ref : tyre.tyre_bill_ref,
            tyre_bill_amount : tyre.tyre_bill_amount,
            tyre_remarks : tyre.tyre_remarks,
            tyre_count : tyre.tyre_count,
            tyre_sub_data : users,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-tyre/" + id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Tyre is Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Purchase Tyre" match={props.match} />
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
              <TextField
                  fullWidth
                  required
                  label="Supplier"
                  autoComplete="Name"
                  name="tyre_supplier"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={tyre.tyre_supplier}
                  onChange={(e) => onInputChange(e)}
                  >
                  {vendor.map((option) => (
                    <MenuItem key={option.vendor_name} value={option.vendor_name}>
                      {option.vendor_name}
                    </MenuItem>
                  ))}
                </TextField>
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
                    label="Name"
                    autoComplete="Name"
                    name="id"
                    hidden
                    value={user.id}
                    onChange={e => onChange(e, index)}
                  />
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
                        <div className="col-sm-12 col-md-12 col-xl-4">
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
                        <div className="col-sm-12 col-md-12 col-xl-4">
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
                    </div> 
                ))
            }
            <div className="row">
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