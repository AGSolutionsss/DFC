import React, { Component } from "react";
import {
  FormGroup,
  Input,
  Form,
  Label,
  Col,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import Button from "@material-ui/core/Button";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import {baseURL} from '../../api';
import IntlMessages from "Util/IntlMessages";

export default class Profile extends Component {
  
  state = {
    userdata: {},
    firstName:'',
    phone:'',
    email:'',
    vehicle_type:'',
    user_address:'',
    dl_no:'',
    dl_expiry:'',
    hazard_lice_no:'',
    hazard_lice_expiry:'',
    loader:false,
  };
  
  getData = () => {
    axios({
      url: baseURL+"/web-fetch-profiles",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        this.setState({ firstName: res.data.user.full_name });
        this.setState({ phone: res.data.user.mobile });
        this.setState({ email: res.data.user.email });
        this.setState({ vehicle_type: res.data.user.vehicle_type });
        this.setState({ user_address: res.data.user.user_address });
        this.setState({ dl_no: res.data.user.dl_no });
        this.setState({ dl_expiry: res.data.user.dl_expiry });
        this.setState({ hazard_lice_no: res.data.user.hazard_lice_no });
        this.setState({ hazard_lice_expiry: res.data.user.hazard_lice_expiry });
      })
      .catch((res) => {
        this.setState({ loader: false });
      });
  };

  componentDidMount() {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    this.getData();

  }

  onUpdateProfile(e) {
    e.preventDefault();
    if(this.state.firstName == ""){
      NotificationManager.error("Enter Full Name");
      return false;
    }
    if((this.state.phone == "") || (this.state.phone == "NaN")){
      NotificationManager.error("Enter Mobile Number");
      return false;
    }
    let data = {
      first_name: this.state.firstName,
      vehicle_type: this.state.vehicle_type,
      user_address: this.state.user_address,
      dl_no: this.state.dl_no,
      dl_expiry: this.state.dl_expiry,
      hazard_lice_no: this.state.hazard_lice_no,
      hazard_lice_expiry: this.state.hazard_lice_expiry,

    };
    axios({
      url: baseURL+"/web-update-profile",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      NotificationManager.success("Profile Updated Successfully!");
      
    })
    .catch((res) => {
      NotificationManager.error("Profile not Updated");
      
    });
  };

  render() {
    return (
      <div className="profile-wrapper">
        <h2 className="heading">
          <IntlMessages id="widgets.personalDetails" />
        </h2>
        <Form >
          <div className="row">
            <div className="col-md-6">
              <FormGroup row>
                <Label for="firstName" sm={3}>
                  <IntlMessages id="components.firstName" />
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name="first_name"
                    id="fullName"
                    className="input-lg"
                    required
                    value={this.state.firstName}
                    onChange={(e) =>
                      
                      this.setState({ firstName: e.target.value })
                      
                    }
                  />
                </Col>
              </FormGroup>

          <FormGroup row>
            <Label for="telephone" sm={3}>
              <IntlMessages id="components.phoneNo" />
            </Label>
            <Col sm={9}>
              <Input
                type="tel"
                name="telephone"
                id="telephone"
                className="input-lg "
                required
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                    
                }}
                value={this.state.phone}
                disabled
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="email" sm={3}>
              <IntlMessages id="components.email" />
            </Label>
            <Col sm={9}>
              <Input
                type="email"
                name="email"
                id="email"
                className="input-lg"
                value={this.state.email}
                disabled
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="vehicle_type" sm={3}>
              <IntlMessages id="Vehicle" />
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="vehicle_type"
                id="vehicle_type"
                className="input-lg"
                value={this.state.vehicle_type}
                onChange={(e) =>
                  
                  this.setState({ vehicle_type: e.target.value })
                  
                }
              />
            </Col>
          </FormGroup>
          </div>
            <div className="col-md-6">
              <FormGroup row>
                <Label for="dl_no" sm={3}>
                  <IntlMessages id="DL No" />
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name="dl_no"
                    id="dl_no"
                    className="input-lg"
                    required
                    value={this.state.dl_no}
                    onChange={(e) =>
                      
                      this.setState({ dl_no: e.target.value })
                      
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="dl_no" sm={3}>
                  <IntlMessages id="DL Expiry" />
                </Label>
                <Col sm={9}>
                  <Input
                    type="date"
                    name="dl_expiry"
                    id="dl_expiry"
                    className="input-lg"
                    required
                    value={this.state.dl_expiry}
                    onChange={(e) =>
                      
                      this.setState({ dl_expiry: e.target.value })
                      
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="hazard_lice_no" sm={3}>
                  <IntlMessages id="Hazard Lice No" />
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name="hazard_lice_no"
                    id="hazard_lice_no"
                    className="input-lg"
                    required
                    value={this.state.hazard_lice_no}
                    onChange={(e) =>
                      
                      this.setState({ hazard_lice_no: e.target.value })
                      
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="hazard_lice_expiry" sm={3}>
                  <IntlMessages id="Hazard Lice No Expiry" />
                </Label>
                <Col sm={9}>
                  <Input
                    type="date"
                    name="hazard_lice_expiry"
                    id="hazard_lice_expiry"
                    className="input-lg"
                    required
                    value={this.state.hazard_lice_expiry}
                    onChange={(e) =>
                      
                      this.setState({ hazard_lice_expiry: e.target.value })
                      
                    }
                  />
                </Col>
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <FormGroup row>
                <Label for="user_address" sm={1}>
                  <IntlMessages id="Address" />
                </Label>
                <Col sm={11}>
                  <Input
                    type="text"
                    name="user_address"
                    id="user_address"
                    className="input-lg"
                    required
                    value={this.state.user_address}
                    onChange={(e) =>
                      
                      this.setState({ user_address: e.target.value })
                      
                    }
                  />
                </Col>
              </FormGroup>
            </div>
          </div>
        </Form>
        <hr />
        

        <Button
          variant="contained"
          color="primary"
          className="text-white"
          type="submit"
          onClick={(e) => this.onUpdateProfile(e)}
        >
          <IntlMessages id="widgets.updateProfile" />
        </Button>
      </div>
    );
  }
}
