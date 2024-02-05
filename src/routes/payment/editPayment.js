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

const Edit = (props) => {

    let history = useHistory();
    const [payment, setPayment] = useState({
        payment_date : "",
        payment_branch: "",
        payment_amount: "",
    });

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    useEffect(() => {
        
        axios({
          url: baseURL+"/web-fetch-payment-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
            setPayment(res.data.payment);
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
        if(e.target.name=="payment_amount"){
            if(validateOnlyDigits(e.target.value)){
                setPayment({
                  ...payment,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setPayment({
                ...payment,
                [e.target.name]: e.target.value,
            });
        }
        
    };

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
            payment_date : payment.payment_date,
            payment_branch: payment.payment_branch,
            payment_amount: payment.payment_amount,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-payment/" + id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Payment is Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Branch Payment" match={props.match} />
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
                  name="payment_date"
                  disabled
                  value={payment.payment_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                <TextField
                  fullWidth
                  label="Branch"
                  required
                  select
                    SelectProps={{
                        MenuProps: {},
                    }}
                  autoComplete="Name"
                  name="payment_branch"
                  value={payment.payment_branch}
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
            <div className="col-sm-6 col-md-6 col-xl-4">
             <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Amount"
                 autoComplete="Name"
                  name="payment_amount"
                  value={payment.payment_amount}
                  onChange={(e) => onInputChange(e)}
                /> 
             </div>
           </div>
            </div>
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