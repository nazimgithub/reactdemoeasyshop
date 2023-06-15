import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Form, Button, Breadcrumb } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom';
import Product1 from '../../assets/images/product/product1.png'
import * as ReactDOM from 'react-dom';
import SuggestProduct from './SuggestProduct'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import ReviewList from './ReviewList';
import cogoToast from 'cogo-toast';
import axios from 'axios';
import APPURL from '../../api/AppURL';


class ProductDetails extends Component {

    constructor(){
        super();
        this.state={
            previewImg:"0",
            isSize:null,
            isColor:null,
            color:"",
            size:"",
            quantity:"",
            productCode:null,
            addToCart:"Add to Cart",
            addToFav:"Favourite",
            PageRefreshStatus:false,
            OrderNow:"Order Now",
            PageRedirectStatus:false
        }
    }

    imgOnClick = (event) => {
        let imgSrc = event.target.getAttribute('src');
        this.setState({previewImg:imgSrc});
    }

    priceOption(price, special_price){
        if(special_price == ""){
            return (
                <p className='product-price-on-card'>Price : {price}</p>
            )
        }else{
            return (
                <p className='product-price-on-card'>
                    Price : <strike className="text-secondary">{price}</strike> {special_price}
                </p>
            )
        }
    }

    colorOnChange = (event) => {
        let color = event.target.value;
        this.setState({color:color});
    }

    sizeOnChange = (event) => {
        let size = event.target.value;
        this.setState({size:size});
    }

    quantityOnChange = (event) => {
        let quantity = event.target.value;
        this.setState({quantity:quantity});
    }

    productOrder = () => {
        let isSize = this.state.isSize;
        let isColor = this.state.isColor;
        let size = this.state.size;
        let color = this.state.color;
        let quantity = this.state.quantity;
        let productCode = this.state.productCode;
        let email = this.props.user.email;

        if(isColor==="YES" && color.length===0){
            cogoToast.error('Please select color.', {position:'top-right'});
        }else if(isSize==="YES" && size.length===0){
            cogoToast.error('Please select size.', {position:'top-right'});
        }else if(quantity.length===0){
            cogoToast.error('Please select quantity.', {position:'top-right'});
        }else if(!localStorage.getItem('token')){
            cogoToast.warn('Please you have to login first.', {position:'top-right'});
        }else{
            this.setState({OrderNow:"Ordering..."});
            let MyFormData = new FormData();
            MyFormData.append("color", color);
            MyFormData.append("size", size);
            MyFormData.append("quantity", quantity);
            MyFormData.append("product_code", productCode);
            MyFormData.append("email", email);

            axios.post(APPURL.AddToCart,MyFormData).then(response =>{
               if(response.data===1){
                    cogoToast.success('Product add successfully in your cart.', {position:'top-right'});
                    this.setState({OrderNow:"Order Now"});
                    this.setState({PageRedirectStatus:true});
               }else{
                    cogoToast.error('Your request is not done ! Try again.', {position:'top-right'});
                    this.setState({OrderNow:"Order Now"});
               }
            }).catch(error =>{
                cogoToast.error('Your request is not done ! Try again.', {position:'top-right'});
                this.setState({OrderNow:"Order Now"});
            });
        }

    }

    productAddOnClick = (event) => {
        let isSize = this.state.isSize;
        let isColor = this.state.isColor;
        let size = this.state.size;
        let color = this.state.color;
        let quantity = this.state.quantity;
        let productCode = this.state.productCode;
        let email = this.props.user.email;

        if(isColor==="YES" && color.length===0){
            cogoToast.error('Please select color.', {position:'top-right'});
        }else if(isSize==="YES" && size.length===0){
            cogoToast.error('Please select size.', {position:'top-right'});
        }else if(quantity.length===0){
            cogoToast.error('Please select quantity.', {position:'top-right'});
        }else if(!localStorage.getItem('token')){
            cogoToast.warn('Please you have to login first.', {position:'top-right'});
        }else{
            this.setState({addToCart:"Adding..."});
            let MyFormData = new FormData();
            MyFormData.append("color", color);
            MyFormData.append("size", size);
            MyFormData.append("quantity", quantity);
            MyFormData.append("product_code", productCode);
            MyFormData.append("email", email);

            axios.post(APPURL.AddToCart,MyFormData).then(response =>{
               if(response.data===1){
                    cogoToast.success('Product add successfully in your cart.', {position:'top-right'});
                    this.setState({addToCart:"Add to Cart"});
                    this.setState({PageRefreshStatus:true});
               }else{
                    cogoToast.error('Your request is not done ! Try again.', {position:'top-right'});
                    this.setState({addToCart:"Add to Cart"});
               }
            }).catch(error =>{
                cogoToast.error('Your request is not done ! Try again.', {position:'top-right'});
                this.setState({addToCart:"Add to Cart"});
            });
        }
    }
    
    PageRefresh = () => {
        if(this.state.PageRefreshStatus===true){
            let URL = window.location;
            return(
                <Redirect to={URL} />
            )
        }
    }

    PageRedirect = () => {
        if(this.state.PageRedirectStatus===true){
            return(
                <Redirect to="/cart" />
            ) 
        }
    }

    productAddFavourite = () => {
        let productCode = this.state.productCode;
        let email = this.props.user.email;
        this.setState({addToFav:"Adding.."});
        if(!localStorage.getItem('token')){
            cogoToast.warn('Please you have to login first.', {position:'top-right'});
        }else{
            axios.get(APPURL.AddFavourite(productCode, email)).then(response =>{
                if(response.data===1){
                     cogoToast.success('Product add successfully in your Favourite.', {position:'top-right'});
                     this.setState({addToFav:"Favourite"});
                     this.setState({PageRefreshStatus:true});
                }else{
                     cogoToast.error('Your request is not done ! Try again.', {position:'top-right'});
                     this.setState({addToFav:"Favourite"});
                }
             }).catch(error =>{
                 cogoToast.error('Your request is not done ! Try again.', {position:'top-right'});
                 this.setState({addToFav:"Favourite"});
             });
        }
    }

    render() {

        let ProductAllData = this.props.data;
        let productId = ProductAllData["productlist"][0]["id"];
        let title = ProductAllData["productlist"][0]["title"];
        let price = ProductAllData["productlist"][0]["price"];
        let special_price = ProductAllData["productlist"][0]["special_price"];
        let category = ProductAllData["productlist"][0]["category"];
        let subcategory = ProductAllData["productlist"][0]["subcategory"];
        let remark = ProductAllData["productlist"][0]["remark"];
        let brand = ProductAllData["productlist"][0]["brand"];
        let product_code = ProductAllData["productlist"][0]["product_code"];
        let image = ProductAllData["productlist"][0]["image"];

        if(this.state.previewImg === "0"){
            this.setState({previewImg:image})
        }
        
        let image_1 = ProductAllData["productdetails"][0]["image_1"];
        let image_2 = ProductAllData["productdetails"][0]["image_2"];
        let image_3 = ProductAllData["productdetails"][0]["image_3"];
        let image_4 = ProductAllData["productdetails"][0]["image_4"];
        let color = ProductAllData["productdetails"][0]["color"];
        let size = ProductAllData["productdetails"][0]["size"];
        let long_description = ProductAllData["productdetails"][0]["long_description"];
        let short_description = ProductAllData["productdetails"][0]["short_description"];

        var ColorDiv = "d-none";
        if(color!=""){
            let ColorArr = color.split(",");
            var ColorOption = ColorArr.map((colorList, i)=>{
                return <option value={colorList}>{colorList}</option>
            });
            ColorDiv = "";
        }else{
            ColorDiv = "d-none";
        }

        var SizeDiv = "d-none";
        if(size!= ""){
            let sizeArr = size.split(",");
            var sizeOption = sizeArr.map((sizeList,i)=>{
                return <option value={sizeList}>{sizeList}</option>
            });
            SizeDiv = "";
        }else{
            SizeDiv = "d-none";
        }

        if(this.state.isSize===null){
            if(size!="na"){
                this.setState({isSize:"YES"});
            }else{
                this.setState({isSize:"NO"});
            }
        }

        if(this.state.isColor===null){
            if(color!="na"){
                this.setState({isColor:"YES"});
            }else{
                this.setState({isColor:"NO"});
            }
        }

        if(this.state.productCode===null){
            this.setState({productCode:product_code});
        }

        
        return (
            <Fragment>
                <Container fluid={true} className="BetweenTwoSection">
                <div className='bread-body'>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/">Home</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={"/productcategory/" + category}>{category}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={"/productsubcategory/" + category + "/" + subcategory}>{subcategory}</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={"/productdetails/" + productId}>{title}</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white pb-3 mt-4" md={12} lg={12} sm={12} xs={12}>
                            <Row>
                                <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
                                    
                                    <InnerImageZoom className="detailimage" zoomScale={1.8} zoomType="hover" src={this.state.previewImg} zoomSrc={this.state.previewImg} />
                                    <Container className="my-3">
                                        <Row>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgOnClick} className="w-100" src={image_1} />
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgOnClick} className="w-100" src={image_2} />
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgOnClick} className="w-100" src={image_3} />
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgOnClick} className="w-100" src={image_4} />
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col className="p-3 " md={6} lg={6} sm={12} xs={12}>
                                    <h5 className="Product-Name">{title}</h5>
                                    <h6 className="section-sub-title">{short_description}</h6>
                                    {this.priceOption(price, special_price)}
                                    <h6 className="mt-2">Category : <b>{category}</b></h6>
                                    <h6 className="mt-2">Sub Category : <b>{subcategory}</b></h6>
                                    <h6 className="mt-2">Brand : <b>{brand}</b></h6>
                                    <h6 className="mt-2">Product Code : <b>{product_code}</b></h6>

                                    <div className={ColorDiv}>
                                        <h6 className="mt-2">Choose Color</h6>
                                        <select className='form-control form-select' onChange={this.colorOnChange}>
                                            <option>-- Select Color --</option>
                                            {ColorOption}
                                        </select>
                                    </div>

                                    <div className={SizeDiv}>
                                        <h6 className="mt-2">Choose Size</h6>
                                        <select className='form-control form-select' onChange={this.sizeOnChange}>
                                            <option>-- Select Size --</option>
                                            {sizeOption}
                                        </select>
                                    </div>

                                    <div className="">
                                        <h6 className="mt-2">Choose Quantity</h6>
                                        <select className='form-control form-select' onChange={this.quantityOnChange}>
                                        <option>-- Select Quantity --</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    
                                    
                                    <div className="input-group mt-3">
                                        <button className="btn site-btn m-1 " onClick={this.productAddOnClick}> <i className="fa fa-shopping-cart"></i>  {this.state.addToCart}</button>
                                        <button className="btn btn-primary m-1" onClick={this.productOrder}> <i className="fa fa-car"></i> {this.state.OrderNow}</button>
                                        <button className="btn btn-primary m-1" onClick={this.productAddFavourite}> <i className="fa fa-heart"></i> {this.state.addToFav}</button>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="" md={6} lg={6} sm={12} xs={12}>
                                    <h6 className="mt-2">DETAILS</h6>
                                    <p>{long_description}</p>
                                </Col>

                                <Col className="" md={6} lg={6} sm={12} xs={12}>
                                    <ReviewList code={product_code} />
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </Container>
                <SuggestProduct subcategory={subcategory} />
                {/* Below method run after add product in cart for page refresh */}
                {this.PageRefresh()}
                {this.PageRedirect()}
            </Fragment>
        )
    }
}

export default ProductDetails