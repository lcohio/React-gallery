import React, { Component } from 'react';
import axios from 'axios';
import { 
  Switch,
  BrowserRouter,
  Route
} from 'react-router-dom';
import './App.css';
import apiKey from './config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import InvalidRoute from './components/InvalidRoute';
import Loading from './components/Loading';

export default class App extends Component {

  state = {
    init: [],
    ocean: [],
    mountains: [],
    rainbows: [],
    results: [],
    loading: false
  }

  componentDidMount() {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=palm+trees&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        init: response.data.photos.photo.map(item => 
          `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`)
      })
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=ocean&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        ocean: response.data.photos.photo.map(item => 
          `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`)
      })
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=mountains&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        mountains: response.data.photos.photo.map(item => 
          `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`)
      })
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=rainbows&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        rainbows: response.data.photos.photo.map(item => 
          `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`)
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  performSearch = (query) => {
    this.setState({
      loading: true
    })
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        results: response.data.photos.photo.map(item => 
          `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`),
        loading: false
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
          <Switch>
            <Route exact path="/" render={() => <PhotoContainer title='Photo Gallery' data={ this.state.init } /> } />
            <Route path="/ocean" render={() => <PhotoContainer title='Ocean' data={ this.state.ocean } /> } />
            <Route path="/mountains" render={() => <PhotoContainer title='Mountains' data={ this.state.mountains } /> } />
            <Route path="/rainbows" render={() => <PhotoContainer title='Rainbows' data={ this.state.rainbows } /> } />
            {this.state.loading === true ?
              <Route path="/search/:topic" render={() => <Loading /> } /> :
              <Route path="/search/:topic" render={() => <PhotoContainer title='Results' data={ this.state.results } /> } />
            }
            <Route component={ InvalidRoute } />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
