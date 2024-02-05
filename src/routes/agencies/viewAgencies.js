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
  const [agencies, setAgencies] = useState({});
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
      url: baseURL+"/web-fetch-agencies-by-id/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      setAgencies(res.data.agencies);
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
                                    <h1>{agencies.agency_name}</h1>
                                </div>
                            </div>
                            <div className="table-responsive" style={{padding:'20px'}}>
                                <div className="row">
                                    <div className="col-md-6 col-6">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Brand</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {agencies.agency_short}
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
                                                        {agencies.agency_branch}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>RT Km</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {agencies.agency_rt_km}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Place</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {agencies.agency_city}{" "}{agencies.agency_state}
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
                                                        {agencies.agency_contact_person}
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
                                                        {agencies.agency_mobile}
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
                                                        {agencies.agency_email}
                                                    </span>
                                                </th>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-6 col-6">
                                        <table>
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Bata for Trip 6W</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {agencies.agency_bata_for_trip_6W}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Bata for Trip 10W</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {agencies.agency_bata_for_trip_10W}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Hamali for 6W</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {agencies.agency_hmali}
                                                    </span>
                                                </th>
                                            </tr> 
                                            <tr style={labelBorder}>
                                                <th style={labelTable1}>
                                                    <span style={labelslabel}>Hamali for 10W</span>    
                                                </th>    
                                                <th style={labelTable2}>:</th>
                                                <th style={labelTable3}>
                                                    <span style={labelslabelSpan}>
                                                        {agencies.agency_hmali_10W}
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
