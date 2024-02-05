import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RctCard } from "Components/RctCard/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../api';
import Moment from 'moment';
import NumberFormat from 'react-number-format';

const labelslabel = {
    
    fontSize: '16px',
    fontWeight: '400',
    paddingTop:'5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    height: '30px !important',
    margin: '0px !important',
    color: "rgb(0, 0, 0)",
};

const labelslabelSpan = {
    fontWeight: '500',
    fontSize: '16px',
    paddingTop:'5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
}

const labelTable1 = {
    width:'30%'
}

const labelTableSub = {
    width:'25%',
    border: '1px solid black',
}

const labelTable2 = {
    width:'7%',
    textAlign: 'center',
    border: '1px solid black',
}

const labelTable3 = {
    width:'63%'
}

const labelBorder = {
    paddingTop:'5px',
    border:'1px solid #4d4b4b',
}

export default function Invoice(props) {
  const componentRef = useRef();
  const [service, setService] = useState({});
  const [serviceSub, setServiceSub] = useState({});
  const [loader, setLoader]= useState(true);
  
    useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    axios({
      url: baseURL+"/web-fetch-services-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setService(res.data.services);
      setServiceSub(res.data.servicesSub);
      setLoader(false)
      
    });
  }, []);
 
return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
        <div className="invoice-wrapper">
            <PageTitleBar title="View" match={props.match} />
            <div className="row">
                <div className="col-sm-12 col-md-12 col-xl-12 mx-auto" style={{width:'auto'}}>
                    <RctCard>
                        <div className="invoice-head text-right">
                            <ul className="list-inline">
                                <li>
                                    <ReactToPrint
                                    trigger={() => (
                                        <a>
                                        <i className="mr-10 ti-printer"></i> Print
                                        </a>
                                    )}
                                    content={() => componentRef.current}
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="p-10" ref={componentRef} style={{margin: '5px'}}>
                            <div className="d-flex pb-10 pl-30" style={{justifyContent:'flex-start'}}>
                                <div className="address text-center">
                                    <h1>{service.service_truck_no}</h1>
                                </div>
                            </div>
                            <div className="table-responsive" style={{padding:'20px'}}>
                                <div className="row">
                                    <div className="col-md-6 col-6">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Date</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {(service.service_date == null ? "" : Moment(service.service_date).format('DD-MM-YYYY'))}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Company</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {service.service_company}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Branch</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {service.service_branch}
                                                    </span>
                                                </th>
                                            </tr> 
                                        </table>    
                                    </div>
                                    <div className="col-md-6 col-6">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Garage</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {service.service_garage}
                                                    </span>
                                                </th>
                                            </tr>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>KM</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {service.service_km}
                                                    </span>
                                                </th>
                                            </tr>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Amount</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                    <NumberFormat 
                                                        thousandSeparator={true} 
                                                        thousandsGroupStyle="lakh"
                                                        displayType={'text'}
                                                        prefix={'₹ '} 
                                                        value={service.service_amount}
                                                    />
                                                    </span>
                                                </th>
                                            </tr>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Remarks</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {service.service_remarks}
                                                    </span>
                                                </th>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-12 col-12">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={labelTableSub}>
                                                    <span style={labelslabel}>Services</span>    
                                                </th>    
                                                <th style={labelTableSub}>
                                                    <span style={labelslabel}>Amount</span>    
                                                </th>
                                                <th style={labelTableSub}>
                                                    <span style={labelslabel}>Description</span>    
                                                </th>
                                            </tr>
                                            {serviceSub.map((serviceSub)=>(
                                            <tr style={labelBorder}>
                                                <th style={labelTableSub}>
                                                    <span style={labelslabelSpan}>
                                                        {serviceSub.service_sub_type}
                                                    </span>
                                                </th>
                                                <th style={labelTableSub}>
                                                    <span style={labelslabelSpan}>
                                                        <NumberFormat 
                                                            thousandSeparator={true} 
                                                            thousandsGroupStyle="lakh"
                                                            displayType={'text'}
                                                            prefix={'₹ '} 
                                                            value={serviceSub.service_sub_amount}
                                                        />
                                                    </span>
                                                </th>
                                                <th style={labelTableSub}>
                                                    <span style={labelslabelSpan}>
                                                        {serviceSub.service_sub_details}
                                                    </span>
                                                </th>
                                            </tr>
                                            ))}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RctCard>
                </div>
            </div>
        </div>
      </>}
    </div>
  );
}