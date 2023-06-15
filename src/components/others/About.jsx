import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row, FloatingLabel } from 'react-bootstrap'
import { Breadcrumb } from 'react-bootstrap';
import AppURL from '../../api/AppURL';
import parse from 'html-react-parser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class About extends Component {

  constructor() {
    super();
    this.state = {
      about: "",
      loaderDiv: "",
      mainDiv: "d-none"
    }
  }

  componentDidMount() {
    axios.get(AppURL.Allsiteinfo).then(response => {
      let StatusCode = response.status;
      if (StatusCode == 200) {
        let JsonData = (response.data)[0]["about"];
        this.setState({ about: JsonData, loaderDiv: "d-none", mainDiv: "" });
      }
    }).catch(error => {
      toast.error("Somthing Went Wrong", {
        position: "bottom-center"
      });
    });
  }

  // componentDidMount() {
  //   let SiteInfoAbout = sessionStorage.getItem("Allsiteinfo");


  //   if (SiteInfoAbout == null) {
  //     axios.get(APPURL.Allsiteinfonazim).then(response => {
  //       console.warn(response);
  //       let StatusCode = response.status;
  //       if (StatusCode == 200) {
  //         let JsonData = (response.data)[0]["about"];
  //         this.setState({ about: JsonData });
  //         sessionStorage.setItem("SiteInfoAbout", JsonData)
  //       }
  //       else {
  //         toast.error("Somthing Went Wrong", {
  //           position: "bottom-center"
  //         });
  //       }
  //     }).catch(error => {
  //       console.warn(error);
  //       toast.error("Somthing Went Wrong",{
  //         position: "bottom-center"
  //       });
  //     });
  //   }
  //   else {
  //     this.setState({about:SiteInfoAbout});
  //   }
  // }

  render() {
    return (
      <Fragment>
        <Container>
          <div className='bread-body'>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/about">About</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Row className='p-2'>
            <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
              <div className={this.state.loaderDiv}>
                <div class="ph-item">
                  <div class="ph-col-12">
                    <div class="ph-row">
                      <div class="ph-col-4"></div>
                      <div class="ph-col-8 empty"></div>
                      <div class="ph-col-6"></div>
                      <div class="ph-col-6 empty"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={this.state.mainDiv}>
                <p className='section-title-contact'>{parse(this.state.about)}</p>
              </div>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </Fragment>
    )
  }
}

export default About
