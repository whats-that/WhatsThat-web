import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class HomePage extends Component {
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
  subjects: state.subjects
})

const mapDispatch = dispatch => ({
  fetchSubjects: () => dispatch(fetchSubjects())
})

export default connect(mapState, mapDispatch)(HomePage)
