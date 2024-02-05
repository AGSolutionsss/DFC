import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RctCard } from "Components/RctCard/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../../api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import Moment from 'moment';
import NumberFormat from 'react-number-format';

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

const footertable = {
  fontSize:'12px',
  color:'black'
}

const TripMultipleSummaryReport = (props) => {
  const componentRef = useRef();
  const [tripsummary, setSummary] = useState({});
  const [tripsummaryfooter, setSummaryFooter] = useState({});
  const [loader, setLoader]= useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){
      window.location = "/signin";
    }else{
    }

    var url = new URL(window.location.href);
    let data = {
        trip_date_from: localStorage.getItem("trip_date_from"),
        trip_date_to: localStorage.getItem("trip_date_to"),
        trip_company:localStorage.getItem("trip_company"),
        trip_branch: localStorage.getItem("trip_branch"),
        trip_vehicle: localStorage.getItem("trip_vehicle"),
        trip_full_vehicle: localStorage.getItem("trip_full_vehicle"),
        trip_vehicle_type: localStorage.getItem("trip_vehicle_type"),
        trip_driver: localStorage.getItem("trip_driver"),
        trip_agency: localStorage.getItem("trip_agency"),
        trip_supplier: localStorage.getItem("trip_supplier"),
        trip_status: localStorage.getItem("trip_status"),
    };
    

    axios({
      url: baseURL+"/fetch-trip-multiple-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        setSummary(res.data.trip);
        setSummaryFooter(res.data.trip_footer);
        setLoader(false)
      
    });
  }, []);
 

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
        trip_date_from: localStorage.getItem("trip_date_from"),
        trip_date_to: localStorage.getItem("trip_date_to"),
        trip_company:localStorage.getItem("trip_company"),
        trip_branch: localStorage.getItem("trip_branch"),
        trip_vehicle: localStorage.getItem("trip_vehicle"),
        trip_full_vehicle: localStorage.getItem("trip_full_vehicle"),
        trip_vehicle_type: localStorage.getItem("trip_vehicle_type"),
        trip_driver: localStorage.getItem("trip_driver"),
        trip_agency: localStorage.getItem("trip_agency"),
        trip_supplier: localStorage.getItem("trip_supplier"),
        trip_status: localStorage.getItem("trip_status"),
    };
    
  
    setIsButtonDisabled(true)
      axios({
        url: baseURL+"/download-trip-multiple-report",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
          
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'tripmultiple.csv'); 
          document.body.appendChild(link);
          link.click();
          NotificationManager.success("Report is Downloaded Successfully");
          setIsButtonDisabled(false)
        }).catch((err) =>{
          NotificationManager.error("Report is Not Downloaded");
          setIsButtonDisabled(false)
        });
  
  };

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
        <PageTitleBar title="Multiple Trips Summary" match={props.match} />
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
                    <a  onClick={(e) => onSubmit(e)}>
                      <i className="mr-10 ti-download"></i> Download
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
                        <b style={{fontSize: '20px'}}>MULTIPLE TRIPS SUMMARY</b>
                      </strong>
                    </h2>
                  </div>
                  <div className="invoice-logo text-right">
                    
                  </div>
                </div>
                
                <div className="table-responsive">
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table" style={{border: '2px solid black', marginTop: '20px'}}>
                      <TableHead>          
                        <TableRow>
                          <TableCell style={table_head}>Company</TableCell>
                          <TableCell style={table_head}>Branch</TableCell>
                          <TableCell style={table_head}>Reg No</TableCell>
                          <TableCell style={table_head}>Driver</TableCell>
                          <TableCell style={table_head}>Total Trip</TableCell>
                          <TableCell style={table_head}>RT KM</TableCell>
                          <TableCell style={table_head}>HSD Supplied</TableCell>
                         </TableRow>
                      </TableHead>
                      <TableBody>
                        {tripsummary.map((dataSumm, key)=>(
                          <TableRow key={dataSumm.trip_date}>
                            <TableCell style={table_row_count}>{dataSumm.trip_company}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.trip_branch}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.trip_vehicle}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.trip_driver}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.trip_total}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.trip_km}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.trip_hsd_supplied}</TableCell>
                          </TableRow>
                        ))}
                       </TableBody>
                       <TableFooter>
                        <TableRow>
                          <TableCell colSpan={4} style={table_row_count}>
                            <span style={footertable}>Total</span>
                          </TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>{tripsummaryfooter.trip_total}</span>
                          </TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>{tripsummaryfooter.trip_km}</span>
                          </TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>{tripsummaryfooter.trip_hsd_supplied}</span>
                          </TableCell>
                        </TableRow>
                       </TableFooter>
                    </Table>
                  </TableContainer>
                </div>
              </div>
              
            </RctCard>
            
          </div>
        </div>
      </div>
      </>}
    </div>
  );
};
export default TripMultipleSummaryReport;
