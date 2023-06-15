import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MegaMenu from './MegaMenu';
import HomeSlider from './HomeSlider';
import axios from 'axios';
import APPURL from '../../api/AppURL';
import { toast } from 'react-toastify';
import SliderLoading from '../Placeholder/SliderLoading';

class HomeTop extends Component {

  constructor() {
    super();
    this.state = {
      MenuData:[],
      SliderData:[],
      isLoading:"",
      mainDiv:"d-none"
    }
  }

  componentDidMount() {
    // Categroy API
    axios.get(APPURL.Allcategory).then(response => {
      this.setState({MenuData:response.data});
    }).catch(error => {
        toast.error(error);
    });

    // // Slider API
    axios.get(APPURL.SliderImages).then(response => {
      this.setState({SliderData:response.data, isLoading:"d-none", mainDiv:""});
    }).catch(error => {
        toast.error(error);
    });
  }

  render() {
    return (
      <Fragment>

        <SliderLoading isLoading={this.state.isLoading}/>

        <div className={this.state.mainDiv}>
          <Container className="p-0 m-0 overflow-hidden">
            <Row>
              <Col lg={3} md={3} sm={12}>
                <MegaMenu data={this.state.MenuData} />
              </Col>
              <Col lg={9} md={9} sm={12}>
                <HomeSlider data={this.state.SliderData} />
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    )
  }
}

export default HomeTop
