import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../auth';
import firebase from 'firebase';

import './login-page.css';

export default class RegisterPage extends Component {
  state = {
    error: null
  }

  register = (email, password, e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem(`username`, email);
        localStorage.setItem(`loggedIn`, true);
        this.props.onLogin();
      })
      .catch((e) => this.setState({ error: e.message }))
  }

  render() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) return <Redirect to="/" />

    return (
      <div className="login-page">
        <h1 className="text-center mb-5">Register</h1>

        <Auth onSubmit={ this.register } error={ this.state.error } />
      </div>
    )
  }
}
