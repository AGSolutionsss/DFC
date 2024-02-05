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
import Moment from 'moment';
import { savePDF } from '@progress/kendo-react-pdf';
import NumberFormat from 'react-number-format';
import { NotificationContainer, NotificationManager,} from "react-notifications";

const table_row_count = {
  border: "1px solid black",
  textAlign: "center",
  fontSize: "11px",
  paddingTop:"0px",
  paddingBottom:"0px",
};

const table_row_count1 = {
  border: "1px solid black",
  textAlign: "left",
  fontSize: "11px",
  paddingTop:"0px",
  paddingBottom:"0px",
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

const footertable1 = {
  fontSize:'12px',
  color:'black',
  fontWeight:'600'
}

const SalarySummaryReport = (props) => {
  const componentRef = useRef();
  const [salarysummary, setSummary] = useState({});
  const [salarysummarytop, setSummaryTop] = useState({});
  const [salarysummaryfooter, setSummaryFooter] = useState({});
  const [salarysummaryfootertcount, setSummaryFooterTCount] = useState({});
  const [salarysummaryfootertmileage, setSummaryFooterTMileage] = useState({});
  const [salarysummaryfooterthmali, setSummaryFooterTHmali] = useState({});
  const [salarysummaryfootertkm, setSummaryFooterTKM] = useState({});
  const [salarysummaryfooterthsd, setSummaryFooterTHSD] = useState({});
  const [salarysummaryfooterthsdsupplied, setSummaryFooterTHSDSupplied] = useState({});
  const [salarysummaryfootertadvance, setSummaryFooterTAdvance] = useState({});
  const [salarysummaryfootertbataamount, setSummaryFooterTBataAmount] = useState({});
  const [salarysummaryfootertmysore, setSummaryFooterTMysore] = useState({});
  const [salarysummaryfootertripbatacount, setSummaryFooterTripBataCount] = useState({});
 const [salarysummaryfooterhsd, setSummaryFooterHSD] = useState({});
  const [salarysummaryfooterpayment, setSummaryFooterPayment] = useState({});
  const [loader, setLoader]= useState(true);
  const today = Moment().format('DD-MM-YYYY');
  const todaymonth = Moment(localStorage.getItem("trip_date_from")).month() + 1;

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
      url: baseURL+"/fetch-salary-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        setSummaryTop(res.data.salary_top);
        setSummary(res.data.salary_bottom);
        setSummaryFooter(res.data.salary_footer);
        setSummaryFooterTCount(res.data.salary_footer_trip_count);
        setSummaryFooterTMileage(res.data.salary_footer_trip_mileage);
        setSummaryFooterTHmali(res.data.salary_footer_trip_hmali);
        setSummaryFooterTKM(res.data.salary_footer_trip_km);
        setSummaryFooterTHSD(res.data.salary_footer_trip_hsd);
        setSummaryFooterTHSDSupplied(res.data.salary_footer_trip_hsd_supplied);
        setSummaryFooterTAdvance(res.data.salary_footer_trip_advance);
        setSummaryFooterTBataAmount(res.data.salary_footer_trip_bata_amount);
        setSummaryFooterTMysore(res.data.salary_footer_mysore);
        setSummaryFooterHSD(res.data.salary_footer_hsd);
        setSummaryFooterPayment(res.data.salary_payament_advance);
        setSummaryFooterTripBataCount(res.data.trip_bata_per_day_count.length);
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
      url: baseURL+"/download-salary-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'salary.csv'); 
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
              {salarysummarytop != 0 && (
              <div className="p-10" ref={componentRef} style={{margin: '5px'}}>
                <div className="d-flex justify-content-between" style={{fontSize: '16px' }}>
                  <div className="invoice-logo ">
                    
                  </div>
                  <div className="address text-center">
                    
                    <h2 style={{paddingTop: '5px'}}>
                      <strong>
                        <b style={{fontSize: '20px'}}>{salarysummarytop.trip_company} - {salarysummarytop.trip_branch}<br/>
                        TRIP ACCOUNT OF DRIVER - ( {salarysummarytop.trip_vehicle} - {salarysummarytop.trip_vehicle_type} )</b>
                      </strong>
                    </h2>
                  </div>
                  <div className="invoice-logo text-right">
                    
                  </div>
                </div>
                  <table className="mt-4" style={{width:'100%',textAlign:'center'}}>
                    <tr>
                      <th>Date</th>
                      <th>Driver</th>
                      <th>Month</th>
                      <th>Year</th>
                      <th>Trip Count</th>
                      <th>KM Run</th>
                    </tr>
                    <tr>
                      <td>{today}</td>
                      <td>{salarysummarytop.trip_driver}</td>
                      <td>{todaymonth}</td>
                      <td>{salarysummarytop.trip_year}</td>
                      <td>{salarysummarytop.trip_count}</td>
                      <td>{salarysummarytop.trip_km}</td>
                    </tr>
                  </table>
                  <div className="table-responsive">
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table" style={{border: '2px solid black', marginTop: '20px'}}>
                      <TableHead>          
                        <TableRow>
                          <TableCell style={table_head}>Sl No</TableCell>
                          <TableCell style={table_head}>Date</TableCell>
                          <TableCell style={table_head}>Destination</TableCell>
                          <TableCell style={table_head}>Average</TableCell>
                          <TableCell style={table_head}>Hamali</TableCell>
                          <TableCell style={table_head}>RT KM</TableCell>
                          <TableCell style={table_head}>Fixed HSD</TableCell>
                          <TableCell style={table_head}>Issued HSD</TableCell>
                          <TableCell style={table_head}>Advance</TableCell>
                          <TableCell style={table_head}>RT KM Incentive</TableCell>
                         </TableRow>
                      </TableHead>
                      <TableBody>
                        {salarysummary.map((dataSumm, key)=>(
                          <TableRow key={key}>
                            <TableCell style={table_row_count}>{key + 1}</TableCell>
                            <TableCell style={table_row_count}>{Moment(dataSumm.trip_date).format('DD-MM-YYYY')}</TableCell>
                            <TableCell style={table_row_count1}>{dataSumm.trip_agency}</TableCell>
                            <TableCell style={table_row_count}>{((dataSumm.trip_km / dataSumm.trip_hsd_supplied) == 'Infinity' ? 0 : (dataSumm.trip_km / dataSumm.trip_hsd_supplied).toFixed(2))}</TableCell>
                            <TableCell style={table_row_count}>
                              <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={dataSumm.trip_hmali}
                              />
                            </TableCell>
                            <TableCell style={table_row_count}>{dataSumm.trip_km}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.trip_hsd}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.trip_hsd_supplied}</TableCell>
                            <TableCell style={table_row_count}>
                              <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={dataSumm.trip_advance}
                              />
                            </TableCell>
                            <TableCell style={table_row_count}>
                              <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={dataSumm.trip_bata_amount}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                       </TableBody>
                       <TableFooter>
                       <TableRow>
                          <TableCell colSpan={3} style={table_row_count}>
                            <span style={footertable}>Total</span>
                          </TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>
                              {Math.round(salarysummaryfootertkm.trip_km / salarysummaryfooterthsdsupplied.trip_hsd_supplied*100)/100}</span>
                          </TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>
                              <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={salarysummaryfooterthmali.trip_hmali}
                              />
                              </span>
                          </TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>{salarysummaryfootertkm.trip_km}</span>
                          </TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>{salarysummaryfooterthsd.trip_hsd}</span>
                          </TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>{salarysummaryfooterthsdsupplied.trip_hsd_supplied}</span>
                          </TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>
                            <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={salarysummaryfootertadvance.trip_advance}
                              /></span>
                          </TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>
                            <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={salarysummaryfootertbataamount.trip_bata_amount}
                              /></span>
                          </TableCell>
                        </TableRow>

                       <TableRow>
                          <TableCell colSpan={3} style={table_row_count}>
                            <span style={footertable}>Driver Salary</span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>
                              <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={salarysummaryfooter.trip_driver_salary}
                              /></span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={3} style={table_row_count}>
                            <span style={footertable}>Trip Salary</span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>
                              <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={salarysummaryfooter.trip_incentive_amount * salarysummaryfootertcount.trip_count}
                              /></span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={3} style={table_row_count}>
                            <span style={footertable}>Incentive RTKM Amount</span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>
                              <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={salarysummaryfooter.trip_bata_for_km * salarysummaryfootertkm.trip_km}
                              /></span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={3} style={table_row_count}>
                            <span style={footertable}>Incentive Trip Amount</span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>
                              <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={salarysummaryfooter.trip_bata_for_trip * salarysummaryfootertcount.trip_count}
                              /></span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                        </TableRow>
                        
                        <TableRow>
                          <TableCell colSpan={3} style={table_row_count}>
                            <span style={footertable}>Trip Hamali</span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>
                              <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={salarysummaryfooterthmali.trip_hmali}
                              /></span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={3} style={table_row_count}>
                            <span style={footertable}>HSD BALANCE B/F</span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>{salarysummaryfooterhsd}</span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                        </TableRow>
                        
                        <TableRow>
                          <TableCell colSpan={3} style={table_row_count}>
                            <span style={footertable}>HSD BALANCE C/F</span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>{(salarysummaryfooterthsdsupplied.trip_hsd_supplied + +salarysummaryfooterhsd) - salarysummaryfooterthsd.trip_hsd}</span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={3} style={table_row_count}>
                            <span style={footertable}>Net Payable</span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable1}>
                              <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={(salarysummaryfooter.trip_incentive_amount * salarysummaryfootertcount.trip_count) + (salarysummaryfooter.trip_bata_for_trip * salarysummaryfootertcount.trip_count) + (salarysummaryfooterthmali.trip_hmali - salarysummaryfootertadvance.trip_advance) + +salarysummaryfooter.trip_driver_salary + (salarysummaryfooter.trip_bata_for_km * salarysummaryfootertkm.trip_km)}
                              /></span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={3} style={table_row_count}>
                            <span style={footertable}>Incentive Add</span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>
                            <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={parseInt(salarysummaryfootertbataamount.trip_bata_amount) + +(salarysummaryfootertmysore.rtkm_mysore * salarysummaryfooter.trip_bata_for_km)}
                              /></span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={3} style={table_row_count}>
                            <span style={footertable}>Trip Bata for a Day</span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>
                            <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={parseInt(salarysummaryfootertripbatacount) * parseInt((salarysummarytop.trip_bata_for_day == null ? 0 : salarysummarytop.trip_bata_for_day)) }
                              /></span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={3} style={table_row_count}>
                            <span style={footertable}>Payment Advance</span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable}>
                            <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={(salarysummaryfooterpayment.payment_details_amount == null ? 0 : salarysummaryfooterpayment.payment_details_amount)}
                              /></span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={3} style={table_row_count}>
                            <span style={footertable}>Net Payable</span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}></TableCell>
                          <TableCell style={table_row_count}>
                            <span style={footertable1}>
                              <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={(salarysummaryfooter.trip_incentive_amount * salarysummaryfootertcount.trip_count)+ (salarysummaryfootertmysore.rtkm_mysore * salarysummaryfooter.trip_bata_for_km) + (salarysummaryfooter.trip_bata_for_trip * salarysummaryfootertcount.trip_count) + (salarysummaryfooterthmali.trip_hmali - salarysummaryfootertadvance.trip_advance) + +salarysummaryfootertbataamount.trip_bata_amount + +salarysummaryfooter.trip_driver_salary + (salarysummaryfooter.trip_bata_for_km * salarysummaryfootertkm.trip_km) - (salarysummaryfooterpayment.payment_details_amount == null ? 0 : salarysummaryfooterpayment.payment_details_amount) + (salarysummaryfootertripbatacount * (salarysummarytop.trip_bata_for_day == null ? 0 : salarysummarytop.trip_bata_for_day))}
                                
                              />
                            </span>
                          </TableCell>
                          <TableCell style={table_row_count}></TableCell>
                        </TableRow>
                       </TableFooter>
                    </Table>
                  </TableContainer>
                </div>
              </div>
              )}

                {salarysummarytop == 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <h1>No Data Available</h1>
                    </div>
                )}
            </RctCard>
            
          </div>
        </div>
      </div>
      </>}
    </div>
  );
};
export default SalarySummaryReport;
