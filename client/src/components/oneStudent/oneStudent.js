import React, {PureComponent} from 'react'
import {getOneStudent, changeStudent} from '../../actions/actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './oneStudent.css'
import ChangeStudent from './changeStudent'

class oneStudent extends PureComponent {
  state = {}

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

  render() {
    const initialValues = this.props.initialValues || {}
    const oneStudent = this.props.oneStudent
    console.log(oneStudent.day)

    if (!oneStudent)
      return null

    return (<div>
      <div class="img">
        <img src={oneStudent.picture}/> {oneStudent.name}
        <div></div>
      </div>
      <table>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Mark</th>
        </tr>
        {
          oneStudent.day && oneStudent.day.map(day => <tr>
            <td width="5%">{day.id}</td>
            <td width="30%" className="title">{day.date}</td>
            <td width="30%" className="title">{day.colour}</td>
          </tr>)
        }
      </table>

      < ChangeStudent onSubmit={this.changeStudent}/>
    </div>)
  }
}
const mapStateToProps = function(state) {
  return {oneStudent: state.oneStudent}

}

export default connect(mapStateToProps, {getOneStudent, changeStudent})(oneStudent)
