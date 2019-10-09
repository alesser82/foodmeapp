import React, { Component } from 'react';
// import Navbar Component
import Navbar from './components/Navbar';
// import Footer component
import Footer from './components/Footer/Footer';
// import Home page
import Home from './pages/Home';
// import City page
import City from './pages/City';
// import RestaurantDetail page
import RestaurantDetail from './pages/RestaurantDetail';
// import Router
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { HashRouter as Router, Route } from "react-router-dom";

class App extends Component {

  render() {
    return (
      // fragment (<> </>) -> pengganti div, disarankan karena performa lebih baik
      <Router>
        {/* Start of navbar section */}
        <Navbar />
        {/* End of navbar section */ }

        {/* Start of home page / route */}
        <Route path="/" exact component={Home} />
        {/* End of home page */}

        {/* Start of city page / route */}
        <Route path="/city/:city_id" component={City} />
        {/* End of city page / route */}

        {/* Start of RestaurantDetail page / route */}
        <Route path="/restaurant/:restaurant_id" component={RestaurantDetail} />
        {/* End of RestaurantDetail page / route */}

        {/* Start of footer section */}
        <Footer />
        {/* End of footer section */}
      </Router>
    );
  }
}

export default App;
