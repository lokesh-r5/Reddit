import React, { Component } from 'react';

import './App.css';

import Posts from './Posts'
import Cats from './Cats'


class App extends Component {
  render() {
    return (
      <div>
        <h1>Cats</h1>
        <Cats/>
        <h1>Posts</h1>
        <div className="posts">
          <Posts/>
        </div>
      </div>
    );
  }
}


export default App