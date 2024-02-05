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



const TyreDetailSummaryReport = (props) => {
  const componentRef = useRef();
  const [tyresummary, setSummary] = useState({});
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
        tyre_from_date:localStorage.getItem("tyre_from_date"),
        tyre_to_date: localStorage.getItem("tyre_to_date"), 
        tyre_supplier:localStorage.getItem("tyre_supplier"),
        tyre_company:localStorage.getItem("tyre_company"),
        tyre_branch:localStorage.getItem("tyre_branch"),
        tyre_count:localStorage.getItem("tyre_count"),
    };
    

    axios({
      url: baseURL+"/fetch-tyre-details-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        setSummary(res.data.tyre);
        
        setLoader(false)
      
    });
  }, []);
 

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
        tyre_from_date:localStorage.getItem("tyre_from_date"),
        tyre_to_date: localStorage.getItem("tyre_to_date"), 
        tyre_supplier:localStorage.getItem("tyre_supplier"),
        tyre_company:localStorage.getItem("tyre_company"),
        tyre_branch:localStorage.getItem("tyre_branch"),
        tyre_count:localStorage.getItem("tyre_count"),
    };
    
  
    setIsButtonDisabled(true)
      axios({
        url: baseURL+"/download-tyre-details-report",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
          
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'tyre.csv'); 
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
        <PageTitleBar title="Tyres Details Summary" match={props.match} />
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
                        <b style={{fontSize: '20px'}}>TYRES DETAILS SUMMARY</b>
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
                          <TableCell style={table_head}>Branch</TableCell>
                          <TableCell style={table_head}>Tyre No</TableCell>
                          <TableCell style={table_head}>Tyre Type</TableCell>
                          <TableCell style={table_head}>Tyre Make</TableCell>
                          <TableCell style={table_head}>Tyre Status</TableCell>
                         </TableRow>
                      </TableHead>
                      <TableBody>
                        {tyresummary.map((dataSumm, key)=>(
                          <TableRow key={dataSumm.tyre_date}>
                            <TableCell style={table_row_count}>{dataSumm.tyre_sub_branch}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.tyre_sub_no}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.tyre_sub_type}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.tyre_sub_make}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.tyre_sub_status}</TableCell>
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
export default TyreDetailSummaryReport;
