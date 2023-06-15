import axios from 'axios';
import React, { Component } from 'react'
import { Fragment } from 'react'
import APPURL from '../../api/AppURL';

class ReviewList extends Component {

    constructor() {
        super();
        this.state = {
            ReviewData: [],
        }
    }

    componentDidMount() {
        let productCode = this.props.code;
        axios.get(APPURL.ProductReview(productCode)).then(response => {
            this.setState({ReviewData: response.data});
        }).then(error => {
            console.log(error);
        })
    }

    render() {

        const myReviewList = this.state.ReviewData;
        console.warn(myReviewList.length);
        
        if (myReviewList.length > 0) {
            const myView = myReviewList.map((review, i) => {

                if(review.reviewer_rating === "1") {
                    return <div>
                                <p className=" p-0 m-0">
                                    <span className="Review-Title">{review.reviewer_name}</span>
                                    <span className="text-success">
                                        <i className="fa fa-star"></i>
                                    </span>
                                </p>
                                <p>{review.reviewer_comments}</p>
                            </div>
                }else if(review.reviewer_rating === "2") {
                    return <div>
                            <p className=" p-0 m-0">
                                <span className="Review-Title">{review.reviewer_name}</span>
                                <span className="text-success">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </span>
                            </p>
                            <p>{review.reviewer_comments}</p>
                        </div>
                }else if(review.reviewer_rating === "3") {
                    return <div>
                            <p className=" p-0 m-0">
                                <span className="Review-Title">{review.reviewer_name}</span>
                                <span className="text-success">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </span>
                            </p>
                            <p>{review.reviewer_comments}</p>
                        </div>
                }else if(review.reviewer_rating === "4") {
                    return <div>
                                <p className=" p-0 m-0">
                                    <span className="Review-Title">{review.reviewer_name}</span>
                                    <span className="text-success">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </span>
                                </p>
                            <p>{review.reviewer_comments}</p>
                        </div>
                }else if(review.reviewer_rating === "5") {
                    return <div>
                            <p className=" p-0 m-0">
                                <span className="Review-Title">{review.reviewer_name}</span>
                                <span className="text-success">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </span>
                            </p>
                            <p>{review.reviewer_comments}</p>
                        </div>
                } // end else if condition here
            }); // End map

            return <div>
                    <h6 className="mt-2">REVIEWS</h6>
                    {myView}
                </div>

        } else {
            return <div>
                <p><strong>There have no product review yet.</strong></p>
            </div>
        }
    }
}

export default ReviewList
