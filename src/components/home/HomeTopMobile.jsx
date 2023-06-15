import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Container, Row, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';
import APPURL from '../../api/AppURL';
import HomeSlider from './HomeSlider';

class HomeTopMobile extends Component {

  constructor(){
    super();
    this.state={
      sliderData:[]
    }
  }

  componentDidMount()
  {
    axios.get(APPURL.SliderImages).then(response => {
      this.setState({sliderData:response.data})
    }).catch(error => {
      toast.error(error);
    })
  }

  render() {
    return (
        <Fragment>
        <Container className="p-0 m-0 overflow-hidden">
            <Row className="p-0 m-0 overflow-hidden">
                <Col lg={12} md={12} sm={12}>
                    <HomeSlider data={this.state.sliderData} />
                </Col>
            </Row>
        </Container>
     </Fragment>
    )
  }
}

export default HomeTopMobile
