import React, {PureComponent} from 'react'
import { getOneStudent } from '../../actions/actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './oneStudent.css'

class oneStudent extends PureComponent {

  componentWillMount(props) {
    this.props.getOneStudent(this.props.match.params.id)
    }

  render() {
    const oneStudent = this.props.oneStudent
    console.log(oneStudent.day)

    if (!oneStudent) return null

    return (
      <div>
        <div class="img">
        <img src={oneStudent.picture} />
        {oneStudent.name}
        <div>

        </div>
        </div>
      <table>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Mark</th>
                </tr>
                {oneStudent.day && oneStudent.day.map(day =>
                  <tr>
                    <td width="5%">{day.id}</td>
                    <td width="30%" className="title">{day.date}</td>
                    <td width="30%" className="title">{day.colour}</td>
                  </tr>
                )}
              </table>
</div>

)
}
}
const mapStateToProps = function(state) {
  return {oneStudent: state.oneStudent}

}


export default connect(mapStateToProps, {getOneStudent})(oneStudent)
