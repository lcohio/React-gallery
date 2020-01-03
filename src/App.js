import React, { Component } from 'react';
import axios from 'axios';
import { 
  BrowserRouter,
  Route 
} from 'react-router-dom';

import './App.css';

import apiKey from './config';

import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';

export default class App extends Component {

  state = {
    init: [],
    ocean: [],
    mountains: [],
    rainbows: [],
    results: []
  }

  componentDidMount() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=palm+trees&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        init: response.data.photos.photo.map(item => `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`)
      })
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=ocean&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        ocean: response.data.photos.photo.map(item => `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`)
      })
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=mountains&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        mountains: response.data.photos.photo.map(item => `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`)
      })
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=rainbows&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        rainbows: response.data.photos.photo.map(item => `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`)
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        results: response.data.photos.photo.map(item => `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`)
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={ this.performSearch } />
          <Nav />
          <Route exact path="/" render={() => <PhotoContainer title='' data={ this.state.init } /> } />
          <Route path="/ocean" render={() => <PhotoContainer title='Ocean' data={ this.state.ocean } /> } />
          <Route path="/mountains" render={() => <PhotoContainer title='Mountains' data={ this.state.mountains } /> } />
          <Route path="/rainbows" render={() => <PhotoContainer title='Rainbows' data={ this.state.rainbows } /> } />
          <Route path="/search/:topic" render={() => <PhotoContainer data={ this.state.results } /> } />
        </div>
      </BrowserRouter>
    )
  }
}
