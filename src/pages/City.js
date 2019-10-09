import React, { Component } from 'react';
// import axios
import axios from 'axios';
// import config api
import { API } from "../config/api";
// import CategoryList component
import CategoryList from '../components/CategoryList';
// import SearchKeyword component
import SearchKeyword from '../components/SearchKeyword';
import SearchCriteria from '../components/SearchCriteria';
import RestaurantCard from '../components/RestaurantCard';


// dummy categories data 
// const categoriesDummy = [
//     {
//         "categories": {
//             "id": 1,
//             "name": "Delivery"
//         }
//     }, {
//         "categories": {
//             "id": 2,
//             "name": "Dine-out"
//         }
//     }, {
//         "categories": {
//             "id": 3,
//             "name": "Nightlife"
//         }
//     }, {
//         "categories": {
//             "id": 4,
//             "name": "Catching-up"
//         }
//     }
// ];

// dummy restaurant data
// const restaurants = [
//     {
//         "restaurant": {
//             "id": "18875696",
//             "name": "Kintaro Sushi",
//             "location": {
//                 "address": "Jl. Suryo No. 20, Senopati, Jakarta",
//                 "locality": "Senopati",
//             },
//             "cuisines": "Sushi, Japanese",
//             "average_cost_for_two": 200000,
//             "currency": "IDR",
//             "thumb": "https://b.zmtcdn.com/data/pictures/chains/5/18530405/0feeddcbe877a8e27526a8cf5b501edf.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
//             "user_rating": {
//                 "aggregate_rating": "4.9",
//                 "rating_text": "Excellent",
//                 "rating_color": "3F7E00",
//                 "votes": "1358"
//             },
//         }
//     }, {
//         "restaurant": {
//             "id": "18875696",
//             "name": "Kintaro Sushi",
//             "location": {
//                 "address": "Jl. Suryo No. 20, Senopati, Jakarta",
//                 "locality": "Senopati",
//             },
//             "cuisines": "Sushi, Japanese",
//             "average_cost_for_two": 200000,
//             "currency": "IDR",
//             "thumb": "https://b.zmtcdn.com/data/pictures/chains/5/18530405/0feeddcbe877a8e27526a8cf5b501edf.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
//             "user_rating": {
//                 "aggregate_rating": "4.9",
//                 "rating_text": "Excellent",
//                 "rating_color": "3F7E00",
//                 "votes": "1358"
//             },
//         }
//     }
// ]

export default class City extends Component {
    // state
    constructor() {
        super();
        this.state = {
            city: null,
            categories: null,
            categorySelected: null,
            keyword: '',
            criteria: [],
            restaurants: [],
        }
    }

    // method for handler button search
    searchHandler = () => {
        this.setState({restaurants: null});
        let url = `${API.zomato.baseUrl}/search`;
        let params = {};

        for (let cri of this.state.criteria) {
            switch (cri.criteriaName) {
                case 'City':
                    params.entity_id    = cri.data.id;
                    params.entity_type  = 'city'; 
                    break;
                case 'Category':
                    params.category = cri.data.id
                    break;
                case 'Keyword':
                    params.q = cri.data.name;
                    break;
                default:
                    break;
            }
        }

        axios
            .get(url, {
                headers: {
                    'user-key': API.zomato.api_key
                },
                params
            })
            .then(({data}) => {
                this.setState({restaurants: data.restaurants})
            })
            .catch(err => console.log(err));

    }

    // transform categories data
    transformCategoriesData = (categories) => {
        // variable has copied from categories data but data has been releases from "categories"
        let categoriesTransformed = categories.map(category => {
            return category.categories;
        });
        // kembalikan
        return categoriesTransformed;
    }

    // get City data from city_id in path
    getCityData = (city_id) => {
        let url = `${API.zomato.baseUrl}/cities`;
        axios
            .get(url, {
                headers: {
                    "user-key": API.zomato.api_key
                },
                params: {
                    city_ids: `${city_id}`
                }
            })
            .then(({ data }) => {
                // variable for city data
                let city = data.location_suggestions[0];

                // variable for criteria
                let newCriteria = {
                    criteriaName: 'City',
                    data: city
                }

                // copy state of Criteria to array
                let criteria = [...this.state.criteria];
                // push newCriteria to criteria
                criteria.push(newCriteria);

                this.setState({ city, criteria });
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        let { city_id } = this.props.match.params;
        this.getCityData(city_id);
        // start get category data from zomato after UI rendered
        this.getCategoriesData();
    }

    // method for menu category onclick
    categoryClickHandler = (category) => {
        // copy state of criteria
        let criteria = [...this.state.criteria];
        // delete criteria selected
        criteria = criteria.filter(cri => cri.criteriaName !== 'Category')
        let newCriteria = {
            criteriaName: 'Category',
            data: category
        }
        // add new criteria selected
        criteria.push(newCriteria);
        this.setState({ categorySelected: category, criteria });
    }

    // method for input keyword changed
    changeKeywordHandler = (event) => {
        this.setState({keyword: event.target.value})
    }

    // method for button search onclick
    addToCriteriaHandler = (event) => {
        event.preventDefault();
        // copy state of criteria
        let criteria = [...this.state.criteria];
        // prevent criteria multiple input
        criteria = criteria.filter(cri => cri.criteriaName !== 'Keyword');
        let newCriteria = {
            criteriaName: 'Keyword',
            data: {
                name: this.state.keyword
            }
        }
        criteria.push(newCriteria);
        this.setState({ keyword: '', criteria });
    }

    // method for remove criteria from index
    removeCriteriaHandler = (index) => {
        // copy state of criteria
        let criteria = [...this.state.criteria];
        criteria.splice(index, 1);
        this.setState({ criteria });
    }

    // method for get category data from api zomato
    getCategoriesData = () => {
        let url = `${API.zomato.baseUrl}/categories`;
        axios
            .get(url, {
                headers: {
                    'user-key': API.zomato.api_key
                }
            })
            .then(({data}) => {
                // get categories data from transformCategoryData
                let categories = this.transformCategoriesData(data.categories);
                this.setState({categories});
            })
            .catch(err => console.log(err));
    }

    renderRestaurantList = () => {
        if (this.state.restaurants === null) {
            return (
                <div className="col">
                    <p>Loading...</p>
                </div>
            )
        }
        if (this.state.restaurants.length > 0) {
            return (
                this.state.restaurants.map(({restaurant}) => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                    />
                ))
            )
        } else {
            return (
                <div className="col">
                    <p>No data available. Use search for info.</p>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="container-fluid" style={{ marginTop: 30, marginBottom: 30 }}>
                {/* check state city null or not */}
                {this.state.city && (
                    <div className="row">
                        <div className="col">
                            <h4 className="text-success">Restaurant in <span>{ this.state.city.name }</span>, { this.state.city.country_name }</h4>
                        </div>
                    </div>
                )}

                <div className="row">
                    <div className="col-lg-3 col-sm-12">
                        <h5>Categories</h5>
                        <CategoryList
                            categories={this.state.categories}
                            categorySelected={this.state.categorySelected}
                            categoryClickHandler={(category) => this.categoryClickHandler(category)}
                        />
                    </div>
                    <div className="col">
                        <SearchKeyword
                            onClickAddToCriteria={this.addToCriteriaHandler}
                            keyword={this.state.keyword}
                            changeKeywordHandler={this.changeKeywordHandler}
                        />
                        <SearchCriteria
                            criteria={this.state.criteria}
                            removeCriteriaHandler={(index) => this.removeCriteriaHandler(index)}
                            onClickSearch={this.searchHandler}
                        />
                        <div className="row">
                            <div className="col" style={{marginBottom: 20}}>
                                <h4 className="text-success">Restaurant List</h4>
                            </div>
                        </div>
                        <div className="row">
                            {this.renderRestaurantList()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
