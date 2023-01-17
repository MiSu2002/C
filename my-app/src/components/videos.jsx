import React, { Component, useState} from 'react';
import axios from 'axios';

import {API_KEY} from "../utils/constants";

class Videos extends Component {

  state = {
    videos: []
  };

  componentDidMount() {
    
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then(res => {
        this.setState({ videos: res.data.results });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.videos.map(video => (
          <div key={video.id}>
            <h2>{video.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w780${video.poster_path}`} alt={video.title} className="video"/>
            <p className='overview'>{video.overview}</p>
          </div>
        ))}
      </div>
    );
  }

}

export default Videos;
