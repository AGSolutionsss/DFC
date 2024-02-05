import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import { NotificationContainer, NotificationManager,} from "react-notifications";
import AppConfig from 'Constants/AppConfig';
import {baseURL} from '../../../api';


export default class Forgotpwd extends Component {

   constructor(props) {
      
      super(props);
  
      this.state = {username: ''}
      this.state = {email: ''}
    }

   showSuccess(){

      alert('success');
   }

   onResetPassword() {


      if (this.state.email !== "" && this.state.username !== "") {
        

        fetch(
         baseURL+`/send-password?username=${this.state.username}&email=${this.state.email}`,
          {
            method: "POST",
          }
        )
          .then((response) => response.json())
          
          .then((response)=> {
             NotificationManager.success("New Password Sent to your Email");
          })
          
          .catch((error) => {
         NotificationManager.error("Email Not sent.");
          });
      } else {
         NotificationManager.warning("Please enter an User Name & Email");
      }
    }

   render() {
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="session-inner-wrapper">
               <div className="container-fluid">
                  <div className="row">
                     <div className="col-md-8 desktop">

                     </div>
                     <div className="col-md-4 login">
                        <div className="session-body text-center" style={{backgroundColor:'transparent'}}>
                           <div className="session-head mb-30">
                              <h1 className="login-heading">DFC GROUP</h1>
                           </div>
                           <Form style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                              
                              <FormGroup className="has-wrapper" style={{width:'70%'}}>
                                 <Input type="text" name="Username" id="signin" className="has-input input-lg" placeholder="Enter User Name" onChange={(event) => this.setState({ username: event.target.value })} />
                                 <span className="has-icon"><i className="ti-user"></i></span>
                              </FormGroup>
                              <FormGroup className="has-wrapper" style={{width:'70%'}}>
                                 <Input type="email" name="user-mail" id="email" className="has-input input-lg" placeholder="Enter Email Address" onChange={(event) => this.setState({ email: event.target.value })} />
                                 <span className="has-icon"><i className="ti-email"></i></span>
                              </FormGroup>
                              <FormGroup style={{width:'60%'}}>
                              <Button color="primary" className="btn-info text-white btn-block btn-large w-100" variant="contained" id="signin"
                                 onClick={() => this.onResetPassword()}>Reset Password</Button>

                              </FormGroup>
                              <Button style={{width:'60%'}} component={Link} to="/signin" className="btn-dark btn-block btn-large text-white w-100">Already having account?  Login</Button>
                           </Form>
                        </div>
                     </div>
                  </div>
                  </div>
               </div>
            
         </QueueAnim>
      );
   }
}
