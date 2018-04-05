import React, {PureComponent} from 'react'
import {getStudents, addStudent, deleteStudent} from '../../actions/actions'
import {connect} from 'react-redux'
import './students.css'
import {Link} from 'react-router-dom'
import AddStudent from './addStudent'
import Paper from 'material-ui/Paper'

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
        {
        students && students.map(student => <div class="img-container">
        <img src={student.picture} className="photo"/>


            <div>{student.name}
            <div>

              <button onClick={() => this.deleteStudent(student.id)} class="btn"><i class="fa fa-trash"></i></button>
              <div>
                <Link to={`st/${student.id}`}>Mark</Link>
              </div>
            </div>
          </div>

        </div>)
      }

      < AddStudent onSubmit={this.addStudent}/>

    </div>)
  }
}

const mapStateToProps = function(state) {
  return {students: state.students}

}

export default connect(mapStateToProps, {getStudents, addStudent, deleteStudent})(students)
