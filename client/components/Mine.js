import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Mine extends Component {
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <div className="mine-data-wrapper">
          <div className="mine-data-title">My Places</div>
          <div>...</div>
          <div className="mine-data-title">My Things</div>
          <div>...</div>
          <div className="mine-data-title">My People</div>
          <div>...</div>
        </div>
      </React.Fragment>
    )
  }
}

const mapState = state => ({})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(Mine)
