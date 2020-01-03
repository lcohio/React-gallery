import React, { Component } from 'react';
import axios from 'axios';
import { 
  BrowserRouter,
  Route 
} from 'react-router-dom';

import './App.css';

// import apiKey from './config';

import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm />
          <Nav />
          <Route exact path="/" render={() => <PhotoContainer title='Airplanes' /> } />
          <Route path="/ocean" render={() => <PhotoContainer title='Ocean' /> } />
          <Route path="/mountains" render={() => <PhotoContainer title='Mountains' /> } />
          <Route path="/rainbows" render={() => <PhotoContainer title='Rainbows' /> } />
          <Route path="/search/:topic" render={() => <PhotoContainer title='Search Results' /> } />
        </div>
      </BrowserRouter>
    )
  }
}
