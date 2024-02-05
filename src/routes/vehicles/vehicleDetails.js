import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RctCard } from "Components/RctCard/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../api';
import { savePDF } from '@progress/kendo-react-pdf';
import Moment from 'moment';
import NumberFormat from 'react-number-format';
import Paper from "@material-ui/core/Paper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from "@material-ui/core/TableContainer";

const labelTableSub = {
    width:'25%',
    border: '1px solid black',
}

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

const labelslabelSpantable = {
    fontWeight: '500',
    fontSize: '12px',
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

const table_row_count = {
    border: "1px solid black",
    textAlign: "center",
    fontSize: "11px"
};
  
  
const table_head = {
    border: "1px solid black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "12px"
};

const tyreValue = {
    border: '1px solid #4d4b4b',
}

const tyrelabel = {
    border: '1px solid #4d4b4b',
    textAlign:'center',
}

const vehicleDetail = (props) => {
  const componentRef = useRef();
  const [vehicle, setSummary] = useState({});
  const [serviceSub, setServiceSub] = useState([]);
  const [tyre, setTyre] = useState({});
  const [trip, setTrip] = useState({});
  const [loader, setLoader]= useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){
      window.location = "/signin";
    }else{
    }

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    
    axios({
      url: baseURL+"/fetch-vehicle-detail-id/"+id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        setSummary(res.data.vehicle);
        setServiceSub(res.data.fullservices);
        setTrip(res.data.trip);
        setTyre(res.data.vehiceltyresub);
        setLoader(false)
      
    });
  }, []);
 

  

const  handleExportWithFunction  = (e) => {
  savePDF(componentRef.current, { 
    paperSize:  "A4", 
    orientation: "vertical",
      scale: 0.8,
  });
}

  return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <div className="invoice-wrapper">
        <PageTitleBar title="Vehicles Details" match={props.match} />
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-12 mx-auto" style={{width:'auto'}}>
          
            <RctCard>
              <div 
        
                className="invoice-head text-right">
                <ul className="list-inline">
                <li>
                  <a onClick={(e) => handleExportWithFunction(e)}>
                      <i className="mr-10 ti-download"></i> PDF
                    </a>
                    </li>
                  
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
                <div className="d-flex justify-content-between" style={{fontSize: '16px' }}>
                  <div className="invoice-logo ">
                    
                  </div>
                  <div className="address text-center">
                    
                    <h2 style={{paddingTop: '5px'}}>
                      <strong>
                        <b style={{fontSize: '20px'}}>VEHICLES DETAILS</b>
                      </strong>
                    </h2>
                  </div>
                  <div className="invoice-logo text-right">
                    
                  </div>
                </div>
                <div className="d-flex pb-10 pl-30" style={{justifyContent:'flex-start'}}>
                    <div className="address text-center">
                        <h1>{vehicle.reg_no}</h1>
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
                                            {vehicle.vehicle_branch}
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
                                            {vehicle.vehicle_company}
                                        </span>
                                    </th>
                                </tr> 
                                <tr style={labelBorder}>
                                    <th style={labelTable1}>
                                        <span style={labelslabel}>Mileage</span>    
                                    </th>    
                                    <th style={labelTable2}>:</th>
                                    <th style={labelTable3}>
                                        <span style={labelslabelSpan}>
                                            {vehicle.vehicle_mileage}
                                        </span>
                                    </th>
                                </tr> 
                                <tr style={labelBorder}>
                                    <th style={labelTable1}>
                                        <span style={labelslabel}>Vehicle Type</span>    
                                    </th>    
                                    <th style={labelTable2}>:</th>
                                    <th style={labelTable3}>
                                        <span style={labelslabelSpan}>
                                            {vehicle.vehicle_type}
                                        </span>
                                    </th>
                                </tr> 
                                <tr style={labelBorder}>
                                    <th style={labelTable1}>
                                        <span style={labelslabel}>Vehicle KM</span>    
                                    </th>    
                                    <th style={labelTable2}>:</th>
                                    <th style={labelTable3}>
                                        <span style={labelslabelSpan}>
                                            {vehicle.vehicle_open_km}
                                        </span>
                                    </th>
                                </tr> 
                            </table>    
                        </div>
                        <div className="col-md-6 col-6">
                            <table>
                                <tr style={labelBorder}>
                                    <th style={labelTable1}>
                                        <span style={labelslabel}>Insurance Due</span>    
                                    </th>    
                                    <th style={labelTable2}>:</th>
                                    <th style={labelTable3}>
                                        <span style={labelslabelSpan}>
                                            {(vehicle.ins_due == null ? "" : Moment(vehicle.ins_due).format('DD-MM-YYYY'))}
                                        </span>
                                    </th>
                                </tr>
                                <tr style={labelBorder}>
                                    <th style={labelTable1}>
                                        <span style={labelslabel}>Permit Due</span>    
                                    </th>    
                                    <th style={labelTable2}>:</th>
                                    <th style={labelTable3}>
                                        <span style={labelslabelSpan}>
                                            {(vehicle.permit_due == null ? "" : Moment(vehicle.permit_due).format('DD-MM-YYYY'))}
                                        </span>
                                    </th>
                                </tr>
                                <tr style={labelBorder}>
                                    <th style={labelTable1}>
                                        <span style={labelslabel}>FC Due</span>    
                                    </th>    
                                    <th style={labelTable2}>:</th>
                                    <th style={labelTable3}>
                                        <span style={labelslabelSpan}>
                                            {(vehicle.fc_due == null ? "" : Moment(vehicle.fc_due).format('DD-MM-YYYY'))}
                                        </span>
                                    </th>
                                </tr>
                                <tr style={labelBorder}>
                                    <th style={labelTable1}>
                                        <span style={labelslabel}>Driver</span>    
                                    </th>    
                                    <th style={labelTable2}>:</th>
                                    <th style={labelTable3}>
                                        <span style={labelslabelSpan}>
                                            {vehicle.vehicle_driver} {" - "} {vehicle.vehicle_driver_no}
                                        </span>
                                    </th>
                                </tr>
                                <tr style={labelBorder}>
                                    <th style={labelTable1}>
                                        <span style={labelslabel}>Status</span>    
                                    </th>    
                                    <th style={labelTable2}>:</th>
                                    <th style={labelTable3}>
                                        <span style={labelslabelSpan}>
                                            {vehicle.vehicle_status}
                                        </span>
                                    </th>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="d-flex pl-30" style={{justifyContent:'flex-start'}}>
                    <div className="address text-center">
                        <h1>SERVICES</h1>
                    </div>
                </div>

                {serviceSub.length > 0 && (
                <div className="table-responsive" style={{padding:'20px'}}>
                    <div className="col-md-12 col-12">
                        <table>
                            <thead>
                                <tr style={labelBorder}>
                                    <th style={labelTableSub}>
                                        <span style={labelslabel}>Services</span>    
                                    </th>    
                                    <th style={labelTableSub}>
                                        <span style={labelslabel}>Date</span>    
                                    </th>
                                    <th style={labelTableSub}>
                                        <span style={labelslabel}>KM</span>    
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceSub.map((dataSumm, key)=>
                                <tr style={labelBorder}>
                                    <td style={labelTableSub}>
                                        <span style={labelslabelSpan}>
                                            {dataSumm.service_sub_type}
                                        </span>
                                    </td>
                                    <td style={labelTableSub}>
                                        <span style={labelslabelSpan}>
                                            {Moment(dataSumm.service_sub_date).format('DD-MM-YYYY')}
                                        </span>
                                    </td>
                                    <td style={labelTableSub}>
                                        <span style={labelslabelSpan}>
                                            {dataSumm.service_sub_km}
                                        </span>
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                )}

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
                
                {serviceSub.length <= 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <h1>No Data Available</h1>
                    </div>
                )}
                <div className="d-flex pl-30" style={{justifyContent:'flex-start'}}>
                    <div className="address text-center">
                        <h1>TRIP</h1>
                    </div>
                </div>
                {trip.length > 0 && (
                    <div className="table-responsive">
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table" style={{border: '2px solid black', marginTop: '20px'}}>
                                <TableHead>          
                                    <TableRow>
                                        <TableCell style={table_head}>Date</TableCell>
                                        <TableCell style={table_head}>Agency</TableCell>
                                        <TableCell style={table_head}>KM</TableCell>
                                        <TableCell style={table_head}>Supplier</TableCell>
                                        <TableCell style={table_head}>HSD</TableCell>
                                        <TableCell style={table_head}>HSD Supplied</TableCell>
                                        <TableCell style={table_head}>Driver</TableCell>
                                        <TableCell style={table_head}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {trip.map((dataSumm, key)=>(
                                        <TableRow key={dataSumm.reg_no}>
                                            <TableCell style={table_row_count}>{(dataSumm.trip_date == null ? "" : Moment(dataSumm.trip_date).format('DD-MM-YYYY'))}</TableCell>
                                            <TableCell style={table_row_count}>{dataSumm.trip_agency}</TableCell>
                                            <TableCell style={table_row_count}>{dataSumm.trip_km}</TableCell>
                                            <TableCell style={table_row_count}>{dataSumm.trip_supplier}</TableCell>
                                            <TableCell style={table_row_count}>{dataSumm.trip_hsd}</TableCell>
                                            <TableCell style={table_row_count}>{dataSumm.trip_hsd_supplied}</TableCell>
                                            <TableCell style={table_row_count}>{dataSumm.trip_driver}{" - "}{dataSumm.trip_driver_no}</TableCell>
                                            <TableCell style={table_row_count}>{dataSumm.trip_status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
                {trip.length <= 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <h1>No Data Available</h1>
                    </div>
                )}
                <div className="d-flex pl-30" style={{justifyContent:'flex-start'}}>
                    <div className="address text-center">
                        <h1>TYRE</h1>
                    </div>
                </div>
                {tyre != 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <div className="row">
                            <div className="col-md-12 col-12">
                                <table>
                                    <tr style={labelBorder}>
                                        <th style={tyrelabel}>
                                            <span style={labelslabel}>Tyre Position</span>    
                                        </th>    
                                        <th style={tyrelabel}>
                                            <span style={labelslabel}>Tyre No</span>    
                                        </th>
                                        <th style={tyrelabel}>
                                            <span style={labelslabel}>Date</span>    
                                        </th>
                                        <th style={tyrelabel}>
                                            <span style={labelslabel}>KM</span>    
                                        </th>
                                        <th style={tyrelabel}>
                                            <span style={labelslabel}>Status</span>    
                                        </th>
                                    </tr> 
                                    {vehicle.vehicle_type != 'Other' && (
                                        <tr style={labelBorder}>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    1. Front Left
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_1_front_left_no}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {(tyre.tyre_assign_1_front_left_date == null ? "" : Moment(tyre.tyre_assign_1_front_left_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_1_front_left_km}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_1_front_left_status}
                                                </span>
                                            </th>
                                        </tr>
                                    )}
                                    {vehicle.vehicle_type != 'Other' && (
                                        <tr style={labelBorder}>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    2. Front Right
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_2_front_right_no}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {(tyre.tyre_assign_2_front_right_date == null ? "" : Moment(tyre.tyre_assign_2_front_right_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_2_front_right_km}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_2_front_right_status}
                                                </span>
                                            </th>
                                            
                                        </tr>
                                    )}
                                    {vehicle.vehicle_type == '6W Truck' && (
                                        <tr style={labelBorder}>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    3. Back Left
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_3_back_left_no}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {(tyre.tyre_assign_3_back_left_date == null ? "" : Moment(tyre.tyre_assign_3_back_left_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_3_back_left_km}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_3_back_left_status}
                                                </span>
                                            </th>
                                            
                                        </tr>
                                    )}
                                    {vehicle.vehicle_type == '6W Truck' && (
                                        <tr style={labelBorder}>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    4. Back Left
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_4_back_left_no}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {(tyre.tyre_assign_4_back_left_date == null ? "" : Moment(tyre.tyre_assign_4_back_left_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_4_back_left_km}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_4_back_left_status}
                                                </span>
                                            </th>
                                            
                                        </tr>
                                    )}
                                    {vehicle.vehicle_type == '6W Truck' && (
                                        <tr style={labelBorder}>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    5. Back Right
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_5_back_right_no}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {(tyre.tyre_assign_5_back_right_date == null ? "" : Moment(tyre.tyre_assign_5_back_right_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_5_back_right_km}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_5_back_right_status}
                                                </span>
                                            </th>
                                            
                                        </tr>
                                    )}
                                    {vehicle.vehicle_type == '6W Truck' && (
                                        <tr style={labelBorder}>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    6. Back Right
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_6_back_right_no}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {(tyre.tyre_assign_6_back_right_date == null ? "" : Moment(tyre.tyre_assign_6_back_right_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_6_back_right_km}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_6_back_right_status}
                                                </span>
                                            </th>
                                            
                                        </tr>
                                    )}
                                    {vehicle.vehicle_type == '10W Truck' && (
                                        <tr style={labelBorder}>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    3. Back Housing Left
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_3_back_housing_left_no}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {(tyre.tyre_assign_3_back_housing_left_date == null ? "" : Moment(tyre.tyre_assign_3_back_housing_left_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_3_back_housing_left_km}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_3_back_housing_left_status}
                                                </span>
                                            </th>
                                            
                                        </tr>
                                    )}
                                    {vehicle.vehicle_type == '10W Truck' && (
                                        <tr style={labelBorder}>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    4. Back Housing Left
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_4_back_housing_left_no}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {(tyre.tyre_assign_4_back_housing_left_date == null ? "" : Moment(tyre.tyre_assign_4_back_housing_left_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_4_back_housing_left_km}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_4_back_housing_left_status}
                                                </span>
                                            </th>
                                            
                                        </tr>
                                    )}
                                    {vehicle.vehicle_type == '10W Truck' && (
                                        <tr style={labelBorder}>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    5. Back Dummy Left
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_5_back_dummy_left_no}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {(tyre.tyre_assign_5_back_dummy_left_date == null ? "" : Moment(tyre.tyre_assign_5_back_dummy_left_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_5_back_dummy_left_km}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_5_back_dummy_left_status}
                                                </span>
                                            </th>
                                            
                                        </tr>
                                    )}
                                    {vehicle.vehicle_type == '10W Truck' && (
                                        <tr style={labelBorder}>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    6. Back Dummy Left
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_6_back_dummy_left_no}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {(tyre.tyre_assign_6_back_dummy_left_date == null ? "" : Moment(tyre.tyre_assign_6_back_dummy_left_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_6_back_dummy_left_km}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_6_back_dummy_left_status}
                                                </span>
                                            </th>
                                            
                                        </tr>
                                    )}
                                    {vehicle.vehicle_type == '10W Truck' && (
                                        <tr style={labelBorder}>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    7. Back Housing Right
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_7_back_housing_right_no}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {(tyre.tyre_assign_7_back_housing_right_date == null ? "" : Moment(tyre.tyre_assign_7_back_housing_right_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_7_back_housing_right_km}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_7_back_housing_right_status}
                                                </span>
                                            </th>
                                            
                                        </tr>
                                    )}
                                    {vehicle.vehicle_type == '10W Truck' && (
                                        <tr style={labelBorder}>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    8. Back Housing Right
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_8_back_housing_right_no}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {(tyre.tyre_assign_8_back_housing_right_date == null ? "" : Moment(tyre.tyre_assign_8_back_housing_right_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_8_back_housing_right_km}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_8_back_housing_right_status}
                                                </span>
                                            </th>
                                            
                                        </tr>
                                    )}
                                    {vehicle.vehicle_type == '10W Truck' && (
                                        <tr style={labelBorder}>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    9. Back Dummy Right
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_9_back_dummy_right_no}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {(tyre.tyre_assign_9_back_dummy_right_date == null ? "" : Moment(tyre.tyre_assign_9_back_dummy_right_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_9_back_dummy_right_km}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_9_back_dummy_right_status}
                                                </span>
                                            </th>
                                            
                                        </tr>
                                    )}
                                    {vehicle.vehicle_type == '10W Truck' && (
                                        <tr style={labelBorder}>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    10. Back Dummy Right
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_10_back_dummy_right_no}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {(tyre.tyre_assign_10_back_dummy_right_date == null ? "" : Moment(tyre.tyre_assign_10_back_dummy_right_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_10_back_dummy_right_km}
                                                </span>
                                            </th>
                                            <th style={tyreValue}>
                                                <span style={labelslabelSpan}>
                                                    {tyre.tyre_assign_10_back_dummy_right_status}
                                                </span>
                                            </th>
                                            
                                        </tr>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                    )}
                {tyre == 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <h1>No Data Available</h1>
                    </div>
                )}
            </div>
            </RctCard>
            
          </div>
        </div>
      </div>
      </>}
    </div>
  );
};
export default vehicleDetail;