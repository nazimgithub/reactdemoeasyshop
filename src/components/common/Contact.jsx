import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row, FloatingLabel } from 'react-bootstrap'
import APPURL from '../../api/AppURL';
import validation from '../../validation/validation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Contact extends Component {

  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      message: ""
    }
  }

  nameOnChange = (event) => {
    let name = event.target.value;
    this.setState({name:name})
  }

  emailOnChange = (event) => {
    let email = event.target.value;
    this.setState({email:email})
  }

  messageOnChange = (event) => {
    let message = event.target.value;
    this.setState({message:message})
  }

  onFormSubmit = (event) => {
    let name = this.state.name;
    let email = this.state.email;
    let message = this.state.message;
    let submitBtn = document.getElementById('submitBtn');
    let contactForm = document.getElementById('contactForm');
    
    if(name.length==0){
      toast.error('Name can not blank.');
    }
    else if(email.length==0){
      toast.error('Email Address can not blank.')
    }
    else if(message.length==0){
      toast.error("Message can not blank.")
    }
    else if(!validation.NameRegx.test(name)){
      toast.error("Invalid Name.")
    }
    else{
      submitBtn.innerHTML = 'Sending...';
      let myFormData = new FormData();
      myFormData.append("name", name)
      myFormData.append("email", email)
      myFormData.append("message", message)

      axios.post(APPURL.PostContact, myFormData).then(function (response){
        if(response.status == 200 && response.data==1){
          toast.success("Message send successfully!");
          submitBtn.innerHTML = 'Send';
          contactForm.reset();
        }else{
          toast.error("Error: Something went wrong, Please try again!");
          submitBtn.innerHTML = 'Send';
        }
      }).catch(function (error){
        toast.error(error);
          submitBtn.innerHTML = 'Send';
      })
    }

    event.preventDefault();

  }


  render() {
    return (
      <Fragment>
        <Container>
          <Row className='p-2'>
            <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
              <Row className='text-center'>
                <Col classname="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                  <Form id="contactForm" onSubmit={this.onFormSubmit} className='onboardForm'>
                    <h4 className='section-title-login'> CONTACT WITH US </h4>
                    <h6 className='section-sub-title'>Please contact with us</h6>
                    <input onChange={this.nameOnChange} className='form-control m-2' type="text" placeholder='Enter your name' />
                    <input onChange={this.emailOnChange} className='form-control m-2' type="email" placeholder='Enter your email address' />

                    <FloatingLabel controlId="floatingTextarea2" label="Comments">
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        className='form-control m-2'
                        onChange={this.messageOnChange}
                      />
                    </FloatingLabel>

                    <Button id="submitBtn" type="submit" className="btn btn-block m-2 site-btn-login">Send</Button>
                  </Form>
                </Col>
                <Col className='p-0 Desktop m-0' md={6} lg={6} sm={6} xs={6}>
                  <p className='section-titile-contact'>1635 Franklin Street Montgomery, Near Sherwood Mall. AL 36104</p>
                  <p className='section-titile-contact'>Email: Support@easylearningbd.com</p>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224369.0356258236!2d77.26107891340988!3d28.516681710332296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1674363443705!5m2!1sen!2sin" width="600" height="450" styles="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}

export default Contact
