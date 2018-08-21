import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="form">
      <form onSubmit={handleSubmit} name={name} className="form-wrapper">
        <div className="form-title">
          <h1>WhatsThat {displayName}</h1>
        </div>
        <div>
          <label htmlFor="email" className="input-text">
            Email
          </label>
          <input name="email" type="text" className="input-box" />
        </div>
        <div>
          <label htmlFor="password" className="input-text">
            Password
          </label>
          <input name="password" type="password" className="input-box" />
        </div>
        <div>
          <button type="submit" className="btn btn-info-own">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        <div>
          <a href="/auth/google" className="btn btn-info">
            {displayName} with Google
          </a>
        </div>
        <div>
          <a href="/auth/facebook" className="btn btn-info-facebook">
            {displayName} with Facebook
          </a>
        </div>
      </form>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
