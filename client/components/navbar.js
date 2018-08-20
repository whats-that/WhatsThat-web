import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <React.Fragment>
    {isLoggedIn ? (
      <div>
        <div className="ui pointing transparent massive white fluid four pointed transparent menu">
          <Link to={'/'}>
            <div className="item">
              <i className="photo icon" /> WhatThat
            </div>
          </Link>
          <div className="right menu">
            <Link to="/about">
              <div className="item">About</div>
            </Link>
            <Link to="/test">
              <div className="item">Text</div>
            </Link>
            <Link to={'/mine'}>
              <div className="item">Mine</div>
            </Link>
            <Link to={'/'}>
              <div onClick={handleClick} className="item">
                Logout
              </div>
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <div className="ui pointing transparent massive white fluid four pointed transparent menu">
          <Link to={'/'}>
            <div className="item">
              <i className="photo icon" /> WhatThat
            </div>
          </Link>
          <div className="right menu">
            <Link to="/about">
              <div className="item">About</div>
            </Link>
            <Link to="/test">
              <div className="item">Text</div>
            </Link>
            <Link to="/login">
              <div className="item">Login</div>
            </Link>
            <Link to="/signup">
              <div className="item">Sign Up</div>
            </Link>
          </div>
        </div>
      </div>
    )}
  </React.Fragment>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
