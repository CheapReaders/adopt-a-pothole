import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Image,
  Container,
  Rating,
  Progress,
  Button,
} from 'semantic-ui-react';
import axios from 'axios';

export default class Pothole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: null,
      donationForm: false,
      donation: 0,
    };
    this.setComment = this.setComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.handleDonation = this.handleDonation.bind(this);
    this.toggleDonation = this.toggleDonation.bind(this);
    this.handleDonationInput = this.handleDonationInput.bind(this);
  }

  setComment(event) {
    this.setState({
      comment: event.target.value,
    });
  }

  submitComment() {
    const { comment } = this.state;
    // probably post comment to specific pothole
  }

  toggleDonation() {
    let { donationForm } = this.state;
    donationForm = !donationForm;
    this.setState({
      donationForm,
    });
  }

  handleDonation() {
    const { donation } = this.state;
    // grab pothole id and input value
    axios.post('/donate', { donation, id: this.props.id })
      .then((response) => {
        if (response.data === 'invalid') {
          console.log('payment unsuccessful');
        } else {
          // redirect to paypal
          window.location.href = response.data;
          console.log('payment was successful');
          this.toggleDonation();
        }
      });
  }

  handleDonationInput(event) {
    const donation = event.target.value;
    this.setState({
      donation,
    });
  }

  render() {
    const {
      image,
      title,
      description,
      rating,
      location,
      progress,
      index,
      onClick
    } = this.props;
    const { donationForm, donationMessage } = this.state;

    return (
      <div id="pothole-profile">
        <Container textAlign="center">
          <Button type="button" onClick={() => { onClick(index); }}>Next</Button>
          <Card className="ui centered card">
            <Image src={image} avatar style={{ fontSize: 150 }} />
            <Card.Content>
              <Card.Header>{title}</Card.Header>
              <Card.Meta>
                <span className="date">{location}</span>
              </Card.Meta>
              <Card.Description>
                {description}
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <p>How bad is it?</p>
              <Rating defaultRating={0} rating={rating} maxRating={3} disabled />
            </Card.Content>
            <Card.Content extra>
              <button
                type="button"
                className="ui primary button"
                onClick={this.toggleDonation}
              >
                  Donate
              </button>
              {donationForm ? (
                <div>
                  <input type="text" placeholder="Donation ex. 10.50" onChange={this.handleDonationInput} />
                  <button type="button" onClick={this.handleDonation}>Pay with Paypal</button>
                </div>
              )
                : <div />}
            </Card.Content>
            <Card.Content>
              <p>Percent Funded: </p>
              <Progress percent={progress} progress indicating />
            </Card.Content>
          </Card>
        </Container>
      </div>
    );
  }
}

Pothole.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
