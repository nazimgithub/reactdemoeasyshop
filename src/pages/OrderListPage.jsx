import React, { Component, Fragment } from 'react'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import OrderList from '../components/Cart/OrderList'

class OrderListPage extends Component {
  componentDidMount(){
    window.scroll(0,0)
  }
  render() {
    const User = this.props.user;
    return (
        <Fragment> 
        <div className='Desktop'>
         <NavMenuDesktop /> 
        </div>
        <div className='Mobile'>
          <NavMenuMobile />
        </div>
        <OrderList user={User} />
        <div className="Desktop">
          <FooterDesktop/>
        </div>

        <div className="Mobile">
          <FooterMobile/>
        </div>
      </Fragment>
    )
  }
}

export default OrderListPage