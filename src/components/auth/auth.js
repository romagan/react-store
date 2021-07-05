import React, { Component, createRef } from 'react';

export default class Auth extends Component {
  state = {
    isAgreed: true
  }

  emailField = createRef();
  passwordField = createRef();

  onChangeAgreement = () => {
    this.setState(({ isAgreed }) => ({ isAgreed: !isAgreed}))
  }

  render() {
    const { isAgreed } = this.state;
    const { error, onSubmit } = this.props;

    return (
      <form
        className="form"
        onSubmit={
          (e) => onSubmit(
            this.emailField.current.value,
            this.passwordField.current.value,
            e)
        }>
        <div className="mb-3">
          <label htmlFor="userEmail" className="form-label">Email</label>
          <input
            defaultValue={localStorage.getItem(`username`) || ''}
            type="email"
            className="form-control"
            id="userEmail"
            aria-describedby="emailHelp"
            placeholder="example@yahoo.com"
            required
            ref={ this.emailField } />
        </div>
        <div className="mb-3">
          <label htmlFor="userPassword" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            placeholder="********"
            required
            ref={ this.passwordField } />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreeement"
            checked={ isAgreed }
            onChange={ this.onChangeAgreement} />
          <label className="form-check-label" htmlFor="agreeement">Privacy agreement</label>
        </div>
        { error &&
          <div className="feedback">
            { error }
          </div>
        }
        <button
          type="submit"
          className="btn btn-primary"
          disabled={ !isAgreed }
        >Submit</button>
      </form>
    )
  }
}
