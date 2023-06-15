import axios from 'axios';
import React, { Component, Fragment } from 'react'
import APPURL from '../../api/AppURL';
import { Navbar, Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import { Redirect } from 'react-router-dom';

class OrderList extends Component {

  constructor() {
    super();
    this.state = {
      ProductList: [],
      show: false,
      name:"",
      rating:"",
      comment:"",
      product_code:"",
      product_name:"",
      ReviewModal:false
    }
  }

  componentDidMount() {
    let email = this.props.user.email;
    axios.get(APPURL.UserOrderList(email))
      .then(response => {
        this.setState({ ProductList: response.data});
      })
      .catch(error => {
        console.log(error);
      })
  }

  ReviewModalClose = () => {
    this.setState({ ReviewModal: false })
  }

  ReviewModalOpen = (product_code, product_name) => {
    this.setState({
      ReviewModal: true,
      product_code:product_code,
      product_name:product_name
     })
  }

  nameOnChange = (e) => {
    let name = e.target.value;
    this.setState({name:name});
  }

  RatingOnChange = (e) => {
    let rating = e.target.value;
    this.setState({rating:rating});
  }

  CommentOnChanage = (e) => {
    let comment = e.target.value;
    this.setState({comment:comment});
  }

  postreview = (event) => {
   let product_code = this.state.product_code;
   let product_name = this.state.product_name;
   let rating = this.state.rating;
   let name = this.state.name;
   let comment = this.state.comment;

   if(name.length === 0){
    cogoToast.error("Review Name can not blank!", { position: 'top-right' });
   }else if(comment.length === 0){
    cogoToast.error("Comment section can not blank!", { position: 'top-right' });
   }else if(rating.length===0){
    cogoToast.error("Kindly give any rating for product!", { position: 'top-right' });
   }else{
      let MyFormData = new FormData();
      MyFormData.append('product_code', product_code);
      MyFormData.append('product_name', product_name);
      MyFormData.append('reviewer_rating', rating);
      MyFormData.append('reviewer_name', name);
      MyFormData.append('reviewer_comments', comment);
      MyFormData.append('reviewer_photo', "");

      axios.post(APPURL.PostReview, MyFormData).then(response=>{
        if(response.data===1){
          cogoToast.success("Review submitted successfully!", { position: 'top-right' });
          this.ReviewModalClose();
        }else{
          cogoToast.error("You request is not done ! Try Again", { position: 'top-right' });
        }
      }).catch(error=>{
        cogoToast.error("You request is not done ! Try Again", { position: 'top-right' });
      })
    }
  }

  render() {

    if(!localStorage.getItem('token')){
      return <Redirect to='/login' />
    }

    const MyList = this.state.ProductList;
    const MyView = MyList.map((ProductList, i) => {
      return <div>
        <Col md={6} lg={6} sm={6} xs={6}>
          <h5 className="product-name">{ProductList.product_name}</h5>
          <h6> Quantity = {ProductList.quantity} </h6>
          <p>{ProductList.size} | {ProductList.color}</p>
          <h6>Price = {ProductList.unit_price} x {ProductList.quantity} = {ProductList.total_price}$</h6>
          <h6>Stauts = {ProductList.order_status} </h6>
        </Col>
        <Button onClick={this.ReviewModalOpen.bind(this,ProductList.product_code, ProductList.product_name)} className="btn btn-danger">Post Review </Button>
        <hr></hr>
      </div>
    });
    return (
      <Fragment>
        <Container>
          <div className="section-title text-center mb-55"><h2>Order History By ({this.props.user.name}) </h2>
          </div>
          <Card >
            <Card.Body>
              <Row>
                {MyView}
              </Row>
            </Card.Body>
          </Card>
        </Container>

        <Modal show={this.state.ReviewModal} onHide={this.ReviewModalClose}>
          <Modal.Header closeButton>
            <h6><i className="fa fa-bell"></i> Post Your Review     </h6>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Your Name</label>
              <input onChange={this.nameOnChange} className="form-control" type="text" placeholder={this.props.user.name} />
            </div>

            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Select Product Rating</label>
              <select onChange={this.RatingOnChange} className="form-control">
                <option value="">Choose</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Your Comment</label>
              <textarea onChange={this.CommentOnChanage} rows={2} className="form-control" type="text" placeholder="Your Comment" />
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.ReviewModalClose}>Close</Button>
            <Button variant="primary" onClick={this.postreview}>Post</Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    )
  }
}

export default OrderList
