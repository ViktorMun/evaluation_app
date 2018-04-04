import React, {PureComponent} from 'react'

class ProductForm extends PureComponent {
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
					<label htmlFor="name">Group name</label>
					<input name="name" id="name" value={
						this.state.name || initialValues.name || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="start">Start date</label>
					<input name="start" id="start" type="date" value={
						this.state.start || initialValues.start || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="end">End date</label>
					<input name="end" id="enddate" type="date"  value={
						this.state.end || initialValues.end || ''
					} onChange={ this.handleChange } />
				</div>


				<button type="submit">Save</button>
			</form>
		)
	}
}

export default ProductForm
