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
import Moment from 'moment';

const labelTableSub = {
  width:'25%',
  border: '1px solid black',
}

const labelslabelSpantable = {
  fontWeight: '500',
  fontSize: '12px',
  paddingTop:'5px',
  paddingBottom: '5px',
  paddingLeft: '10px',
  paddingRight: '10px',
}

const Add = (props) => {

    let history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var midate = "04/04/2022"
    var todayback = yyyy + "-" + mm + "-" + dd;
    
    var today1 = new Date();
    var dd1 = String(today1.getDate()-2).padStart(2, "0");
    var mm1 = String(today1.getMonth() + 1).padStart(2, "0");
    var yyyy1 = today1.getFullYear();
    today1 = mm1 + "/" + dd1 + "/" + yyyy1;
    var todayback1 = yyyy1 + "-" + mm1 + "-" + dd1;

    const [service, setServices] = useState({
        service_date: todayback,
        service_year: "2023-24",
        service_company: "",
        service_branch: "",
        service_truck_no: "",
        service_garage: "",
        service_km: "",
        service_amount: "",
        service_remarks: "",
        service_count: "",
        service_sub_data: "",
    });

    const [serviceSub, setServiceSub] = useState([]);

    const [fabric_inward_count, setCount] = useState(1);

    const useTemplate = {service_sub_type:"", service_sub_amount:"", service_sub_details:""};

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

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
            return true;
        }else{
            return false;
        }
    }
    
    const onInputChange = (e) => {
      if(e.name=="service_truck_no"){
        setServices({
          ...service,
          service_truck_no: e.value,
        });
      }else if(e.name=="service_garage"){
        setServices({
          ...service,
          service_garage: e.value,
        });
      }else if(e.target.name=="service_km"){
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

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }
        
    });

    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  

      fetch(baseURL+'/web-fetch-vehicles-report', requestOptions)
      .then(response => response.json())
      .then(data => setVehicles(data.vehicles)); 
    }, []);

    const [vehiclesOtherData, setvehiclesOtherData] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  

      fetch(baseURL+'/web-fetch-vehicles-other-data/'+service.service_truck_no, requestOptions)
      .then(response => response.json())
      .then(data => setvehiclesOtherData(data.vehiclesOtherData)); 
    }, [service.service_truck_no]);

    
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  

      fetch(baseURL+'/web-fetch-services-by-vehicle/'+service.service_truck_no, requestOptions)
      .then(response => response.json())
      .then(data => setServiceSub(data.servicesSub)); 
    }, [service.service_truck_no]);

    const [vendor, setVendor] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vendors/Garage/'+vehiclesOtherData.vehicle_branch, requestOptions)
      .then(response => response.json())
      .then(data => setVendor(data.vendor)); 
    }, [vehiclesOtherData.vehicle_branch]);

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

    const onSubmit = (e) => {
      e.preventDefault();
        let data = {
            service_date : service.service_date,
            service_year : "2023-24",
            service_company: vehiclesOtherData.vehicle_company,
            service_branch: vehiclesOtherData.vehicle_branch,
            service_truck_no : service.service_truck_no,
            service_garage : service.service_garage,
            service_km : service.service_km,
            service_amount : service.service_amount,
            service_remarks : service.service_remarks,
            service_count : fabric_inward_count,
            service_sub_data : users,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-services",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Services is Created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Services" match={props.match} />
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
                  name="service_date"
                  value={service.service_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <Select
                  options={vehicles.map((option) => (
                  {
                    value: option.reg_no,
                    label: option.reg_no,
                    name: 'service_truck_no',
                  }))}
                  placeholder="Vehicle No"
                  label="Vehicle No"
                  name="service_truck_no"
                  required
                  alue={service.service_truck_no}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="Company"
                    required
                    autoComplete="Name"
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="service_company"
                    value={vehiclesOtherData.vehicle_company}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="Name"
                  name="service_branch"
                  disabled
                  value={vehiclesOtherData.vehicle_branch}
                  onChange={(e) => onInputChange(e)}
                  />
             </div>
           </div>
            
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <Select
                  options={vendor.map((option) => (
                  {
                    value: option.vendor_name,
                    label: option.vendor_name,
                    name: 'service_garage',
                  }))}
                  placeholder="Garage"
                  label="Garage"
                  name="service_garage"
                  required
                  alue={service.service_garage}
                  onChange={(e) => onInputChange(e)}
                />
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
            <div className="row">
              {serviceSub.length > 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <div className="row" >
                            {serviceSub.map((dataSumm, key)=>
                                <div className="col-md-2 col-6" style={labelTableSub}>
                                    <span style={labelslabelSpantable}>
                                        {dataSumm.service_sub_type}<br/>
                                        {Moment(dataSumm.service_sub_date).format('DD-MM-YYYY')}<br/>
                                        {dataSumm.service_sub_km}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
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
                        <div className="col-sm-12 col-md-12 col-xl-6">
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