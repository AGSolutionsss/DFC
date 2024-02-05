import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../../api';
import Select from 'react-select';
import "./vehicleDetails.css";


const vehicleDetailForm = (props) => {
    let history = useHistory();
    const [downloadVehicle, setVehicleDownload] = useState({
        vehicle_reg_no: "", 
    });
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
    
    const [vehicleReg, setVehicleReg] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vehicles-report', requestOptions)
      .then(response => response.json())
      .then(data => setVehicleReg(data.vehicles)); 
    }, []);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){
    
            window.location = "/signin";
            
        }else{
    
        }
        
    });

    const onInputChange = (e) => {
        setVehicleDownload({
          ...downloadVehicle,
          [e.name]: e.value,
        });
        setIsButtonDisabled(false);
    };

    const onReportView = (e) => {
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if(v){
          
          localStorage.setItem('vehicle_reg_no',downloadVehicle.vehicle_reg_no);
          history.push("vehicleReport");
        }
    }
  
    
  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Vehicle Details" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <Select
                  
                  options={vehicleReg.map((option) => (
                  {
                    value: option.reg_no,
                    label: option.reg_no,
                    name: 'vehicle_reg_no',
                  }))}
                  placeholder="Vehicle Reg No"
                  label="Vehicle Reg No"
                  name="vehicle_reg_no"
                  required
                  alue={downloadVehicle.vehicle_reg_no}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              type="submit"
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

export default vehicleDetailForm;
