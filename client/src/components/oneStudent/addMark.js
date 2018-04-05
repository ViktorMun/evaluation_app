import React, {PureComponent} from 'react'
import Button from "material-ui/Button";
import './addMark.css'

class AddMark extends PureComponent {
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
					<input className="radioClick" type="radio"  name="colour" id="colour" value=
						"red"
					 onChange={ this.handleChange } />RED
          <input className="radioClick" type="radio" name="colour" id="colour" value=
						"yellow" onChange={ this.handleChange } />YELLOW
          <input className="radioClick" type="radio"  name="colour" id="colour" value=
						"green" onChange={ this.handleChange } />GREEN
				</div>

        <div>
          <label htmlFor="date">Date</label>
          <input name="date" id="date" type="date" value={
            this.state.date || initialValues.date4 || ''
          } onChange={ this.handleChange } />
        </div>

        <div>
					<textarea  rows="10" cols="30" name="text" id="text" value={
						this.state.text || initialValues.text || ''
					} onChange={ this.handleChange } />
				</div>

				<Button type="submit">Save</Button>
			</form>
		)
	}
}

export default AddMark
