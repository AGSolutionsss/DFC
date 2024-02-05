import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RctCard } from "Components/RctCard/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../api';

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
  const [vendor, setVendor] = useState({});
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
      url: baseURL+"/web-fetch-vendor-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setVendor(res.data.vendor);
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
                                    <h1>{vendor.vendor_name}</h1>
                                </div>
                            </div>
                            <div className="table-responsive" style={{padding:'20px'}}>
                                <div className="row">
                                    <div className="col-md-6 col-6">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Branch</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vendor.vendor_branch}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Vendor Type</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vendor.vendor_type}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>GST</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vendor.vendor_gst}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>PAN No</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vendor.vendor_pan}
                                                    </span>
                                                </th>
                                            </tr> 
                                        </table>    
                                    </div>
                                    <div className="col-md-6 col-6">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Contact Person</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vendor.vendor_contact_person}
                                                    </span>
                                                </th>
                                            </tr>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Mobile No</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vendor.vendor_mobile}
                                                    </span>
                                                </th>
                                            </tr>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Email Id</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vendor.vendor_email}
                                                    </span>
                                                </th>
                                            </tr>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Address</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {vendor.vendor_address}
                                                    </span>
                                                </th>
                                            </tr>
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
