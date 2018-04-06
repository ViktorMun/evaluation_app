import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {getOneStudent, changeStudent, addMark} from '../../actions/actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './oneStudent.css'
import ChangeStudent from './changeStudent'
import Button from 'material-ui/Button'
import AddMark from './addMark.js'


class oneStudent extends PureComponent {
  state = {}

  changeColor = (event) => {
    const color = event.currentTarget.value
    this.setState({colour: color})
  }

  componentWillMount(props) {
    this.props.getOneStudent(this.props.match.params.id)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  handleChange = (event) => {
    const {name, value} = event.target

    this.setState({[name]: value})
  }

  changeStudent = (student) => {
    this.props.changeStudent(this.props.match.params.id, student)
  }

  addMark = (mark) => {
    this.props.addMark(this.props.match.params.id, mark)
  }
  carousel = colour => {
    if (colour==="R") {return "Red"}
    else if (colour === "Y") {return "Yellow"}
    else if (colour === "G" ) {return "Green"}
  };

  render() {
    const initialValues = this.props.initialValues || {}
    const oneStudent = this.props.oneStudent


    if (!oneStudent)
      return null

    return (<div>
      <div class="card">
    <img src={oneStudent.picture} className="photo"/>
    <div class="container">
      <h2 className='StudentName'><b>{oneStudent.name}</b></h2>

          < ChangeStudent onSubmit={this.changeStudent}/>
          < AddMark onSubmit={this.addMark}/>
      </div>
      </div>

      <table>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Mark</th>
          <th>Comments</th>
        </tr>
        {
          oneStudent.day && oneStudent.day.map(day => <tr>
            <td >{day.id}</td>
            <td className="title">{day.date}</td>
            <td className={this.carousel(day.colour)}>{day.colour}</td>
            <td  className="title">{day.text}</td>

          </tr>)
        }
      </table>
</div>

      )
  }
}
const mapStateToProps = function(state) {
  return {oneStudent: state.oneStudent}

}

export default connect(mapStateToProps, {getOneStudent, changeStudent, addMark})(oneStudent)
