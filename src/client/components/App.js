import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../app.css';
import Pothole from './Pothole';
// import CreatePothole from './CreatePothole';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pothole: null, // this will be an object
      potholes: null,
      // Example info
      // pothole: {
      //   image: 'https://res.cloudinary.com/adopt-a-pothole/image/upload/v1572899303/potholes/big-pothole-card_mkzzjc.jpg',
      //   description: 'Hello, I am here to flatten your tires',
      //   rating: 2,
      //   location: 'The street',
      // },
    };
    this.setPothole = this.setPothole.bind(this);
  }

  componentDidMount() {
    axios.get('/pothole')
      .then((response) => {
        console.log(response.body);
        this.setState({
          potholes: response.body,
        });
        // this.setPothole(response.body);
      });
  }

  setPothole(pothole) {
    this.setState({
      pothole
    });
  }

  // pass location into request body to get specific pothole
  getPothole() {
    return axios.get('/pothole')
      .then((response) => {
        this.setPothole(response.body);
      });
  }

  render() {
    // get props from pothole object to pass to Pothole component
    const { pothole } = this.state;
    const {
      image,
      description,
      rating,
      location
    } = pothole;

    return (
      <div>
        <Link id="CreatePothole" to="/create">Add A Pothole</Link>
        <Pothole image={image} description={description} rating={rating} location={location} />
      </div>
    );
  }
}
