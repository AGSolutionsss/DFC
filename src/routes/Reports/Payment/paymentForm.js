import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import {baseURL} from '../../../api';
import Moment from 'moment';

const PaymentSummaryForm = (props) => {
    let history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var midate = "04/04/2022"
    var todayback = yyyy + "-" + mm + "-" + dd;
    
    const firstdate = Moment().startOf('month').format('YYYY-MM-DD');

    const [downloadPaymentDetails, setPaymentDetailsDownload] = useState({
        payment_details_date_from: firstdate,
        payment_details_date_to: todayback, 
  });

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  

   useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
      
    });

    const onInputChange = (e) => {
        setPaymentDetailsDownload({
          ...downloadPaymentDetails,
          [e.target.name]: e.target.value,
        });
    };


  const onSubmit = (e) => {
   e.preventDefault();
    let data = {
        payment_details_date_from:downloadPaymentDetails.payment_details_date_from,
        payment_details_date_to: downloadPaymentDetails.payment_details_date_to,
    };
   var v = document.getElementById('dowRecp').checkValidity();
   var v = document.getElementById('dowRecp').reportValidity();
   e.preventDefault();

if(v){
 setIsButtonDisabled(true)
   axios({
     url: baseURL+"/download-payments-details-report",
     method: "POST",
     data,
     headers: {
       Authorization: `Bearer ${localStorage.getItem("login")}`,
     },
   }).then((res) => {
     console.log("data : ",res.data);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'payment_details.csv');
    document.body.appendChild(link);
    link.click();
     NotificationManager.success("Payment Details is Downloaded Successfully");
       setIsButtonDisabled(false)
   }).catch((err) =>{
    NotificationManager.error("Payment Details is Not Downloaded");
    setIsButtonDisabled(false)
  });
 }
 };

 const onReportView = (e) => {
  e.preventDefault();

  localStorage.setItem('payment_details_date_from',downloadPaymentDetails.payment_details_date_from);
  localStorage.setItem('payment_details_date_to',downloadPaymentDetails.payment_details_date_to);
  history.push("paymentDetailsReport");
  
}
  

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Payment Details" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-6">
                <div className="form-group">
                    <TextField
                    fullWidth
                    label="From Date"
                    type="date"
                    required
                    autoComplete="Name"
                    name="payment_details_date_from"
                    value={downloadPaymentDetails.payment_details_date_from}
                    onChange={(e) => onInputChange(e)}
                    />
                    
                </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
             <div className="form-group">
                <TextField
                    fullWidth
                    label="To Date"
                    type="date"
                    required
                    autoComplete="Name"
                    name="payment_details_date_to"
                    value={downloadPaymentDetails.payment_details_date_to}
                    onChange={(e) => onInputChange(e)}
                    />
            </div>
           </div>
           <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Download
            </Button>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onReportView(e)}
              disabled={isButtonDisabled}
            >
              View
            </Button>
            </div>
          </div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default PaymentSummaryForm;
