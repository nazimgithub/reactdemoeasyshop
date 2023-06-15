import React, { Component, Fragment } from 'react';
import { Router, Route, Switch } from "react-router";
import HomePage from '../pages/HomePage';
import UserLoginPage from '../pages/UserLoginPage';
import ContactPage from '../pages/ContactPage';
import PurchasePage from '../pages/PurchasePage';
import PrivacyPage from '../pages/PrivacyPage';
import RefundPage from '../pages/RefundPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import NotificationPage from '../pages/NotificationPage';
import FavoritePage from '../pages/FavoritePage';
import CartPage from '../pages/CartPage';
import AboutPage from '../pages/AboutPage';
import ProductCategoryPage from '../pages/ProductCategoryPage';
import ProductSubCategoryPage from '../pages/ProductSubCategoryPage';
import SearchPage from '../pages/SearchPage';
import RegisterPage from '../pages/RegisterPage';
import ForgetPasswordPage from '../pages/ForgetPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ProfilePage from '../pages/ProfilePage';
import axios from 'axios';
import APPURL from '../api/AppURL';
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import OrderListPage from '../pages/OrderListPage';

class AppRoute extends Component {

  constructor(){
    super();
    this.state={
      user:{}
    }
  }

  componentDidMount(){
    axios.get(APPURL.UserData).then(response=>{
      this.setState({user:response.data});
    }).catch(error=>{

    })
  }

  setUser = (user) =>{
    this.setState({user:user});
  }

  render() {
    return (
      <Fragment>

        <NavMenuDesktop user={this.state.user} setUser={this.setUser} />
        
        <Switch>
          <Route exact path="/" render={
            (props) => <HomePage {...props} key={Date.now()} />
          } />

          <Route exact path="/login" render={
            (props) => <UserLoginPage {...props} key={Date.now()} />
          } />

          <Route exact path="/register" render={
            (props) => <RegisterPage user={this.state.user} setUser={this.setUser} {...props} key={Date.now()} />
          } />

          <Route exact path="/forgetpassword" render={
            (props) => <ForgetPasswordPage {...props} key={Date.now()} />
          } />

          <Route exact path="/resetpassword/:id" render={
            (props) => <ResetPasswordPage {...props} key={Date.now()} />
          } />

          <Route exact path="/profile" render={
            (props) => <ProfilePage user={this.state.user} setUser={this.setUser} {...props} key={Date.now()} />
          } />

          <Route exact path="/contact" render={
            (props) => <ContactPage {...props} key={Date.now()} />
          } />

          <Route exact path="/login" render={
            (props) => <UserLoginPage user={this.state.user} setUser={this.setUser} {...props} key={Date.now()} />
          } />

          <Route exact path="/purchase" render={
            (props) => <PurchasePage {...props} key={Date.now()} />
          } />

          <Route exact path="/privacy" render={
            (props) => <PrivacyPage {...props} key={Date.now()} />
          } />

          <Route exact path="/refund" render={
            (props) => <RefundPage {...props} key={Date.now()} />
          } />

          <Route exact path="/productdetails/:productid" render={
            (props) => <ProductDetailPage user={this.state.user} {...props} key={Date.now()} />
          } />

          <Route exact path="/notification" render={
            (props) => <NotificationPage {...props} key={Date.now()} />
          } />

          <Route exact path="/favorite" render={
            (props) => <FavoritePage user={this.state.user} {...props} key={Date.now()} />
          } />

          <Route exact path="/cart" render={
            (props) => <CartPage user={this.state.user} {...props} key={Date.now()} />
          } />

          <Route exact path="/about" render={
            (props) => <AboutPage {...props} key={Date.now()} />
          } />

          <Route exact path="/productcategory/:category" render={
            (props) => <ProductCategoryPage {...props} key={Date.now()} />
          } />

          <Route exact path="/productsubcategory/:category/:subcategory" render={
            (props) => <ProductSubCategoryPage {...props} key={Date.now()} />
          } />

          <Route exact path="/productbysearch/:key" render={
            (props) => <SearchPage {...props} key={Date.now()} />
          } />

          <Route exact path="/orderlist" render={(props) => <OrderListPage user={this.state.user} {...props} key={Date.now()} />
          } />  

        </Switch>
      </Fragment>
    )
  }
}

export default AppRoute
