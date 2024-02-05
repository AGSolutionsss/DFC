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

const VType = [
  
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

const VType_2 = [
  {
    value: "Tyre",
    label: "Tyre",
  },
  
  {
    value: "Oil",
    label: "Oil",
  },
];

const Edit = (props) => {

    let history = useHistory();
    const [vendor, setVendor] = useState({
        vendor_name: "",
        vendor_type: "",
        vendor_contact_person: "",
        vendor_mobile: "",
        vendor_email: "",
        vendor_address: "",
        vendor_gst: "",
        vendor_pan: "",
        vendor_status: "",
        vendor_branch: "",
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
          url: baseURL+"/web-fetch-vendor-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setVendor(res.data.vendor);
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
        if(e.target.name=="vendor_mobile"){
            if(validateOnlyDigits(e.target.value)){
                setVendor({
                  ...vendor,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setVendor({
                ...vendor,
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

    const [branch, setBranch] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-branch-com', requestOptions)
      .then(response => response.json())
      .then(data => setBranch(data.branch)); 
    }, []);

    const onUpdate = (e) => {
      e.preventDefault();
        let data = {
            vendor_name : vendor.vendor_name,
            vendor_type : vendor.vendor_type,
            vendor_contact_person : vendor.vendor_contact_person,
            vendor_mobile : vendor.vendor_mobile,
            vendor_email : vendor.vendor_email,
            vendor_address : vendor.vendor_address,
            vendor_gst : vendor.vendor_gst,
            vendor_pan : vendor.vendor_pan,
            vendor_status: vendor.vendor_status,
            vendor_branch: vendor.vendor_branch,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-vendor/" + id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Vendor is Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Vendor" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Vendor"
                  autoComplete="Name"
                  name="vendor_name"
                  disabled
                  value={vendor.vendor_name}
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
                  name="vendor_branch"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={vendor.vendor_branch}
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
                  required
                  label="Vendor Type"
                  autoComplete="Name"
                  name="vendor_type"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={vendor.vendor_type}
                  onChange={(e) => onInputChange(e)}
                  >
                  {vendor.vendor_branch == "COMMON"
                    ?  VType_2.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    :  VType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))
                    }
                </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Contact Person"
                  autoComplete="Name"
                  name="vendor_contact_person"
                  value={vendor.vendor_contact_person}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Mobile"
                  autoComplete="Name"
                  name="vendor_mobile"
                  inputProps={{ minLength: 10, maxLength: 10 } }
                  value={vendor.vendor_mobile}
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
                  name="vendor_email"
                  value={vendor.vendor_email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-12">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Address"
                  autoComplete="Name"
                  name="vendor_address"
                  value={vendor.vendor_address}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="GST"
                  autoComplete="Name"
                  name="vendor_gst"
                  value={vendor.vendor_gst}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="PAN No"
                  autoComplete="Name"
                  name="vendor_pan"
                  value={vendor.vendor_pan}
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
                  name="vendor_status"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={vendor.vendor_status}
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