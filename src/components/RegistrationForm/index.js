import {Component} from 'react'

import './index.css'

class RegistrationFrom extends Component {
  state = {
    firstName: '',
    lastName: '',
    showFirstNameErrorMsg: false,
    showLastNameErrorMessage: false,
    isFormSubmitted: false,
  }

  onChangeFirstName = event => {
    // console.log(event.target.value)
    this.setState({firstName: event.target.value})
  }

  onBlurFirstName = () => {
    const validateFirstName = this.getValidateFirstName()
    this.setState({showFirstNameErrorMsg: !validateFirstName})
  }

  getValidateFirstName = () => {
    const {firstName} = this.state
    return firstName !== ''
  }

  renderFirstNameField = () => {
    const {firstName, showFirstNameErrorMsg} = this.state

    return (
      <>
        <label className="first-name-label" htmlFor="firstName">
          FIRST NAME
        </label>
        <input
          id="firstName"
          type="text"
          className="first-name-input"
          placeholder="First name"
          value={firstName}
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
        {showFirstNameErrorMsg && <p className="error-message">*Required</p>}
      </>
    )
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  onBlurLastName = () => {
    const validateLastName = this.getValidateLastName()
    this.setState({showLastNameErrorMessage: !validateLastName})
  }

  getValidateLastName = () => {
    const {lastName} = this.state
    return lastName !== ''
  }

  renderLastNameField = () => {
    const {lastName, showLastNameErrorMessage} = this.state

    return (
      <>
        <label className="last-name-label" htmlFor="lastName">
          LAST NAME
        </label>
        <input
          type="text"
          id="lastName"
          className="last-name-field"
          placeholder="Last name"
          value={lastName}
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
        {showLastNameErrorMessage && <p className="error-message">*Required</p>}
      </>
    )
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.getValidateFirstName()
    const isValidLastName = this.getValidateLastName()
    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameErrorMsg: !isValidFirstName,
        showLastNameErrorMessage: !isValidLastName,
        isFormSubmitted: false,
      })
    }
  }

  renderValidationPage = () => (
    <form className="form-container" onSubmit={this.onSubmitForm}>
      <div className="input-container">{this.renderFirstNameField()}</div>
      <div className="input-container">{this.renderLastNameField()}</div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  )

  submitAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstName: '',
      lastName: '',
    }))
  }

  renderFormSubmittedSuccessfullyPage = () => (
    <div className="form-successfully-submitted-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p className="submit-successful-text">Submitted Successfully</p>
      <button
        type="button"
        className="add-response-button"
        onClick={this.submitAnotherResponse}
      >
        Submit Another Response
      </button>
    </div>
  )

  render() {
    const {isFormSubmitted} = this.state
    return (
      <div className="app-container">
        <h1 className="registration-heading">Registration</h1>
        <div className="registration-form-container">
          {isFormSubmitted
            ? this.renderFormSubmittedSuccessfullyPage()
            : this.renderValidationPage()}
        </div>
      </div>
    )
  }
}

export default RegistrationFrom
