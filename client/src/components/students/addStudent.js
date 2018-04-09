import React, {PureComponent} from 'react'
//import './students.css'
import Paper from 'material-ui/Paper'

const style = {
  height: 100,
  width: 200,
  margin: 20,
  textAlign: 'center',
};

class AddStudent extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		const initialValues = this.props.initialValues || {}
		return (
      <Paper className="editor" style={style} elevation={2}>
      <form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor="name">Student name</label>
					<input name="name" id="name" value={
						this.state.name || initialValues.name || ''
					} onChange={ this.handleChange } />
				</div>


				<div>
					<label htmlFor="picture">URL photo</label>
					<input name="picture" id="picture" type="text"  value={
						this.state.picture || initialValues.picture || ''
					} onChange={ this.handleChange } />
				</div>


				<button type="submit" onClick={_=>window.location.reload()}>Save</button>
			</form>
      </Paper>
		)
	}
}

export default AddStudent
