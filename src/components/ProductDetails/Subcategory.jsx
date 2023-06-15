import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Breadcrumb } from 'react-bootstrap'

class Subcategory extends Component {
    render() {
        const Category = this.props.Category;
        const Subcategory = this.props.Subcategory;
        const MyList = this.props.ProductData;

        const MyView = MyList.map((MyList, i) => {
            if (MyList.special_price == null) {
                return <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
                    <Link className="text-link" to={"/productdetails/" + MyList.id}>
                        <Card className="image-box card w-100">
                            <img className="center w-75" src={MyList.image} />
                            <Card.Body>
                                <p className="product-name-on-card">{MyList.title}</p>
                                <p className="product-price-on-card">Price : {MyList.price}</p>

                            </Card.Body>
                        </Card>
                    </Link>

                </Col>
            } else {
                return <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
                    <Link className="text-link" to={"/productdetails/" + MyList.id}>
                        <Card className="image-box card w-100">
                            <img className="center w-75" src={MyList.image} />
                            <Card.Body>
                                <p className="product-name-on-card">{MyList.title}</p>
                                <p className='product-price-on-card'>Price : <strike className="text-secondary">{MyList.price}</strike> {MyList.special_price}</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            }
        })

        return (
            <Fragment>
                <Container className="text-center">
                    <div className='bread-body'>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/">Home</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={"/productcategory/" + Category}>{Category}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={"/productsubcategory/" + Category + "/" + Subcategory}>{Subcategory}</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="section-title text-center mb-55"><h2> {Category} / {Subcategory} </h2></div>
                    <Row>{MyView}</Row>
                </Container>
            </Fragment>
        )
    }
}

export default Subcategory
