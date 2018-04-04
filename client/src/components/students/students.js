import React, {PureComponent} from 'react'
import { getStudents } from '../../actions/actions'
import {connect} from 'react-redux'
import './students.css'
import {Link} from 'react-router-dom'

class students extends PureComponent {

  componentWillMount(props) {
    this.props.getStudents(this.props.match.params.id)
    }

  render() {
    const students = this.props.students
console.log(students)

    return (

      <div className='group-list'>
      <h2>All students</h2>
      {
        students.map(student => <div class="img-container">
          <div>{student.name}
            <div>
            <img src={student.picture} />
            <div>
              <Link to={`/${student.id}`}>Mark</Link> </div>
          </div>
              </div>
        </div>
      )}

      </div>

  )
  }
}

const mapStateToProps = function(state) {
  return {students: state.students}

}


export default connect(mapStateToProps, {getStudents})(students)
