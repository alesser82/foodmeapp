import React from 'react';
// import CityCard Component
import CityCard from './CityCard';

const CityList = (props) => (
    <>
    <div className="row">
        <div className="col-12">
            <h3>{props.title}</h3>
            { props.showSubtitle === true && props.subtitle !== '' ?
            <h6 className="text-muted">Search result for keyword '{props.subtitle}', {props.sumResult} kota ditemukan.</h6>
            : null }
        </div>
    </div>
    <div className="row">
        {props.cities == null ? (
            <div className="col">
                <p>Loading...</p>
            </div>
        ) : (
            _renderCityList(props.cities)
        )}
    </div>
    </>
);

const _renderCityList = (cities) => {
    if (cities.length > 0) {
        return (
            cities.map(city => 
                <CityCard key={city.id} city={city} />
            )
        );
    } else {
        return (
            <div className="col">
                <p className="text-danger">Kota tidak ditemukan.</p>
            </div>
        );
    }
}

export default CityList;