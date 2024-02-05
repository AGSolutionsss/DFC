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
        value: "Pending",
        label: "Pending",
    },
    {
      value: "Finish",
      label: "Finish",
    },
    {
        value: "Cancel",
        label: "Cancel",
    },
];

const Edit = (props) => {

    let history = useHistory();
    const [service, setServices] = useState({
        service_date : "",
        service_ref: "",
        service_company: "",
        service_branch: "",
        service_truck_no: "",
        service_garage: "",
        service_km: "",
        service_amount: "",
        service_remarks: "",
        service_count: "",
        service_status: "",
        service_sub_data: "",
    });

    const useTemplate = {service_sub_type:"", service_sub_amount:"", service_sub_details:""};

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
          url: baseURL+"/web-fetch-services-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
            setServices(res.data.services);
          setUsers(res.data.servicesSub);
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

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
            return true;
        }else{
            return false;
        }
    }

    const onInputChange = (e) => {
        if(e.target.name=="service_km"){
            if(validateOnlyNumber(e.target.value)){
                setServices({
                  ...service,
                  [e.target.name]: e.target.value,
                });
            }
        }else if(e.target.name=="service_amount"){
            if(validateOnlyDigits(e.target.value)){
                setServices({
                  ...service,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setServices({
                ...service,
                [e.target.name]: e.target.value,
            });
        }
        
    };

    

    const [vendor, setVendor] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vendors/Garage/'+service.service_branch, requestOptions)
      .then(response => response.json())
      .then(data => setVendor(data.vendor)); 
    }, [service.service_branch]);

    const [serviceType, setServicesType] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-service-types', requestOptions)
      .then(response => response.json())
      .then(data => setServicesType(data.serviceTypes)); 
    }, []);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }
        
    });

    const onUpdate = (e) => {
      e.preventDefault();
        let data = {
            service_truck_no : service.service_truck_no,
            service_garage : service.service_garage,
            service_km : service.service_km,
            service_amount : service.service_amount,
            service_remarks : service.service_remarks,
            service_status: service.service_status,
            service_count : service.service_count,
            service_sub_data : users,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-services/" + id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Services is Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Services" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Date"
                  type="date"
                  autoComplete="Name"
                  name="service_date"
                  disabled
                  value={service.service_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Company"
                    required
                    autoComplete="Name"
                    name="service_company"
                    disabled
                    value={service.service_company}
                    onChange={(e) => onInputChange(e)}
                    />
                    
                </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
             <div className="form-group">
             <TextField
                  fullWidth
                  label="Branch"
                  required
                  autoComplete="Name"
                  name="service_branch"
                  disabled
                  value={service.service_branch}
                  onChange={(e) => onInputChange(e)}
                  />
                  
             </div>
           </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Vehicle No"
                  autoComplete="Name"
                  name="service_truck_no"
                  value={service.service_truck_no}
                  disabled
                  onChange={(e) => onInputChange(e)}
                  />
                  
              </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Garage"
                  autoComplete="Name"
                  name="service_garage"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={service.service_garage}
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
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="KM"
                 autoComplete="Name"
                  name="service_km"
                  value={service.service_km}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Total Amount"
                 autoComplete="Name"
                  name="service_amount"
                  value={service.service_amount}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Status"
                  required
                 autoComplete="Name"
                 select
                    SelectProps={{
                        MenuProps: {},
                    }}
                  name="service_status"
                  value={service.service_status}
                  onChange={(e) => onInputChange(e)}
                  >
                  {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.value}
                    </MenuItem>
                ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-12">
              <div className="form-group">
              <TextField
                  fullWidth
                  label="Remarks"
                 autoComplete="Name"
                  name="service_remarks"
                  value={service.service_remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            </div>
            <hr/>
            {
                users.map((user, index)=>(
                    <div className="row" key={index}>
                        <div className="col-sm-12 col-md-12 col-xl-3">
                            <div className="form-group">
                            <TextField
                                fullWidth
                                label="Service Type"
                                required
                                autoComplete="Name"
                                name="service_sub_type"
                                select
                                SelectProps={{
                                    MenuProps: {},
                                }}
                                value={user.service_sub_type}
                                onChange={e => onChange(e, index)}
                                >
                                {serviceType.map((option) => (
                                  <MenuItem key={option.service_types} value={option.service_types}>
                                    {option.service_types}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-2">
                            <div className="form-group">
                            <TextField
                                fullWidth
                                label="Amount"
                                required
                                autoComplete="Name"
                                name="service_sub_amount"
                                value={user.service_sub_amount}
                                onChange={e => onChange(e, index)}
                               />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-7">
                            <div className="form-group">
                            <TextField
                                fullWidth
                                label="Description"
                                autoComplete="Name"
                                name="service_sub_details"
                                value={user.service_sub_details}
                                onChange={e => onChange(e, index)}
                                />
                                
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