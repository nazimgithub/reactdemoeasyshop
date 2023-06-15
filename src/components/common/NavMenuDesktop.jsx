import React, { Component, Fragment } from 'react'
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import Logo from '../../assets/images/easyshop.png';
import Bars from '../../assets/images/bars.png';
import { Link, Redirect } from "react-router-dom";
import MegaMenuAll from '../home/MegaMenuAll';
import axios from 'axios';
import APPURL from '../../api/AppURL';


class NavMenuDesktop extends Component {

  constructor() {
    super();
    this.state = {
      SideNavState: "sideNavClose",
      ContentOverState: "ContentOverlayClose",
      Searchkey: "",
      SearchRedirectStatus: false,
      CartCount:0,
      FavItemCount:0,
    }
    this.SearchOnChange = this.SearchOnChange.bind(this);
    this.SearchOnClick = this.SearchOnClick.bind(this);
    this.SearchRedirect = this.SearchRedirect.bind(this);
  }


  MenuBarClickHandler = () => {
    this.SideNavOpenClose();
  }

  ContentOverlayClickHandler = () => {
    this.SideNavOpenClose();
  }

  SearchOnChange(event) {
    let Searchkey = event.target.value;
    this.setState({ Searchkey: Searchkey });
  }

  SearchOnClick(event) {
    if (this.state.Searchkey.length >= 2) {
      this.setState({ SearchRedirectStatus: true })
    }
  }

  SearchRedirect() {
    if (this.state.SearchRedirectStatus === true) {
      return <Redirect to={"/productbysearch/" + this.state.Searchkey} />
    }
  }


  SideNavOpenClose = () => {
    let SideNavState = this.state.SideNavState;
    let ContentOverState = this.state.ContentOverState;
    if (SideNavState === "sideNavOpen") {
      this.setState({
        SideNavState: "sideNavClose",
        ContentOverState: "ContentOverlayClose"
      })
    }
    else {
      this.setState({
        SideNavState: "sideNavOpen",
        ContentOverState: "ContentOverlayOpen"
      })
    }
  }

  logout = () =>{
    localStorage.clear();
  }

  componentDidMount(){
    let productCode = this.props.productCode;
    //let email = this.props.user.email;

    // Fetch No. of cart items based on logging user email
    axios.get(APPURL.CartCount(productCode)).then(response=>{
      this.setState({CartCount:response.data});
    }).catch(error=>{
      console.log(error);
    });
    
    // // Fetch No. of favourite items based on logging user email
    // axios.get(APPURL.FavItemCount(email)).then(response=>{
    //   this.setState({FavItemCount:response.data});
    // }).catch(error=>{
    //   console.log(error);
    // });
  }

  render() {

    let buttons;
    if (localStorage.getItem('token')) {
      buttons = (
        <div>
          <Link to="/favorite" className="btn"><i className="fa h4 fa-heart"></i><sup><span className="badge text-white bg-danger">{this.state.FavItemCount}</span></sup>
          </Link>

          <Link to="/notification" className="btn"><i className="fa h4 fa-bell"></i><sup><span className="badge text-white bg-danger">5</span></sup>
          </Link>
          <a className="btn"><i className="fa h4 fa-mobile-alt"></i></a>
          <Link to="/" onClick={this.logout} className="h4 btn">LOGOUT</Link>

          <a className="btn"><i className="fa h4 fa-mobile-alt"></i></a>
          <Link to="/profile" className="h4 btn">PROFILE</Link>

          <Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart"></i> {this.state.CartCount} Items </Link>
        </div>
      )
    } else {
      buttons = (
        <div>
          <Link to="/favorite" className="btn"><i className="fa h4 fa-heart"></i><sup><span className="badge text-white bg-danger">{this.state.FavItemCount}</span></sup>
          </Link>

          <Link to="/notification" className="btn"><i className="fa h4 fa-bell"></i><sup><span className="badge text-white bg-danger">5</span></sup>
          </Link>
          <a className="btn"><i className="fa h4 fa-mobile-alt"></i></a>
          <Link to="/login" className="h4 btn">LOGIN</Link>

          <a className="btn"><i className="fa h4 fa-mobile-alt"></i></a>
          <Link to="/register" className="h4 btn">SIGN UP</Link>

          <Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart"></i> 0 Items </Link>
        </div>
      )
    }

    return (
      <Fragment>
        <div className="TopSectionDown">
          <Navbar fixed={"top"} className="navbar" bg="light">

            <Container fluid={"true"} className="fixed-top shadow-sm p-2 mb-0 bg-white">
              <Row>
                <Col lg={4} md={4} sm={12} xs={12}>
                  <img onClick={this.MenuBarClickHandler} className="bar-img" src={Bars} />
                  <Link to="/"> <img className="nav-logo" src={Logo} /> </Link>
                </Col>

                <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                  <div className="input-group w-100">
                    <input onChange={this.SearchOnChange} type="text" className="form-control" />
                    <Button onClick={this.SearchOnClick} type="button" className="btn site-btn"><i className="fa fa-search"> </i>
                    </Button>
                  </div>
                </Col>

                <Col className="p-1 mt-1" lg={4} md={4} sm={12} xs={12}>
                  {buttons}

                </Col>

              </Row>
              {this.SearchRedirect()}

            </Container>

          </Navbar>
        </div>

        <div className={this.state.SideNavState}>
          <MegaMenuAll />
        </div>

        <div onClick={this.ContentOverlayClickHandler} className={this.state.ContentOverState}>

        </div>



      </Fragment>
    )
  }
}

export default NavMenuDesktop