import React, {PureComponent} from 'react'
import {getStudents, addStudent, deleteStudent} from '../../actions/actions'
import {connect} from 'react-redux'
//import './students.css'
import {Link} from 'react-router-dom'
import AddStudent from './addStudent'
import Paper from 'material-ui/Paper'
import oneStudent, {oneStudentShp} from '../oneStudent/oneStudent'

class students extends PureComponent {
  state = {}

  componentWillMount(props) {
    this.props.getStudents(this.props.match.params.id)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  addStudent = (student) => {
    this.props.addStudent(this.props.match.params.id, student)
  }

  deleteStudent = (student) => {
    this.props.deleteStudent(student)
  }

  handleChange = (event) => {
    const {name, value} = event.target

    this.setState({[name]: value})
  }



  render() {
    const students = this.props.students

    return (<div className='group-list'>
      <h2>All students</h2>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Last mark</th>
          </tr>
        </thead>
        <tbody>
          {
            students && students.map(student => (<tr key={student.id}>
              <td>
                <Link to={`st/${student.id}`}>
                  <img src={student.picture} className="photo"/>
                </Link>
              </td>

              <td>{student.name}
              </td>

              <td>
                {
                  student.day.slice(-1)
                  .map(day => <td>
                    {day.colour}</td>)
                }
              </td>
              <button onClick={() => this.deleteStudent(student.id)} class="btn">
                <i class="fa fa-trash"></i>
              </button>
            </tr>))
          }
        </tbody>
      </table>
      < AddStudent onSubmit={this.addStudent}/>
    </div>);
  }
}

const mapStateToProps = function(state) {
  return {students: state.students}

}

export default connect(mapStateToProps, {getStudents, addStudent, deleteStudent})(students)
