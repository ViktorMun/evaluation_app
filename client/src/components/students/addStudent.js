import React, {PureComponent} from 'react'
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


				<button type="submit">Save</button>
			</form>
		)
	}
}

export default AddStudent
