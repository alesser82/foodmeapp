import React, { Component } from 'react';
// import ImagesAndWelcome Component
import ImagesAndWelcome from '../components/ImagesAndWelcome';
// import CityList Component
import CityList from '../components/CityList';
// import SearchCity Component
import SearchCity from '../components/SearchCity';
// import axios
import Axios from 'axios';
// import file api config
import {API} from '../config/api';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            keyword: '',
            featuredCities: null,
            citiesResultSearch: [],
            cityKeywordSearch: '',
        }
    }

    // keyword search change handler
    changeKeywordHandler = (event) => {
        this.setState({
            keyword: event.target.value
        });
    };

    // search button handler
    searchHandler = (event) => {
        event.preventDefault();
        let keyword = this.state.keyword;
        let url = `${API.zomato.baseUrl}/cities`;
        Axios.get(url,{
            headers: {
                'user-key': API.zomato.api_key
            },
            params: {
                q: keyword
            }
        }).then(({ data }) => {
            if (data.status === 'success') {
                this.setState({ 
                    citiesResultSearch: data.location_suggestions,
                    keyword: '',
                    cityKeywordSearch: keyword,
                })
            }
        }).catch(err => console.log(err));
    }

    // get City from zomato api
    getFeaturedCities = () => {
        let url = `${API.zomato.baseUrl}/cities`;
        Axios.get(url, {
            // api key
            headers: {
                'user-key': API.zomato.api_key,
            },
            // api parameter
            params: {
                city_ids: "74,11052,170"
            }
        }).then(({ data }) => { // tangkap respon
            if (data.status === 'success') {
                this.setState({ featuredCities: data.location_suggestions });
            }
        }).catch(err => console.log(err)); // tangkap error
    }

    componentDidMount() {
        this.getFeaturedCities();
    }

    render() {
        // const citiesDummy = [
        //     { id: 74, name: "Jakarta", country_name: "Indonesia" },
        //     { id: 11052, name: "Bandung", country_name: "Indonesia" },
        //     { id: 170, name: "Bali", country_name: "Indonesia" },
        // ];

        return (
            <>
            {/* Start of imageandwelcome section */}
            <ImagesAndWelcome/>
            {/* End of imageandwelcome section */}

            <div className="container" style={{ marginTop: 30, marginBottom: 30 }}>
            {/* Start of featured city section */}
            <CityList
                cities={this.state.featuredCities}
                title={'Featured City'}
            />
            {/* End of featured city section */}

            {/* Start of search city section */}
            <SearchCity
                // value={this.state.keyword}
                value={this.state.keyword}
                onChange={this.changeKeywordHandler}
                onClickSearch={this.searchHandler}
            />
            {/* End of search city section */}

            {/* Start of search city result section */}
            { this.state.cityKeywordSearch !== '' ?
            <CityList
                title={'Search Result'}
                showSubtitle={true}
                subtitle={this.state.cityKeywordSearch}
                cities={this.state.citiesResultSearch}
                sumResult={this.state.citiesResultSearch.length}
            />
            : null }
            {/* End of search city result section */}
            </div>
            </>
        )
    }
}
