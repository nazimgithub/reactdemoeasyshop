import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row, FloatingLabel, Breadcrumb } from 'react-bootstrap'
import parse from 'html-react-parser';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

class Purchase extends Component {
  
  constructor(){
    super();
    this.state={
      purchase:"",
      loaderDiv: "",
      mainDiv: "d-none"
    }
  }

  componentDidMount(){
    axios.get(AppURL.Allsiteinfo).then(response=>{
      let StatusCode = response.status;
      if(StatusCode == 200){
        let JsonData = (response.data)[0]["purchase_guide"];
        this.setState({purchase:JsonData, loaderDiv: "d-none", mainDiv: ""});
      }
    }).catch(error=>{
      toast.error("Somthing Went Wrong",{
           position: "bottom-center"
      });
    });
  }

//   componentDidMount(){

//     let SiteInfoPurchase = sessionStorage.getItem("AllSiteInfo");

//     if(SiteInfoPurchase == null){

//          axios.get(AppURL.AllSiteInfo).then(response =>{
//               let StatusCode = response.status;
//               if(StatusCode==200){
//                    let JsonData = (response.data)[0]['purchase_guide'];
//                    this.setState({purchase:JsonData});

//                    sessionStorage.setItem("SiteInfoPurchase",JsonData)
//               } 
//               else{
//                    toast.error("Somthing Went Wrong",{
//                         position: "bottom-center"
//                    });
//               }

   
//     }).catch(error=>{
//       console.log(error)
//          toast.error("Somthing Went Wrong",{
//               position: "bottom-center"
//          });
//     });

// }  // end If Conditon 
// else{
//     this.setState({purchase:SiteInfoPurchase});
// }

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
                <Link to="/purchase">Purchase</Link>
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
                <p className='section-title-contact'>{parse(this.state.purchase)}</p>
              </div>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </Fragment>
    )
  }
}

export default Purchase
