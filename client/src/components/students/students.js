import React, {PureComponent} from 'react'
import {getStudents, addStudent, deleteStudent, getProgress, getRandom} from '../../actions/actions'
import {connect} from 'react-redux'
import './students.css'
import {Link} from 'react-router-dom'
import AddStudent from './addStudent'
import Paper from 'material-ui/Paper'
import oneStudent, {oneStudentShp} from '../oneStudent/oneStudent'
import './students.css'

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

class students extends PureComponent {
  state = {}

  componentWillMount(props) {
    this.props.getStudents(this.props.match.params.id),
    this.props.getProgress(this.props.match.params.id),
    this.props.getRandom(this.props.match.params.id)
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

  carousel = colour => {
    if (colour === "R") {
      return "Red"
    } else if (colour === "Y") {
      return "Yellow"
    } else if (colour === "G") {
      return "Green"
    }
  };

  render() {
    const students = this.props.students
    const progress = this.props.progress
    const random = this.props.random

    return (<div>
      <h2>All students</h2>

      {
        students && students.map(student => (<div class="card">
          <Link to={`st/${student.id}`}>
            <img src={student.picture} class="photo"/>
          </Link>

          <h2 className='StudentName'>
            <b>{student.name}</b>
          </h2>

          <div className="Carousel">{
              student.day.slice(-1).map(day => <div className={this.carousel(day.colour)}>
                {day.colour}</div>)
            }
            <button onClick={() => this.deleteStudent(student.id)} class="btn">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>))
      }

      < AddStudent onSubmit={this.addStudent}/>

      <div classname="Progress" style={style}>
        RED:
        <progress value={progress.r} max="100"></progress>

        YELLOW:
        <progress value={progress.y} max="100"></progress>

        GREEN:
        <progress value={progress.g} max="100"></progress>
        NULL:
        <progress value={progress.w} max="100"></progress>

        <Link to={`/students/st/${random.id}`}>
          <button>
            Random student
          </button>
        </Link>

      </div>
    </div>);
  }
}

const mapStateToProps = function(state) {
  return {students: state.students, progress: state.progress, random: state.random}

}

export default connect(mapStateToProps, {getStudents, addStudent, deleteStudent, getProgress, getRandom})(students)
