import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../auth';
import firebase from 'firebase';

import './login-page.css';

export default class LoginPage extends Component {
  state = {
    error: null
  }

  login = (email, password, e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
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
        <h1 className="text-center mb-5">Login</h1>

        <Auth onSubmit={ this.login } error={ this.state.error } />
      </div>
    )
  }
}
