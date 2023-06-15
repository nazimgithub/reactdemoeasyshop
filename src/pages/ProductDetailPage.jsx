import React, { Component, Fragment } from 'react'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import { toast } from 'react-toastify';
import APPURL from '../api/AppURL'
import axios from 'axios';
import SliderLoading from '../components/Placeholder/SliderLoading'

class ProductDetailPage extends Component {

  constructor({match}) {
    super();
    this.state = {
      //productId: match.params.productId,
      productId:1,
      productData: [],
      isLoading: "",
      mainDiv: "d-none"
    }
  }

  componentDidMount() {
    window.scroll(0, 0);
    axios.get(APPURL.ProductDetail(this.state.productId)).then(response => {
      this.setState({
        productData: response.data,
        isLoading: "d-none",
        mainDiv: ""
      });
    }).catch(error => {
      toast.error(error);
    })
  }

  render() {

    const User = this.props.user;

    if (this.state.mainDiv == "d-none") {
      return (
        <Fragment>
          <div className='Desktop'>
            <NavMenuDesktop />
          </div>
          <div className='Mobile'>
            <NavMenuMobile />
          </div>

          <SliderLoading isLoading={this.state.isLoading} />

          <div className="Desktop">
            <FooterDesktop />
          </div>

          <div className="Mobile">
            <FooterMobile />
          </div>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <div className='Desktop'>
            <NavMenuDesktop />
          </div>
          <div className='Mobile'>
            <NavMenuMobile />
          </div>
          <ProductDetails data={this.state.productData} user={User} />
          
          <div className="Desktop">
            <FooterDesktop />
          </div>

          <div className="Mobile">
            <FooterMobile />
          </div>
        </Fragment>
      )
    }
  }
}

export default ProductDetailPage
