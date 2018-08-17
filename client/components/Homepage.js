import React, {Component} from 'react'

export default class HomePage extends Component {
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
            <div className="homepage-text">Then, You Will Get the Answer!</div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}


