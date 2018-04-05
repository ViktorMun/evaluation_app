import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {getOneStudent, changeStudent, addMark} from '../../actions/actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './oneStudent.css'
import ChangeStudent from './changeStudent'
import Button from 'material-ui/Button'
import AddMark from './addMark.js'

export const oneStudentShp = PropTypes.shape({
    day: PropTypes.array,
})
console.log(oneStudentShp)
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

  render() {
    const initialValues = this.props.initialValues || {}
    const oneStudent = this.props.oneStudent
    console.log(oneStudent.day)

    if (!oneStudent)
      return null

    return (<div>

      < ChangeStudent onSubmit={this.changeStudent}/>
      <div class="img">
        <img src={oneStudent.picture} style={{
            width: 200,
            height: 200
          }}/>
        <h2 className='StudentName'>{oneStudent.name}</h2>
        <div></div>
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
            <td  className="title">{day.colour}</td>
            <td  className="title">{day.text}</td>

          </tr>)
        }
      </table>
      < AddMark onSubmit={this.addMark}/>
    </div>)
  }
}
const mapStateToProps = function(state) {
  return {oneStudent: state.oneStudent}

}

export default connect(mapStateToProps, {getOneStudent, changeStudent, addMark})(oneStudent)
