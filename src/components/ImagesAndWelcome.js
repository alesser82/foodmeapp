import React from 'react';
// import images
import mainImage from '../assets/images/aneka-makanan.jpg';

const ImagesAndWelcome = () => (
    <>
    <div className="row" style={{ marginBottom: 30 }}>
        <div className="col overflow-hidden" style={{ maxHeight: '100vh' }}>
            <img src={mainImage} className="w-100" alt="Aneka Makanan" />
        </div>
    </div>
    <div className="row">
        <div className="col">
            <div className="card text-white bg-success mb-3 text-center">
                <div className="card-header"><h1>Welcome to Food Me</h1></div>
                <div className="card-body">
                    <h4 className="card-titile">The Easier Way to Find Restaurant and Food</h4>
                    <p className="card-text">You can grab information abput restaurant, cafe, cuisine with just a few click.</p>
                    <p className="card-text">Start by choosing the features cities below. or search city name.</p>
                </div>
            </div>
        </div>
    </div>
    </>
);

export default ImagesAndWelcome;