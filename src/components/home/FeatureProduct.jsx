import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import APPURL from '../../api/AppURL';
import FeatureProductLoader from '../Placeholder/FeatureProductLoader';


class FeatureProduct extends Component {

  constructor() {
    super();
    this.state = {
      ProductData: [],
      isLoading: "",
      mainDiv: "d-none"
    }
  }

  componentDidMount() {
    axios.get(APPURL.ProductListByRemark("FEATURE")).then(response => {
      console.log(response.data);
      this.setState({ ProductData: response.data, isLoading: "d-none", mainDiv: "" });
    }).catch(error => {
      toast.error(error);
      console.log(error);
    })
  }

  render() {

    const FetatureList = this.state.ProductData;

    const Myview = FetatureList.map((FetatureList, i) => {
      if (FetatureList.special_price == null) {
        return <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6}>
          <Link className="text-link" to={"/productdetails/"+FetatureList.id}>
            <Card className="image-box card">
              <img className="center" src={FetatureList.image} />
              <Card.Body>
                <p className='product-name-on-card'>{FetatureList.title}</p>
                <p className='product-price-on-card'>Price : {FetatureList.price}</p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      } else {
        return <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6}>
          <Link className="text-link" to={"/productdetails/"+FetatureList.id}>
            <Card className="image-box card">
              <img className="center" src={FetatureList.image} />
              <Card.Body>
                <p className='product-name-on-card'>{FetatureList.title}</p>
                <p className='product-price-on-card'>Price : <strike className="text-secondary">{FetatureList.price}</strike> {FetatureList.special_price}</p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      }
    });


    return (
      <Fragment>

        <FeatureProductLoader isLoading={this.state.isLoading} />

        <div className={this.state.mainDiv}>
          <Container className="text-center" fluid={true}>
            <div className="section-title text-center mb-55">
              <h2>FEATURE PRODUCT</h2>
              <p>Some Of Our Exclusive Collecitons, You May Like</p>
            </div>
            <Row>
              {Myview}
            </Row>
          </Container>
        </div>
      </Fragment>
    )
  }
}

export default FeatureProduct
