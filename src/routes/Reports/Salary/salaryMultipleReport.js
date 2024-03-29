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
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from '@material-ui/core/TableFooter';
import Paper from "@material-ui/core/Paper";
import { useHistory, useParams } from "react-router-dom";
import { savePDF } from '@progress/kendo-react-pdf';
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

const table_pointer = {
    cursor:'pointer',
    fontWeight:'600'
}

const footertable = {
    fontSize:'13px',
    color:'black',
    fontWeight:'600'
}

const SalaryMultipleSummaryReport = (props) => {
    let history = useHistory();
  const componentRef = useRef();
  const [salarysummary, setSummary] = useState({});
  const [salarysummaryfooter, setSummaryFooter] = useState({});
  const [loader, setLoader]= useState(true);
  
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
        trip_driver: localStorage.getItem("trip_driver"),   
    };
    

    axios({
      url: baseURL+"/fetch-salary-multiple-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        setSummary(res.data.salary);
        setSummaryFooter(res.data.salary_footer);
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

const onReportView = (e) => {
    e.preventDefault();
    localStorage.setItem('trip_driver',e.target.innerText);
    history.push("salaryReport");
}

const onSubmit = (e) => {
  
  e.preventDefault();
  let data = {
    trip_date_from: localStorage.getItem("trip_date_from"),
    trip_date_to: localStorage.getItem("trip_date_to"),
    trip_company:localStorage.getItem("trip_company"),
    trip_branch: localStorage.getItem("trip_branch"),
    trip_driver: localStorage.getItem("trip_driver"),  
  };
  

  
    axios({
      url: baseURL+"/download-salary-multiple-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'salaryMultiple.csv'); 
        document.body.appendChild(link);
        link.click();
        NotificationManager.success("Report is Downloaded Successfully");
        
      }).catch((err) =>{
        NotificationManager.error("Receipt is Not Downloaded");
        
      });

};

  return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <div className="invoice-wrapper">
        <PageTitleBar title="Salary Summary" match={props.match} />
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
                        <b style={{fontSize: '20px'}}>TRIP ACCOUNT OF DRIVERS</b>
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
                          <TableCell style={table_head}>Vehicle</TableCell>
                          <TableCell style={table_head}>Driver</TableCell>
                          <TableCell style={table_head}>Total Trip</TableCell>
                          <TableCell style={table_head}>Total KM</TableCell>
                          <TableCell style={table_head}>Trip Amount</TableCell>
                          <TableCell style={table_head}>Hamali</TableCell>
                          <TableCell style={table_head}>Incentive</TableCell>
                          <TableCell style={table_head}>Advance</TableCell>
                          <TableCell style={table_head}>Net Payable</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {salarysummary.map((dataSumm, key)=>(
                          <TableRow key={key}>
                            <TableCell style={table_row_count}>{dataSumm.trip_company}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.trip_branch}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.trip_vehicle}</TableCell>
                            <TableCell style={table_row_count}><span style={table_pointer} onClick={(e) => onReportView(e)}>{dataSumm.trip_driver}</span></TableCell>
                            <TableCell style={table_row_count}>{dataSumm.trip_count}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.trip_km}</TableCell>
                            <TableCell style={table_row_count}>
                                <NumberFormat 
                                    thousandSeparator={true} 
                                    thousandsGroupStyle="lakh"
                                    displayType={'text'}
                                    prefix={'₹ '} 
                                    value ={dataSumm.trip_incentive_amount * dataSumm.trip_count}
                                />
                            </TableCell>
                            <TableCell style={table_row_count}>
                                <NumberFormat 
                                    thousandSeparator={true} 
                                    thousandsGroupStyle="lakh"
                                    displayType={'text'}
                                    prefix={'₹ '} 
                                    value ={dataSumm.trip_hmali}
                                />
                            </TableCell>
                            <TableCell style={table_row_count}>
                                <NumberFormat 
                                    thousandSeparator={true} 
                                    thousandsGroupStyle="lakh"
                                    displayType={'text'}
                                    prefix={'₹ '} 
                                    value ={dataSumm.trip_bata_amount}
                                />
                            </TableCell>
                            <TableCell style={table_row_count}>
                                <NumberFormat 
                                    thousandSeparator={true} 
                                    thousandsGroupStyle="lakh"
                                    displayType={'text'}
                                    prefix={'₹ '} 
                                    value ={dataSumm.trip_advance}
                                />
                            </TableCell>
                            <TableCell style={table_row_count}>
                                <NumberFormat 
                                    thousandSeparator={true} 
                                    thousandsGroupStyle="lakh"
                                    displayType={'text'}
                                    prefix={'₹ '} 
                                    value ={(dataSumm.trip_incentive_amount * dataSumm.trip_count) + (dataSumm.trip_bata_for_trip) + (dataSumm.trip_hmali - dataSumm.trip_advance) + +dataSumm.trip_bata_amount + +dataSumm.trip_driver_salary + (dataSumm.trip_bata_for_km * dataSumm.trip_km)}
                                />    
                            </TableCell>
                          </TableRow>
                        ))}
                       </TableBody>
                       <TableFooter>
                            <TableCell colSpan={4} style={table_row_count}>
                                <span style={footertable}>Total</span>
                            </TableCell>
                            <TableCell style={table_row_count}>
                                <span style={footertable}>{salarysummaryfooter.trip_count}</span>
                            </TableCell>
                            <TableCell style={table_row_count}>
                                <span style={footertable}>{salarysummaryfooter.trip_km}</span>
                            </TableCell>
                            <TableCell style={table_row_count}>
                                <span style={footertable}>
                                    <NumberFormat 
                                        thousandSeparator={true} 
                                        thousandsGroupStyle="lakh"
                                        displayType={'text'}
                                        prefix={'₹ '} 
                                        value ={salarysummaryfooter.trip_incentive_amount * salarysummaryfooter.trip_count}
                                    />
                                </span>
                            </TableCell>
                            <TableCell style={table_row_count}>
                                <span style={footertable}>
                                    <NumberFormat 
                                        thousandSeparator={true} 
                                        thousandsGroupStyle="lakh"
                                        displayType={'text'}
                                        prefix={'₹ '} 
                                        value ={salarysummaryfooter.trip_hmali}
                                    />
                                </span>
                            </TableCell>
                            <TableCell style={table_row_count}>
                                <span style={footertable}>
                                    <NumberFormat 
                                        thousandSeparator={true} 
                                        thousandsGroupStyle="lakh"
                                        displayType={'text'}
                                        prefix={'₹ '} 
                                        value ={salarysummaryfooter.trip_bata_amount}
                                    />
                                </span>
                            </TableCell>
                            <TableCell style={table_row_count}>
                                <span style={footertable}>
                                    <NumberFormat 
                                        thousandSeparator={true} 
                                        thousandsGroupStyle="lakh"
                                        displayType={'text'}
                                        prefix={'₹ '} 
                                        value ={salarysummaryfooter.trip_advance}
                                    />
                                </span>
                            </TableCell>
                            <TableCell style={table_row_count}>
                                <span style={footertable}>
                                    <NumberFormat 
                                        thousandSeparator={true} 
                                        thousandsGroupStyle="lakh"
                                        displayType={'text'}
                                        prefix={'₹ '} 
                                        value ={((salarysummaryfooter.trip_incentive_amount / salarysummaryfooter.trip_count) * salarysummaryfooter.trip_count) + (salarysummaryfooter.trip_bata_for_trip) +(salarysummaryfooter.trip_hmali - salarysummaryfooter.trip_advance) + +(salarysummaryfooter.trip_bata_amount / salarysummaryfooter.trip_count)+ +(salarysummaryfooter.trip_driver_salary / salarysummaryfooter.trip_count) + ((salarysummaryfooter.trip_bata_for_km / salarysummaryfooter.trip_count) * salarysummaryfooter.trip_km)}
                                    />
                                </span>
                            </TableCell>
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
export default SalaryMultipleSummaryReport;
