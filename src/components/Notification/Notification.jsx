import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify';
import axios from 'axios'
import APPURL from '../../api/AppURL';
import { Redirect } from 'react-router';

class Notification extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            isLoading:"",
            myDiv:"d-none",
            notificationData: []
        }
    }

    componentDidMount(){
        axios.get(APPURL.Allnotification).then(response=>{
            this.setState({
                notificationData:response.data,
                isLoading:"d-none",
                myDiv:"",
                Notificationtitle:"",
                Notificationmsg:"",
                Notificationdate:"",
            });
        }).catch(error=>{
            toast.error();
        });
      }

    handleClose = () => {
        this.setState({ show: false })
    };

    handleShow = (event) => {
        this.setState({ show: true });
        let title = event.target.getAttribute('data-title');
        let msg = event.target.getAttribute('data-msg');
        let date = event.target.getAttribute('data-date');
        this.setState({
            Notificationtitle:title,
            Notificationmsg:msg,
            Notificationdate:date
        })
    };

    render() {

        if(!localStorage.getItem('token')){
            return <Redirect to='/login' />
        }

        let notificationData = this.state.notificationData;
        let MyList = notificationData.map((notificationData, i) => {
            return <Col className={i.toString()} md={6} lg={6} sm={12} xs={12}>
                <Card className="notification-card">
                    <Card.Body>
                        <h6> {notificationData.title}</h6>
                        <p className="py-1  px-0 text-primary m-0"><i className="fa  fa-bell"></i>
                            Date: {notificationData.date} | Status: Unread
                        </p>
                        <Button onClick={this.handleShow}
                            data-title={notificationData.title} data-date={notificationData.date} data-msg={notificationData.message} className='btn btn-danger'>Details</Button>
                    </Card.Body>
                </Card>
            </Col>
        })
        return (
            <Fragment>

                <Container className="TopSection">
                    <Row>

                        {MyList}

                    </Row>
                </Container>


                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <h6><i className="fa fa-bell"></i> Date:{this.state.Notificationdate}</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>{this.state.Notificationtitle}</h6>
                        <p>{this.state.Notificationmsg}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

export default Notification