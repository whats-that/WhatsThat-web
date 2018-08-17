import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class HomePage extends Component {
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <div className="homepage-wrapper">
          <div className="camera-image" />
          <div className="homepage-right">
            <div className="homepage-title">WhatsThat</div>
            <div className="homepage-text">Curious About WhatsThat?</div>
            <div className="homepage-text">Are You Traveling?</div>
            <div className="homepage-text">Take a Photo,</div>
            <div className="homepage-text">Then, You Will Get The Answer!</div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  subjects: state.subjects
})

const mapDispatch = dispatch => ({
  fetchSubjects: () => dispatch(fetchSubjects())
})

export default connect(mapState, mapDispatch)(HomePage)
