import React, { Component, Fragment } from 'react'
import { Navbar, Container, Row, Col, Button, Card } from 'react-bootstrap';
import AppURL from '../../api/AppURL';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { Redirect } from 'react-router-dom';

class Cart extends Component {

     constructor() {
          super();
          this.state = {
               ProductData: [],
               isLoading: "",
               mainDiv: "d-none",
               PageRefreshStatus: false,
               PageRedirectStatus:false,
               confirmBtn:"Confirm Order",
               city:"",
               payment:"",
               name:"",
               address:"",
          }
     }


     componentDidMount() {
          axios.get(AppURL.CartList(this.props.user.email)).then(response => {
               this.setState({
                    ProductData: response.data, isLoading: "d-none",
                    mainDiv: " "
               });
          }).catch(error => {
               console.log(error);
          });
     }

     removeItem = (id) => {
          axios.get(AppURL.RemoveCartItem(id)).then(response => {
               if (response.data === 1) {
                    cogoToast.success("Item Remove form cart", { position: 'top-right' });
                    this.setState({ PageRefreshStatus: true });
               } else {
                    cogoToast.error("Your Request is not done ! Try Aagain", { position: 'top-right' });
               }
          }).catch(error => {
               cogoToast.error("Your Request is not done ! Try Aagain", { position: 'top-right' });
          })
     }

     cartItemPlus = (id, quantity, price) => {
          axios.get(AppURL.CartItemPlus(id, quantity, price)).then(response => {
               if (response.data === 1) {
                    cogoToast.success("Item quantity increase successfully!", { position: 'top-right' });
                    this.setState({ PageRefreshStatus: true });
               } else {
                    cogoToast.error("Your Request is not done ! Try Aagain", { position: 'top-right' });
               }
          }).catch(error => {
               cogoToast.error("Your Request is not done ! Try Aagain", { position: 'top-right' });
          })
     }

     cartItemMinus = (id, quantity, price) => {
          axios.get(AppURL.CartItemMinus(id, quantity, price)).then(response => {
               if (response.data === 1) {
                    cogoToast.success("Item quantity decrease successfully!", { position: 'top-right' });
                    this.setState({ PageRefreshStatus: true });
               } else {
                    cogoToast.error("Your Request is not done ! Try Aagain", { position: 'top-right' });
               }
          }).catch(error => {
               cogoToast.error("Your Request is not done ! Try Aagain", { position: 'top-right' });
          })
     }

     PageRefresh = () => {
          if (this.state.PageRefreshStatus === true) {
               let URL = window.location;
               return (
                    <Redirect to={URL} />
               )
          }
     }

     PageRedirect = () => {
          if (this.state.PageRedirectStatus === true) {
               return (
                    <Redirect to="/orderlist" />
               )
          }
     }

     order = () => {
          let city = this.state.city;
          let name = this.state.name;
          let address = this.state.address;
          let payment = this.state.payment;
          let email = this.props.user.email;

          if(city.length===0){
               cogoToast.error("city can not blank!", { position: 'top-right' });
          }else if(name.length===0){
               cogoToast.error("Customer name can not blank!", { position: 'top-right' });
          }else if(payment.length===0){
               cogoToast.error("Select payment option form list!", { position: 'top-right' });
          }else if(address.length===0){
               cogoToast.error("Delivery address can not blank!", { position: 'top-right' });
          }else{
               let myFormData = new FormData();
               myFormData.append('city',city);
               myFormData.append('name',name);
               myFormData.append('delivery_address',address);
               myFormData.append('email',email);
               myFormData.append('payment_method',payment);
               myFormData.append('delivery_charge',"250.00");

               axios.post(AppURL.CartOrder, myFormData).then(response=>{
                    if (response.data === 1) {
                         cogoToast.success("Your order request received successfully!", { position: 'top-right' });
                         this.setState({PageRedirectStatus: true });
                    } else {
                         cogoToast.error("Your Request is not done ! Try Aagain", { position: 'top-right' });
                    }
               }).catch(error=>{
                    cogoToast.error("Your Request is not done ! Try Aagain", { position: 'top-right' });
               });
          }
     }

     cityOnChange = (event) =>{
          let city = event.target.value;
          this.setState({city:city});
     }

     paymentOnChange = (event) =>{
          let payment = event.target.value;
          this.setState({payment:payment});
     }

     addressOnChange = (event) =>{
          let address = event.target.value;
          this.setState({address:address});
     }

     nameOnChange = (event) =>{
          let name = event.target.value;
          this.setState({name:name});
     }


     render() {

          if(!localStorage.getItem('token')){
               return <Redirect to='/login' />
          }
          
          const MyList = this.state.ProductData;
          let totalPriceSum = 0;
          const MyView = MyList.map((ProductList, i) => {
               totalPriceSum = totalPriceSum + parseInt(ProductList.total_price)
               return <div>
                    <Card >
                         <Card.Body>
                              <Row>
                                   <Col md={3} lg={3} sm={6} xs={6}>
                                        <img className="cart-product-img" src={ProductList.image} />
                                   </Col>

                                   <Col md={6} lg={6} sm={6} xs={6}>
                                        <h5 className="product-name">{ProductList.product_name}</h5>
                                        <h6> Quantity = {ProductList.quantity} </h6>
                                        <p>{ProductList.size} | {ProductList.color}</p>
                                        <h6>Price = {ProductList.unit_price} x {ProductList.quantity} = {ProductList.total_price}$</h6>
                                   </Col>

                                   <Col md={3} lg={3} sm={12} xs={12}>

                                        <Button onClick={() => this.removeItem(ProductList.id)} className="btn mt-2 mx-1 btn-lg  site-btn"><i className="fa fa-trash-alt"></i> </Button>

                                        <Button onClick={() => this.cartItemPlus(ProductList.id, ProductList.quantity, ProductList.unit_price)} className="btn mt-2 mx-1 btn-lg  site-btn"><i className="fa fa-plus"></i> </Button>

                                        <Button onClick={() => this.cartItemMinus(ProductList.id, ProductList.quantity, ProductList.unit_price)} className="btn mt-2 mx-1 btn-lg  site-btn"><i className="fa fa-minus"></i> </Button>

                                   </Col>
                              </Row>
                         </Card.Body>
                    </Card>


               </div>
          })



          return (
               <Fragment>

                    <Container>
                         <div className="section-title text-center mb-55">
                              <h2>Product Cart List</h2>
                         </div>
                         <Row>
                              <Col className="p-1" lg={7} md={12} sm={12} xs={12} >
                                   {MyView}
                              </Col>
                              <Col className="p-1" lg={5} md={5} sm={12} xs={12} >
                                   <div className="card p-2">
                                        <div className="card-body">
                                             <div className="container-fluid ">
                                                  <div className="row">
                                                       <div className="col-md-12 p-1  col-lg-12 col-sm-12 col-12">
                                                            <h5 className="Product-Name text-danger">Total Due: {totalPriceSum}  $</h5>
                                                       </div>
                                                  </div>
                                                  <div className="row">
                                                       <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                            <label className="form-label">Choose City</label>
                                                            <select onChange={this.cityOnChange} className="form-control">
                                                                 <option value="">Choose</option>
                                                                 <option value="Dhaka">Assam</option>
                                                                 <option value="Dhaka">Bihar </option>
                                                                 <option value="Dhaka">Goa </option>
                                                                 <option value="Dhaka">Gujarat </option>
                                                                 <option value="Dhaka">Himachal Pradesh </option>
                                                                 <option value="Dhaka">Punjab  </option>
                                                            </select>
                                                       </div>
                                                       <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                            <label className="form-label">Choose Payment Method</label>
                                                            <select onChange={this.paymentOnChange} className="form-control">
                                                                 <option value="">Choose</option>
                                                                 <option value="Cash On Delivery">Cash On Delivery</option>
                                                                 <option value="Cash On Delivery">Stripe</option>
                                                            </select>
                                                       </div>
                                                       <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                            <label className="form-label">Your Name</label>
                                                            <input onChange={this.nameOnChange}  className="form-control" type="text" placeholder="" />
                                                       </div>

                                                       <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                            <label className="form-label">Delivery Address</label>
                                                            <textarea onChange={this.addressOnChange}  rows={2} className="form-control" type="text" placeholder="" />
                                                       </div>
                                                       <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                            <button onClick={this.order} className="btn  site-btn">{this.state.confirmBtn} </button>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </Col>
                         </Row>

                    </Container>
                    {this.PageRefresh()}
                    {this.PageRedirect()}

               </Fragment>
          )
     }
}

export default Cart