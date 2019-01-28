import React, { Component } from 'react';
import Navbar from './components/navbar';
import './App.css';
import { Route } from 'react-router-dom';
import Homepage from './components/homepage';
import Managemovies from './components/managemovies';
import ManageCategories from './components/managecategories';
import ManageConnect from './components/movcat';

class App extends Component {
  render() {
      return (
        <div>
          <Navbar/>
          
          <Route exact path='/' component={Homepage}/>
          <Route path='/managemovies' component={Managemovies}/>
          <Route path='/managecategories' component={ManageCategories}/>
          <Route path='/connectmovies' component={ManageConnect}/>
       
          
        </div>
      );
    
  }
}

export default App;


