import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Mine extends Component {
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <div className="bgimage" />
        <div className="bg-bottom">
        </div>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
})

const mapDispatch = dispatch => ({
})

export default connect(mapState, mapDispatch)(Mine)
