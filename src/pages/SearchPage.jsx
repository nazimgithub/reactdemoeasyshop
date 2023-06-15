import React, { Component, Fragment } from 'react'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import SearchList from '../components/ProductDetails/SearchList'
import axios from 'axios'
import APPURL from '../api/AppURL'
import { toast } from 'react-toastify'

class SearchPage extends Component {

    constructor({ match }) {
        super();
        this.state = {
            SearchKey: match.params.key,
            ProductData: []
        }
    }

    componentDidMount() {
        window.scroll(0, 0)
        axios.get(APPURL.ProductBySearch(this.state.SearchKey)).then(response => {
            this.setState({ ProductData: response.data })
        }).catch(error => {
            toast.error(error);
        })
    }

    render() {
        return (
            <Fragment>
                <div className='Desktop'>
                    <NavMenuDesktop />
                </div>
                <div className='Mobile'>
                    <NavMenuMobile />
                </div>
                <SearchList SearchKey={this.state.SearchKey} ProductData={this.state.ProductData} />
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

export default SearchPage
