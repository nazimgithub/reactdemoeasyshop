import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import APPURL from '../../api/AppURL';
import forget from '../../assets/images/forget.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


class ForgetPassword extends Component {

    constructor(){
        super();
        this.state={
            email:"",
            message:""
        }
    }

    formSubmit=(e)=>{
        e.preventDefault();
        const data = {
            email:this.state.email
        }

        axios.post(APPURL.UserForgetPassword, data).then(response=>{
            this.setState({message:response.data.message});
            toast.success(this.state.message,{
                position:"top-right"
            })
        }).catch(error=>{
            console.log(error);
            this.setState({message:error.response.data.message})
            toast.error(this.state.message,{
                 position: "top-right"
            });
        })
    }


    render() {
        return (
            <Fragment>
                <Container>
                    <Row className='p-2'>
                        <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Row className='text-center'>
                                <Col classname="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                                    <Form className='onboardForm' onSubmit={this.formSubmit}>
                                        <h4 className='section-title-login'> FORGET PASSWORD</h4>
                                        <input className='form-control m-2' type="text" placeholder='Enter email address..' onChange={(e)=>this.setState({email:e.target.value})}/>
                                        <Button type="submit" className="btn btn-block m-2 site-btn-login">Send</Button>
                                    </Form>
                                </Col>
                                <Col className='p-0 Desktop m-0' md={6} lg={6} sm={6} xs={6}>
                                    <img className='onboardBanner' src={forget} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer />
            </Fragment>
        )
    }
}

export default ForgetPassword
