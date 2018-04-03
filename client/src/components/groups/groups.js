import React, { PureComponent } from 'react'
import './groups.css'
import { getGroups } from '../../actions/actions'
import { connect } from 'react-redux'

class groupList extends PureComponent {

componentWillMount() {
  this.props.getGroups()
}

  render() {
  const {groups} = this.props
  if (!groups) return null
    return (

      <div className = 'group-list'>
        <h2>Current Groups</h2>
        <table>
          <tr>
            <th>ID</th>
            <th className="title">Title</th>

            <th>Edit</th>
          </tr>
          {groups.map(group =>
            <tr>
              <td width="5%">{group.id}</td>
              <td width="70%" className="title">{group.title}</td>
              <td width="10%"></td>
              <td width="15%" onClick={_=>window.location.href=`/edit/${group.id}`} className='edit-button'>edit this quiz</td>

            </tr>
          )}
        </table>
        <button onClick={_=>window.location.href=`/groupCreator`} className='add-button'>Create new group</button>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
	return {
		groups: state.groups

	}
}

export default connect(mapStateToProps, {getGroups})(groupList)
