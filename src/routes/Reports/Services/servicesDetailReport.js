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



const ServicesDetailSummaryReport = (props) => {
  const componentRef = useRef();
  const [servicesummary, setSummary] = useState({});
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
        service_date_from:localStorage.getItem("service_date_from"),
        service_date_to: localStorage.getItem("service_date_to"), 
        service_garage:localStorage.getItem("service_garage"),
        service_company:localStorage.getItem("service_company"),
        service_branch:localStorage.getItem("service_branch"),
        service_truck_no:localStorage.getItem("service_truck_no"),
    };
    

    axios({
      url: baseURL+"/fetch-services-details-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        setSummary(res.data.services);
        
        setLoader(false)
      
    });
  }, []);
 

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
        service_date_from:localStorage.getItem("service_date_from"),
        service_date_to: localStorage.getItem("service_date_to"), 
        service_garage:localStorage.getItem("service_garage"),
        service_company:localStorage.getItem("service_company"),
        service_branch:localStorage.getItem("service_branch"),
        service_truck_no:localStorage.getItem("service_truck_no"),
    };
    
  
    setIsButtonDisabled(true)
      axios({
        url: baseURL+"/download-services-details-report",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
          
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'services.csv'); 
          document.body.appendChild(link);
          link.click();
          NotificationManager.success("Report is Downloaded Successfully");
          setIsButtonDisabled(false)
        }).catch((err) =>{
          NotificationManager.error("Receipt is Not Downloaded");
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
        <PageTitleBar title="Services Details Summary" match={props.match} />
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
                        <b style={{fontSize: '20px'}}>SERVICES DETAILS SUMMARY</b>
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
                          <TableCell style={table_head}>Date</TableCell>
                          <TableCell style={table_head}>Vehicle No</TableCell>
                          <TableCell style={table_head}>Service Type</TableCell>
                          <TableCell style={table_head}>Amount</TableCell>
                          <TableCell style={table_head}>Details</TableCell>
                         </TableRow>
                      </TableHead>
                      <TableBody>
                        {servicesummary.map((dataSumm, key)=>(
                          <TableRow key={dataSumm.service_date}>
                            <TableCell style={table_row_count}>{Moment(dataSumm.service_date).format('DD-MM-YYYY')}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.service_truck_no}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.service_sub_type}</TableCell>
                            <TableCell style={table_row_count}>
                              <NumberFormat 
                                thousandSeparator={true} 
                                thousandsGroupStyle="lakh"
                                displayType={'text'}
                                prefix={'₹ '} 
                                value={dataSumm.service_sub_amount}
                              />
                            </TableCell>
                            <TableCell style={table_row_count}>{dataSumm.service_sub_details}</TableCell>
                          </TableRow>
                        ))}
                       </TableBody>
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
export default ServicesDetailSummaryReport;
