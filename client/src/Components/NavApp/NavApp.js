import React, { Component } from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import Nav from './Nav';
import Home from './../Home/Home';
import Departments from './../Departments/Departments';
import Services from './../Services/Services';
import NewCVs from './../NewCVs/NewCVs';
import Footer from './../Footer/Footer';
import Affairs from './../Affairs/Affairs';

class NavApp extends Component {
  render() {
    return (
        <Router>
            <div className="NavApp">
            <Nav />
            <Route exact path="/" component = {Home} />
            <Route path="/doctors" component = {Departments} />
            <Route path="/services" component = {Services} />
            <Route path="/newcvs" component = {NewCVs} />
            <Route path="/affairs" component = {Affairs} />
            <Footer />
        
            </div>
        </Router>
    );
  }
}

export default NavApp;
