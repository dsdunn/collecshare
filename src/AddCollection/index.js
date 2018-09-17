import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo, postCollection } from '../services/fetch';
import './styles.css'

class AddCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      title: '',
      description: '',
      category: ''
    }
  }

  componentDidMount() {
    this.setState({
      uid: this.props.user.uid,
    })
  }

  handleChange = event => {
    let { id, value } = event.target;
    this.setState({
      [id]: value
    })
  }

  submitCollection = event => {
    event.preventDefault();
    postCollection(this.state)
      .then(this.props.history.push('/user'))
  }

  render() {
    return (
      <form className='add-collection-form' onSubmit={this.submitCollection}>
        <label for='collection-image'>Upload a picture of your collection</label>
        <input id='collection-image' type='file' />
        <label for='title'>Collection name: </label>
        <input id='title' placeholder='my collection' value={this.state.title} onChange={this.handleChange}/>
        <label for='description'>Describe your Collection:</label>
        <textarea id='description' value={this.state.description} onChange={this.handleChange}/>
        <label htmlFor='collection-form-category'>Select a Category</label>
        <div className='collection-form-bottom'>
          <select id='category' required={true} onChange={this.handleChange}>
            <option value=''>choose a category</option>
            <option value='coins'>Coins</option>
            <option value='comics'>Comics</option>
            <option value='cards'>Cards</option>
            <option value='vinyl'>Vinyl</option>
            <option value='other'>Other</option>
          </select>
          <button>Submit</button>
        </div>
      </form>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user
})

export default withRouter(connect(mapStateToProps)(AddCollection));

