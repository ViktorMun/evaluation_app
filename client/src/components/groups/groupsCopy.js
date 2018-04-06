import React, {PureComponent} from 'react'
import './groups.css'
import {getGroups, addGroup} from '../../actions/actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddGroup from './createGroup'
import {Redirect} from 'react-router-dom'

class GroupList extends PureComponent {
  state = {}

  componentWillMount() {
    this.props.getGroups()
    }

    handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

  addGroup = (group) => {
    this.props.addGroup(group)
  }
	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
}

  render() {
    const initialValues = this.props.initialValues || {}
    const groups = this.props.groups


    if (!groups)
      return null
    return (<div className='group-list'>
      <h2>All groups</h2>
      {
        groups.map(group => <div class="circle">
          <div>{group.name}
            <div>
              {group.student.length}
              students
              <div>
              <Link to={`/students/${group.id}`}>evaluation</Link>
              </div>
            </div>
          </div>
        </div>
      )}
      < AddGroup onSubmit={this.addGroup}/>
      </div>

  )
  }
}

const mapStateToProps = function(state) {
  return {groups: state.groups}

}


export default connect(mapStateToProps, {getGroups, addGroup})(GroupList)
