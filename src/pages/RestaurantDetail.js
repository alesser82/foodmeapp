import React, { Component } from 'react'
// import axios
import axios from 'axios';
// import api config
import { API } from "../config/api";
// import RestaurantProfile component
import RestaurantProfile from '../components/RestaurantProfile';
import Review from '../components/Review';


export default class RestaurantDetail extends Component {

    constructor() {
        super();
        this.state = {
            restaurant: null,
            reviews: null
        };
    }

    // method for request review api zomato
    getReviewData = (restaurant_id) => {
        let url = `${API.zomato.baseUrl}/reviews`;
        axios
            .get(url, {
                headers: {
                    'user-key' : API.zomato.api_key
                },
                params: {
                    res_id: restaurant_id
                }
            })
            .then(({data}) => {
                this.setState({reviews: data.user_reviews})
            })
            .catch(({err}) => {
                console.log(err);
            })
    }

    // method for request api zomato
    getRestaurantData = (restaurant_id) => {
        // url api
        let url = `${API.zomato.baseUrl}/restaurant`;
        // get data with api_key and resturant_id from path
        axios
            .get(url, {
                headers: {
                    'user-key': API.zomato.api_key
                },
                params: {
                    res_id: restaurant_id
                }
            })
            .then(({data}) => {
                // update state
                this.setState({ restaurant: data })
            })
            .catch(err => console.log(err)) // if error
    }

    componentDidMount() {
        // get id from url
        let {params} = this.props.match;
        // call method getRestaurantData
        this.getRestaurantData(params.restaurant_id);
        // call method getReviewsData
        this.getReviewData(params.restaurant_id);
    }

    render() {
        return (
            <div className="container" style={{marginTop: 30, marginBottom: 30}}>
                <div className="row">
                    <div className="col-12" style={{marginBottom: 20}}>
                        <RestaurantProfile
                            restaurant={this.state.restaurant}
                        />
                        <div className="col-12" style={{ marginBottom: 20 }}>
                            <div className="card">
                                <div className="card-body">
                                <h4 className="text-success" style={{ fontWeight: 800 }}>Reviews</h4>
                                    {/* check state reviews */}
                                    { this.state.reviews ? (
                                        // looping reviews data from state
                                        this.state.reviews.map(({ review }) => (
                                            <Review
                                                review={review}
                                                key={review.id}
                                            />
                                        ))
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
