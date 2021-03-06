import React, { Component } from 'react';
import { auth } from '../firebase';
import { connect } from 'react-redux';
import { signIn } from '../actions';
import { postUserInfo } from '../services/fetch';
import { Link, withRouter } from 'react-router-dom';
import close from '../images/close.svg';
import PropTypes from 'prop-types';

import './styles.css'

export class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password1: '',
      password2: '',
      error: null
    };
  }

  handleChange = (event) => {
    const { id, value } = event.target;

    this.setState({
      [id]: value
    })
  }

  createUser = (response) => ({
      uid: response.user.uid,
      username: this.state.username
  })

  resetForm = () => {
    this.setState({
      email: '',
      username: '',
      password1: '',
      password2: '',
      error: null
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validate()) {
      auth.doCreateUserWithEmailAndPassword(this.state.email, this.state.password1)
        .then(response => {
          console.log(response)
          let user = this.createUser(response)
          return postUserInfo(user)
        })
        .then(response => response.json())
        .then(user => {
          this.props.signIn(user)
          this.resetForm()
        })
        .then(() => this.props.history.push('/home/editprofile'))
        .catch(error => {
          this.setState({error: error.message})
        })
    } else {
      this.setState({ error: 'Check username and password'})
    }
  }

  validate() {
      if (this.state.passwordOne !== this.state.passwordTwo ||
      this.state.passwordOne === '' ||
      this.state.email === '' ||
      this.state.username === '' ) {
        this.setState({
          error: 'Uh oh! make sure you fill out the required fields ...thats all of them'
        })
        return false
      } else {
        return true
      }
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    let location = this.props.history.location.pathname;
    let errorMessage = this.state.error ? 'signup-err-message activeError' : 'signup-err-message'

    return (
      <form className='signup'onSubmit={this.handleSubmit}>
        <a className='signup-close-link' exact='true' onClick={() => this.goBack()}>
          <img className='close-btn' src={close} />
        </a>
        <h5>Sign Up</h5>
        <label htmlFor='email'>email</label>
        <input id='email' type='email' value={this.state.email} onChange={this.handleChange}/>
        <label htmlFor='username'>username</label>
        <input id='username' value={this.state.username} onChange={this.handleChange}/>
        <label htmlFor='password1'>password</label>
        <input id='password1' type='password' value={this.state.password1} onChange={this.handleChange}/>
        <label htmlFor='password2'>confirm password</label>
        <input id='password2' type='password' value={this.state.password2} onChange={this.handleChange}/>
        <button>Save</button>
        <p className={errorMessage}>{this.state.error}</p>
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  signIn: (user) => dispatch(signIn(user))
})

export default withRouter(connect(null, mapDispatchToProps)(Signup));

Signup.propTypes = {
  history: PropTypes.object,
  signIn: PropTypes.func
}
