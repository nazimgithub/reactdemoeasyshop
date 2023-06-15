import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import APPURL from '../../api/AppURL';
import { toast } from 'react-toastify';
import CollectionProductLoadingPage from '../Placeholder/CollectionProductLoadingPage';

class Collection extends Component {

    constructor() {
        super();
        this.state = {
            ProductData: [],
            isLoading: "",
            mainDiv: "d-none"
        }
    }

    componentDidMount() {
        axios.get(APPURL.ProductListByRemark("PRODUCT")).then(response => {
            this.setState({ ProductData: response.data, isLoading: "d-none", mainDiv: "" })
        }).catch(error => {
            toast.error(error)
        })
    }

    render() {

        const ProductList = this.state.ProductData;

        const MyView = ProductList.map((ProductList, i) => {
            if (ProductList.special_price == null) {
                return <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
                    <Link className="text-link" to={"/productdetails/" + ProductList.id}>
                        <Card className="image-box card w-100">
                            <img className="center w-75" src={ProductList.image} />
                            <Card.Body>
                                <p className="product-name-on-card">{ProductList.title}</p>
                                <p className="product-price-on-card">Price : {ProductList.price}</p>

                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            } else {
                return <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
                    <Link className="text-link" to={"/productdetails/" + ProductList.id}>
                        <Card className="image-box card w-100">
                            <img className="center w-75" src={ProductList.image} />
                            <Card.Body>
                                <p className="product-name-on-card">{ProductList.title}</p>
                                <p className='product-price-on-card'>Price : <strike className="text-secondary">{ProductList.price}</strike> {ProductList.special_price}</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            }
        });

        return (
            <Fragment>

                <CollectionProductLoadingPage isLoading={this.state.isLoading} />

                <div className={this.state.mainDiv}>
                    <Container className="text-center" fluid={true}>
                        <div className="section-title text-center mb-55"><h2> PRODUCT COLLECTION</h2>
                            <p>Some Of Our Exclusive Collection, You May Like</p>
                        </div>
                        <Row>{MyView}</Row>
                    </Container>
                </div>
            </Fragment>
        )
    }
}

export default Collection