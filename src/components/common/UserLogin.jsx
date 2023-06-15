import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import APPURL from '../../api/AppURL';
import login from '../../assets/images/login.png';

class UserLogin extends Component {

  constructor(){
    super();
    this.state={
      email:"",
      password:"",
      message:"",
      loggedIn: false
    }
  }

  // Login form submit method
  formSubmit = (e) =>{
    e.preventDefault();
    const data={
      email:this.state.email,
      password:this.state.password
    }
    axios.post(APPURL.UserLogin, data).then(response=>{
      localStorage.setItem('token', response.data.token);
      this.setState({loggedIn:true});
      this.state.setUser(response.data.user);
    }).catch(error=>{
        toast.error(error);
    });
  }

  render() {

    // After Login redirect on Profile page of user
    if(this.state.loggedIn){
      return <Redirect to={'/profile'} />
    }

    if(localStorage.getItem('token')){
      return <Redirect to="/profile" />
    }

    return (
      <Fragment>
        <Container>
          <Row className='p-2'>
            <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
              <Row className='text-center'>
                <Col classname="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                  <Form className='onboardForm'onSubmit={this.formSubmit} >
                    <h4 className='section-title-login'> USER SING IN</h4>
                    <input className='form-control m-2' type="email" placeholder='Enter email address..' onChange={(e)=>{this.setState({email:e.target.value})}}/>
                    <input className='form-control m-2' type="password" placeholder='Enter password...' onChange={(e)=>{this.setState({password:e.target.value})}}/>
                    <Button type="submit" className="btn btn-block m-2 site-btn-login">Login</Button>
                    <br /><br />
                    <hr />
                    <p><strong>Forget My Password?</strong> <Link to="/forgetpassword">Forget Password</Link></p>
                    <p><strong>Already Have An account?</strong> <Link to="/register">Sign Up</Link></p>
                  </Form>
                </Col>
                <Col className='p-0 Desktop m-0' md={6} lg={6} sm={6} xs={6}>
                  <img className='onboardBanner' src={login} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}

export default UserLogin
